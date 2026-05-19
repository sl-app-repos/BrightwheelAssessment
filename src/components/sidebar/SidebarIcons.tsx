import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconHome(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={22} height={22} aria-hidden {...props}>
      <path {...strokeProps} d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5z" />
    </svg>
  );
}

export function IconBuilding(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={22} height={22} aria-hidden {...props}>
      <path {...strokeProps} d="M5 20V6l7-3 7 3v14M9 20v-4h6v4M9 12h.01M15 12h.01M9 16h.01M15 16h.01" />
    </svg>
  );
}

export function IconChat(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={22} height={22} aria-hidden {...props}>
      <path
        {...strokeProps}
        d="M6 8.5h12M6 12h8M6 18l-2 2V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H8l-2 2z"
      />
    </svg>
  );
}

export function IconPeople(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={22} height={22} aria-hidden {...props}>
      <path
        {...strokeProps}
        d="M16 19v-1a4 4 0 0 0-8 0v1M12 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM20 19v-1a3 3 0 0 0-2-2.83M4 19v-1a3 3 0 0 1 2-2.83"
      />
    </svg>
  );
}

export function IconDollar(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={22} height={22} aria-hidden {...props}>
      <path
        {...strokeProps}
        d="M12 3v18M15.5 7.5A3.5 3.5 0 1 0 8.5 7.5M15.5 16.5a3.5 3.5 0 1 1-7 0"
      />
    </svg>
  );
}

export function IconStaff(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={22} height={22} aria-hidden {...props}>
      <path
        {...strokeProps}
        d="M12 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM5 20v-1a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v1M18 8.5V6M18 11v-1"
      />
    </svg>
  );
}

export function IconBook(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={22} height={22} aria-hidden {...props}>
      <path
        {...strokeProps}
        d="M5 5.5A2.5 2.5 0 0 1 7.5 3H18v16H7.5A2.5 2.5 0 0 0 5 21.5V5.5zM5 5.5V19"
      />
    </svg>
  );
}

export function IconFolder(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={22} height={22} aria-hidden {...props}>
      <path
        {...strokeProps}
        d="M4 8.5V19a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9.5a1 1 0 0 0-1-1h-5l-1.5-2H5a1 1 0 0 0-1 1v1.5z"
      />
    </svg>
  );
}

export function IconChart(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={22} height={22} aria-hidden {...props}>
      <path {...strokeProps} d="M5 19V9M12 19V5M19 19v-6" />
    </svg>
  );
}

export function IconSunLogo(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={26} height={26} aria-hidden {...props}>
      <circle cx="12" cy="12" r="3.5" fill="currentColor" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <line
          key={deg}
          x1="12"
          y1="12"
          x2="12"
          y2="4"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          transform={`rotate(${deg} 12 12)`}
        />
      ))}
    </svg>
  );
}
