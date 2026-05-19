import type { Confidence, QuestionStatus } from "./types";

export const SENSITIVE_FOOTER =
  "Because this relates to your child's health or safety, please contact staff before making a final decision.";

export const UNKNOWN_ANSWER =
  "I don't have enough information to answer that confidently. I've marked this for staff review.";

export const MEDIUM_CAVEAT_PREFIX =
  "Based on our current handbook guidance, ";

export const TRUST_RULES = [
  {
    title: "High confidence",
    description:
      "Answer directly from the handbook when the match is clear and the topic is low-risk.",
  },
  {
    title: "Medium confidence",
    description:
      "Answer with a caveat when wording is ambiguous or the topic needs staff awareness.",
  },
  {
    title: "Low confidence",
    description:
      "Escalate to staff when we cannot match the question to a reliable handbook section.",
  },
  {
    title: "Sensitive topics",
    description:
      "Provide handbook guidance and recommend staff confirmation for illness, medication, allergies, injury, custody, legal concerns, or emergencies.",
  },
] as const;

export function capConfidenceForSensitive(
  confidence: Confidence,
  isSensitive: boolean,
): Confidence {
  if (!isSensitive) return confidence;
  if (confidence === "high") return "medium";
  return confidence;
}

export function resolveStatus(
  confidence: Confidence,
  isSensitive: boolean,
  escalated: boolean,
): QuestionStatus {
  if (escalated) return "escalated";
  if (confidence === "low") return "needs_review";
  if (isSensitive && confidence === "medium") return "answered";
  return "answered";
}

export function needsReviewEntry(
  status: QuestionStatus,
  confidence: Confidence,
  isSensitive: boolean,
): boolean {
  return (
    status === "needs_review" ||
    status === "escalated" ||
    (isSensitive && confidence !== "high")
  );
}

export function sensitiveSectionLeadIn(sectionTitle: string): string {
  return `Based on our ${sectionTitle} handbook section, `;
}
