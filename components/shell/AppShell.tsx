"use client";

import { useState, useRef } from "react";
import { X } from "lucide-react";
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

function PrototypeBar({ onClose }: { onClose: () => void }) {
  const { owner, setOwner, bundle, setBundle } = useLayout();
  return (
    <div className="relative flex h-10 flex-shrink-0 items-center justify-center gap-4 bg-black text-white">
      <Segment options={OWNERS} value={owner} onChange={setOwner} />
      <span className="h-5 w-px bg-white/20" />
      <Segment options={BUNDLES} value={bundle} onChange={setBundle} />
      <button
        onClick={onClose}
        aria-label="Hide prototype controls"
        className="absolute right-3 flex h-6 w-6 items-center justify-center rounded-control text-white/60 hover:bg-white/10 hover:text-white"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

/** Wraps the prototype bar: shown by default; the close button hides it.
 *  Once hidden, hovering the top edge for 3 seconds reveals it again. */
function TopBarReveal() {
  const [shown, setShown] = useState(true);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clear = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };
  return (
    <div
      onMouseEnter={() => {
        if (shown) return;
        clear();
        timer.current = setTimeout(() => setShown(true), 3000);
      }}
      onMouseLeave={clear}
      className="flex-shrink-0"
    >
      {shown ? (
        <PrototypeBar onClose={() => setShown(false)} />
      ) : (
        <div className="h-2" />
      )}
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
