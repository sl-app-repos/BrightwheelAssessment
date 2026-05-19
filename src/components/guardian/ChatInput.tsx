"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { useAppStore } from "@/hooks/useAppStore";

export function ChatInput() {
  const { askQuestion } = useAppStore();
  const [value, setValue] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!value.trim()) return;
    askQuestion(value);
    setValue("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 border-t border-bw-border bg-bw-card p-4"
      aria-label="Ask a question"
    >
      <label htmlFor="guardian-question" className="sr-only">
        Your question
      </label>
      <input
        id="guardian-question"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type your question..."
        autoComplete="off"
        className="min-w-0 flex-1 rounded-full border border-bw-border bg-bw-bg px-4 py-2.5 text-[15px] text-bw-navy placeholder:text-bw-muted focus:border-bw-primary focus:outline-none focus:ring-2 focus:ring-bw-primary/20"
      />
      <Button type="submit" className="shrink-0">
        Ask
      </Button>
    </form>
  );
}
