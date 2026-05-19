import type { HTMLAttributes, ReactNode } from "react";

export function Card({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div
      className={`rounded-[22px] border border-bw-border bg-bw-card shadow-bw ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
