"use client";

import { useState } from "react";
import { AppStoreProvider } from "@/hooks/useAppStore";
import { OperatorControlCenter } from "./operator/OperatorControlCenter";
import { GuardianFrontDesk } from "./guardian/GuardianFrontDesk";
import { getInitialTabFromHash, getPageTitle, type TabId } from "@/lib/navigation";
import { Sidebar } from "./sidebar/Sidebar";

function AppContent() {
  const [tab, setTab] = useState<TabId>(getInitialTabFromHash);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  function handleTabChange(next: TabId) {
    setTab(next);
    setMobileNavOpen(false);
    window.history.replaceState(null, "", `#${next}`);
  }

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-white">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-bw-navy focus:shadow-bw"
      >
        Skip to main content
      </a>
      <Sidebar
        activeTab={tab}
        onTabChange={handleTabChange}
        className="hidden md:sticky md:top-0 md:flex"
      />

      {mobileNavOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 cursor-pointer bg-black/40 md:hidden"
          aria-label="Close navigation"
          onClick={() => setMobileNavOpen(false)}
        />
      )}
      <Sidebar
        activeTab={tab}
        onTabChange={handleTabChange}
        className={`fixed inset-y-0 left-0 z-50 transition-transform duration-200 md:hidden ${
          mobileNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-white">
        <div className="flex shrink-0 items-center gap-3 border-b border-white/15 bg-bw-sidebar px-4 py-3 md:hidden">
          <button
            type="button"
            onClick={() => setMobileNavOpen(true)}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl text-white hover:bg-white/10"
            aria-label="Open navigation menu"
            aria-expanded={mobileNavOpen}
            aria-controls="mobile-sidebar"
          >
            <svg
              viewBox="0 0 24 24"
              width={22}
              height={22}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
          <h1 className="text-lg font-bold text-white">{getPageTitle(tab)}</h1>
        </div>

        <main
          id="main-content"
          className={`flex min-h-0 flex-1 flex-col px-4 py-6 sm:px-8 sm:py-8 md:px-10 md:py-10 ${
            tab === "operator" ? "overflow-hidden" : "overflow-y-auto"
          }`}
        >
          <div className="mx-auto mb-6 hidden w-full max-w-5xl shrink-0 md:block">
            <h1 className="text-[32px] font-bold leading-tight text-bw-navy lg:text-[36px]">
              {getPageTitle(tab)}
            </h1>
          </div>
          {tab === "guardian" ? (
            <div className="mx-auto w-full max-w-5xl">
              <GuardianFrontDesk />
            </div>
          ) : (
            <div className="flex min-h-0 flex-1 flex-col">
              <OperatorControlCenter />
            </div>
          )}
        </main>

        <footer className="shrink-0 border-t border-bw-border px-4 py-4 text-center text-[13px] text-bw-muted sm:px-8">
          Prototype only. No real child or family data is used.
        </footer>
      </div>
    </div>
  );
}

export function AppShell() {
  return (
    <AppStoreProvider>
      <AppContent />
    </AppStoreProvider>
  );
}
