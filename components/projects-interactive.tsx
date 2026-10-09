"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
import { projectCarousel, projectsData, projectViews } from "@/lib/data";
import ProjectRail from "@/components/project-rail";
import Project from "./project";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useSoundContext } from "@/context/sound-context";
import { Button } from "@/components/ui/button";

const ProjectDetailsDrawer = dynamic(
  () => import("@/components/project-details-drawer"),
);

const controlClassName =
  "static left-auto right-auto top-auto translate-x-0 translate-y-0";

export default function ProjectsInteractive() {
  const { playCue } = useSoundContext();
  const [api, setApi] = useState<CarouselApi>();
  const [view, setView] = useState<"carousel" | "rail">("carousel");
  const [isHydrated, setIsHydrated] = useState(false);
  const [expandedRailIndex, setExpandedRailIndex] = useState(0);
  const carouselPositionRef = useRef(0);

  useEffect(() => setIsHydrated(true), []);

  useEffect(() => {
    if (!api || view !== "carousel") return;
    const frame = requestAnimationFrame(() => {
      const position = carouselPositionRef.current;
      api.reInit();
      api.scrollTo(position, true);
    });
    return () => cancelAnimationFrame(frame);
  }, [api, view]);
  const [place, setPlace] = useState(1);
  const [total, setTotal] = useState<number>(projectsData.length);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);
  const wasOpen = useRef(false);
  const [hasOpened, setHasOpened] = useState(false);
  const openedFromRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!api) return;

    const updatePosition = () => {
      if (view !== "carousel") return;
      carouselPositionRef.current = api.selectedScrollSnap();
      setPlace(api.selectedScrollSnap() + 1);
      setTotal(api.slideNodes().length);
    };

    api.on("select", updatePosition);
    api.on("reInit", updatePosition);

    return () => {
      api.off("select", updatePosition);
      api.off("reInit", updatePosition);
    };
  }, [api, view]);

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open === wasOpen.current) return;
    wasOpen.current = open;
    playCue(open ? "open" : "close");
  };

  const handleOpen = (index: number, trigger: HTMLButtonElement) => {
    setHasOpened(true);
    openedFromRef.current = trigger;
    setSelectedIndex(index);
    handleOpenChange(true);
  };

  return (
    <>
      {isHydrated && (
        <div
          role="group"
          aria-label={projectViews.label}
          className="mb-6 flex justify-center gap-2"
        >
          {(["carousel", "rail"] as const).map((option) => (
            <Button
              key={option}
              type="button"
              size="lg"
              variant={view === option ? "default" : "outline"}
              aria-pressed={view === option}
              onClick={() => setView(option)}
            >
              {projectViews[option]}
            </Button>
          ))}
        </div>
      )}
      <div
        hidden={view !== "carousel"}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <Carousel
          className="w-full rounded-xl"
          opts={{
            align: "start",
            slidesToScroll: 1,
            containScroll: "trimSnaps",
          }}
          setApi={setApi}
        >
          <CarouselContent>
            {projectsData.map((item, index) => (
              <CarouselItem
                key={item.title}
                className="basis-[85%] md:basis-[46%] lg:basis-[30%]"
              >
                <div className="p-1">
                  <Project
                    {...item}
                    onOpen={(event) => handleOpen(index, event.currentTarget)}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-4 flex items-center justify-center gap-4">
            <CarouselPrevious className={controlClassName} />
            <p className="min-w-16 text-sm text-muted-foreground">
              {projectCarousel.position(place, total)}
            </p>
            <CarouselNext className={controlClassName} />
          </div>
        </Carousel>
      </div>
      {view === "rail" && (
        <ProjectRail
          expandedIndex={expandedRailIndex}
          onSelect={setExpandedRailIndex}
          onOpen={handleOpen}
        />
      )}
      {hasOpened && (
        <ProjectDetailsDrawer
          isOpen={isOpen}
          selectedIndex={selectedIndex}
          colorIndex={colorIndex}
          setSelectedIndex={setSelectedIndex}
          handleOpenChange={handleOpenChange}
          openedFromRef={openedFromRef}
        />
      )}
    </>
  );
}
