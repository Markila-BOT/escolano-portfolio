"use client";

import React, { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { experienceJourney, experiencesData } from "@/lib/data";
import { buildExperienceJourney } from "@/lib/experience-journey";
import useMediaQuery from "@/hooks/useMediaQuery";
import { Button } from "@/components/ui/button";
import { TagChip } from "@/components/ui/tag-chip";

const ExperienceJourneyStage = dynamic(
  () =>
    import("@/components/experience-journey-stage").then(
      (mod) => mod.ExperienceJourneyStage,
    ),
  { ssr: false },
);

const journeyRegionId = "experience-journey";
const journeyNameId = "experience-journey-name";

function RoleTags({ tags }: { tags: readonly string[] }) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <ul className="mt-3 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li key={tag}>
          <TagChip size="label">{tag}</TagChip>
        </li>
      ))}
    </ul>
  );
}

const travelStep = {
  ArrowRight: 1,
  ArrowUp: 1,
  ArrowLeft: -1,
  ArrowDown: -1,
  w: 1,
  W: 1,
  d: 1,
  D: 1,
  a: -1,
  A: -1,
  s: -1,
  S: -1,
} as const;

export default function ExperienceInteractive() {
  const isWide = useMediaQuery("(min-width: 960px)");
  const stops = useMemo(() => buildExperienceJourney(), []);
  const [visibleElements, setVisibleElements] = useState(3);
  const [isJourneyOpen, setIsJourneyOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isJourneyOpen) return;
    const handleDebugKeyDown = (event: KeyboardEvent) => {
      if (!(event.key in travelStep)) return;
      const target = event.target;
      // #region debug log
      fetch("http://127.0.0.1:63584/ingest/77afd7", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: "77afd7",
          runId: "before-fix",
          hypothesisId: "focus-or-handler",
          location: "experience-interactive.tsx:keyboard",
          message: "Journey navigation key target",
          data: {
            key: event.key,
            target: target instanceof HTMLElement ? target.tagName : null,
            insideJourney:
              target instanceof Element &&
              Boolean(target.closest(`#${journeyRegionId}`)),
            prevented: event.defaultPrevented,
            currentIndex,
          },
          timestamp: Date.now(),
        }),
      }).catch(() => {});
      // #endregion
    };
    document.addEventListener("keydown", handleDebugKeyDown);
    return () => document.removeEventListener("keydown", handleDebugKeyDown);
  }, [isJourneyOpen, currentIndex]);

  const handleReadMore = () => {
    setVisibleElements((prevCount) => prevCount + 3);
  };

  const handleToggleJourney = () => {
    setIsJourneyOpen((open) => !open);
    setCurrentIndex(0);
  };

  const moveTo = (index: number) => {
    if (index < 0 || index >= stops.length) {
      return;
    }

    setCurrentIndex(index);
  };

  const handleJourneyKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const step = travelStep[event.key as keyof typeof travelStep];
    if (step === undefined) {
      return;
    }

    event.preventDefault();
    moveTo(currentIndex + step);
  };

  const stop = stops[currentIndex];

  return (
    <>
      <div className="mb-8 flex justify-center">
        <Button
          type="button"
          variant="outline"
          aria-expanded={isJourneyOpen}
          aria-controls={journeyRegionId}
          onClick={handleToggleJourney}
        >
          {isJourneyOpen
            ? experienceJourney.showTimelineLabel
            : experienceJourney.showJourneyLabel}
        </Button>
      </div>
      {isJourneyOpen && stop !== undefined ? (
        <div
          id={journeyRegionId}
          role="region"
          aria-labelledby={`experience-heading ${journeyNameId}`}
          onKeyDown={handleJourneyKeyDown}
        >
          <span id={journeyNameId} className="sr-only">
            3D journey
          </span>
          <ExperienceJourneyStage stops={stops} currentIndex={currentIndex} />
          <div
            aria-live="polite"
            className="mx-auto mt-4 max-w-xl text-left text-foreground"
          >
            <p className="font-bold">{stop.title}</p>
            <p>{stop.location}</p>
            <p>{stop.date}</p>
            <p className="mt-1 text-muted-foreground">{stop.description}</p>
            <RoleTags tags={stop.tags} />
            <p className="mt-2">
              {experienceJourney.stopCount(currentIndex + 1, stops.length)}
            </p>
          </div>
          <div className="mt-4 flex justify-center gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={currentIndex === 0}
              onClick={() => {
                moveTo(currentIndex - 1);
              }}
            >
              {experienceJourney.previousLabel}
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={currentIndex === stops.length - 1}
              onClick={() => {
                moveTo(currentIndex + 1);
              }}
            >
              {experienceJourney.nextLabel}
            </Button>
          </div>
          <p className="mt-4 text-center text-sm text-foreground">
            {isWide
              ? experienceJourney.instructionWide
              : experienceJourney.instructionNarrow}
          </p>
        </div>
      ) : (
        <>
          <VerticalTimeline lineColor="" animate={false}>
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
                  <p className="!mt-1 !font-normal text-muted-foreground">
                    {item.description}
                  </p>
                  <RoleTags tags={"tags" in item ? item.tags : []} />
                </VerticalTimelineElement>
              </React.Fragment>
            ))}
          </VerticalTimeline>
          {visibleElements < experiencesData.length && (
            <div className="flex justify-center">
              <Button
                onClick={handleReadMore}
                variant="outline"
                className="mt-4 hover:scale-110 focus:scale-110 active:scale-105"
              >
                Read More
              </Button>
            </div>
          )}
        </>
      )}
    </>
  );
}
