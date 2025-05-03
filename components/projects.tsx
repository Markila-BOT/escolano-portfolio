"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { projectsData } from "@/lib/data";
import Project from "./project";
import { useSectionInView } from "@/lib/hooks";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { motion } from "framer-motion";

export default function Projects() {
  const { ref } = useSectionInView("Projects");

  return (
    <motion.section
      ref={ref}
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
      viewport={{
        once: true,
      }}
      id="projects"
      className="mb-20 scroll-mt-28 text-center sm:mb-0"
    >
      <SectionHeading>My projects</SectionHeading>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Carousel className="w-full rounded-xl">
          <CarouselContent className="gap-4">
            {projectsData.map((project, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Project {...project} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </div>
        </Carousel>
      </div>
    </motion.section>
  );
}
