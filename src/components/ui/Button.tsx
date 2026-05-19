import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-bw-primary text-white hover:bg-bw-primary-hover focus-visible:ring-bw-primary",
  secondary:
    "bg-bw-card text-bw-navy border border-bw-border hover:bg-bw-panel focus-visible:ring-bw-primary",
  ghost:
    "bg-transparent text-bw-primary hover:bg-bw-panel focus-visible:ring-bw-primary",
};

export function Button({
  children,
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: Variant;
}) {
  return (
    <button
      type={type}
      className={`inline-flex cursor-pointer items-center justify-center rounded-full px-5 py-2.5 text-[15px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
