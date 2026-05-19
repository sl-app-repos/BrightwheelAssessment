import { isLastWeek, isThisWeek } from "./formatTime";
import { ILLNESS_HANDBOOK_APPEND } from "./proactiveMessages";
import type {
  HandbookSectionId,
  QuestionLogEntry,
  QuestionTrend,
  TrendActionType,
} from "./types";

const MIN_COUNT = 3;
const MAX_TRENDS = 3;

type TrendConfig = {
  sectionId: HandbookSectionId;
  title: string;
  signal: string;
  suggestedAction: string;
  actionType: TrendActionType;
  handbookAppendText?: string;
};

const TREND_CONFIGS: TrendConfig[] = [
  {
    sectionId: "hours",
    title: "Holiday Schedule",
    signal: "Guardians are asking about upcoming closures",
    suggestedAction: "Send a closure reminder",
    actionType: "draft_reminder",
  },
  {
    sectionId: "nutrition",
    title: "Meals & Lunch",
    signal: "Guardians may not have seen today's lunch option",
    suggestedAction: "Send lunch update",
    actionType: "draft_update",
  },
  {
    sectionId: "illness",
    title: "Health & Illness",
    signal: "Fever and rash questions are common",
    suggestedAction: "Clarify illness examples in handbook",
    actionType: "improve_handbook",
    handbookAppendText: ILLNESS_HANDBOOK_APPEND,
  },
];

function topCommonQuestions(
  entries: QuestionLogEntry[],
  limit: number,
): string[] {
  const counts = new Map<string, number>();
  for (const e of entries) {
    const q = e.question.trim();
    counts.set(q, (counts.get(q) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([q]) => q);
}

function computeTrendLabel(
  sectionId: HandbookSectionId,
  thisWeek: number,
  lastWeek: number,
): string {
  if (sectionId === "illness" && thisWeek >= 3) {
    return "recurring";
  }
  if (lastWeek === 0) {
    return thisWeek >= 4 ? "new" : "rising";
  }
  const pct = Math.round(((thisWeek - lastWeek) / lastWeek) * 100);
  if (pct <= 0) return "steady";
  return `+${pct}%`;
}

export function computeQuestionTrends(
  questions: QuestionLogEntry[],
): QuestionTrend[] {
  const trends: QuestionTrend[] = [];

  for (const config of TREND_CONFIGS) {
    const sectionQuestions = questions.filter(
      (q) => q.sectionId === config.sectionId,
    );
    const thisWeekQs = sectionQuestions.filter((q) => isThisWeek(q.timestamp));
    const lastWeekQs = sectionQuestions.filter((q) => isLastWeek(q.timestamp));

    if (thisWeekQs.length < MIN_COUNT) continue;

    trends.push({
      sectionId: config.sectionId,
      title: config.title,
      countThisWeek: thisWeekQs.length,
      trendLabel: computeTrendLabel(
        config.sectionId,
        thisWeekQs.length,
        lastWeekQs.length,
      ),
      signal: config.signal,
      suggestedAction: config.suggestedAction,
      actionType: config.actionType,
      commonQuestions: topCommonQuestions(thisWeekQs, 3),
      handbookAppendText: config.handbookAppendText,
    });
  }

  return trends
    .sort((a, b) => b.countThisWeek - a.countThisWeek)
    .slice(0, MAX_TRENDS);
}
