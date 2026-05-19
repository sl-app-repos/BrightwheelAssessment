import { startOfWeek } from "./formatTime";
import type { ProactiveUpdate, QuestionLogEntry } from "./types";

/** Monday-based offset within the current calendar week (0 = Monday). */
function thisWeekISO(dayOffsetFromMonday: number, hour = 10): string {
  const d = new Date(startOfWeek(new Date()));
  d.setDate(d.getDate() + dayOffsetFromMonday);
  d.setHours(hour, 0, 0, 0);
  return d.toISOString();
}

/** Monday-based offset within the previous calendar week. */
function lastWeekISO(dayOffsetFromMonday: number, hour = 10): string {
  const d = new Date(startOfWeek(new Date()));
  d.setDate(d.getDate() - 7 + dayOffsetFromMonday);
  d.setHours(hour, 0, 0, 0);
  return d.toISOString();
}

function entry(
  partial: Omit<QuestionLogEntry, "id"> & { id: string },
): QuestionLogEntry {
  return { ...partial };
}

/** Demo question log so Guardian Question Trends shows three cards on first load. */
export function getSeedQuestionHistory(): QuestionLogEntry[] {
  return [
    // Hours — this week (6) → Holiday Schedule trend (+500% vs last week)
    entry({
      id: "seed-q-hours-1",
      question: "Are you open on Veterans Day?",
      answer: "Closed on Veterans Day.",
      sourceLabel: "Hours & Holidays",
      confidence: "high",
      status: "answered",
      sectionId: "hours",
      isSensitive: false,
      timestamp: thisWeekISO(0, 9),
    }),
    entry({
      id: "seed-q-hours-2",
      question: "Are you closed Monday for the holiday?",
      answer: "Holiday hours apply.",
      sourceLabel: "Hours & Holidays",
      confidence: "high",
      status: "answered",
      sectionId: "hours",
      isSensitive: false,
      timestamp: thisWeekISO(1, 11),
    }),
    entry({
      id: "seed-q-hours-3",
      question: "What are your hours this week?",
      answer: "Monday–Friday 7:30 AM–6:00 PM.",
      sourceLabel: "Hours & Holidays",
      confidence: "high",
      status: "answered",
      sectionId: "hours",
      isSensitive: false,
      timestamp: thisWeekISO(1, 14),
    }),
    entry({
      id: "seed-q-hours-4",
      question: "Is the center open on Veterans Day?",
      answer: "We are closed November 11.",
      sourceLabel: "Hours & Holidays",
      confidence: "high",
      status: "answered",
      sectionId: "hours",
      isSensitive: false,
      timestamp: thisWeekISO(2, 10),
    }),
    entry({
      id: "seed-q-hours-5",
      question: "Holiday schedule for November?",
      answer: "See handbook for closures.",
      sourceLabel: "Hours & Holidays",
      confidence: "medium",
      status: "answered",
      sectionId: "hours",
      isSensitive: false,
      timestamp: thisWeekISO(3, 15),
    }),
    entry({
      id: "seed-q-hours-6",
      question: "Are you open Veterans Day weekend?",
      answer: "Closed Veterans Day.",
      sourceLabel: "Hours & Holidays",
      confidence: "high",
      status: "answered",
      sectionId: "hours",
      isSensitive: false,
      timestamp: thisWeekISO(4, 8),
    }),
    entry({
      id: "seed-q-hours-last-1",
      question: "What time do you open?",
      answer: "7:30 AM.",
      sourceLabel: "Hours & Holidays",
      confidence: "high",
      status: "answered",
      sectionId: "hours",
      isSensitive: false,
      timestamp: lastWeekISO(2, 12),
    }),

    // Nutrition — this week (8) → Meals & Lunch trend (+300%)
    entry({
      id: "seed-q-nutrition-1",
      question: "I forgot lunch. Can you provide lunch today?",
      answer: "Emergency lunch may be available.",
      sourceLabel: "Meals & Nutrition",
      confidence: "high",
      status: "answered",
      sectionId: "nutrition",
      isSensitive: false,
      timestamp: thisWeekISO(0, 11),
    }),
    entry({
      id: "seed-q-nutrition-2",
      question: "What is lunch today?",
      answer: "Turkey sandwich, fruit cup, carrots, milk.",
      sourceLabel: "Meals & Nutrition",
      confidence: "high",
      status: "answered",
      sectionId: "nutrition",
      isSensitive: false,
      timestamp: thisWeekISO(0, 12),
    }),
    entry({
      id: "seed-q-nutrition-3",
      question: "Forgot to pack lunch",
      answer: "Let staff know at drop-off.",
      sourceLabel: "Meals & Nutrition",
      confidence: "medium",
      status: "answered",
      sectionId: "nutrition",
      isSensitive: false,
      timestamp: thisWeekISO(1, 16),
    }),
    entry({
      id: "seed-q-nutrition-4",
      question: "Can my child get lunch from the center?",
      answer: "When supplies allow.",
      sourceLabel: "Meals & Nutrition",
      confidence: "high",
      status: "answered",
      sectionId: "nutrition",
      isSensitive: false,
      timestamp: thisWeekISO(2, 9),
    }),
    entry({
      id: "seed-q-nutrition-5",
      question: "Emergency lunch available?",
      answer: "Today's option listed in handbook.",
      sourceLabel: "Meals & Nutrition",
      confidence: "high",
      status: "answered",
      sectionId: "nutrition",
      isSensitive: false,
      timestamp: thisWeekISO(2, 13),
    }),
    entry({
      id: "seed-q-nutrition-6",
      question: "What food do you have for lunch?",
      answer: "Turkey sandwich meal today.",
      sourceLabel: "Meals & Nutrition",
      confidence: "high",
      status: "answered",
      sectionId: "nutrition",
      isSensitive: false,
      timestamp: thisWeekISO(3, 10),
    }),
    entry({
      id: "seed-q-nutrition-7",
      question: "I forgot my child's lunch again",
      answer: "Emergency lunch when available.",
      sourceLabel: "Meals & Nutrition",
      confidence: "medium",
      status: "answered",
      sectionId: "nutrition",
      isSensitive: false,
      timestamp: thisWeekISO(4, 14),
    }),
    entry({
      id: "seed-q-nutrition-8",
      question: "Is there lunch provided today?",
      answer: "See today's lunch option.",
      sourceLabel: "Meals & Nutrition",
      confidence: "high",
      status: "answered",
      sectionId: "nutrition",
      isSensitive: false,
      timestamp: thisWeekISO(4, 11),
    }),
    entry({
      id: "seed-q-nutrition-last-1",
      question: "Do you serve lunch?",
      answer: "Families normally provide lunch.",
      sourceLabel: "Meals & Nutrition",
      confidence: "high",
      status: "answered",
      sectionId: "nutrition",
      isSensitive: false,
      timestamp: lastWeekISO(1, 10),
    }),
    entry({
      id: "seed-q-nutrition-last-2",
      question: "Lunch policy?",
      answer: "Families provide lunch.",
      sourceLabel: "Meals & Nutrition",
      confidence: "high",
      status: "answered",
      sectionId: "nutrition",
      isSensitive: false,
      timestamp: lastWeekISO(3, 15),
    }),

    // Illness — this week (5) → Health & Illness recurring trend
    entry({
      id: "seed-q-illness-1",
      question: "My child has a fever. Can they come in?",
      answer: "Fever-free 24 hours required.",
      sourceLabel: "Health & Illness",
      confidence: "medium",
      status: "answered",
      sectionId: "illness",
      isSensitive: true,
      timestamp: thisWeekISO(0, 8),
    }),
    entry({
      id: "seed-q-illness-2",
      question: "My child has a rash",
      answer: "Staff review may be needed.",
      sourceLabel: "Health & Illness",
      confidence: "medium",
      status: "answered",
      sectionId: "illness",
      isSensitive: true,
      timestamp: thisWeekISO(1, 10),
    }),
    entry({
      id: "seed-q-illness-3",
      question: "Can my child attend with pink eye?",
      answer: "Marked for staff review.",
      sourceLabel: "Health & Illness",
      confidence: "low",
      status: "needs_review",
      sectionId: "illness",
      isSensitive: true,
      timestamp: thisWeekISO(2, 9),
    }),
    entry({
      id: "seed-q-illness-4",
      question: "Can they come back after a fever?",
      answer: "24 hours fever-free without medication.",
      sourceLabel: "Health & Illness",
      confidence: "medium",
      status: "answered",
      sectionId: "illness",
      isSensitive: true,
      timestamp: thisWeekISO(3, 14),
    }),
    entry({
      id: "seed-q-illness-5",
      question: "Is my child ok to return after being sick?",
      answer: "See illness policy.",
      sourceLabel: "Health & Illness",
      confidence: "medium",
      status: "answered",
      sectionId: "illness",
      isSensitive: true,
      timestamp: thisWeekISO(4, 11),
    }),
    entry({
      id: "seed-q-illness-last-1",
      question: "Fever policy?",
      answer: "100.4°F exclusion.",
      sourceLabel: "Health & Illness",
      confidence: "high",
      status: "answered",
      sectionId: "illness",
      isSensitive: true,
      timestamp: lastWeekISO(4, 9),
    }),
  ];
}

/** Sample proactive updates for the trends tab footer. */
export function getSeedProactiveUpdates(): ProactiveUpdate[] {
  return [
    {
      id: "seed-proactive-1",
      title: "Veterans Day closure reminder",
      message:
        "Little Sprouts Learning Center will be closed on Veterans Day, Monday November 11. Classes will resume Tuesday at 7:30 AM.",
      sectionId: "hours",
      type: "reminder",
      sentAt: lastWeekISO(4, 16),
    },
    {
      id: "seed-proactive-2",
      title: "Lunch update",
      message:
        "Today's emergency lunch option is turkey sandwich, fruit cup, carrots, and milk. Contact the front desk for allergies.",
      sectionId: "nutrition",
      type: "update",
      sentAt: thisWeekISO(0, 15),
    },
  ];
}
