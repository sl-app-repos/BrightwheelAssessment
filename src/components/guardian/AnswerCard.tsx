import type { QuestionLogEntry } from "@/lib/types";

export function AnswerCard({ entry }: { entry: QuestionLogEntry }) {
  return (
    <article
      className="max-w-[95%] rounded-[22px] border border-bw-border bg-bw-card p-4 shadow-bw sm:p-5"
      aria-label="AI Front Desk response"
    >
      <header className="mb-3 flex items-center gap-2.5">
        <span
          className="flex h-8 w-8 items-center justify-center rounded-full bg-bw-primary text-xs font-bold text-white"
          aria-hidden
        >
          AI
        </span>
        <span className="text-[15px] font-semibold text-bw-navy">
          AI Front Desk
        </span>
      </header>
      <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-bw-body sm:text-[16px]">
        {entry.answer}
      </p>
    </article>
  );
}
