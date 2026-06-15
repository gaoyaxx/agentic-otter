"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";

type Variant = "primary" | "secondary" | "tertiary" | "ghost" | "danger";
type Size = "sm" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  /** Leading icon. */
  icon?: LucideIcon;
  /** Trailing icon. */
  iconTrailing?: LucideIcon;
  /** Pill (fully rounded) instead of the 8px control radius. */
  pill?: boolean;
  /** Icon-only square button. */
  iconOnly?: boolean;
}

/* Variant styles map 1:1 to the Figma interactive color tokens. */
const VARIANT: Record<Variant, string> = {
  // Primary (high-emphasis) button is dark #141414 per the Figma Button
  // component — blue (#1c69e8) is reserved for links / active states.
  primary:
    "bg-secondary text-white hover:bg-secondary-hover active:bg-secondary-pressed disabled:bg-disabled-fill disabled:text-content-inverse-weak",
  secondary:
    "bg-secondary text-white hover:bg-secondary-hover active:bg-secondary-pressed disabled:bg-disabled-fill disabled:text-content-inverse-weak",
  tertiary:
    "bg-surface text-content-secondary border border-border-secondary hover:bg-secondary-alpha-hover hover:border-border-secondary-hover active:bg-[rgba(0,0,0,0.10)] disabled:text-content-inverse-weak disabled:border-border-outline disabled:bg-surface",
  ghost:
    "bg-transparent text-content-secondary hover:bg-secondary-alpha-hover active:bg-[rgba(0,0,0,0.10)] disabled:text-content-inverse-weak",
  danger:
    "bg-danger text-white hover:bg-danger-hover active:bg-danger-pressed disabled:bg-disabled-fill disabled:text-content-inverse-weak",
};

/* Size → height / padding / icon size (Component/Button tokens). */
const SIZE: Record<Size, { base: string; icon: number; iconOnly: string }> = {
  sm: { base: "h-8 gap-2 px-3 text-body-md", icon: 16, iconOnly: "h-8 w-8" },
  lg: { base: "h-10 gap-2 px-4 text-body-md", icon: 20, iconOnly: "h-10 w-10" },
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "tertiary",
    size = "sm",
    icon: Icon,
    iconTrailing: IconTrailing,
    pill = false,
    iconOnly = false,
    className = "",
    children,
    ...rest
  },
  ref,
) {
  const s = SIZE[size];
  return (
    <button
      ref={ref}
      className={[
        "focus-ring inline-flex items-center justify-center font-medium transition-colors disabled:cursor-not-allowed",
        pill ? "rounded-pill" : "rounded-control",
        iconOnly ? s.iconOnly : s.base,
        VARIANT[variant],
        className,
      ].join(" ")}
      {...rest}
    >
      {Icon && <Icon className="flex-shrink-0" size={s.icon} strokeWidth={2} />}
      {!iconOnly && children}
      {IconTrailing && (
        <IconTrailing className="flex-shrink-0" size={s.icon} strokeWidth={2} />
      )}
    </button>
  );
});

export default Button;
