"use client";

import { useRef, type RefObject } from "react";
import { projectDrawer, projectsData } from "@/lib/data";
import ProjectBuildNote from "@/components/project-build-note";
import ProjectCaseStudy from "@/components/project-case-study";
import ProjectScreenshotPreview from "@/components/project-screenshot-preview";
import { motion } from "framer-motion";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import ProjectVideoFrame from "@/components/project-video-frame";
import { TagChip } from "@/components/ui/tag-chip";
import { fadeInAnimationVariants } from "@/lib/animations";
import { LuChevronLeft, LuChevronRight, LuLink, LuLock } from "react-icons/lu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaWindowClose } from "react-icons/fa";
import ProjectDescription from "@/components/project-description";

const titleColors = [
  "from-green-600 from-10% via-emerald-500 via-30% to-green-600 to-90%",
  "from-violet-600 from-10% via-fuchsia-500 via-30% to-violet-600 to-90%",
  "from-orange-600 from-10% via-amber-500 via-30% to-orange-600 to-90%",
];

const neighborButtonClassName =
  "h-auto min-h-10 w-full whitespace-normal px-3 py-2 sm:w-auto";

type ProjectDetailsDrawerProps = {
  projects?: readonly (typeof projectsData)[number][];
  isOpen: boolean;
  selectedIndex: number;
  colorIndex: number;
  setSelectedIndex: (index: number) => void;
  handleOpenChange: (open: boolean) => void;
  openedFromRef: RefObject<HTMLButtonElement | null>;
};

export default function ProjectDetailsDrawer({
  projects = projectsData,
  isOpen,
  selectedIndex,
  colorIndex,
  setSelectedIndex,
  handleOpenChange,
  openedFromRef,
}: ProjectDetailsDrawerProps) {
  const previousButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const project = projects[selectedIndex];
  const videoUrl = "videoUrl" in project ? project.videoUrl : undefined;
  const websiteUrl = "websiteUrl" in project ? project.websiteUrl : undefined;
  const screenshots =
    "screenshots" in project ? project.screenshots : undefined;
  const caseStudy = "caseStudy" in project ? project.caseStudy : undefined;
  const buildNote = "buildNote" in project ? project.buildNote : undefined;
  const showsLinkCard = Boolean(websiteUrl) || !screenshots;
  const previousTitle =
    selectedIndex > 0 ? projects[selectedIndex - 1].title : undefined;
  const nextTitle =
    selectedIndex < projects.length - 1
      ? projects[selectedIndex + 1].title
      : undefined;

  const focusAfterMove = (index: number, direction: "previous" | "next") => {
    const previousEnabled = index > 0;
    const nextEnabled = index < projects.length - 1;
    const activatedDisabled =
      direction === "previous" ? !previousEnabled : !nextEnabled;
    if (!activatedDisabled) return;

    requestAnimationFrame(() => {
      if (direction === "previous" && nextEnabled) {
        nextButtonRef.current?.focus();
        return;
      }
      if (direction === "next" && previousEnabled) {
        previousButtonRef.current?.focus();
        return;
      }
      detailsRef.current?.focus();
    });
  };

  const handlePrevious = () => {
    if (selectedIndex <= 0) return;
    const index = selectedIndex - 1;
    setSelectedIndex(index);
    focusAfterMove(index, "previous");
  };

  const handleNext = () => {
    if (selectedIndex >= projects.length - 1) return;
    const index = selectedIndex + 1;
    setSelectedIndex(index);
    focusAfterMove(index, "next");
  };

  return (
    <Drawer open={isOpen} onOpenChange={handleOpenChange}>
      <DrawerContent
        aria-describedby={undefined}
        className="bg-background text-foreground fixed right-0 bottom-0 left-0 mt-24 flex h-[93%] flex-col rounded-t-[10px]"
        onOpenAutoFocus={(event) => {
          event.preventDefault();
          closeButtonRef.current?.focus();
        }}
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          openedFromRef.current?.focus();
        }}
      >
        <DrawerTitle className="sr-only">{project.title}</DrawerTitle>
        <div className="bg-glow-warm absolute top-[-6rem] right-[11rem] -z-10 h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem]" />
        <div className="bg-glow-cool absolute top-[-1rem] left-[-35rem] -z-10 h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem]" />
        <DrawerClose asChild>
          <Button
            ref={closeButtonRef}
            variant="ghost"
            className="absolute top-5 right-5 z-10"
            aria-label="Close project"
          >
            <motion.div whileHover={{ rotate: 180 }}>
              <FaWindowClose size={24} aria-hidden="true" />
            </motion.div>
          </Button>
        </DrawerClose>
        <div
          ref={detailsRef}
          tabIndex={0}
          aria-label="Project details"
          role="region"
          className="focus-visible:outline-ring min-h-0 flex-1 overflow-y-auto pt-14 focus-visible:outline focus-visible:outline-2"
        >
          <div className="grid w-full auto-rows-[minmax(min-content,auto)] grid-cols-1 gap-4 p-4 md:grid-cols-5 md:p-8 lg:p-20">
            {screenshots ? (
              <Card
                key={project.title}
                className="border-border row-span-4 overflow-visible border-2 md:col-span-3"
              >
                <ProjectScreenshotPreview shots={screenshots} />
              </Card>
            ) : (
              <Card className="border-border row-span-4 overflow-hidden border-2 md:col-span-3">
                {videoUrl && isOpen ? (
                  <ProjectVideoFrame
                    url={videoUrl}
                    image={project.imageUrl}
                    title={project.title}
                  />
                ) : (
                  <Image
                    alt={`${project.title} screenshot`}
                    src={project.imageUrl}
                    className="aspect-video h-full w-full object-cover object-top"
                  />
                )}
              </Card>
            )}
            <Card className="border-border row-span-3 border-2 md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Tech Stack</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="flex flex-wrap justify-center gap-2 text-sm md:text-lg">
                  {project.tags.map((tag, index) => (
                    <motion.li
                      key={index}
                      variants={fadeInAnimationVariants}
                      initial="initial"
                      whileInView="animate"
                      viewport={{
                        once: true,
                      }}
                      custom={index}
                    >
                      <TagChip>
                        <span aria-hidden="true">{tag.icon}</span>
                        <span>{tag.label}</span>
                      </TagChip>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            {showsLinkCard ? (
              <Card className="border-border row-span-1 border-2 md:col-span-1">
                <CardContent className="flex h-full w-full items-center justify-center">
                  {websiteUrl ? (
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      className="cursor-pointer"
                    >
                      <Link
                        href={websiteUrl}
                        rel="noopener noreferrer"
                        target="_blank"
                        aria-label={`Visit ${project.title}`}
                      >
                        <LuLink
                          size={40}
                          aria-hidden="true"
                          className="md:h-15 md:w-15"
                        />
                      </Link>
                    </motion.div>
                  ) : (
                    <div className="text-muted-foreground flex flex-col items-center gap-2">
                      <LuLock size={40} aria-hidden />
                      <span className="text-sm font-medium">
                        Internal project
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : null}
            <Card
              className={`border-border row-span-1 border-2 ${showsLinkCard ? "md:col-span-1" : "md:col-span-2"}`}
            >
              <CardContent className="flex h-full w-full items-center justify-center">
                <motion.div
                  className={`bg-gradient-to-r bg-clip-text font-extrabold text-transparent ${titleColors[colorIndex]}`}
                  transition={{
                    duration: 2,
                  }}
                >
                  <p className="text-xl md:text-2xl">{project.title}</p>
                </motion.div>
              </CardContent>
            </Card>
            <Card className="border-border row-span-2 border-2 md:col-span-5">
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-card-foreground flex flex-col gap-4 font-medium md:text-base">
                  {caseStudy ? (
                    <ProjectCaseStudy
                      caseStudy={caseStudy}
                      walkthrough={project.title === "MatterWorx"}
                    />
                  ) : (
                    project.description.map((paragraph) => (
                      <ProjectDescription key={paragraph} text={paragraph} />
                    ))
                  )}
                  {buildNote ? (
                    <ProjectBuildNote buildNote={buildNote} />
                  ) : null}
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
        <div className="border-border bg-background flex shrink-0 flex-col items-center justify-center gap-2 border-t px-4 py-3 sm:flex-row">
          <Button
            ref={previousButtonRef}
            variant="outline"
            className={neighborButtonClassName}
            disabled={selectedIndex === 0}
            onClick={handlePrevious}
          >
            <LuChevronLeft className="h-4 w-4 shrink-0" aria-hidden />
            {projectDrawer.previous(previousTitle)}
          </Button>
          <Button
            ref={nextButtonRef}
            variant="outline"
            className={neighborButtonClassName}
            disabled={selectedIndex === projects.length - 1}
            onClick={handleNext}
          >
            {projectDrawer.next(nextTitle)}
            <LuChevronRight className="h-4 w-4 shrink-0" aria-hidden />
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
