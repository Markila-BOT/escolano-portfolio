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
      className="mb-20 text-center scroll-mt-28 sm:mb-0"
    >
      <SectionHeading>My projects</SectionHeading>
      <Carousel className="w-full max-w-5xl rounded-xl">
        <CarouselContent>
          {projectsData.map((project, index) => (
            <CarouselItem key={index} className="basis-1/3">
              <Project {...project} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </motion.section>
  );
}
