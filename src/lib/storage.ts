import { computeQuestionTrends } from "./questionTrends";
import { getSeedState } from "./seed";
import {
  getSeedProactiveUpdates,
  getSeedQuestionHistory,
} from "./seedQuestionHistory";
import type { AppState, ChatMessage } from "./types";
import { STORAGE_KEY } from "./types";

function normalizeMessages(messages: ChatMessage[]): ChatMessage[] {
  return messages.map((msg) => {
    if (
      (msg as { role: string }).role === "parent" &&
      "text" in msg &&
      typeof msg.text === "string"
    ) {
      return { ...msg, role: "guardian" as const };
    }
    return msg;
  });
}

function withTrendDemoData(state: AppState): AppState {
  const hasTrends = computeQuestionTrends(state.questions).length >= 3;
  const questionIds = new Set(state.questions.map((q) => q.id));
  const questions = hasTrends
    ? state.questions
    : [
        ...state.questions,
        ...getSeedQuestionHistory().filter((q) => !questionIds.has(q.id)),
      ];

  const proactiveIds = new Set(state.proactiveUpdates.map((u) => u.id));
  const proactiveUpdates =
    state.proactiveUpdates.length > 0
      ? state.proactiveUpdates
      : [
          ...state.proactiveUpdates,
          ...getSeedProactiveUpdates().filter((u) => !proactiveIds.has(u.id)),
        ];

  return {
    ...state,
    questions,
    proactiveUpdates,
    messages: normalizeMessages(state.messages),
  };
}

function isValidState(parsed: unknown): parsed is AppState {
  if (!parsed || typeof parsed !== "object") return false;
  const state = parsed as Record<string, unknown>;
  if ("policies" in state) return false;
  if (!Array.isArray(state.handbookSections)) return false;
  if (state.handbookSections.length < 9) return false;
  if (!Array.isArray(state.questions)) return false;
  return true;
}

export function loadState(): AppState {
  if (typeof window === "undefined") return withTrendDemoData(getSeedState());
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return withTrendDemoData(getSeedState());
    const parsed = JSON.parse(raw) as unknown;
    if (!isValidState(parsed)) return withTrendDemoData(getSeedState());
    return withTrendDemoData({
      handbookSections: parsed.handbookSections,
      questions: parsed.questions,
      messages: normalizeMessages(parsed.messages ?? []),
      proactiveUpdates: parsed.proactiveUpdates ?? [],
    });
  } catch {
    return withTrendDemoData(getSeedState());
  }
}

export function saveState(state: AppState): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function clearState(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
