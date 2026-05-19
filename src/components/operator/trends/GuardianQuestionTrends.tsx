"use client";

import { useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { formatRelativeTime } from "@/lib/formatTime";
import { useAppStore } from "@/hooks/useAppStore";
import { TrendCard } from "./TrendCard";

export function GuardianQuestionTrends() {
  const {
    questionTrends,
    proactiveUpdates,
    lastActionNotice,
    clearActionNotice,
  } = useAppStore();

  useEffect(() => {
    if (!lastActionNotice) return;
    const timer = setTimeout(() => clearActionNotice(), 4000);
    return () => clearTimeout(timer);
  }, [lastActionNotice, clearActionNotice]);

  const recentUpdates = [...proactiveUpdates]
    .sort((a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime())
    .slice(0, 5);

  return (
    <section aria-labelledby="guardian-question-trends-heading">
      <h2
        id="guardian-question-trends-heading"
        className="text-section-title text-2xl"
      >
        Guardian Question Trends
      </h2>
      <p className="mt-1 text-[15px] text-bw-muted">
        Repeated questions reveal where guardians may need clearer communication.
      </p>

      {lastActionNotice && (
        <div
          className="mt-4 rounded-2xl border border-[#ABEFC6] bg-[#E8F8EF] px-4 py-3 text-[14px] text-[#0E6B3A]"
          role="status"
        >
          {lastActionNotice}
        </div>
      )}

      {questionTrends.length === 0 ? (
        <Card className="mt-5 p-6 text-center text-[15px] text-bw-muted">
          No strong trends yet. Guardian questions will appear here once a topic
          repeats often enough, or reset demo data to see sample trends.
        </Card>
      ) : (
        <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {questionTrends.map((trend) => (
            <TrendCard key={trend.sectionId} trend={trend} />
          ))}
        </div>
      )}

      {recentUpdates.length > 0 && (
        <div className="mt-8">
          <h3 className="text-card-title text-lg text-bw-navy">
            Recent proactive updates
          </h3>
          <ul className="mt-3 space-y-2">
            {recentUpdates.map((update) => (
              <li
                key={update.id}
                className="rounded-2xl border border-bw-border bg-bw-panel px-4 py-3"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="text-[14px] font-semibold text-bw-navy">
                    {update.title}
                  </span>
                  <span className="text-[12px] text-bw-muted">
                    {formatRelativeTime(update.sentAt)}
                  </span>
                </div>
                <p className="mt-1 line-clamp-2 text-[13px] text-bw-body">
                  {update.message}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
