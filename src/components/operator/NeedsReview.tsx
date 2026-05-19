"use client";

import { ConfidenceBadge, StatusBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { formatRelativeTime } from "@/lib/formatTime";
import { useAppStore } from "@/hooks/useAppStore";

function sectionTitleForEntry(
  sourceLabel: string | null,
  handbookSections: { id: string; title: string }[],
  sectionId: string | null,
): string | null {
  if (sourceLabel) return sourceLabel;
  if (!sectionId) return null;
  return handbookSections.find((s) => s.id === sectionId)?.title ?? null;
}

export function NeedsReview() {
  const { needsReview, handbookSections, requestHandbookEdit } = useAppStore();

  function handleImprove(sectionId: (typeof needsReview)[0]["sectionId"]) {
    if (sectionId) requestHandbookEdit(sectionId);
  }

  return (
    <section>
      <h2 className="text-section-title mb-4 text-2xl">Needs Review</h2>
      <Card className="overflow-hidden p-0">
        {needsReview.length === 0 ? (
          <p className="p-8 text-center text-[15px] text-bw-muted">
            All caught up — no questions need staff attention right now.
          </p>
        ) : (
          <ul className="divide-y divide-bw-border">
            {needsReview.map((q) => {
              const matchedSection = sectionTitleForEntry(
                q.sourceLabel,
                handbookSections,
                q.sectionId,
              );
              return (
                <li key={q.id} className="p-5">
                  <p className="text-[15px] font-semibold text-bw-navy">
                    {q.question}
                  </p>
                  <p className="mt-1 line-clamp-2 text-[14px] text-bw-muted">
                    {q.answer}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <StatusBadge status={q.status} />
                    <ConfidenceBadge level={q.confidence} />
                    <span className="text-[13px] text-bw-muted">
                      {formatRelativeTime(q.timestamp)}
                    </span>
                  </div>
                  {matchedSection && (
                    <p className="mt-3 text-[14px] text-bw-body">
                      <span className="font-semibold text-bw-navy">
                        Matched section:
                      </span>{" "}
                      {matchedSection}
                    </p>
                  )}
                  {q.suggestedImprovement && (
                    <p className="mt-2 rounded-2xl bg-bw-yellow px-3 py-2.5 text-[13px] leading-snug text-[#7A5C00]">
                      <span className="font-semibold">Suggested improvement:</span>{" "}
                      {q.suggestedImprovement}
                    </p>
                  )}
                  <Button
                    variant="ghost"
                    className="mt-3 text-[13px]"
                    onClick={() => handleImprove(q.sectionId)}
                  >
                    Improve handbook section
                  </Button>
                </li>
              );
            })}
          </ul>
        )}
      </Card>
    </section>
  );
}
