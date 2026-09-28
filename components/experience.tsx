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
import { motion } from "framer-motion";
import { Button } from "./ui/button";

export default function Experience() {
  const { ref } = useSectionInView("Experience");

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
      className="mb-28 w-full scroll-mt-28 sm:mb-40"
    >
      <SectionHeading>My experience</SectionHeading>
      <VerticalTimeline lineColor="">
        {experiencesData.slice(0, visibleElements).map((item, index) => (
          <React.Fragment key={index}>
            <VerticalTimelineElement
              visible={true}
              contentStyle={{
                background: "hsl(var(--card))",
                color: "hsl(var(--foreground))",
                boxShadow: "none",
                border: "1px solid hsl(var(--border))",
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
                background: "hsl(var(--card))",
                color: "hsl(var(--primary))",
                boxShadow: "0 0 0 3px hsl(var(--border))",
                fontSize: "1.5rem",
              }}
            >
              <h3 className="font-bold capitalize">{item.title}</h3>
              <p className="!mt-0 font-normal">{item.location}</p>
              <p className="text-muted-foreground !mt-1 !font-normal">
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
            className="mt-4 hover:scale-110 focus:scale-110 active:scale-105"
          >
            Read More
          </Button>
        </div>
      )}
    </motion.section>
  );
}
