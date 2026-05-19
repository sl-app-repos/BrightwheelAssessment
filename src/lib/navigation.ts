export type TabId = "guardian" | "operator";

const PAGE_TITLES: Record<TabId, string> = {
  guardian: "Guardian Front Desk",
  operator: "Operator Control Center",
};

export function getPageTitle(tab: TabId): string {
  return PAGE_TITLES[tab];
}

export function getInitialTabFromHash(): TabId {
  if (typeof window === "undefined") return "guardian";
  const hash = window.location.hash.replace("#", "");
  if (hash === "operator") return "operator";
  return "guardian";
}
