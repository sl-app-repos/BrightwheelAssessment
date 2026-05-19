"use client";

import { QUICK_CHIPS } from "@/lib/seed";
import { useAppStore } from "@/hooks/useAppStore";

export function QuickChips() {
  const { askQuestion } = useAppStore();

  return (
    <div
      role="group"
      aria-label="Suggested questions"
      className="flex flex-wrap gap-2"
    >
      {QUICK_CHIPS.map((chip) => (
        <button
          key={chip}
          type="button"
          onClick={() => askQuestion(chip)}
          className="cursor-pointer rounded-full border border-bw-border bg-bw-panel px-3.5 py-2 text-left text-[13px] font-semibold leading-snug text-bw-primary transition-colors hover:border-bw-primary/30 hover:bg-[#dceeff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary"
        >
          {chip}
        </button>
      ))}
    </div>
  );
}
