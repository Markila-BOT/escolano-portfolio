import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact, FaHtml5, FaJs, FaNodeJs, FaGitAlt } from "react-icons/fa";
import { DiMysql } from "react-icons/di";
import {
  SiExpress,
  SiFirebase,
  SiFramer,
  SiGraphql,
  SiMongodb,
  SiNestjs,
  SiNextdotjs,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { LuGraduationCap } from "react-icons/lu";
import LAWSON_SMART_REPORT_IMAGE from "@/public/projects/lawson-smart-report.png";
import ASURION_IRIS_IMAGE from "@/public/projects/asurion-iris.png";
import BOSCH_GRADE_X_IMAGE from "@/public/projects/bosch-grade-x.png";
import DENSO_ECU_IMAGE from "@/public/projects/denso-ecu.png";
import MERCHANTSPRING_IMAGE from "@/public/projects/merchantspring.png";
import NEC_WEB_OTX_IMAGE from "@/public/projects/nec-web-otx.png";
import RAKUTEN_TRAVEL_IMAGE from "@/public/projects/rakuten-travel.png";
import WEALTHPARK_ACTIVITY_IMAGE from "@/public/projects/wealthpark-activity.png";
import WEALTHPARK_CHAT_ADMIN_IMAGE from "@/public/projects/wealthpark-chat-admin.png";
import WEALTHPARK_OWNER_APP_IMAGE from "@/public/projects/wealthpark-owner-app.png";
import WEALTHPARK_VALUATION_IMAGE from "@/public/projects/wealthpark-valuation.png";
import X_CLIMB_LAGOON_IMAGE from "@/public/projects/x-climb-lagoon.png";
import LOOKING_GLASS_IMAGE from "@/public/projects/looking-glass.png";

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const experiencesData = [
  {
    title: "Graduated bootcamp",
    location: "Miami, FL",
    description:
      "I graduated after 6 months of studying. I immediately found a job as a front-end developer.",
    icon: React.createElement(LuGraduationCap),
    date: "2019",
  },
  {
    title: "Front-End Developer",
    location: "Orlando, FL",
    description:
      "I worked as a front-end developer for 2 years in 1 job and 1 year in another job. I also upskilled to the full stack.",
    icon: React.createElement(CgWorkAlt),
    date: "2019 - 2021",
  },
  {
    title: "Full-Stack Developer",
    location: "Houston, TX",
    description:
      "I'm now a full-stack developer working as a freelancer. My stack includes React, Next.js, TypeScript, Tailwind, Prisma and MongoDB. I'm open to full-time opportunities.",
    icon: React.createElement(FaReact),
    date: "2021 - present",
  },
] as const;

export const projectsData = [
  {
    title: "Valuation",
    year: "2022-Present",
    tags: [
      "TypeScript",
      "React",
      "NextJS",
      "Tailwind CSS",
      "Jotai",
      "Zustand",
      "REST",
    ],
    imageUrl: WEALTHPARK_VALUATION_IMAGE,
  },
  {
    title: "Owner Web App",
    year: "2021-Present",
    tags: [
      "TypeScript",
      "React",
      "Styled Components",
      "Tailwind CSS",
      "Jotai",
      "REST",
    ],
    imageUrl: WEALTHPARK_OWNER_APP_IMAGE,
  },
  {
    title: "Workflow",
    year: "2021-Present",
    tags: ["JavaScript", "React", "Styled Components", "Redux", "REST"],
    imageUrl: WEALTHPARK_ACTIVITY_IMAGE,
  },
  {
    title: "Chat-Admin",
    year: "2021-Present",
    tags: ["JavaScript", "React", "Material UI", "Redux", "Websockets"],
    imageUrl: WEALTHPARK_CHAT_ADMIN_IMAGE,
  },
  {
    title: "LookingGlass",
    year: "2020-2020",
    tags: ["JavaScript", "Angular", "Cordova"],
    imageUrl: LOOKING_GLASS_IMAGE,
  },
  {
    title: "MerchantSpring",
    year: "2020-2021",
    tags: [
      "TypeScript",
      "React",
      "Material UI",
      "Redux",
      "Styled Components",
      "Node.js",
      "Express",
      "MySQL",
      "Jest",
      "Docker",
    ],
    imageUrl: MERCHANTSPRING_IMAGE,
  },
  {
    title: "Lagoon",
    year: "2020-2021",
    tags: ["TypeScript", "React", "Redux", "Styled Components", "Firebase"],
    imageUrl: X_CLIMB_LAGOON_IMAGE,
  },
  {
    title: "Iris",
    year: "2019-2020",
    tags: [
      "TypeScript",
      "React",
      "Redux",
      "Styled Components",
      "Webpack",
      "Cypress",
    ],
    imageUrl: ASURION_IRIS_IMAGE,
  },
  {
    title: "Rakuten Travel",
    year: "2018-2020",
    tags: [
      "JavaScript",
      "React",
      "Flux",
      "Redux",
      "LESS/SCSS",
      "Webpack",
      "Cypress",
    ],
    imageUrl: RAKUTEN_TRAVEL_IMAGE,
  },
  {
    title: "ADT(Alliance Diagnostic Tool)",
    year: "2017-2018",
    tags: ["JavaScript", "Angular", "Bower", "Grunt", "LESS/SCSS"],
    imageUrl: BOSCH_GRADE_X_IMAGE,
  },
  {
    title: "WebOTX",
    year: "2016-2017",
    tags: ["Java", "Spring Tools"],
    imageUrl: NEC_WEB_OTX_IMAGE,
  },
  {
    title: "ECUs Non-Toyota-Diesel",
    year: "2014-2016",
    tags: ["C", "Misra C", "GAIO Tech"],
    imageUrl: DENSO_ECU_IMAGE,
  },
  {
    title: "Lawson Smart Report",
    year: "2013-2014",
    tags: ["Java", "Spring Tools"],
    imageUrl: LAWSON_SMART_REPORT_IMAGE,
  },
] as const;

export const skillsData = [
  { label: "HTML", icon: React.createElement(FaHtml5) },
  { label: "CSS", icon: React.createElement(FaReact) },
  { label: "JavaScript", icon: React.createElement(FaJs) },
  { label: "TypeScript", icon: React.createElement(SiTypescript) },
  { label: "React", icon: React.createElement(FaReact) },
  { label: "Next.js", icon: React.createElement(SiNextdotjs) },
  { label: "Node.js", icon: React.createElement(FaNodeJs) },
  { label: "Git", icon: React.createElement(FaGitAlt) },
  { label: "Tailwind", icon: React.createElement(SiTailwindcss) },
  { label: "MongoDB", icon: React.createElement(SiMongodb) },
  { label: "MySQL", icon: React.createElement(DiMysql) },
  { label: "Firebase", icon: React.createElement(SiFirebase) },
  { label: "Redux", icon: React.createElement(SiRedux) },
  { label: "GraphQL", icon: React.createElement(SiGraphql) },
  { label: "Nest.js", icon: React.createElement(SiNestjs) },
  { label: "Express", icon: React.createElement(SiExpress) },
  { label: "Framer Motion", icon: React.createElement(SiFramer) },
] as const;
