"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import profile from "@/public/profile.png";
import Balancer from "react-wrap-balancer";

export default function Intro() {
  const { ref } = useSectionInView("Home", 0.5);
  const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const GREETINGS = ["Welcome!🇬🇧🇺🇸 👋", "Mabuhay!🇵🇭 👋", "ようこそ🇯🇵 🙇"];
  const interval = useRef<number | undefined>(undefined);
  const [greeting, setGreeting] = useState(0);

  function animateText(event: React.MouseEvent<HTMLHeadingElement>) {
    let iteration = 0;

    if (interval.current) {
      clearInterval(interval.current);
    }

    interval.current = window.setInterval(() => {
      const target = event.target! as HTMLHeadingElement;
      const dataset = target.dataset.value!;

      target.innerText = target.innerText
        .split("")
        .map((letter, index) => {
          if (index < iteration) {
            return dataset[index];
          }
          return LETTERS[Math.floor(Math.random() * 26)];
        })
        .join("");
      if (iteration >= dataset.length!) {
        clearInterval(interval.current);
      }
      iteration += 1 / 3;
      setGreeting(Math.floor(Math.random() * GREETINGS.length));
    }, 30);
  }

  useEffect(() => {
    return () => {
      if (interval.current) {
        clearInterval(interval.current as number);
      }
    };
  }, []);

  return (
    <section
      ref={ref}
      id="home"
      className="mb-20 max-w-[50rem] text-center sm:mb-0 scroll-mt-28"
    >
      <div className="flex items-center justify-center">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "tween",
              duration: 0.2,
            }}
          >
            <Image
              src={profile}
              alt="Mark Escolano portrait"
              width="240"
              height="240"
              quality="95"
              priority={true}
              className="h-40 w-40 rounded-full object-cover border-[0.35rem] border-white shadow-xl"
            />
          </motion.div>
          <motion.span
            className="absolute bottom-0 right-0 text-4xl"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 125,
              delay: 0.1,
              duration: 0.7,
            }}
          >
            💻
          </motion.span>
        </div>
      </div>

      <motion.h1
        className="mb-10 mt-4 px-4 text-2xl font-medium !leading-[1.5] sm:text-4xl"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Balancer>
          <h1
            className="subpixel-antialiased leading-9"
            data-value={`${GREETINGS[greeting]}`}
            onMouseOver={animateText}
          >
            {GREETINGS[greeting]}
          </h1>
          <span className="font-bold">I'm Mark Escolano,</span> a{" "}
          <strong className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
            Senior Software Engineer
          </strong>
          <span className="font-bold">
            {" "}
            with a strong focus on <span className="underline">
              frontend
            </span>{" "}
            technologies.
          </span>
        </Balancer>
      </motion.h1>
    </section>
  );
}
