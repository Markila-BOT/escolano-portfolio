"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useReducedMotion } from "framer-motion";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { projectScreenshots } from "@/lib/data";
import { Button } from "@/components/ui/button";

type ProjectScreenshotPreviewProps = {
  shots: readonly { src: StaticImageData; alt: string }[];
};

const controlClassName =
  "shrink-0 rounded-full [@media(pointer:coarse)]:h-11 [@media(pointer:coarse)]:w-11";

export default function ProjectScreenshotPreview({
  shots,
}: ProjectScreenshotPreviewProps) {
  const [viewportRef, api] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  });
  const isMotionReduced = useReducedMotion() ?? false;
  const rootRef = useRef<HTMLDivElement>(null);
  const [place, setPlace] = useState(1);
  const [canScrollPrevious, setCanScrollPrevious] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const active = document.activeElement;
    if (
      !(active instanceof HTMLButtonElement) ||
      !root.contains(active) ||
      !active.disabled
    ) {
      return;
    }

    const enabled = Array.from(
      root.querySelectorAll<HTMLButtonElement>("button"),
    ).find((button) => !button.disabled);
    (enabled ?? root).focus();
  }, [canScrollPrevious, canScrollNext]);

  useEffect(() => {
    if (!api) return;

    const update = () => {
      setPlace(api.selectedScrollSnap() + 1);
      setCanScrollPrevious(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    update();
    api.on("select", update);
    api.on("reInit", update);

    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!api) return;

    const movesImage =
      event.key === "ArrowLeft" ||
      event.key === "ArrowRight" ||
      event.key === "Home" ||
      event.key === "End";
    if (!movesImage) return;

    event.preventDefault();
    event.stopPropagation();

    if (event.key === "ArrowLeft") api.scrollPrev(isMotionReduced);
    else if (event.key === "ArrowRight") api.scrollNext(isMotionReduced);
    else if (event.key === "Home") api.scrollTo(0, isMotionReduced);
    else api.scrollTo(api.scrollSnapList().length - 1, isMotionReduced);
  };

  const handlePrevious = () => {
    api?.scrollPrev(isMotionReduced);
  };

  const handleNext = () => {
    api?.scrollNext(isMotionReduced);
  };

  return (
    <div
      ref={rootRef}
      role="region"
      tabIndex={-1}
      aria-label="Project images"
      onKeyDown={handleKeyDown}
      className="flex flex-col gap-3 p-3 outline-none sm:gap-4 sm:p-4"
    >
      <div
        ref={viewportRef}
        className="cursor-grab touch-pan-y overflow-hidden rounded-xl bg-muted/40 active:cursor-grabbing"
      >
        <div className="flex">
          {shots.map((shot) => (
            <div
              key={shot.alt}
              className="relative h-[clamp(12rem,48svh,22rem)] min-w-0 shrink-0 grow-0 basis-full lg:h-[clamp(16rem,52svh,28rem)]"
            >
              <Image
                alt={shot.alt}
                src={shot.src}
                fill
                draggable={false}
                className="select-none object-contain p-2 sm:p-3"
                sizes="(min-width: 1024px) 50vw, (min-width: 768px) 55vw, 100vw"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center gap-3">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={handlePrevious}
          disabled={!canScrollPrevious}
          aria-label={projectScreenshots.previous}
          className={controlClassName}
        >
          <LuChevronLeft className="h-4 w-4" aria-hidden />
        </Button>
        <p
          aria-live="polite"
          className="min-w-14 text-center text-sm tabular-nums text-muted-foreground"
        >
          {projectScreenshots.position(place, shots.length)}
        </p>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={handleNext}
          disabled={!canScrollNext}
          aria-label={projectScreenshots.next}
          className={controlClassName}
        >
          <LuChevronRight className="h-4 w-4" aria-hidden />
        </Button>
      </div>
    </div>
  );
}
