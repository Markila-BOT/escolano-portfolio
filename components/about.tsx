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
      className="mb-20 max-w-[45rem] text-center leading-8 sm:mb-0 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>About me</SectionHeading>
      <Balancer>
        <p className="mb-3">
          After gaining my initial experience as a member of the embedded
          development team in an{" "}
          <span className="font-semibold">automotive company</span> and
          understanding how <span className="font-semibold">ECUs</span>{" "}
          communicate with each other using{" "}
          <span className="font-semibold">standardized networks</span>, I
          discovered my true passion for software engineering.
        </p>

        <p className="mb-3">
          I’ve also played a significant role in the development of a travel web
          application that serves{" "}
          <span className="italic font-medium">millions</span> of users
          globally. That’s when I decided to focus on the{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% font-semibold">
            WEB
          </span>{" "}
          because I believe in{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% font-semibold">
            WEB
          </span>{" "}
          development I can serve more people that want to access valuable and
          necessary information.
        </p>

        <p className="mb-3">
          One of my favorite aspects of software engineering is the thrill of
          problem-solving, and understanding where is the root of every
          functionality. Now my expertise lies in a core stack comprising{" "}
          <span className="font-semibold text-[#61dafb]">React</span>,{" "}
          <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-800">
            Next.js
          </span>
          ,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 from-10% via-emerald-500 via-30% to-green-600 to-90% font-semibold">
            Node.js
          </span>
          , and I'm well-versed in{" "}
          <span className="font-semibold text-gray-400">TypeScript</span>.
          However, I maintain an insatiable curiosity for learning and am
          consistently on the lookout for new technologies, design systems, and
          methodologies to master.
        </p>

        <p className="mb-3">
          Beyond the professional sphere, I enjoy a balanced life, cherishing
          moments in which I'm not coding. My ultimate goal remains to continue
          to thrive, serve, and innovate in this dynamic field while embracing
          new challenges and opportunities.
        </p>
      </Balancer>
    </motion.section>
  );
}
