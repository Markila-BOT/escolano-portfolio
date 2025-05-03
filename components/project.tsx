"use client";

import { projectsData } from "@/lib/data";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ReactPlayer from "react-player";
import { Label } from "./ui/label";
import { fadeInAnimationVariants } from "@/lib/animations";
import { LuLink } from "react-icons/lu";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { FaWindowClose } from "react-icons/fa";
import TextGenerateEffect from "./ui/text-generate-effect";

type ProjectProps = (typeof projectsData)[number];

export default function Project({
  title,
  imageUrl,
  videoUrl,
  websiteUrl,
  year,
  tags,
  description,
}: ProjectProps) {
  const [colorIndex, setColorIndex] = useState(0);

  const colors = [
    "from-green-600 from-10% via-emerald-500 via-30% to-green-600 to-90%",
    "from-violet-600 from-10% via-fuchsia-500 via-30% to-violet-600 to-90%",
    "from-orange-600 from-10% via-amber-500 via-30% to-orange-600 to-90%",
  ];

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateY,
            rotateX,
            transformStyle: "preserve-3d",
          }}
          className="relative h-72 w-full shrink-0 cursor-pointer snap-center scroll-ml-6 rounded-xl bg-gradient-to-r from-gray-600 to-gray-800 first:pl-6 last:pr-6 md:h-96"
        >
          <div
            style={{
              transform: "translateZ(75px)",
              transformStyle: "preserve-3d",
            }}
            className="absolute inset-4 grid grid-cols-3 grid-rows-5 place-content-center rounded-xl bg-gray-200 shadow-lg transition-all duration-300 hover:shadow-xl"
          >
            <Image
              alt="Project"
              src={imageUrl}
              className="col-span-3 row-span-2 h-4/5 rounded-t-xl object-cover"
            />
            <h3
              style={{
                transform: "translateZ(50px)",
              }}
              className="col-span-2 row-span-1 self-center break-words p-2 text-lg font-semibold text-gray-800 md:p-4 md:text-2xl"
            >
              {title}
            </h3>
            <p
              style={{
                transform: "translateZ(50px)",
              }}
              className="col-span-1 row-span-1 self-center break-words p-2 text-sm font-semibold text-gray-800 md:p-4 md:text-base"
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
                <li
                  className="rounded-full bg-black/[0.7] px-2 py-0.5 text-[0.5rem] uppercase tracking-wider text-white dark:text-white/70 md:px-3 md:py-1 md:text-[0.6rem]"
                  key={index}
                >
                  {tag.label}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </DrawerTrigger>
      <DrawerContent className="fixed bottom-0 left-0 right-0 mt-24 flex h-[93%] flex-col items-center rounded-t-[10px] bg-zinc-100 dark:bg-zinc-800">
        <div className="absolute right-[11rem] top-[-6rem] -z-10 h-[31.25rem] w-[31.25rem] rounded-full bg-[#fbe2e3] blur-[10rem] dark:bg-[#f64a8a] sm:w-[68.75rem]" />
        <div className="absolute left-[-35rem] top-[-1rem] -z-10 h-[31.25rem] w-[50rem] rounded-full bg-[#dbd7fb] blur-[10rem] dark:bg-[#af9fca] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem]" />
        <DrawerClose>
          <Button variant="ghost" className={"absolute right-5 top-5"}>
            <motion.div whileHover={{ rotate: 180 }}>
              <FaWindowClose size={24} />
            </motion.div>
          </Button>
        </DrawerClose>
        <div className="grid h-full w-full auto-rows-auto grid-cols-1 gap-4 p-4 md:grid-cols-5 md:p-8 lg:p-20">
          <Card className="row-span-4 border-2 border-gray-500 md:col-span-3">
            <ReactPlayer
              url={videoUrl}
              playing
              loop
              height={"100%"}
              width={"100%"}
              style={{ aspectRatio: "16/9" }}
            />
          </Card>
          <Card className="row-span-3 border-2 border-gray-500 md:col-span-2">
            <CardHeader>
              <CardTitle>Tech Stack</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-wrap justify-center gap-2 text-sm text-gray-800 md:text-lg">
                {tags.map((tag, index) => (
                  <motion.li
                    className="borderBlack flex items-center justify-center gap-2 rounded-xl bg-white px-3 py-2 dark:bg-white/10 dark:text-white/80 md:px-5 md:py-3"
                    key={index}
                    variants={fadeInAnimationVariants}
                    initial="initial"
                    whileInView="animate"
                    viewport={{
                      once: true,
                    }}
                    custom={index}
                  >
                    {tag.icon}
                    <Label>{tag.label}</Label>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="row-span-1 border-2 border-gray-500 pt-6 md:col-span-1">
            <CardContent className="flex h-full w-full items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="cursor-pointer"
              >
                <Link
                  href={websiteUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <LuLink size={40} className="md:w-15 md:h-15" />
                </Link>
              </motion.div>
            </CardContent>
          </Card>
          <Card className="row-span-1 border-2 border-gray-500 pt-6 md:col-span-1">
            <CardContent className="flex h-full w-full items-center justify-center">
              <motion.div
                className={`bg-gradient-to-r bg-clip-text font-extrabold text-transparent ${colors[colorIndex]}`}
                transition={{
                  duration: 2,
                }}
              >
                <h1 className="text-xl md:text-2xl">{title}</h1>
              </motion.div>
            </CardContent>
          </Card>
          <Card className="row-span-2 border-2 border-gray-500 md:col-span-5">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl">{title}</CardTitle>
              <CardDescription className="text-sm font-medium md:text-base">
                {description.map((p) => (
                  <div className="mb-3" key={p}>
                    <TextGenerateEffect words={p} />
                  </div>
                ))}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
