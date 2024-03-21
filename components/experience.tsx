"use client";

import React, { useState } from "react";
import SectionHeading from "./section-heading";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { experiencesData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import { useTheme } from "@/context/theme-context";
import { motion } from "framer-motion";
import { Button } from "./ui/button";

export default function Experience() {
  const { ref } = useSectionInView("Experience");
  const { theme } = useTheme();

  const [visibleElements, setVisibleElements] = useState(3);

  const handleReadMore = () => {
    setVisibleElements((prevCount) => prevCount + 3);
  };

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
      id="experience"
      className="w-full scroll-mt-28 mb-28 sm:mb-40"
    >
      <SectionHeading>My experience</SectionHeading>
      <VerticalTimeline lineColor="">
        {experiencesData.slice(0, visibleElements).map((item, index) => (
          <React.Fragment key={index}>
            <VerticalTimelineElement
              visible={true}
              contentStyle={{
                background:
                  theme === "light" ? "#f3f4f6" : "rgba(255, 255, 255, 0.05)",
                boxShadow: "none",
                border: "1px solid rgba(0, 0, 0, 0.05)",
                textAlign: "left",
                borderRadius: "0.75rem",
                padding: "1.3rem 2rem",
              }}
              contentArrowStyle={{
                display: "none",
              }}
              date={item.date}
              icon={item.icon}
              iconStyle={{
                background:
                  theme === "light" ? "white" : "rgba(255, 255, 255, 0.15)",
                fontSize: "1.5rem",
              }}
            >
              <h3 className="font-bold capitalize">{item.title}</h3>
              <p className="font-normal !mt-0">{item.location}</p>
              <p className="!mt-1 !font-normal text-gray-700 dark:text-white/75">
                {item.description}
              </p>
            </VerticalTimelineElement>
          </React.Fragment>
        ))}
      </VerticalTimeline>
      {visibleElements < experiencesData.length && (
        <div className="flex justify-center">
          <Button
            onClick={handleReadMore}
            variant={"outline"}
            className="mt-4 focus:scale-110 hover:scale-110 hover:bg-gray-300 dark:hover:bg-gray-800 active:scale-105"
          >
            Read More
          </Button>
        </div>
      )}
    </motion.section>
  );
}
