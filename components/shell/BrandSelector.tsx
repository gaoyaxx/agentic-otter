"use client";

import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { BRANDS } from "@/lib/nav-config";
import { useLayout } from "@/lib/layout-context";
import { asset } from "@/lib/asset";

/**
 * Top-of-nav switcher.
 * - Brand owner (HQ): brand picker with dropdown.
 * - Location owner (franchise): fixed org identity, no dropdown.
 */
export default function BrandSelector({ expanded }: { expanded: boolean }) {
  const { owner } = useLayout();
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState(BRANDS[0].id);
  const active = BRANDS.find((b) => b.id === activeId)!;

  if (owner === "location") {
    return (
      <div
        className={`flex h-11 w-full items-center gap-2 rounded-control border border-border-standard bg-surface px-2 text-content-secondary ${
          expanded ? "" : "justify-center border-0 px-0"
        }`}
        title={!expanded ? "[BIGGBY] Amy Harris" : undefined}
      >
        <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-content-primary text-body-sm font-semibold text-white">
          AH
        </span>
        {expanded && (
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-body-md font-semibold text-content-strong">
              [BIGGBY] Amy Harris
            </span>
            <span className="truncate text-body-sm text-content-weak">
              2 locations, 2 brands
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        title={!expanded ? active.name : undefined}
        className={`flex h-11 w-full items-center gap-2 rounded-control border border-border-standard bg-surface px-2 text-content-secondary transition-colors hover:bg-canvas ${
          expanded ? "" : "justify-center px-0"
        }`}
      >
        {active.logo ? (
          <img
            src={asset(active.logo)}
            alt=""
            className="h-7 w-7 flex-shrink-0 rounded-md object-cover"
          />
        ) : (
          <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-canvas text-base">
            {active.emoji}
          </span>
        )}
        {expanded && (
          <>
            <span className="flex min-w-0 flex-1 flex-col text-left">
              <span className="truncate text-body-md font-semibold text-content-strong">
                {active.name}
              </span>
              <span className="truncate text-body-sm font-normal text-content-weak">
                10 Franchisees, 130 locations
              </span>
            </span>
            <ChevronDown className="h-4 w-4 flex-shrink-0 text-content-weak" />
          </>
        )}
      </button>

      {open && expanded && (
        <div className="absolute left-0 right-0 top-[52px] z-50 rounded-control border border-border-standard bg-surface p-1 shadow-elevation-medium">
          {BRANDS.map((b) => (
            <button
              key={b.id}
              onClick={() => {
                setActiveId(b.id);
                setOpen(false);
              }}
              className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-body-md text-content-secondary hover:bg-canvas"
            >
              {b.logo ? (
                <img
                  src={asset(b.logo)}
                  alt=""
                  className="h-6 w-6 rounded-md object-cover"
                />
              ) : (
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-canvas text-sm">
                  {b.emoji}
                </span>
              )}
              <span className="flex-1 truncate text-left">{b.name}</span>
              {b.id === activeId && <Check className="h-4 w-4 text-beet" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
