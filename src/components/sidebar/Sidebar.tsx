"use client";

import { CENTER_NAME } from "@/lib/seed";
import type { TabId } from "@/lib/navigation";
import {
  IconBook,
  IconBuilding,
  IconChart,
  IconChat,
  IconDollar,
  IconFolder,
  IconHome,
  IconPeople,
  IconStaff,
  IconSunLogo,
} from "./SidebarIcons";

type NavItem = {
  id: TabId | null;
  label: string;
  icon: React.ReactNode;
  disabled?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { id: null, label: "Home", icon: <IconHome />, disabled: true },
  { id: null, label: "Center", icon: <IconBuilding />, disabled: true },
  { id: "guardian", label: "Guardian Front Desk", icon: <IconChat /> },
  { id: null, label: "Families", icon: <IconPeople />, disabled: true },
  { id: null, label: "Billing", icon: <IconDollar />, disabled: true },
  { id: "operator", label: "Operator Control Center", icon: <IconStaff /> },
  { id: null, label: "Handbook", icon: <IconBook />, disabled: true },
  { id: null, label: "Documents", icon: <IconFolder />, disabled: true },
  { id: null, label: "Reports", icon: <IconChart />, disabled: true },
];

function SidebarNavButton({
  item,
  active,
  onSelect,
}: {
  item: NavItem;
  active: boolean;
  onSelect: () => void;
}) {
  if (item.disabled) {
    return (
      <div
        className="flex w-full items-center gap-3 px-3 py-2 opacity-70"
        aria-hidden
      >
        <span className="shrink-0 text-white">{item.icon}</span>
        <span className="h-2.5 min-w-0 flex-1 rounded-full bg-white/35" />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-current={active ? "page" : undefined}
      className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[14px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 ${
        active
          ? "bg-white text-bw-sidebar shadow-sm"
          : "text-white hover:bg-white/10"
      }`}
    >
      <span className={`shrink-0 ${active ? "text-bw-sidebar" : "text-white"}`}>
        {item.icon}
      </span>
      <span className="min-w-0 flex-1 leading-snug">{item.label}</span>
    </button>
  );
}

export function Sidebar({
  activeTab,
  onTabChange,
  className = "",
}: {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  className?: string;
}) {
  return (
    <aside
      className={`flex h-screen max-h-dvh w-[280px] shrink-0 flex-col overflow-hidden rounded-r-[28px] border-r border-white/15 bg-bw-sidebar py-5 ${className}`}
      aria-label="Main navigation"
    >
      <div className="mb-8 flex shrink-0 items-center gap-2.5 px-4">
        <IconSunLogo className="shrink-0 text-white" />
        <span className="text-[22px] font-semibold tracking-tight text-white lowercase">
          brightstart
        </span>
      </div>

      <nav className="flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto px-4">
        {NAV_ITEMS.map((item) => (
          <SidebarNavButton
            key={item.label}
            item={item}
            active={item.id !== null && item.id === activeTab}
            onSelect={() => item.id && onTabChange(item.id)}
          />
        ))}
      </nav>

      <div className="mt-4 shrink-0 px-4">
        <div className="rounded-2xl bg-bw-sidebar-dark px-3 py-3">
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 text-sm font-bold text-white"
              aria-hidden
            >
              SL
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[14px] font-semibold text-white">
                Simon Lomax
              </p>
              <p className="truncate text-[12px] text-white/75">
                {CENTER_NAME}
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
