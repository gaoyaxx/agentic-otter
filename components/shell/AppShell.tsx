"use client";

import { useState, useRef } from "react";
import { LayoutProvider, useLayout } from "@/lib/layout-context";
import type { Owner, Bundle } from "@/lib/nav-config";
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
const OWNERS: [Owner, string][] = [
  ["brand", "Brand owners (HQ)"],
  ["location", "Location owners (Franchise)"],
];
const BUNDLES: [Bundle, string][] = [
  ["enterprise", "Enterprise bundle"],
  ["pos", "POS bundle"],
  ["middleware", "Middleware"],
];

function Segment<T extends string>({
  options,
  value,
  onChange,
}: {
  options: [T, string][];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex items-center gap-0.5 rounded-control bg-white/10 p-0.5">
      {options.map(([v, label]) => (
        <button
          key={v}
          onClick={() => onChange(v)}
          className={`rounded-[6px] px-2.5 py-1 text-body-sm transition-colors ${
            value === v
              ? "bg-white font-medium text-black"
              : "text-white/70 hover:text-white"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function PrototypeBar() {
  const { owner, setOwner, bundle, setBundle } = useLayout();
  return (
    <div className="flex h-10 flex-shrink-0 items-center justify-center gap-4 bg-black text-white">
      <Segment options={OWNERS} value={owner} onChange={setOwner} />
      <Segment options={BUNDLES} value={bundle} onChange={setBundle} />
    </div>
  );
}

/** Wraps the prototype bar: hidden by default, revealed after hovering the
 *  top edge for 3 seconds; hides again when the pointer leaves. */
function TopBarReveal() {
  const [shown, setShown] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clear = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };
  return (
    <div
      onMouseEnter={() => {
        clear();
        timer.current = setTimeout(() => setShown(true), 3000);
      }}
      onMouseLeave={() => {
        clear();
        setShown(false);
      }}
      className="flex-shrink-0"
    >
      {shown ? <PrototypeBar /> : <div className="h-2" />}
    </div>
  );
}

export default function AppShell() {
  return (
    <LayoutProvider>
      <div className="flex h-screen flex-col overflow-hidden bg-neutral-50 text-neutral-900">
        <TopBarReveal />
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
