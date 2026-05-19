"use client";

import {
  ConfidenceBadge,
  HandbookSourceBadge,
  StatusBadge,
} from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { formatRelativeTime } from "@/lib/formatTime";
import { useAppStore } from "@/hooks/useAppStore";

export function RecentQuestions() {
  const { questions } = useAppStore();

  return (
    <section>
      <h2 className="text-section-title mb-4 text-2xl">Recent Questions</h2>
      <Card className="overflow-hidden p-0">
        {questions.length === 0 ? (
          <p className="p-8 text-center text-[15px] text-bw-muted">
            No questions yet. Questions from the Guardian Front Desk will appear
            here.
          </p>
        ) : (
          <ul className="divide-y divide-bw-border">
            {questions.slice(0, 20).map((q) => (
              <li key={q.id} className="p-5">
                <p className="text-[15px] font-semibold text-bw-navy">
                  {q.question}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <StatusBadge status={q.status} />
                  <ConfidenceBadge level={q.confidence} />
                  {q.sourceLabel && (
                    <HandbookSourceBadge label={q.sourceLabel} />
                  )}
                  <span className="text-[13px] text-bw-muted">
                    {formatRelativeTime(q.timestamp)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </section>
  );
}
