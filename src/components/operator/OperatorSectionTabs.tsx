"use client";

import {
  OPERATOR_SECTIONS,
  type OperatorSectionId,
} from "@/lib/operatorSections";

export function OperatorSectionTabs({
  active,
  onChange,
  badges,
}: {
  active: OperatorSectionId;
  onChange: (id: OperatorSectionId) => void;
  badges?: Partial<Record<OperatorSectionId, number>>;
}) {
  return (
    <div
      role="tablist"
      aria-label="Operator dashboard sections"
      className="flex gap-1 overflow-x-auto rounded-2xl border border-bw-border bg-bw-panel/80 p-1 shadow-bw scrollbar-thin"
    >
      {OPERATOR_SECTIONS.map(({ id, label }) => {
        const isActive = active === id;
        const badge = badges?.[id];
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={isActive}
            id={`operator-tab-${id}`}
            aria-controls={`operator-panel-${id}`}
            onClick={() => onChange(id)}
            className={`shrink-0 cursor-pointer rounded-xl px-4 py-2.5 text-[14px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/40 ${
              isActive
                ? "bg-white text-bw-navy shadow-sm"
                : "text-bw-muted hover:bg-white/60 hover:text-bw-navy"
            }`}
          >
            <span className="flex items-center gap-2">
              {label}
              {badge != null && badge > 0 && (
                <span
                  className={`inline-flex min-w-[1.25rem] items-center justify-center rounded-full px-1.5 py-0.5 text-[11px] font-bold ${
                    isActive
                      ? "bg-bw-primary text-white"
                      : "bg-bw-border text-bw-navy"
                  }`}
                >
                  {badge}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
