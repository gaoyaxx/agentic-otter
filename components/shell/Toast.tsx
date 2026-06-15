"use client";

import { CircleCheck } from "lucide-react";
import { useLayout } from "@/lib/layout-context";

/** Bottom-center toast driven by layout-context `toast`. */
export default function Toast() {
  const { toast } = useLayout();
  if (!toast) return null;
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[60] flex justify-center">
      <div className="pointer-events-auto flex items-center gap-2.5 rounded-control bg-bg-inverse px-4 py-3 shadow-elevation-medium">
        <CircleCheck className="h-4 w-4 text-positive-strong" />
        <span className="text-body-md font-medium text-white">{toast}</span>
      </div>
    </div>
  );
}
