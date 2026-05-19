import {
  getSeedProactiveUpdates,
  getSeedQuestionHistory,
} from "./seedQuestionHistory";
import type { AppState, HandbookSection } from "./types";

const today = new Date().toISOString().split("T")[0];

export const CENTER_NAME = "Little Sprouts Learning Center";

export const CENTER_INTRO =
  "Ask about our family handbook — hours, tuition, health, meals, tours, pickup, and more.";

export const QUICK_CHIPS = [
  "Are you open on Veterans Day?",
  "What is infant tuition?",
  "My child has a fever",
  "I forgot lunch",
  "How do I schedule a tour?",
  "Can you give my child Tylenol?",
  "Who can pick up my child?",
  "My child has a rash",
] as const;

export const seedHandbookSections: HandbookSection[] = [
  {
    id: "hours",
    title: "Hours & Holidays",
    handbookCategory: "Operations",
    lastUpdated: today,
    body: `Open Monday–Friday, 7:30 AM–6:00 PM.

Closed on Veterans Day and major federal holidays (New Year's Day, Memorial Day, Independence Day, Labor Day, Thanksgiving, Christmas).

Early closure notifications appear through app notifications.`,
  },
  {
    id: "illness",
    title: "Health & Illness",
    handbookCategory: "Health",
    lastUpdated: today,
    body: `Children with fever ≥100.4°F may not attend.

Child must be fever-free for 24 hours without medication before returning.

Vomiting or diarrhea within the previous 24 hours requires exclusion.

Unexplained rash requires staff review.

Severe symptoms should contact a healthcare provider.`,
  },
  {
    id: "medication",
    title: "Medication Administration",
    handbookCategory: "Health",
    lastUpdated: today,
    body: `Written guardian authorization required for all medication.

Medication must remain in original packaging.

Staff cannot administer medication without authorization.

Medication questions should recommend staff confirmation.`,
  },
  {
    id: "pickup",
    title: "Authorized Pickup & Custody",
    handbookCategory: "Safety",
    lastUpdated: today,
    body: `Children are released only to authorized adults listed on the enrollment form.

Custody restrictions require legal documentation on file.

Identity verification may be requested at pickup.`,
  },
  {
    id: "nutrition",
    title: "Meals & Nutrition",
    handbookCategory: "Daily Care",
    lastUpdated: today,
    body: `Families normally provide lunch.

Emergency lunch is available if supplies allow.

Today's lunch:
• Turkey sandwich
• Fruit cup
• Carrots
• Milk

Allergy questions should escalate to staff.`,
  },
  {
    id: "tuition",
    title: "Tuition & Billing",
    handbookCategory: "Enrollment",
    lastUpdated: today,
    body: `Infant: $1,650/month
Toddler: $1,420/month
Preschool: $1,250/month
Sibling discount: 10% off the lower tuition

Billing disputes require staff assistance.`,
  },
  {
    id: "tour",
    title: "Tours & Enrollment",
    handbookCategory: "Enrollment",
    lastUpdated: today,
    body: `Tours available Tuesday–Thursday, 9:30–11:30 AM.

Guardians may request a tour by calling the center or completing a tour request form.

Enrollment availability varies by classroom and should be confirmed by staff.`,
  },
  {
    id: "behavior",
    title: "Guidance & Discipline",
    handbookCategory: "Policies",
    lastUpdated: today,
    body: `Positive reinforcement is preferred.

Physical punishment is prohibited.

Guardians are contacted for recurring behavioral concerns.`,
  },
  {
    id: "special",
    title: "Special Needs & Circumstances",
    handbookCategory: "Policies",
    lastUpdated: today,
    body: `Individual accommodations are supported.

Staff collaborate with families on support plans.

Contact the director to discuss specific needs.`,
  },
];

export function getSeedState(): AppState {
  return {
    handbookSections: seedHandbookSections.map((s) => ({ ...s })),
    questions: getSeedQuestionHistory(),
    messages: [],
    proactiveUpdates: getSeedProactiveUpdates(),
  };
}
