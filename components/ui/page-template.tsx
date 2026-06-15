"use client";

import { Fragment, useEffect, useRef, type ReactNode } from "react";
import { Info, X } from "lucide-react";

/** Adds `.is-scrolling` while the element scrolls, removing it ~800ms after. */
export function useAutoHideScrollbar<T extends HTMLElement = HTMLDivElement>(
  enabled: boolean = true,
) {
  const ref = useRef<T>(null);
  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    let timer: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      el.classList.add("is-scrolling");
      clearTimeout(timer);
      timer = setTimeout(() => el.classList.remove("is-scrolling"), 800);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
    };
  }, [enabled]);
  return ref;
}

/* ----------------------------- Breadcrumb ------------------------------- */

export interface Crumb {
  label: string;
}

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav className="flex items-center gap-2 text-body-md">
      {items.map((it, i) => {
        const last = i === items.length - 1;
        return (
          <Fragment key={`${it.label}-${i}`}>
            <span
              className={
                last ? "text-content-weak" : "font-medium text-content-strong"
              }
            >
              {it.label}
            </span>
            {!last && <span className="text-content-weak">/</span>}
          </Fragment>
        );
      })}
    </nav>
  );
}

/* ----------------------------- Page Header ------------------------------ */

export function PageHeader({
  breadcrumb,
  title,
  description,
  actions,
  titleSize = "lg",
}: {
  breadcrumb?: Crumb[];
  title: string;
  description?: string;
  actions?: ReactNode;
  /** "lg" = Heading/Large (page), "sm" = Heading/Small (panel). */
  titleSize?: "lg" | "sm";
}) {
  return (
    <header className="flex w-full flex-col gap-2">
      {breadcrumb && breadcrumb.length > 0 && <Breadcrumb items={breadcrumb} />}
      <div className="flex w-full items-start gap-2">
        {/* Title + description share a column so the gap is measured from the
            title text — not inflated by taller action buttons beside them. */}
        <div
          className={`flex min-w-0 flex-1 flex-col ${
            titleSize === "sm" ? "gap-1" : "gap-2"
          }`}
        >
          <h1
            className={`font-display text-content-strong ${
              titleSize === "lg" ? "text-heading-lg" : "text-heading-sm"
            }`}
          >
            {title}
          </h1>
          {description && (
            <p className="text-body-md text-content-weak">{description}</p>
          )}
        </div>
        {actions && (
          <div className="flex flex-shrink-0 items-center gap-2">{actions}</div>
        )}
      </div>
    </header>
  );
}

/* --------------------------- Page Container ----------------------------- */

/**
 * Page template (Figma "Page Container", node 5:24084).
 * - `variant="page"`  → rounded-24 white surface + Elevation/Low shadow + 24 padding
 * - `variant="panel"` → flush (no chrome), for the right-hand panel body
 * Header → content gap is 16; sections within content are 24 apart.
 */
export function PageContainer({
  header,
  children,
  variant = "page",
  className = "",
}: {
  header?: ReactNode;
  children: ReactNode;
  variant?: "page" | "panel";
  className?: string;
}) {
  const scrollRef = useAutoHideScrollbar(variant === "page");
  const chrome =
    variant === "page"
      ? "scrollbar-autohide h-full min-h-0 overflow-y-auto rounded-page bg-surface p-6 shadow-elevation-low"
      : "";
  // Page: header → content gap is 24 (matches the 24 between content sections,
  // so the filter row has 24 above and below). Panel: tighter 16.
  const headerGap = variant === "page" ? "gap-6" : "gap-4";
  return (
    <div
      ref={scrollRef}
      className={`flex w-full flex-col ${headerGap} ${chrome} ${className}`}
    >
      {header}
      <div className="flex w-full flex-col gap-6">{children}</div>
    </div>
  );
}

/* ---------------------------- Section ----------------------------------- */

export function Section({
  title,
  subtitle,
  actions,
  children,
}: {
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="flex w-full flex-col gap-4">
      {(title || actions) && (
        <div className="flex w-full items-end gap-4">
          <div className="flex flex-col gap-1">
            {title && (
              <h2 className="font-display text-heading-sm text-content-strong">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-body-md text-content-weak">{subtitle}</p>
            )}
          </div>
          {actions && <div className="ml-auto flex items-center">{actions}</div>}
        </div>
      )}
      <div className="w-full">{children}</div>
    </section>
  );
}

/* ------------------------------- Card ----------------------------------- */

/**
 * Card with elevation="inline" (bordered, no shadow).
 * Header row + body slot + optional footer (right-aligned actions).
 */
export function Card({
  header,
  footer,
  children,
  className = "",
  bodyClassName = "p-5",
  style,
}: {
  header?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  className?: string;
  bodyClassName?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={style}
      className={`flex flex-col rounded-card border border-border-standard bg-surface ${className}`}
    >
      {header && (
        <div className="flex min-h-[42px] items-center px-5 pt-4">
          {typeof header === "string" ? (
            <h3 className="text-body-md font-semibold text-content-strong">
              {header}
            </h3>
          ) : (
            header
          )}
        </div>
      )}
      {children && <div className={bodyClassName}>{children}</div>}
      {footer && (
        <div className="flex items-center justify-end gap-2 px-5 pb-5 pt-2">
          {footer}
        </div>
      )}
    </div>
  );
}

/* --------------------------- Inline Banner ------------------------------ */

const BANNER_VARIANT = {
  info: "border-info-border/30 bg-info-bg text-info",
  positive: "border-positive-border/30 bg-positive-bg text-positive",
  notice: "border-notice-border/30 bg-notice-bg text-notice",
  negative: "border-negative-border/30 bg-negative-bg text-negative",
} as const;

export function InlineBanner({
  variant = "info",
  title,
  message,
  onDismiss,
}: {
  variant?: keyof typeof BANNER_VARIANT;
  title: string;
  message?: string;
  onDismiss?: () => void;
}) {
  return (
    <div
      className={`flex w-full items-start gap-3 rounded-card border px-4 py-3 ${BANNER_VARIANT[variant]}`}
    >
      <Info className="mt-0.5 h-5 w-5 flex-shrink-0" />
      <div className="flex-1">
        <p className="text-body-md font-semibold">{title}</p>
        {message && (
          <p className="mt-0.5 text-body-md text-content-weak">{message}</p>
        )}
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          aria-label="Dismiss"
          className="text-content-weak hover:text-content-strong"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
