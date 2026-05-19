"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import type { HandbookSection } from "@/lib/types";

export function PolicyEditor({
  section,
  onSave,
  onCancel,
}: {
  section: HandbookSection;
  onSave: (body: string) => void;
  onCancel: () => void;
}) {
  const [body, setBody] = useState(section.body);

  return (
    <div className="mt-4 space-y-3 rounded-[20px] border border-bw-border bg-bw-panel p-4">
      <label
        htmlFor={`handbook-edit-${section.id}`}
        className="text-[13px] font-semibold text-bw-muted"
      >
        Handbook content
      </label>
      <textarea
        id={`handbook-edit-${section.id}`}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={8}
        className="w-full rounded-2xl border border-bw-border bg-bw-card px-3 py-2.5 text-[15px] text-bw-navy focus:border-bw-primary focus:outline-none focus:ring-2 focus:ring-bw-primary/20"
      />
      <div className="flex gap-2">
        <Button type="button" onClick={() => onSave(body)}>
          Save
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
