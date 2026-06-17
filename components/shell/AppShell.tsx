"use client";

import { LayoutProvider, useLayout } from "@/lib/layout-context";
import type { Version } from "@/lib/nav-config";
import GlobalNav from "./GlobalNav";
import SideNav from "./SideNav";
import ContentArea from "./ContentArea";
import RightPanel from "./RightPanel";
import GenerateDescriptionsModal from "./GenerateDescriptionsModal";
import Toast from "./Toast";

/**
 * Three-column application shell.
 *
 *   ┌───────────────────────────────────────────┐
 *   │ GlobalNav (64px)                            │
 *   ├──────────┬──────────────────────┬──────────┤
 *   │ SideNav  │ ContentArea (flex-1) │ RightPanel│
 *   │ 233/64px │                      │ 400/450px │
 *   └──────────┴──────────────────────┴──────────┘
 *
 * Widths and interaction rules live in lib/layout-context.tsx.
 */
const VERSIONS: [Version, string][] = [
  ["A", "A · Workflow driven"],
  ["B", "B · Product line driven"],
];

function VersionBar() {
  const { version, switchVersion } = useLayout();
  return (
    <div className="flex h-10 flex-shrink-0 items-center justify-center gap-2 bg-black text-white">
      <span className="text-body-sm text-white/50">Prototype version</span>
      <div className="flex items-center gap-1">
        {VERSIONS.map(([v, label]) => (
          <button
            key={v}
            onClick={() => switchVersion(v)}
            className={`rounded-control px-3 py-1 text-body-sm transition-colors ${
              version === v
                ? "bg-white font-medium text-black"
                : "text-white/70 hover:text-white"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function AppShell() {
  return (
    <LayoutProvider>
      <div className="flex h-screen flex-col overflow-hidden bg-neutral-50 text-neutral-900">
        <VersionBar />
        <GlobalNav />
        <div className="flex min-h-0 flex-1">
          <SideNav />
          <ContentArea />
          <RightPanel />
        </div>
        <GenerateDescriptionsModal />
        <Toast />
      </div>
    </LayoutProvider>
  );
}
