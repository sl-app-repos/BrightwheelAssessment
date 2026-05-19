import type { HandbookSectionId } from "./types";

type MatchResult = {
  sectionId: HandbookSectionId | null;
  score: number;
  isSensitive: boolean;
};

const SENSITIVE_KEYWORDS = [
  "allergy",
  "allergies",
  "injury",
  "injured",
  "custody",
  "emergency",
  "911",
  "epipen",
  "anaphylaxis",
  "legal",
  "lawsuit",
  "restraining",
];

const SENSITIVE_SECTIONS: HandbookSectionId[] = [
  "illness",
  "medication",
  "pickup",
];

const SECTION_KEYWORDS: Record<HandbookSectionId, string[]> = {
  hours: [
    "veterans day",
    "veteran's day",
    "holiday",
    "holidays",
    "closed",
    "close",
    "open",
    "hours",
    "schedule",
    "memorial day",
    "thanksgiving",
    "christmas",
    "labor day",
    "weekend",
  ],
  tuition: [
    "tuition",
    "cost",
    "costs",
    "price",
    "pricing",
    "infant",
    "toddler",
    "preschool",
    "billing",
    "payment",
    "fee",
    "fees",
    "sibling",
    "discount",
    "monthly",
  ],
  illness: [
    "fever",
    "sick",
    "illness",
    "ill",
    "vomit",
    "vomiting",
    "diarrhea",
    "rash",
    "contagious",
    "symptom",
    "symptoms",
    "covid",
    "flu",
    "temperature",
    "100.4",
    "pink eye",
    "pinkeye",
    "conjunctivitis",
    "cold",
    "cough",
  ],
  nutrition: [
    "lunch",
    "meal",
    "meals",
    "forgot lunch",
    "food",
    "snack",
    "breakfast",
    "eat",
    "hungry",
    "sandwich",
    "nutrition",
  ],
  tour: [
    "tour",
    "tours",
    "visit",
    "visiting",
    "enrollment",
    "enroll",
    "waitlist",
    "classroom",
    "spot",
    "opening",
    "schedule a tour",
  ],
  medication: [
    "tylenol",
    "medication",
    "medicine",
    "medicines",
    "ibuprofen",
    "advil",
    "motrin",
    "prescription",
    "dose",
    "dosage",
    "administer",
    "give my child",
  ],
  pickup: [
    "pick up",
    "pickup",
    "pick-up",
    "who can pick",
    "authorized adult",
    "authorized pickup",
    "custody",
    "grandparent",
    "release",
  ],
  behavior: [
    "discipline",
    "behavior",
    "behaviour",
    "punishment",
    "biting",
    "hitting",
    "timeout",
  ],
  special: [
    "special needs",
    "accommodation",
    "accommodations",
    "disability",
    "iep",
    "504",
    "autism",
    "support plan",
  ],
};

function countKeywordHits(text: string, keywords: string[]): number {
  let score = 0;
  for (const kw of keywords) {
    if (text.includes(kw)) score += kw.split(" ").length > 1 ? 2 : 1;
  }
  return score;
}

function detectSensitive(
  text: string,
  sectionId: HandbookSectionId | null,
): boolean {
  if (sectionId && SENSITIVE_SECTIONS.includes(sectionId)) return true;
  return SENSITIVE_KEYWORDS.some((kw) => text.includes(kw));
}

export function matchIntent(question: string): MatchResult {
  const text = question.toLowerCase().trim();

  let bestSectionId: HandbookSectionId | null = null;
  let bestScore = 0;

  for (const [sectionId, keywords] of Object.entries(SECTION_KEYWORDS) as [
    HandbookSectionId,
    string[],
  ][]) {
    const score = countKeywordHits(text, keywords);
    if (score > bestScore) {
      bestScore = score;
      bestSectionId = sectionId;
    }
  }

  const isSensitive = detectSensitive(text, bestSectionId);

  if (bestScore === 0) {
    return { sectionId: null, score: 0, isSensitive };
  }

  return { sectionId: bestSectionId, score: bestScore, isSensitive };
}

export function isBillingDispute(text: string): boolean {
  const lower = text.toLowerCase();
  return (
    lower.includes("billing dispute") ||
    lower.includes("dispute") ||
    lower.includes("overcharged") ||
    lower.includes("wrong charge") ||
    lower.includes("refund")
  );
}

export function isAllergyQuestion(text: string): boolean {
  const lower = text.toLowerCase();
  return lower.includes("allergy") || lower.includes("allergies");
}
