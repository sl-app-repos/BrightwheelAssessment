"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { useAppStore } from "@/hooks/useAppStore";
import type { OperatorSectionId } from "@/lib/operatorSections";
import { MetricsRow } from "./MetricsRow";
import { OperatorSectionTabs } from "./OperatorSectionTabs";
import { GuardianQuestionTrends } from "./trends/GuardianQuestionTrends";
import { NeedsReview } from "./NeedsReview";
import { PolicyCard } from "./PolicyCard";
import { RecentQuestions } from "./RecentQuestions";
import { TrustRulesPanel } from "./TrustRulesPanel";

const SECTION_IDS: OperatorSectionId[] = [
  "activity",
  "handbook",
  "trends",
  "trust",
];

export function OperatorControlCenter() {
  const {
    handbookSections,
    focusSectionId,
    handbookEditRequestId,
    resetDemo,
    clearHandbookFocus,
    needsReview,
    operatorSection,
    setOperatorSection,
  } = useAppStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!focusSectionId || operatorSection !== "handbook") return;
    const timer = window.setTimeout(() => {
      const panel = scrollRef.current;
      const card = document.querySelector(
        `[data-handbook-section="${focusSectionId}"]`,
      );
      if (!panel || !card) return;
      const panelTop = panel.getBoundingClientRect().top;
      const cardTop = card.getBoundingClientRect().top;
      panel.scrollBy({
        top: cardTop - panelTop - 16,
        behavior: "smooth",
      });
    }, 0);
    return () => window.clearTimeout(timer);
  }, [focusSectionId, operatorSection, handbookEditRequestId]);

  return (
    <div className="mx-auto flex min-h-0 flex-1 w-full max-w-5xl flex-col">
      <header className="shrink-0 space-y-6 border-b border-bw-border bg-white pb-4">
        <MetricsRow />
        <OperatorSectionTabs
          active={operatorSection}
          onChange={setOperatorSection}
          badges={{ activity: needsReview.length }}
        />
      </header>

      <div
        ref={scrollRef}
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain pt-6"
      >
        {SECTION_IDS.map((sectionId) => (
          <section
            key={sectionId}
            id={`operator-panel-${sectionId}`}
            role="tabpanel"
            aria-labelledby={`operator-tab-${sectionId}`}
            hidden={operatorSection !== sectionId}
            className={operatorSection !== sectionId ? "hidden" : undefined}
          >
            {sectionId === "trends" && <GuardianQuestionTrends />}

            {sectionId === "handbook" && (
              <div id="source-of-truth">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-section-title">Source of Truth</h2>
                    <p className="mt-1 text-[15px] text-bw-muted">
                      Family Handbook
                    </p>
                  </div>
                  {focusSectionId && (
                    <Button
                      variant="ghost"
                      className="text-[13px]"
                      onClick={clearHandbookFocus}
                    >
                      Clear highlight
                    </Button>
                  )}
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  {handbookSections.map((s) => (
                    <PolicyCard
                      key={
                        focusSectionId === s.id
                          ? `${s.id}-${handbookEditRequestId}`
                          : s.id
                      }
                      section={s}
                      highlight={focusSectionId === s.id}
                      initialEditing={focusSectionId === s.id}
                    />
                  ))}
                </div>
              </div>
            )}

            {sectionId === "activity" && (
              <div className="grid gap-8 lg:grid-cols-2">
                <RecentQuestions />
                <NeedsReview />
              </div>
            )}

            {sectionId === "trust" && <TrustRulesPanel />}
          </section>
        ))}

        <p className="mt-8 pb-2 text-center">
          <button
            type="button"
            onClick={resetDemo}
            className="cursor-pointer text-[13px] text-bw-muted underline-offset-2 hover:text-bw-primary hover:underline"
          >
            Reset demo data
          </button>
        </p>
      </div>
    </div>
  );
}
