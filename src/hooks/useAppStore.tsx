"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  createQuestionEntry,
  refreshAnswersForHandbook,
} from "@/lib/answerEngine";
import { isToday } from "@/lib/formatTime";
import type { OperatorSectionId } from "@/lib/operatorSections";
import { computeQuestionTrends } from "@/lib/questionTrends";
import { getSeedState } from "@/lib/seed";
import { clearState, loadState, saveState } from "@/lib/storage";
import { needsReviewEntry } from "@/lib/trustRules";
import type {
  AppState,
  ChatMessage,
  HandbookSection,
  HandbookSectionId,
  Metrics,
  ProactiveUpdate,
  ProactiveUpdateType,
  QuestionLogEntry,
  QuestionTrend,
} from "@/lib/types";

type AppStoreContextValue = {
  mounted: boolean;
  handbookSections: HandbookSection[];
  questions: QuestionLogEntry[];
  messages: ChatMessage[];
  metrics: Metrics;
  needsReview: QuestionLogEntry[];
  questionTrends: QuestionTrend[];
  proactiveUpdates: ProactiveUpdate[];
  lastActionNotice: string | null;
  askQuestion: (question: string) => void;
  updateHandbookSection: (id: string, body: string) => void;
  markProactiveSent: (
    title: string,
    message: string,
    sectionId: HandbookSectionId | null,
    type: ProactiveUpdateType,
  ) => void;
  appendHandbookGuidance: (
    sectionId: HandbookSectionId,
    paragraph: string,
  ) => void;
  clearActionNotice: () => void;
  resetDemo: () => void;
  operatorSection: OperatorSectionId;
  setOperatorSection: (section: OperatorSectionId) => void;
  focusSectionId: HandbookSectionId | null;
  clearHandbookFocus: () => void;
  handbookEditRequestId: number;
  requestHandbookEdit: (sectionId: HandbookSectionId) => void;
};

const AppStoreContext = createContext<AppStoreContextValue | null>(null);

function computeMetrics(questions: QuestionLogEntry[]): Metrics {
  const todayQuestions = questions.filter((q) => isToday(q.timestamp));
  return {
    questionsToday: todayQuestions.length,
    answeredConfidently: todayQuestions.filter(
      (q) => q.confidence === "high" && q.status === "answered",
    ).length,
    needsReview: todayQuestions.filter((q) =>
      needsReviewEntry(q.status, q.confidence, q.isSensitive),
    ).length,
    escalated: todayQuestions.filter((q) => q.status === "escalated").length,
  };
}

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(getSeedState);
  const [mounted, setMounted] = useState(false);
  const [focusSectionId, setFocusSectionId] =
    useState<HandbookSectionId | null>(null);
  const [operatorSection, setOperatorSection] =
    useState<OperatorSectionId>("activity");
  const [handbookEditRequestId, setHandbookEditRequestId] = useState(0);
  const [lastActionNotice, setLastActionNotice] = useState<string | null>(
    null,
  );

  const clearHandbookFocus = useCallback(() => {
    setFocusSectionId(null);
  }, []);

  const requestHandbookEdit = useCallback((sectionId: HandbookSectionId) => {
    setFocusSectionId(sectionId);
    setHandbookEditRequestId((n) => n + 1);
    setOperatorSection("handbook");
  }, []);

  useEffect(() => {
    setState(loadState());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) saveState(state);
  }, [state, mounted]);

  useEffect(() => {
    if (!lastActionNotice) return;
    const t = setTimeout(() => setLastActionNotice(null), 4000);
    return () => clearTimeout(t);
  }, [lastActionNotice]);

  const askQuestion = useCallback((question: string) => {
    const trimmed = question.trim();
    if (!trimmed) return;

    setState((prev) => {
      const entry = createQuestionEntry(trimmed, prev.handbookSections);
      const guardianMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "guardian",
        text: trimmed,
        timestamp: new Date().toISOString(),
      };
      const assistantMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        entry,
        timestamp: entry.timestamp,
      };
      return {
        ...prev,
        questions: [entry, ...prev.questions],
        messages: [...prev.messages, guardianMsg, assistantMsg],
      };
    });
  }, []);

  const updateHandbookSection = useCallback((id: string, body: string) => {
    setState((prev) => {
      const handbookSections = prev.handbookSections.map((s) =>
        s.id === id
          ? {
              ...s,
              body,
              lastUpdated: new Date().toISOString().split("T")[0],
            }
          : s,
      );
      const synced = refreshAnswersForHandbook(
        handbookSections,
        prev.questions,
        prev.messages,
      );
      return {
        ...prev,
        handbookSections,
        questions: synced.questions,
        messages: synced.messages,
      };
    });
  }, []);

  const markProactiveSent = useCallback(
    (
      title: string,
      message: string,
      sectionId: HandbookSectionId | null,
      type: ProactiveUpdateType,
    ) => {
      setState((prev) => ({
        ...prev,
        proactiveUpdates: [
          {
            id: crypto.randomUUID(),
            title,
            message,
            sectionId,
            type,
            sentAt: new Date().toISOString(),
          },
          ...prev.proactiveUpdates,
        ],
      }));
      setLastActionNotice(`${title} marked as sent.`);
    },
    [],
  );

  const appendHandbookGuidance = useCallback(
    (sectionId: HandbookSectionId, paragraph: string) => {
      let sectionTitle = "Handbook";
      setState((prev) => {
        const section = prev.handbookSections.find((s) => s.id === sectionId);
        sectionTitle = section?.title ?? "Handbook";
        const alreadyHas = section?.body.includes(paragraph.trim());
        const handbookSections = prev.handbookSections.map((s) =>
          s.id === sectionId
            ? {
                ...s,
                body: alreadyHas
                  ? s.body
                  : `${s.body.trim()}\n\n${paragraph.trim()}`,
                lastUpdated: new Date().toISOString().split("T")[0],
              }
            : s,
        );
        const synced = refreshAnswersForHandbook(
          handbookSections,
          prev.questions,
          prev.messages,
        );
        return {
          ...prev,
          handbookSections,
          questions: synced.questions,
          messages: synced.messages,
        };
      });
      setLastActionNotice(`Suggested guidance added to ${sectionTitle}.`);
    },
    [],
  );

  const clearActionNotice = useCallback(() => {
    setLastActionNotice(null);
  }, []);

  const resetDemo = useCallback(() => {
    clearState();
    setState(getSeedState());
    setFocusSectionId(null);
    setOperatorSection("activity");
    setHandbookEditRequestId(0);
    setLastActionNotice(null);
  }, []);

  const metrics = useMemo(
    () => computeMetrics(state.questions),
    [state.questions],
  );

  const needsReview = useMemo(
    () =>
      state.questions.filter((q) =>
        needsReviewEntry(q.status, q.confidence, q.isSensitive),
      ),
    [state.questions],
  );

  const questionTrends = useMemo(
    () => computeQuestionTrends(state.questions),
    [state.questions],
  );

  const value: AppStoreContextValue = {
    mounted,
    handbookSections: state.handbookSections,
    questions: state.questions,
    messages: state.messages,
    metrics,
    needsReview,
    questionTrends,
    proactiveUpdates: state.proactiveUpdates,
    lastActionNotice,
    askQuestion,
    updateHandbookSection,
    markProactiveSent,
    appendHandbookGuidance,
    clearActionNotice,
    resetDemo,
    operatorSection,
    setOperatorSection,
    focusSectionId,
    clearHandbookFocus,
    handbookEditRequestId,
    requestHandbookEdit,
  };

  return (
    <AppStoreContext.Provider value={value}>
      {children}
    </AppStoreContext.Provider>
  );
}

export function useAppStore(): AppStoreContextValue {
  const ctx = useContext(AppStoreContext);
  if (!ctx) throw new Error("useAppStore must be used within AppStoreProvider");
  return ctx;
}
