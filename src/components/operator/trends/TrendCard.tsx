"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getDraftForTrend } from "@/lib/proactiveMessages";
import type { QuestionTrend } from "@/lib/types";
import { useAppStore } from "@/hooks/useAppStore";
import { DraftMessageModal } from "./DraftMessageModal";

function TrendBadge({ label }: { label: string }) {
  const lower = label.toLowerCase();
  let styles = "bg-bw-panel text-bw-primary border-bw-border";
  if (lower.includes("recurring") || lower === "steady") {
    styles = "bg-bw-panel text-bw-primary border-bw-border";
  } else if (label.startsWith("+")) {
    styles = "bg-[#FFF4E5] text-[#B54708] border-[#FEDF89]";
  } else if (lower === "new" || lower === "rising") {
    styles = "bg-[#E8F8EF] text-[#0E9F5A] border-[#ABEFC6]";
  }
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-0.5 text-[12px] font-semibold ${styles}`}
    >
      Trend: {label}
    </span>
  );
}

function actionButtonLabel(actionType: QuestionTrend["actionType"]): string {
  switch (actionType) {
    case "draft_reminder":
      return "Draft reminder";
    case "draft_update":
      return "Draft update";
    case "improve_handbook":
      return "Add suggested guidance";
  }
}

export function TrendCard({ trend }: { trend: QuestionTrend }) {
  const { appendHandbookGuidance, requestHandbookEdit } = useAppStore();
  const [modalOpen, setModalOpen] = useState(false);

  function handleAction() {
    if (trend.actionType === "improve_handbook") {
      if (trend.handbookAppendText) {
        appendHandbookGuidance(trend.sectionId, trend.handbookAppendText);
      }
      requestHandbookEdit(trend.sectionId);
      return;
    }
    setModalOpen(true);
  }

  const draft = getDraftForTrend(trend);
  const proactiveType =
    trend.actionType === "draft_reminder" ? "reminder" : "update";

  return (
    <>
      <Card className="flex h-full flex-col p-5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h3 className="text-card-title text-lg">{trend.title}</h3>
          <TrendBadge label={trend.trendLabel} />
        </div>
        <p className="mt-3 text-[15px] font-semibold text-bw-navy">
          {trend.countThisWeek} questions this week
        </p>
        <p className="mt-2 text-[14px] text-bw-body">
          <span className="font-medium text-bw-navy">Signal:</span>{" "}
          {trend.signal}
        </p>
        <p className="mt-1 text-[14px] text-bw-body">
          <span className="font-medium text-bw-navy">Suggested action:</span>{" "}
          {trend.suggestedAction}
        </p>
        {trend.commonQuestions.length > 0 && (
          <div className="mt-3">
            <p className="text-[13px] font-semibold text-bw-muted">
              Common questions:
            </p>
            <ul className="mt-1 list-inside list-disc space-y-0.5 text-[14px] text-bw-body">
              {trend.commonQuestions.map((q) => (
                <li key={q} className="leading-snug">
                  &ldquo;{q}&rdquo;
                </li>
              ))}
            </ul>
          </div>
        )}
        {trend.actionType === "improve_handbook" && trend.handbookAppendText && (
          <p className="mt-3 rounded-2xl bg-bw-yellow px-3 py-2 text-[13px] leading-snug text-[#7A5C00]">
            <span className="font-semibold">Suggested handbook improvement:</span>{" "}
            Add clearer examples of contagious symptoms and return-to-care
            requirements.
          </p>
        )}
        <div className="mt-4 flex-1" />
        <Button
          type="button"
          className="mt-2 w-full sm:w-auto"
          onClick={handleAction}
        >
          {actionButtonLabel(trend.actionType)}
        </Button>
      </Card>

      <DraftMessageModal
        open={modalOpen}
        draftTitle={draft.title}
        initialMessage={draft.message}
        sectionId={trend.sectionId}
        type={proactiveType}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
