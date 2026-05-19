import type { Confidence, QuestionStatus } from "@/lib/types";

const confidenceStyles: Record<Confidence, string> = {
  high: "bg-[#E8F8EF] text-[#0E9F5A] border-[#ABEFC6]",
  medium: "bg-[#FFF4E5] text-[#B54708] border-[#FEDF89]",
  low: "bg-[#FEECEB] text-[#B42318] border-[#FECDCA]",
};

const statusStyles: Record<QuestionStatus, string> = {
  answered: "bg-[#E8F8EF] text-[#0E9F5A] border-[#ABEFC6]",
  escalated: "bg-[#FFF4E5] text-[#B54708] border-[#FEDF89]",
  needs_review: "bg-[#FEECEB] text-[#B42318] border-[#FECDCA]",
};

const badgeBase =
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[12px] font-semibold leading-tight";

export function ConfidenceBadge({ level }: { level: Confidence }) {
  const label =
    level === "high" ? "High" : level === "medium" ? "Medium" : "Low";
  return (
    <span
      className={`${badgeBase} ${confidenceStyles[level]}`}
      aria-label={`${label} confidence`}
    >
      {label} confidence
    </span>
  );
}

export function StatusBadge({ status }: { status: QuestionStatus }) {
  const label =
    status === "answered"
      ? "Answered"
      : status === "escalated"
        ? "Escalated"
        : "Needs Review";
  return (
    <span
      className={`${badgeBase} ${statusStyles[status]}`}
      aria-label={`Status: ${label}`}
    >
      {label}
    </span>
  );
}

export function CategoryBadge({ label }: { label: string }) {
  return (
    <span
      className={`${badgeBase} border-bw-border bg-bw-panel text-bw-primary`}
      aria-label={`Category: ${label}`}
    >
      {label}
    </span>
  );
}

export function HandbookSourceBadge({ label }: { label: string }) {
  return (
    <span
      className={`${badgeBase} border-bw-border bg-bw-panel text-bw-primary`}
      aria-label={`Handbook section: ${label}`}
    >
      {label}
    </span>
  );
}
