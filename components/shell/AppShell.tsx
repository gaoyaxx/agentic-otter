"use client";

import { LayoutProvider } from "@/lib/layout-context";
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
export default function AppShell() {
  return (
    <LayoutProvider>
      <div className="flex h-screen flex-col overflow-hidden bg-neutral-50 text-neutral-900">
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
