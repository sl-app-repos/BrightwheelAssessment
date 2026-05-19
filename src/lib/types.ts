export type HandbookSectionId =
  | "hours"
  | "illness"
  | "medication"
  | "pickup"
  | "nutrition"
  | "tuition"
  | "tour"
  | "behavior"
  | "special";

export type HandbookSection = {
  id: HandbookSectionId;
  title: string;
  handbookCategory: string;
  body: string;
  lastUpdated: string;
};

export type Confidence = "high" | "medium" | "low";
export type QuestionStatus = "answered" | "escalated" | "needs_review";

export type QuestionLogEntry = {
  id: string;
  question: string;
  answer: string;
  sourceLabel: string | null;
  confidence: Confidence;
  status: QuestionStatus;
  sectionId: HandbookSectionId | null;
  isSensitive: boolean;
  timestamp: string;
  escalationNote?: string;
  suggestedImprovement?: string;
};

export type ChatMessage =
  | { id: string; role: "guardian"; text: string; timestamp: string }
  | {
      id: string;
      role: "assistant";
      entry: QuestionLogEntry;
      timestamp: string;
    };

export type ProactiveUpdateType = "reminder" | "update" | "handbook";

export type ProactiveUpdate = {
  id: string;
  title: string;
  message: string;
  sectionId: HandbookSectionId | null;
  type: ProactiveUpdateType;
  sentAt: string;
};

export type TrendActionType =
  | "draft_reminder"
  | "draft_update"
  | "improve_handbook";

export type QuestionTrend = {
  sectionId: HandbookSectionId;
  title: string;
  countThisWeek: number;
  trendLabel: string;
  signal: string;
  suggestedAction: string;
  actionType: TrendActionType;
  commonQuestions: string[];
  handbookAppendText?: string;
};

export type AppState = {
  handbookSections: HandbookSection[];
  questions: QuestionLogEntry[];
  messages: ChatMessage[];
  proactiveUpdates: ProactiveUpdate[];
};

export type Metrics = {
  questionsToday: number;
  answeredConfidently: number;
  needsReview: number;
  escalated: number;
};

export const STORAGE_KEY = "brightstart-front-desk-v3";
