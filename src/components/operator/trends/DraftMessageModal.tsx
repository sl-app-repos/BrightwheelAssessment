"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import type { HandbookSectionId, ProactiveUpdateType } from "@/lib/types";
import { useAppStore } from "@/hooks/useAppStore";

export function DraftMessageModal({
  open,
  draftTitle,
  initialMessage,
  sectionId,
  type,
  onClose,
}: {
  open: boolean;
  draftTitle: string;
  initialMessage: string;
  sectionId: HandbookSectionId | null;
  type: ProactiveUpdateType;
  onClose: () => void;
}) {
  const { markProactiveSent } = useAppStore();
  const [message, setMessage] = useState(initialMessage);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (open) {
      setMessage(initialMessage);
      setCopied(false);
    }
  }, [open, initialMessage]);

  if (!open) return null;

  async function handleCopy() {
    await navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleMarkSent() {
    markProactiveSent(draftTitle, message, sectionId, type);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="draft-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 cursor-pointer bg-black/40"
        aria-label="Close dialog"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-lg rounded-[22px] border border-bw-border bg-white p-6 shadow-bw">
        <h3
          id="draft-modal-title"
          className="text-card-title text-xl text-bw-navy"
        >
          Draft Guardian Update
        </h3>
        <p className="mt-1 text-[14px] text-bw-muted">{draftTitle}</p>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={10}
          className="mt-4 w-full resize-y rounded-2xl border border-bw-border bg-bw-bg px-3 py-2.5 text-[15px] leading-relaxed text-bw-navy focus:border-bw-primary focus:outline-none focus:ring-2 focus:ring-bw-primary/20"
        />
        <div className="mt-4 flex flex-wrap gap-2">
          <Button type="button" variant="secondary" onClick={handleCopy}>
            {copied ? "Copied" : "Copy message"}
          </Button>
          <Button type="button" onClick={handleMarkSent}>
            Mark as sent
          </Button>
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
