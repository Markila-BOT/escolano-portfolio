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
    ["17.5deg", "-17.5deg"]
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["-17.5deg", "17.5deg"]
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
          className="relative cursor-pointer h-96 w-80 rounded-xl bg-gradient-to-r from-gray-600 to-gray-800 snap-center scroll-ml-6 shrink-0 first:pl-6 last:pr-6 hover:rgb"
        >
          <div
            style={{
              transform: "translateZ(75px)",
              transformStyle: "preserve-3d",
            }}
            className="absolute grid grid-cols-3 grid-rows-5 bg-gray-200 shadow-lg inset-4 place-content-center rounded-xl"
          >
            <Image
              alt="Project"
              src={imageUrl}
              className="col-span-3 row-span-2 rounded-t-xl h-4/5"
            />
            <h3
              style={{
                transform: "translateZ(50px)",
              }}
              className="self-center col-span-2 row-span-1 p-4 text-2xl font-semibold text-gray-800 break-words "
            >
              {title}
            </h3>
            <p
              style={{
                transform: "translateZ(50px)",
              }}
              className="self-center col-span-1 row-span-1 p-4 font-semibold text-gray-800 break-words"
            >
              {year}
            </p>
            <ul
              style={{
                transform: "translateZ(50px)",
              }}
              className="flex flex-wrap col-span-3 row-span-2 gap-1 p-4 sm:mt-auto"
            >
              {tags.map((tag, index) => (
                <li
                  className="bg-black/[0.7] px-3 py-1 text-[0.6rem] uppercase tracking-wider text-white rounded-full dark:text-white/70"
                  key={index}
                >
                  {tag.label}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </DrawerTrigger>
      <DrawerContent className="dark:bg-zinc-800 bg-zinc-100 flex flex-col rounded-t-[10px] h-[93%] mt-24 fixed bottom-0 left-0 right-0 items-center">
        <div className="bg-[#fbe2e3] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-[#f64a8a]" />
        <div className="bg-[#dbd7fb] absolute top-[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-[#af9fca]" />
        <DrawerClose>
          <Button variant="ghost" className={"absolute top-5 right-5"}>
            <motion.div whileHover={{ rotate: 180 }}>
              <FaWindowClose size={24} />
            </motion.div>
          </Button>
        </DrawerClose>
        <div className="grid w-3/4 h-full grid-cols-5 gap-5 p-20 auto-rows-4">
          <Card className="col-span-3 row-span-4 border-2 border-gray-500">
            <ReactPlayer
              url={videoUrl}
              playing
              loop
              height={"100%"}
              width={"100%"}
            />
          </Card>
          <Card className="col-span-2 row-span-3 border-2 border-gray-500">
            <CardHeader>
              <CardTitle>Tech Stack</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-wrap justify-center gap-2 text-lg text-gray-800">
                {tags.map((tag, index) => (
                  <motion.li
                    className="flex items-center justify-center gap-2 px-5 py-3 bg-white borderBlack rounded-xl dark:bg-white/10 dark:text-white/80"
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
          <Card className="col-span-1 row-span-1 pt-6 border-2 border-gray-500">
            <CardContent className="flex items-center justify-center w-full h-full">
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
                  <LuLink size={60} />
                </Link>
              </motion.div>
            </CardContent>
          </Card>
          <Card className="col-span-1 row-span-1 pt-6 border-2 border-gray-500">
            <CardContent className="flex items-center justify-center w-full h-full">
              <motion.div
                className={`font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${colors[colorIndex]}`}
                transition={{
                  duration: 2,
                }}
              >
                <h1 className="text-2xl">{title}</h1>
              </motion.div>
            </CardContent>
          </Card>
          <Card className="col-span-5 row-span-2 border-2 border-gray-500">
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription className="font-medium">
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
