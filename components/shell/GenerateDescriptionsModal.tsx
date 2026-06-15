"use client";

import { useEffect, useState } from "react";
import { X, Pencil, CircleCheck } from "lucide-react";
import { useLayout } from "@/lib/layout-context";
import Button from "@/components/ui/Button";
import { asset } from "@/lib/asset";
import { MENU_ITEMS } from "@/lib/menu-data";

/** AI-drafted descriptions for the (previously empty) menu items. */
const DESCRIPTIONS: Record<string, string> = {
  "Coke Can": "Ice-cold Coca-Cola in a 12 oz can — the classic fizzy pick-me-up.",
  "Sprite Can": "Crisp lemon-lime Sprite, served chilled in a 12 oz can.",
  "Kool-Aid": "A sweet, fruity house cooler over ice — a nostalgic, refreshing sipper.",
  Cakes: "Soft, fluffy house cakes with a lightly golden crumb — sweet enough for breakfast or dessert.",
  Salsa: "Fresh-chopped tomato salsa with onion, cilantro and a squeeze of lime. Bright and zesty.",
  "Toast (Two)": "Two slices of thick-cut bread toasted golden and served warm with butter.",
  "Hash Brown": "Shredded potatoes griddled crisp and golden outside, tender within.",
  "Bacon (Two)": "Two strips of thick-cut bacon cooked crisp — smoky, salty and satisfying.",
  Sausage: "A savory breakfast sausage link, seared juicy with a hint of sage.",
  Pancake: "A fluffy buttermilk pancake griddled to order — perfect with butter and syrup.",
  Waffle: "A golden Belgian-style waffle with crisp edges and a soft, airy center.",
  "French Toast": "Thick brioche dipped in vanilla-cinnamon custard and griddled until caramelized.",
};

interface Draft {
  name: string;
  meta: string;
  desc: string;
  img: string;
}
const DRAFTS: Draft[] = MENU_ITEMS.filter((i) => DESCRIPTIONS[i.name])
  .slice(0, 8)
  .map((i) => ({
    name: i.name,
    meta: i.price,
    desc: DESCRIPTIONS[i.name],
    img: i.img,
  }));

function Thumb({ img }: { img: string }) {
  return (
    <img
      src={asset(`/menu-thumbnails/${img}`)}
      alt=""
      className="h-11 w-11 flex-shrink-0 rounded-thumb-xs object-cover"
    />
  );
}

export default function GenerateDescriptionsModal() {
  const { generateModalOpen, closeGenerateModal, applyDescriptions } = useLayout();
  const [progress, setProgress] = useState(0);
  const done = progress >= 100;

  // Drive the fake "drafting" progress while the modal is open.
  useEffect(() => {
    if (!generateModalOpen) {
      setProgress(0);
      return;
    }
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(id);
          return 100;
        }
        return Math.min(100, p + 7);
      });
    }, 130);
    return () => clearInterval(id);
  }, [generateModalOpen]);

  if (!generateModalOpen) return null;

  const secondsLeft = Math.max(1, Math.round(((100 - progress) / 100) * 11));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-scrim p-4">
      <div className="flex max-h-[80vh] w-full max-w-[560px] flex-col overflow-hidden rounded-page bg-surface shadow-elevation-medium">
        {/* Header */}
        <div className="flex h-14 flex-shrink-0 items-center justify-between border-b border-border-standard px-5">
          <span className="text-body-lg font-semibold text-content-strong">
            Generate descriptions with Otter AI
          </span>
          <button
            onClick={closeGenerateModal}
            aria-label="Close"
            className="focus-ring flex h-8 w-8 items-center justify-center rounded-control text-content-secondary hover:bg-secondary-alpha-hover"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {done ? (
          /* ---------------------------- drafted ---------------------------- */
          <>
            <div className="flex items-start justify-between px-5 pb-3 pt-4">
              <div>
                <div className="flex items-center gap-2">
                  <CircleCheck className="h-4 w-4 text-info" />
                  <h3 className="text-body-md font-semibold text-content-strong">
                    18 descriptions drafted for lunch menu
                  </h3>
                </div>
                <p className="mt-0.5 text-body-md text-content-weak">
                  Take a look before you apply to menu
                </p>
              </div>
              <Button variant="tertiary" size="sm" icon={Pencil}>
                Edit
              </Button>
            </div>

            <div className="flex-1 space-y-2 overflow-y-auto px-5 pb-2">
              {DRAFTS.map((d) => (
                <div
                  key={d.name}
                  className="flex gap-3 rounded-card border border-border-standard p-3"
                >
                  <Thumb img={d.img} />
                  <div className="min-w-0 flex-1">
                    <p className="text-body-md">
                      <span className="font-semibold text-content-strong">
                        {d.name}
                      </span>
                      <span className="text-content-weak"> · {d.meta}</span>
                    </p>
                    <p className="mt-0.5 text-body-md leading-relaxed text-content-secondary">
                      {d.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-shrink-0 items-center justify-end gap-2 border-t border-border-standard px-5 py-4">
              <button className="focus-ring flex h-8 items-center gap-1.5 rounded-control border border-border-secondary bg-surface px-3 text-body-md font-medium text-content-secondary hover:bg-secondary-alpha-hover">
                <img src={asset("/otter-ai.png")} alt="" className="h-4 w-4" />
                Tweak voice
              </button>
              <Button variant="primary" size="sm" onClick={applyDescriptions}>
                Apply to menu
              </Button>
            </div>
          </>
        ) : (
          /* --------------------------- generating -------------------------- */
          <div className="relative flex flex-col items-center px-5 py-12">
            <img
              src={asset("/ai-background.png")}
              alt=""
              className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-60"
            />
            <div className="relative flex flex-col items-center">
              <img src={asset("/otter-ai.png")} alt="" className="h-12 w-12" />
              <h3 className="mt-4 font-serif text-[22px] text-content-strong">
                Drafting your descriptions...
              </h3>
              <p className="mt-1 text-body-md text-content-weak">
                <span className="font-semibold text-content-secondary">
                  {progress}%
                </span>{" "}
                · about {secondsLeft} seconds left
              </p>

              <div className="mt-8 w-full max-w-[360px] space-y-2">
                {DRAFTS.slice(0, 3).map((d, i) => (
                  <div
                    key={d.name}
                    className={`flex gap-3 rounded-card border border-border-standard bg-surface p-3 transition-opacity ${
                      i === 1 ? "opacity-100 shadow-elevation-low" : "opacity-40"
                    }`}
                  >
                    <Thumb img={d.img} />
                    <div className="min-w-0 flex-1">
                      <p className="text-body-sm font-semibold text-content-strong">
                        {d.name}
                      </p>
                      <p className="mt-0.5 line-clamp-2 text-body-sm text-content-weak">
                        {d.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
