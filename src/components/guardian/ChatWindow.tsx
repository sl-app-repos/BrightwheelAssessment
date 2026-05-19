"use client";

import { useEffect, useRef } from "react";
import { useAppStore } from "@/hooks/useAppStore";
import { AnswerCard } from "./AnswerCard";
import { MessageBubble } from "./MessageBubble";

const CHAT_HEIGHT = "h-[28rem]";

export function ChatWindow() {
  const { messages, mounted } = useAppStore();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!mounted) {
    return (
      <div
        className={`flex ${CHAT_HEIGHT} items-center justify-center text-[15px] text-bw-muted`}
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        Loading conversation…
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div
        className={`flex ${CHAT_HEIGHT} flex-col items-center justify-center gap-3 bg-bw-panel/40 px-6 text-center`}
        role="status"
      >
        <p className="text-[16px] font-semibold text-bw-navy">
          Welcome to the AI Front Desk
        </p>
        <p className="max-w-xs text-[15px] leading-relaxed text-bw-muted">
          Tap a quick question above or type your own. We&apos;ll answer from
          our family handbook when we can.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`flex ${CHAT_HEIGHT} flex-col gap-4 overflow-y-auto bg-bw-bg/50 p-4 sm:p-5`}
      role="log"
      aria-live="polite"
      aria-relevant="additions"
      aria-label="Chat conversation"
    >
      {messages.map((msg) =>
        msg.role === "guardian" ? (
          <MessageBubble key={msg.id} text={msg.text} />
        ) : (
          <AnswerCard key={msg.id} entry={msg.entry} />
        ),
      )}
      <div ref={bottomRef} aria-hidden />
    </div>
  );
}
