"use client";

import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import Balancer from "react-wrap-balancer";

export default function About() {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      className="mb-20 max-w-[45rem] scroll-mt-28 text-center leading-8 sm:mb-0"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>About me</SectionHeading>
      <Balancer>
        <p className="mb-3">
          I started on an embedded team at an{" "}
          <span className="font-semibold">automotive company</span>, working on
          how <span className="font-semibold">ECUs</span> talk to each other
          over <span className="font-semibold">standardized networks</span>.
          That is where I got interested in software engineering.
        </p>

        <p className="mb-3">
          I later worked on a travel site used by{" "}
          <span className="font-medium italic">millions</span> of people. That
          is when I decided to focus on the{" "}
          <span className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% bg-clip-text font-semibold text-transparent">
            WEB
          </span>
          . With{" "}
          <span className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% bg-clip-text font-semibold text-transparent">
            WEB
          </span>{" "}
          development I can reach more people who need the information.
        </p>

        <p className="mb-3">
          I like finding the root of a problem and tracing where a feature
          starts. Most of my work is{" "}
          <span className="font-semibold text-[#61dafb]">React</span>,{" "}
          <span className="bg-gradient-to-r from-gray-200 to-gray-800 bg-clip-text font-semibold text-transparent">
            Next.js
          </span>
          ,{" "}
          <span className="bg-gradient-to-r from-green-600 from-10% via-emerald-500 via-30% to-green-600 to-90% bg-clip-text font-semibold text-transparent">
            Node.js
          </span>
          , and <span className="font-semibold text-gray-400">TypeScript</span>.
          I still pick up new tools, design systems, and ways of working.
        </p>

        <p className="mb-3">
          I also like the time when I am not coding. I want to keep building
          things people use, and I am fine with the next problem being one I
          have not seen before.
        </p>
      </Balancer>
    </motion.section>
  );
}
