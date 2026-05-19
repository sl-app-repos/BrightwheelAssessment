"use client";

import { Card } from "@/components/ui/Card";
import { useAppStore } from "@/hooks/useAppStore";

const METRIC_CONFIG = [
  { key: "questionsToday" as const, label: "Questions today" },
  { key: "answeredConfidently" as const, label: "Answered confidently" },
  { key: "needsReview" as const, label: "Needs review" },
  { key: "escalated" as const, label: "Escalated" },
];

export function MetricsRow() {
  const { metrics } = useAppStore();

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {METRIC_CONFIG.map(({ key, label }) => (
        <Card key={key} className="p-5">
          <p className="text-3xl font-bold tracking-tight text-bw-navy">
            {metrics[key]}
          </p>
          <p className="mt-1 text-[13px] font-medium text-bw-muted">{label}</p>
        </Card>
      ))}
    </div>
  );
}
