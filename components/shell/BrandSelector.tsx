"use client";

import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { BRANDS } from "@/lib/nav-config";
import { asset } from "@/lib/asset";

/**
 * Brand owner's brand switcher — sits at the very top of the side nav.
 * Collapses to just the brand emoji/avatar when the rail is icon-only.
 */
export default function BrandSelector({ expanded }: { expanded: boolean }) {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState(BRANDS[0].id);
  const active = BRANDS.find((b) => b.id === activeId)!;

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
            <span className="flex-1 truncate text-left text-body-md font-semibold">
              {active.name}
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
