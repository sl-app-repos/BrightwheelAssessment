"use client";

import { CENTER_INTRO, CENTER_NAME } from "@/lib/seed";
import { ChatInput } from "./ChatInput";
import { ChatWindow } from "./ChatWindow";
import { QuickChips } from "./QuickChips";

export function GuardianFrontDesk() {
  return (
    <div className="mx-auto w-full max-w-md">
      <header className="mb-6 text-center">
        <h2 className="text-card-title text-xl sm:text-[22px]">{CENTER_NAME}</h2>
        <p className="mt-2 text-body text-[15px] text-bw-body sm:text-[16px]">
          {CENTER_INTRO}
        </p>
      </header>

      <section className="mb-5" aria-labelledby="quick-questions-heading">
        <p id="quick-questions-heading" className="text-label mb-3">
          Quick questions
        </p>
        <QuickChips />
      </section>

      <section aria-label="AI Front Desk chat">
        <div className="overflow-hidden rounded-[30px] border border-bw-border bg-bw-card shadow-bw">
          <ChatWindow />
          <ChatInput />
        </div>
      </section>
    </div>
  );
}
