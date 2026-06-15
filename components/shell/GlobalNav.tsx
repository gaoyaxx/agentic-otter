"use client";

import {
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Mic,
  Bell,
  User,
} from "lucide-react";
import { useLayout } from "@/lib/layout-context";
import Button from "@/components/ui/Button";
import { asset } from "@/lib/asset";

/** Top global bar (64px) — matches the Figma global nav. */
export default function GlobalNav() {
  const { toggleNav, openPanel, rightPanel, navExpanded } = useLayout();

  return (
    <header className="flex h-16 flex-shrink-0 items-center gap-3 border-b border-border-standard bg-surface px-4">
      <Button
        variant="ghost"
        size="lg"
        iconOnly
        icon={navExpanded ? PanelLeftClose : PanelLeftOpen}
        onClick={toggleNav}
        aria-label="Toggle navigation"
      />

      {/* Otter wordmark */}
      <div className="flex items-center pr-2">
        <img src={asset("/otter-logo.png")} alt="Otter" className="h-10 w-auto" />
      </div>

      {/* Search */}
      <div className="mx-auto flex h-10 w-full max-w-[436px] items-center gap-2 rounded-control border border-border-standard bg-surface px-3">
        <Search className="h-4 w-4 text-icon-secondary" />
        <input
          placeholder="Search Across Menus, Items, Sales, People, and more"
          className="w-full bg-transparent text-body-md text-content-secondary outline-none placeholder:text-content-weak"
        />
        <Mic className="h-4 w-4 text-icon-secondary" />
      </div>

      {/* Utilities */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => openPanel("otter")}
          aria-label="Open Otter assistant"
          className={`focus-ring flex h-10 w-10 items-center justify-center rounded-control transition-colors ${
            rightPanel === "otter"
              ? "bg-active-blue"
              : "hover:bg-secondary-alpha-hover"
          }`}
        >
          <img src={asset("/otter-ai.png")} alt="" className="h-5 w-5" />
        </button>
        <Button
          variant="ghost"
          size="lg"
          iconOnly
          icon={Bell}
          aria-label="Notifications"
        />
        <Button
          variant="ghost"
          size="lg"
          iconOnly
          icon={User}
          aria-label="Profile"
        />
      </div>
    </header>
  );
}
