"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import {
  projectCarousel,
  projectFilter,
  projectsData,
  projectViews,
} from "@/lib/data";
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProjectDetailsDrawer = dynamic(
  () => import("@/components/project-details-drawer"),
);

const controlClassName =
  "static left-auto right-auto top-auto translate-x-0 translate-y-0";

type PublishedProject = (typeof projectsData)[number];

export default function ProjectsInteractive() {
  const { playCue } = useSoundContext();
  const [api, setApi] = useState<CarouselApi>();
  const [view, setView] = useState<"carousel" | "rail">("carousel");
  const [isHydrated, setIsHydrated] = useState(false);
  const [expandedRailIndex, setExpandedRailIndex] = useState(0);
  const carouselPositionRef = useRef(0);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsHydrated(true));
    return () => cancelAnimationFrame(frame);
  }, []);

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
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [drawerProjects, setDrawerProjects] =
    useState<readonly PublishedProject[]>(projectsData);
  const openedFromRef = useRef<HTMLButtonElement | null>(null);
  const tagLabels = projectsData
    .flatMap((project) => project.tags?.map((tag) => tag.label) ?? [])
    .filter((label, index, labels) => labels.indexOf(label) === index);
  const visibleProjects =
    selectedTag === null
      ? projectsData
      : projectsData.filter((project) =>
          project.tags?.some((tag) => tag.label === selectedTag),
        );

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
    setDrawerProjects(visibleProjects);
    setHasOpened(true);
    openedFromRef.current = trigger;
    setSelectedIndex(index);
    handleOpenChange(true);
  };

  const handleSelectTag = (tag: string | null) => {
    const nextProjects =
      tag === null
        ? projectsData
        : projectsData.filter((project) =>
            project.tags?.some((item) => item.label === tag),
          );
    setSelectedTag(tag);
    setExpandedRailIndex(0);
    carouselPositionRef.current = 0;
    setPlace(nextProjects.length === 0 ? 0 : 1);
    setTotal(nextProjects.length);
    if (api && view === "carousel") {
      requestAnimationFrame(() => {
        api.reInit();
        api.scrollTo(0, true);
        carouselPositionRef.current = 0;
      });
    }
    if (!isOpen) {
      setDrawerProjects(nextProjects);
      setSelectedIndex(0);
      return;
    }
    const openProject = drawerProjects[selectedIndex];
    const nextIndex = nextProjects.findIndex(
      (project) => project.title === openProject?.title,
    );
    if (nextIndex === -1) {
      handleOpenChange(false);
      return;
    }
    setDrawerProjects(nextProjects);
    setSelectedIndex(nextIndex);
  };

  return (
    <>
      <div className="mx-auto mb-6 flex max-w-7xl justify-center px-4 sm:px-6 lg:px-8">
        <div className="flex w-full max-w-xs flex-col gap-2">
          <Label htmlFor="project-technology-filter">
            {projectFilter.label}
          </Label>
          <Select
            value={selectedTag ?? projectFilter.all}
            onValueChange={(value) =>
              handleSelectTag(value === projectFilter.all ? null : value)
            }
          >
            <SelectTrigger id="project-technology-filter">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={projectFilter.all}>
                {projectFilter.all}
              </SelectItem>
              {tagLabels.map((label) => (
                <SelectItem key={label} value={label}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {isHydrated && (
        <div
          role="group"
          aria-label={projectViews.label}
          className="mb-6 flex flex-wrap justify-center gap-2"
        >
          {(["carousel", "rail"] as const).map((option) => (
            <Button
              key={option}
              type="button"
              size="lg"
              className="wrap-break-words h-auto min-h-11 max-w-full whitespace-normal"
              variant={view === option ? "default" : "outline"}
              aria-pressed={view === option}
              onClick={() => setView(option)}
            >
              {projectViews[option]}
            </Button>
          ))}
        </div>
      )}
      {visibleProjects.length === 0 ? (
        <p className="text-muted-foreground px-4 text-center">
          {projectFilter.empty}
        </p>
      ) : (
        <>
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
                {visibleProjects.map((item, index) => (
                  <CarouselItem
                    key={item.title}
                    className="basis-[85%] md:basis-[46%] lg:basis-[30%]"
                  >
                    <div className="p-1">
                      <Project
                        {...item}
                        onOpen={(event) =>
                          handleOpen(index, event.currentTarget)
                        }
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
                <CarouselPrevious className={controlClassName} />
                <p className="text-muted-foreground min-w-16 text-sm">
                  {projectCarousel.position(place, total)}
                </p>
                <CarouselNext className={controlClassName} />
              </div>
            </Carousel>
          </div>
          {view === "rail" && (
            <ProjectRail
              projects={visibleProjects}
              expandedIndex={expandedRailIndex}
              onSelect={setExpandedRailIndex}
              onOpen={handleOpen}
            />
          )}
        </>
      )}
      {hasOpened && (
        <ProjectDetailsDrawer
          projects={drawerProjects}
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
