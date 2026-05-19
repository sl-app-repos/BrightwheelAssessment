import type { Confidence, HandbookSectionId } from "./types";

const KEYWORD_SUGGESTIONS: { keywords: string[]; suggestion: string }[] = [
  {
    keywords: ["pink eye", "pinkeye", "conjunctivitis"],
    suggestion: "Add contagious illness guidance (e.g., pink eye, strep, lice)",
  },
  {
    keywords: ["strep", "lice", "hand foot", "hfmd", "chickenpox"],
    suggestion: "Add contagious illness exclusion criteria",
  },
  {
    keywords: ["covid", "flu", "rsv"],
    suggestion: "Add respiratory illness return-to-care guidance",
  },
  {
    keywords: ["grandparent", "aunt", "uncle", "neighbor"],
    suggestion: "Add examples of adding temporary authorized pickup adults",
  },
  {
    keywords: ["divorce", "restraining", "court order"],
    suggestion: "Add custody change and legal documentation workflow",
  },
  {
    keywords: ["potty", "toilet", "accident"],
    suggestion: "Add toileting and accident policy to Daily Care handbook",
  },
  {
    keywords: ["nap", "sleep", "rest"],
    suggestion: "Add rest time and sleep routine guidance",
  },
];

const SECTION_DEFAULTS: Partial<Record<HandbookSectionId, string>> = {
  illness: "Expand illness exclusions and contagious condition examples",
  medication: "Add medication timing and storage examples",
  pickup: "Add scenario examples for custody and pickup changes",
  nutrition: "Add allergy and dietary restriction handling steps",
  tuition: "Add billing timeline and payment method details",
  tour: "Add waitlist and classroom age cutoff information",
  behavior: "Add age-specific guidance strategies",
  special: "Add examples of common accommodations",
  hours: "Add inclement weather and emergency closure procedures",
};

export function getSuggestedImprovement(
  question: string,
  sectionId: HandbookSectionId | null,
  confidence: Confidence,
  score: number,
): string | undefined {
  if (confidence !== "low" && score >= 2) return undefined;

  const text = question.toLowerCase();

  for (const { keywords, suggestion } of KEYWORD_SUGGESTIONS) {
    if (keywords.some((kw) => text.includes(kw))) return suggestion;
  }

  if (sectionId && (confidence === "low" || score === 1)) {
    return (
      SECTION_DEFAULTS[sectionId] ??
      `Expand the ${sectionId} handbook section with more specific guidance`
    );
  }

  if (!sectionId) {
    return "Consider adding a handbook section for this topic";
  }

  return undefined;
}
