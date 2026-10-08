"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useSoundContext } from "@/context/sound-context";
import { introGreetings, introRoleTitles } from "@/lib/data";
import { RoleTitleLoop } from "@/components/role-title-loop";
import { Button } from "@/components/ui/button";
import Balancer from "react-wrap-balancer";

const GREETING_TRANSITION_MS = 1500;

const greetingGlitchSlices = [
  { top: 0, bottom: 80, shift: -18 },
  { top: 20, bottom: 60, shift: 16 },
  { top: 40, bottom: 40, shift: -14 },
  { top: 60, bottom: 20, shift: 20 },
  { top: 80, bottom: 0, shift: -12 },
] as const;

type GreetingText = (typeof introGreetings)[number];

function GreetingGlitch({
  incoming,
  outgoing,
}: {
  incoming: GreetingText;
  outgoing: GreetingText;
}) {
  return (
    <span className="relative block min-h-[1.5em] w-full overflow-hidden">
      <motion.span
        aria-hidden="true"
        className="block"
        initial={{ opacity: 0.2, x: 0 }}
        animate={{
          opacity: [0.2, 1, 0.35, 1, 0.45, 1],
          x: [0, 3, -2, 2, -1, 0],
        }}
        transition={{
          duration: GREETING_TRANSITION_MS / 1000,
          times: [0, 0.18, 0.4, 0.62, 0.82, 1],
          ease: "linear",
        }}
      >
        {incoming}
      </motion.span>
      {greetingGlitchSlices.map((slice) => (
        <motion.span
          key={`in-${slice.top}`}
          aria-hidden="true"
          className="absolute inset-x-0 top-0 block"
          style={{ clipPath: `inset(${slice.top}% 0 ${slice.bottom}% 0)` }}
          initial={{ opacity: 0.4, skewX: 0, x: slice.shift }}
          animate={{
            opacity: [0.35, 1, 0.4, 0.95, 0.5, 1],
            skewX: [slice.shift > 0 ? 8 : -8, -5, 4, -2, 1, 0],
            x: [
              slice.shift,
              -slice.shift * 0.65,
              slice.shift * 0.4,
              -slice.shift * 0.2,
              slice.shift * 0.08,
              0,
            ],
          }}
          transition={{
            duration: GREETING_TRANSITION_MS / 1000,
            times: [0, 0.18, 0.4, 0.62, 0.82, 1],
            ease: "linear",
          }}
        >
          {incoming}
        </motion.span>
      ))}
      {greetingGlitchSlices
        .filter((_, index) => index % 2 === 0)
        .map((slice) => (
          <motion.span
            key={`out-${slice.top}`}
            aria-hidden="true"
            className="absolute inset-x-0 top-0 block"
            style={{ clipPath: `inset(${slice.top}% 0 ${slice.bottom}% 0)` }}
            initial={{ opacity: 0.85, x: -slice.shift }}
            animate={{
              opacity: [0.85, 0.15, 0.7, 0.1, 0, 0],
              x: [
                -slice.shift,
                slice.shift,
                -slice.shift * 0.4,
                slice.shift * 0.2,
                0,
                0,
              ],
            }}
            transition={{
              duration: GREETING_TRANSITION_MS / 1000,
              times: [0, 0.18, 0.4, 0.62, 0.82, 1],
              ease: "linear",
            }}
          >
            {outgoing}
          </motion.span>
        ))}
    </span>
  );
}

export default function IntroGreeting() {
  const { playCue } = useSoundContext();
  const settledIndexRef = useRef(0);
  const isTransitionRunningRef = useRef(false);
  const pointerInsideRef = useRef(false);
  const lastPointerTypeRef = useRef("");
  const transitionTimeoutRef = useRef<number | undefined>(undefined);
  const [settledIndex, setSettledIndex] = useState(0);
  const [announcedGreeting, setAnnouncedGreeting] = useState<
    (typeof introGreetings)[number]
  >(introGreetings[0]);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current !== undefined) {
        window.clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  function advanceGreeting() {
    if (isTransitionRunningRef.current) {
      return;
    }

    const nextIndex = (settledIndexRef.current + 1) % introGreetings.length;
    const nextGreeting = introGreetings[nextIndex];
    if (nextGreeting === undefined) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    setIsReducedMotion(prefersReducedMotion);
    setAnnouncedGreeting(nextGreeting);
    settledIndexRef.current = nextIndex;
    setSettledIndex(nextIndex);
    playCue("greeting");

    if (prefersReducedMotion) {
      setIsGlitching(false);
      return;
    }

    isTransitionRunningRef.current = true;
    setIsGlitching(true);
    transitionTimeoutRef.current = window.setTimeout(() => {
      isTransitionRunningRef.current = false;
      setIsGlitching(false);
    }, GREETING_TRANSITION_MS);
  }

  function handlePointerEnter(event: React.PointerEvent<HTMLButtonElement>) {
    lastPointerTypeRef.current = event.pointerType;
    if (event.pointerType !== "mouse") {
      return;
    }
    if (pointerInsideRef.current) {
      return;
    }

    pointerInsideRef.current = true;
    advanceGreeting();
  }

  function handlePointerLeave(event: React.PointerEvent<HTMLButtonElement>) {
    if (event.pointerType !== "mouse") {
      return;
    }

    pointerInsideRef.current = false;
  }

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    const isKeyboardActivation = event.detail === 0;
    if (!isKeyboardActivation && lastPointerTypeRef.current === "mouse") {
      return;
    }

    advanceGreeting();
  }

  const incomingGreeting = introGreetings[settledIndex] ?? introGreetings[0];
  const outgoingGreeting =
    introGreetings[
      (settledIndex + introGreetings.length - 1) % introGreetings.length
    ] ?? introGreetings[0];

  return (
    <motion.h1
      className="mb-10 mt-4 px-4 text-2xl font-medium !leading-[1.5] sm:text-4xl"
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <Balancer>
        <Button
          type="button"
          variant="ghost"
          aria-label={announcedGreeting}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          onClick={handleClick}
          className="block h-auto w-full whitespace-normal rounded-none bg-transparent px-0 py-0 text-2xl font-medium leading-[1.5] text-foreground subpixel-antialiased hover:bg-transparent hover:text-foreground sm:text-4xl"
        >
          <span className="relative block min-h-[1.5em] w-full overflow-hidden">
            {isReducedMotion || !isGlitching ? (
              <span aria-hidden="true" className="block">
                {incomingGreeting}
              </span>
            ) : (
              <GreetingGlitch
                incoming={incomingGreeting}
                outgoing={outgoingGreeting}
              />
            )}
          </span>
        </Button>
        <span className="font-bold">I'm Mark Escolano,</span> a
      </Balancer>{" "}
      <RoleTitleLoop
        titles={introRoleTitles}
        isPaused={isGlitching}
        className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% bg-clip-text text-6xl font-extrabold text-transparent"
      />
    </motion.h1>
  );
}
