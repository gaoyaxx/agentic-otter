"use client";

import { Fragment, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLayout, NAV_WIDTH_EXPANDED } from "@/lib/layout-context";
import { navForBundle, type NavItem } from "@/lib/nav-config";
import { useAutoHideScrollbar } from "@/components/ui/page-template";
import BrandSelector from "./BrandSelector";

function NavContent({ expanded }: { expanded: boolean }) {
  const { bundle, activePage, setActivePage } = useLayout();
  const scrollRef = useAutoHideScrollbar<HTMLElement>();
  const items = navForBundle(bundle);

  const initiallyOpen = items
    .filter((i) => i.children?.some((c) => c.id === activePage))
    .map((i) => i.id);
  const [openGroups, setOpenGroups] = useState<string[]>(initiallyOpen);

  const toggleGroup = (id: string) =>
    setOpenGroups((g) =>
      g.includes(id) ? g.filter((x) => x !== id) : [...g, id],
    );

  // Shared item shell: 44px tall, control radius, 12px gap, label-sm type.
  const itemBase =
    "flex h-11 w-full items-center gap-3 rounded-control px-3 text-label-sm transition-colors";

  const renderItem = (item: NavItem) => {
    const Icon = item.icon;
    const isActiveTop =
      activePage === item.id || item.children?.some((c) => c.id === activePage);
    const isOpen = openGroups.includes(item.id);

    if (item.standalone || !item.children?.length) {
      const active = activePage === item.id;
      return (
        <button
          key={item.id}
          onClick={() => setActivePage(item.id)}
          title={!expanded ? item.label : undefined}
          className={`${itemBase} ${
            active
              ? "bg-active-blue font-semibold text-content-secondary"
              : "text-content-secondary hover:bg-canvas"
          } ${expanded ? "" : "justify-center px-0"}`}
        >
          <Icon className="h-5 w-5 flex-shrink-0" strokeWidth={1.75} />
          {expanded && <span className="truncate">{item.label}</span>}
        </button>
      );
    }

    return (
      <div key={item.id}>
        <button
          onClick={() =>
            expanded ? toggleGroup(item.id) : setActivePage(item.children![0].id)
          }
          title={!expanded ? item.label : undefined}
          className={`${itemBase} ${
            isActiveTop && !expanded
              ? "bg-active-blue text-content-secondary"
              : "text-content-secondary hover:bg-canvas"
          } ${expanded ? "" : "justify-center px-0"}`}
        >
          <Icon className="h-5 w-5 flex-shrink-0" strokeWidth={1.75} />
          {expanded && (
            <>
              <span className="flex-1 truncate text-left">{item.label}</span>
              <ChevronDown
                className={`h-4 w-4 flex-shrink-0 text-content-weak transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </>
          )}
        </button>

        {expanded && isOpen && (
          <div className="mb-1 mt-0.5 space-y-0.5 pl-[34px]">
            {item.children!.map((child) => {
              const active = activePage === child.id;
              return (
                <button
                  key={child.id}
                  onClick={() => setActivePage(child.id)}
                  className={`flex h-9 w-full items-center rounded-control px-3 text-label-sm transition-colors ${
                    active
                      ? "bg-active-blue font-semibold text-content-secondary"
                      : "text-content-weak hover:bg-canvas hover:text-content-secondary"
                  }`}
                >
                  <span className="truncate">{child.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex h-full flex-col">
      {/* Brand selector */}
      <div className="flex-shrink-0 px-3 pb-2 pt-3">
        <BrandSelector expanded={expanded} />
      </div>

      <nav
        ref={scrollRef}
        className="scrollbar-autohide flex-1 space-y-0.5 overflow-y-auto px-3 pb-3"
      >
        {items.map((item) => (
          <Fragment key={item.id}>
            {item.dividerBefore && (
              <div className="my-2 border-t border-border-standard" />
            )}
            {renderItem(item)}
          </Fragment>
        ))}
      </nav>
    </div>
  );
}

export default function SideNav() {
  const { navExpanded, navHover, setNavHover, navWidth } = useLayout();

  return (
    <div
      className="relative flex-shrink-0 border-r border-border-standard bg-surface transition-[width] duration-200"
      style={{ width: navWidth }}
      onMouseEnter={() => !navExpanded && setNavHover(true)}
      onMouseLeave={() => setNavHover(false)}
    >
      <NavContent expanded={navExpanded} />

      {!navExpanded && navHover && (
        <div
          className="absolute left-0 top-0 z-40 h-full border-r border-border-standard bg-surface shadow-elevation-medium"
          style={{ width: NAV_WIDTH_EXPANDED }}
        >
          <NavContent expanded />
        </div>
      )}
    </div>
  );
}
