import { ObservedSection } from "@/components/observed-section";
import SectionHeading from "./section-heading";
import { aboutWorkflow } from "@/lib/data";
import Balancer from "react-wrap-balancer";

export default function About() {
  return (
    <ObservedSection
      name="About"
      className="mb-20 max-w-[45rem] scroll-mt-28 text-center leading-8 sm:mb-0"
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
          <span className="font-semibold text-primary">WEB</span>. With{" "}
          <span className="font-semibold text-primary">WEB</span> development I
          can reach more people who need the information.
        </p>

        <p className="mb-3">
          I like finding the root of a problem and tracing where a feature
          starts. Most of my work is{" "}
          <span className="font-semibold text-primary">React</span>,{" "}
          <span className="font-semibold text-primary">Next.js</span>,{" "}
          <span className="font-semibold text-primary">Node.js</span>, and{" "}
          <span className="font-semibold text-primary">TypeScript</span>.
        </p>

        <p className="mb-3">{aboutWorkflow}</p>

        <p className="mb-3">
          I also like the time when I am not coding. I want to keep building
          things people use, and I am fine with the next problem being one I
          have not seen before.
        </p>
      </Balancer>
    </ObservedSection>
  );
}
