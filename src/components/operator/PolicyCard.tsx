"use client";

import { useEffect, useRef, useState } from "react";
import { CategoryBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { formatDate } from "@/lib/formatTime";
import type { HandbookSection } from "@/lib/types";
import { useAppStore } from "@/hooks/useAppStore";
import { PolicyEditor } from "./PolicyEditor";

export function PolicyCard({
  section,
  highlight,
  initialEditing = false,
}: {
  section: HandbookSection;
  highlight?: boolean;
  initialEditing?: boolean;
}) {
  const { updateHandbookSection } = useAppStore();
  const [editing, setEditing] = useState(initialEditing);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!initialEditing) return;
    setEditing(true);
    const frame = requestAnimationFrame(() => {
      ref.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
    return () => cancelAnimationFrame(frame);
  }, [initialEditing]);

  return (
    <div ref={ref} data-handbook-section={section.id}>
      <Card
        className={`p-5 transition-shadow ${highlight ? "ring-2 ring-bw-primary ring-offset-2" : ""}`}
        aria-labelledby={`handbook-section-title-${section.id}`}
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3
              id={`handbook-section-title-${section.id}`}
              className="text-card-title"
            >
              {section.title}
            </h3>
            <div className="mt-2">
              <CategoryBadge label={section.handbookCategory} />
            </div>
          </div>
          {!editing && (
            <Button
              variant="secondary"
              aria-label={`Edit ${section.title} handbook section`}
              onClick={() => setEditing(true)}
            >
              Edit
            </Button>
          )}
        </div>
        {!editing && (
          <>
            <p className="mt-4 line-clamp-4 whitespace-pre-wrap text-[15px] leading-relaxed text-bw-body">
              {section.body}
            </p>
            <p className="mt-3 text-[13px] text-bw-muted">
              Last updated {formatDate(section.lastUpdated)}
            </p>
          </>
        )}
        {editing && (
          <PolicyEditor
            section={section}
            onSave={(body) => {
              updateHandbookSection(section.id, body);
              setEditing(false);
            }}
            onCancel={() => setEditing(false)}
          />
        )}
      </Card>
    </div>
  );
}
