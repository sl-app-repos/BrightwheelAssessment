import {
  isAllergyQuestion,
  isBillingDispute,
  matchIntent,
} from "./intentMatcher";
import { getSuggestedImprovement } from "./suggestedImprovements";
import type {
  ChatMessage,
  HandbookSection,
  HandbookSectionId,
  QuestionLogEntry,
} from "./types";
import {
  MEDIUM_CAVEAT_PREFIX,
  SENSITIVE_FOOTER,
  UNKNOWN_ANSWER,
  capConfidenceForSensitive,
  resolveStatus,
  sensitiveSectionLeadIn,
} from "./trustRules";

function findSection(
  sections: HandbookSection[],
  sectionId: HandbookSectionId,
): HandbookSection | undefined {
  return sections.find((s) => s.id === sectionId);
}

/** Pull a chat-friendly excerpt from the current handbook section body. */
function formatHandbookAnswer(body: string, maxParagraphs = 3): string {
  const paragraphs = body
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
  if (paragraphs.length === 0) return body.trim();
  return paragraphs.slice(0, maxParagraphs).join("\n\n");
}

function buildAnswerFromSection(
  _question: string,
  _sectionId: HandbookSectionId,
  section: HandbookSection,
): string {
  return formatHandbookAnswer(section.body);
}

function applyAnswerFraming(
  answer: string,
  confidence: "high" | "medium" | "low",
  isSensitive: boolean,
  sectionTitle: string,
): string {
  if (confidence === "low") return answer;

  if (isSensitive) {
    const leadIn = sensitiveSectionLeadIn(sectionTitle);
    const body = answer.charAt(0).toLowerCase() + answer.slice(1);
    return `${leadIn}${body}`;
  }

  if (confidence === "medium") {
    const body = answer.charAt(0).toLowerCase() + answer.slice(1);
    return `${MEDIUM_CAVEAT_PREFIX}${body}`;
  }

  return answer;
}

function generateAnswer(
  question: string,
  handbookSections: HandbookSection[],
): Omit<QuestionLogEntry, "id" | "timestamp"> {
  const trimmed = question.trim();
  const { sectionId, score, isSensitive } = matchIntent(trimmed);
  const billingDispute = sectionId === "tuition" && isBillingDispute(trimmed);
  const allergyEscalation = isAllergyQuestion(trimmed);

  const suggestedImprovement = getSuggestedImprovement(
    trimmed,
    sectionId,
    score >= 2 ? "high" : score === 1 ? "medium" : "low",
    score,
  );

  if (!sectionId || score < 1) {
    return {
      question: trimmed,
      answer: UNKNOWN_ANSWER,
      sourceLabel: null,
      confidence: "low",
      status: "needs_review",
      sectionId: null,
      isSensitive,
      suggestedImprovement:
        suggestedImprovement ??
        "Consider adding a handbook section for this topic",
      escalationNote: "No matching handbook section found.",
    };
  }

  const section = findSection(handbookSections, sectionId);
  if (!section) {
    return {
      question: trimmed,
      answer: UNKNOWN_ANSWER,
      sourceLabel: null,
      confidence: "low",
      status: "needs_review",
      sectionId,
      isSensitive,
      suggestedImprovement,
    };
  }

  let confidence: "high" | "medium" | "low" =
    score >= 2 ? "high" : score === 1 ? "medium" : "low";

  const isUncoveredIllness =
    sectionId === "illness" &&
    (trimmed.toLowerCase().includes("pink eye") ||
      trimmed.toLowerCase().includes("pinkeye") ||
      trimmed.toLowerCase().includes("conjunctivitis"));

  if (isUncoveredIllness) {
    confidence = "low";
  }

  if (billingDispute || allergyEscalation) {
    confidence = "medium";
  }

  confidence = capConfidenceForSensitive(confidence, isSensitive);

  let escalated = billingDispute || allergyEscalation;
  let escalationNote: string | undefined;

  if (billingDispute) {
    escalationNote =
      "Billing dispute detected—escalated for staff follow-up per Tuition & Billing handbook.";
  }
  if (allergyEscalation) {
    escalated = true;
    escalationNote =
      "Allergy-related question—must be confirmed by staff per Meals & Nutrition handbook.";
  }

  let answer = buildAnswerFromSection(trimmed, sectionId, section);
  answer = applyAnswerFraming(answer, confidence, isSensitive, section.title);

  if (isSensitive) {
    answer = `${answer}\n\n${SENSITIVE_FOOTER}`;
  }

  if (billingDispute) {
    answer = `${answer}\n\nFor billing disputes, our team will review your account and follow up with you directly.`;
  }

  if (allergyEscalation) {
    answer = `${sensitiveSectionLeadIn("Meals & Nutrition")}allergy and dietary needs are handled individually by our staff.\n\n${SENSITIVE_FOOTER}`;
  }

  const status = resolveStatus(confidence, isSensitive, escalated);

  const finalSuggestion =
    confidence === "low" || status === "needs_review"
      ? getSuggestedImprovement(trimmed, sectionId, confidence, score) ??
        suggestedImprovement
      : suggestedImprovement;

  return {
    question: trimmed,
    answer,
    sourceLabel: section.title,
    confidence,
    status: escalated ? "escalated" : status,
    sectionId,
    isSensitive,
    escalationNote,
    suggestedImprovement: finalSuggestion,
  };
}

export function createQuestionEntry(
  question: string,
  handbookSections: HandbookSection[],
): QuestionLogEntry {
  const partial = generateAnswer(question, handbookSections);
  return {
    ...partial,
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
  };
}

/** Re-run answer generation for an existing log entry using the latest handbook. */
export function refreshQuestionEntry(
  entry: QuestionLogEntry,
  handbookSections: HandbookSection[],
): QuestionLogEntry {
  const regenerated = generateAnswer(entry.question, handbookSections);
  return {
    ...entry,
    answer: regenerated.answer,
    sourceLabel: regenerated.sourceLabel,
    confidence: regenerated.confidence,
    status: regenerated.status,
    sectionId: regenerated.sectionId,
    isSensitive: regenerated.isSensitive,
    escalationNote: regenerated.escalationNote,
    suggestedImprovement: regenerated.suggestedImprovement,
  };
}

export function refreshAnswersForHandbook(
  handbookSections: HandbookSection[],
  questions: QuestionLogEntry[],
  messages: ChatMessage[],
): {
  questions: QuestionLogEntry[];
  messages: ChatMessage[];
} {
  const refresh = (entry: QuestionLogEntry) =>
    refreshQuestionEntry(entry, handbookSections);

  return {
    questions: questions.map(refresh),
    messages: messages.map((msg) =>
      msg.role === "assistant"
        ? { ...msg, entry: refresh(msg.entry) }
        : msg,
    ),
  };
}
