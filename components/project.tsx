"use client";

import { projectsData } from "@/lib/data";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Drawer } from "vaul";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ReactPlayer from "react-player";

type ProjectProps = (typeof projectsData)[number];

export default function Project({ title, imageUrl, year, tags }: ProjectProps) {
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

  return (
    <Drawer.Root shouldScaleBackground>
      <Drawer.Trigger asChild>
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
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-zinc-100 flex flex-col rounded-t-[10px] h-[93%] mt-24 fixed bottom-0 left-0 right-0 items-center">
          <div className="bg-[#fbe2e3] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-[#f64a8a]" />
          <div className="bg-[#dbd7fb] absolute top-[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-[#af9fca]" />
          <div className="grid w-3/4 h-full grid-cols-5 gap-5 p-20 auto-rows-4">
            <Card className="col-span-3 row-span-4 border-2 border-gray-500">
              <ReactPlayer
                url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
                playing
                loop
                height={"100%"}
                width={"100%"}
              />
            </Card>
            <Card className="col-span-2 row-span-3 border-2 border-gray-500">
              <CardHeader>
                <CardTitle>Card Title 2</CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
            <Card className="col-span-1 row-span-1 border-2 border-gray-500">
              <CardHeader>
                <CardTitle>Card Title 3</CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
            <Card className="col-span-1 row-span-1 border-2 border-gray-500">
              <CardHeader>
                <CardTitle>Card Title 4</CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
            <Card className="col-span-5 row-span-2 border-2 border-gray-500">
              <CardHeader>
                <CardTitle>Card Title 5</CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
