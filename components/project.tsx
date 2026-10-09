"use client";

import { projectsData } from "@/lib/data";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { TagChip } from "@/components/ui/tag-chip";

type ProjectProps = (typeof projectsData)[number] & {
  onOpen: React.MouseEventHandler<HTMLButtonElement>;
};

export default function Project({
  title,
  imageUrl,
  year,
  tags,
  onOpen,
}: ProjectProps) {
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["17.5deg", "-17.5deg"],
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["-17.5deg", "17.5deg"],
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (prefersReducedMotion) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY: prefersReducedMotion ? 0 : rotateY,
        rotateX: prefersReducedMotion ? 0 : rotateX,
        transformStyle: "preserve-3d",
      }}
      className="relative h-72 w-full shrink-0 cursor-pointer snap-center scroll-ml-6 rounded-xl bg-gradient-to-r from-primary/30 to-secondary text-left first:pl-6 last:pr-6 md:h-96"
    >
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-4 grid grid-cols-3 grid-rows-5 place-content-center rounded-xl bg-card text-card-foreground shadow-lg transition-all duration-300 hover:shadow-xl"
      >
        <Image
          alt="Project"
          src={imageUrl}
          sizes="(min-width: 1024px) 360px, (min-width: 768px) 46vw, 85vw"
          className="col-span-3 row-span-2 h-4/5 rounded-t-xl object-cover"
        />
        <h3
          style={{
            transform: "translateZ(50px)",
          }}
          className="col-span-2 row-span-1 self-center break-words p-2 text-lg font-semibold md:p-4 md:text-2xl"
        >
          {title}
        </h3>
        <p
          style={{
            transform: "translateZ(50px)",
          }}
          className="col-span-1 row-span-1 self-center break-words p-2 text-sm font-semibold md:p-4 md:text-base"
        >
          {year}
        </p>
        <ul
          style={{
            transform: "translateZ(50px)",
          }}
          className="col-span-3 row-span-2 flex flex-wrap gap-1 p-2 sm:mt-auto md:p-4"
        >
          {tags.map((tag, index) => (
            <li key={index}>
              <TagChip size="compact">{tag.label}</TagChip>
            </li>
          ))}
        </ul>
      </div>
    </motion.button>
  );
}
