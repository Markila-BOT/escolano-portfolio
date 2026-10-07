import React from "react";
import type { JourneySceneDescriptor } from "@/lib/journey-scene-types";
import { CgWorkAlt } from "react-icons/cg";
import {
  FaReact,
  FaHtml5,
  FaJs,
  FaNodeJs,
  FaGitAlt,
  FaGrunt,
  FaJava,
} from "react-icons/fa";
import { DiDocker, DiMysql } from "react-icons/di";
import {
  SiAngular,
  SiExpress,
  SiFirebase,
  SiFramer,
  SiGraphql,
  SiJavascript,
  SiMaterialdesign,
  SiMongodb,
  SiNestjs,
  SiNextdotjs,
  SiRedux,
  SiStyledcomponents,
  SiTailwindcss,
  SiTypescript,
  SiXstate,
  SiRadixui,
  SiApachecordova,
  SiXcode,
  SiCypress,
  SiJest,
  SiTerraform,
  SiVite,
  SiWebpack,
  SiFlux,
  SiLess,
  SiBower,
  SiSpring,
  SiLevelsdotfyi,
  SiAntdesign,
  SiMui,
  SiReactquery,
  SiPostgresql,
  SiRust,
} from "react-icons/si";
import {
  TbBrandCSharp,
  TbBrandRedux,
  TbCloudDataConnection,
  TbHexagonLetterC,
  TbToggleRight,
} from "react-icons/tb";
import { AiOutlineApi } from "react-icons/ai";
import {
  FaLaptopCode,
  FaIdCard,
  FaPlaneDeparture,
  FaPlaneArrival,
} from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import LAWSON_SMART_REPORT_IMAGE from "@/public/projects/lawson-smart-report.png";
import ASURION_IRIS_IMAGE from "@/public/projects/asurion-iris.png";
import BOSCH_GRADE_X_IMAGE from "@/public/projects/bosch-grade-x.png";
import DENSO_ECU_IMAGE from "@/public/projects/denso-ecu.png";
import MERCHANTSPRING_IMAGE from "@/public/projects/merchantspring.png";
import NEC_WEB_OTX_IMAGE from "@/public/projects/nec-web-otx.png";
import RAKUTEN_TRAVEL_IMAGE from "@/public/projects/rakuten-travel.png";
import WEALTHPARK_ACTIVITY_IMAGE from "@/public/projects/wealthpark-activity.png";
import WEALTHPARK_CHAT_ADMIN_IMAGE from "@/public/projects/wealthpark-chat-admin.png";
import WEALTHPARK_HOUSE_ELF_IMAGE from "@/public/projects/wealthpark-house-elf.png";
import MATTERWORX_IMAGE from "@/public/projects/matterworx.png";
import POTATO_V3_IMAGE from "@/public/projects/potato-v3.png";
import WEALTHPARK_OWNER_APP_IMAGE from "@/public/projects/wealthpark-owner-app.png";
import WEALTHPARK_VALUATION_IMAGE from "@/public/projects/wealthpark-valuation.png";
import X_CLIMB_LAGOON_IMAGE from "@/public/projects/x-climb-lagoon.png";
import LOOKING_GLASS_LOGIN_IMAGE from "@/public/projects/looking-glass-login.jpg";
import LOOKING_GLASS_SHOP_IMAGE from "@/public/projects/looking-glass-shop.jpg";

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

export const introCallToAction = {
  positioning:
    "I help product teams take new code all the way to deployment, writing most of it in TypeScript with AI and spec-driven development.",
  startLabel: "Contact",
} as const;

export const aboutWorkflow =
  "Most days I start from a spec, write the change with Claude Code, Codex, and Cursor, and check it with tests. I own the result. That is AI-assisted engineering, test-driven development, and spec-driven development." as const;

export const experienceJourney = {
  showJourneyLabel: "Show 3D journey",
  showTimelineLabel: "Show timeline",
  instructionWide:
    "Use the arrow keys or WASD to travel. Drag to look. Scroll to zoom.",
  instructionNarrow:
    "Tap Previous or Next to travel. Drag to look. Pinch or scroll to zoom.",
  previousLabel: "Previous",
  nextLabel: "Next",
  stopCount: (current: number, total: number) => `Stop ${current} of ${total}`,
} as const;

export const introGreetings = [
  "Welcome!🇬🇧🇺🇸 👋",
  "Mabuhay!🇵🇭 👋",
  "ようこそ🇯🇵 🙇",
] as const;

export const introRoleTitles = [
  "Senior Software Engineer",
  "Full Stack Engineer",
  "Lead Software Engineer",
  "Front-End Engineer",
] as const;

export const firstVisitNotice = {
  title: "Hello!",
  description: "Thanks for stopping by — enjoy the site.",
} as const;

export function returnVisitNotice(visitCount: number) {
  return {
    title: "Welcome back!",
    description: `Good to see you again — visit #${visitCount} on this device.`,
  };
}

export const experiencesData = [
  {
    title: "Senior Software Engineer",
    location: "Quezon City, Philippines",
    description: "I work at a property-management technology company.",
    tags: [
      "TypeScript",
      "React",
      "NextJS",
      "Tailwind CSS",
      "GraphQL",
      "NestJS",
    ],
    icon: React.createElement(CgWorkAlt),
    date: "2022-Present",
  },
  {
    title: "Full Stack Engineer",
    location: "South Melbourne, Australia",
    description: "I worked full time as a full stack engineer.",
    tags: ["TypeScript", "React", "Node.js", "Express", "MySQL"],
    icon: React.createElement(FaReact),
    date: "2021",
  },
  {
    title: "Lead Software Engineer",
    location: "Quezon City, Philippines",
    description: "I led a few front-end engineers.",
    tags: ["TypeScript", "React"],
    icon: React.createElement(LiaChalkboardTeacherSolid),
    date: "2021",
  },
  {
    title: "Fly back home",
    location: "Quezon City, Philippines",
    description: "I came home and kept working. 🇵🇭",
    icon: React.createElement(FaPlaneArrival),
    date: "2021",
  },
  {
    title: "Front-End Engineer",
    location: "Tokyo, Japan",
    description: "I built and maintained web apps in React.",
    tags: ["TypeScript", "React", "JavaScript"],
    icon: React.createElement(CgWorkAlt),
    date: "2020",
  },
  {
    title: "Apply training knowledge",
    location: "Tokyo, Japan",
    description: "I worked with product managers and other engineers.",
    tags: ["TypeScript", "React", "Redux"],
    icon: React.createElement(FaPlaneArrival),
    date: "2019",
  },
  {
    title: "Training in United Kingdom",
    location: "Manchester, United Kingdom",
    description:
      "I trained with teammates from different places and learned new skills. 🇬🇧",
    tags: ["JavaScript", "React"],
    icon: React.createElement(FaPlaneDeparture),
    date: "2018",
  },
  {
    title: "Fly to Japan",
    location: "Tokyo, Japan",
    description: "I went to work in Japan. 🇯🇵",
    icon: React.createElement(FaPlaneDeparture),
    date: "2017",
  },
  {
    title: "Promoted",
    location: "Makati, Philippines",
    description: "I was promoted to software engineer II.",
    tags: ["Java"],
    icon: React.createElement(SiLevelsdotfyi),
    date: "2016",
  },
  {
    title: "First Job",
    location: "Makati, Philippines",
    description: "I got my first job as a software engineer.",
    tags: ["C"],
    icon: React.createElement(FaIdCard),
    date: "2014",
  },
  {
    title: "Internship",
    location: "Taguig, Philippines",
    description: "I interned at Lawson as a Java developer.",
    tags: ["Java"],
    icon: React.createElement(FaLaptopCode),
    date: "2013",
  },
  {
    title: "Education",
    location: "Mandaluyong, Philippines",
    description: "I earned a bachelor's degree in computer engineering.",
    icon: React.createElement(LuGraduationCap),
    date: "2013-2014",
  },
] as const;

export const experienceJourneyScenes = [
  {
    title: "Education",
    visual: {
      setting: "campus",
      activity: "study",
      careerStage: "student",
      props: "books",
    },
  },
  {
    title: "Internship",
    visual: {
      setting: "office",
      activity: "code",
      careerStage: "junior",
      props: "workstation",
    },
  },
  {
    title: "First Job",
    visual: {
      setting: "office",
      activity: "code",
      careerStage: "junior",
      props: "workstation",
    },
  },
  {
    title: "Promoted",
    visual: {
      setting: "team",
      activity: "celebrate",
      careerStage: "professional",
      props: "planning",
    },
  },
  {
    title: "Fly to Japan",
    visual: {
      setting: "terminal",
      activity: "travel",
      careerStage: "professional",
      props: "luggage",
    },
  },
  {
    title: "Training in United Kingdom",
    visual: {
      setting: "training",
      activity: "learn",
      careerStage: "professional",
      props: "laptop",
    },
  },
  {
    title: "Apply training knowledge",
    visual: {
      setting: "team",
      activity: "collaborate",
      careerStage: "professional",
      props: "planning",
    },
  },
  {
    title: "Front-End Engineer",
    visual: {
      setting: "office",
      activity: "code",
      careerStage: "professional",
      props: "dual-monitors",
    },
  },
  {
    title: "Fly back home",
    visual: {
      setting: "terminal",
      activity: "travel",
      careerStage: "professional",
      props: "luggage",
    },
  },
  {
    title: "Lead Software Engineer",
    visual: {
      setting: "team",
      activity: "guide",
      careerStage: "senior",
      props: "planning",
    },
  },
  {
    title: "Full Stack Engineer",
    visual: {
      setting: "office",
      activity: "code",
      careerStage: "senior",
      props: "laptop",
    },
  },
  {
    title: "Senior Software Engineer",
    visual: {
      setting: "office",
      activity: "code",
      careerStage: "senior",
      props: "dual-monitors",
    },
  },
] as const satisfies readonly {
  title: (typeof experiencesData)[number]["title"];
  visual: JourneySceneDescriptor;
}[];

export const projectCarousel = {
  position: (current: number, total: number) => `${current} of ${total}`,
} as const;

export const projectDrawer = {
  previous: (title?: string) =>
    title ? `Previous ${title}` : "Previous project",
  next: (title?: string) => (title ? `Next ${title}` : "Next project"),
} as const;

export const projectScreenshots = {
  previous: "Previous image",
  next: "Next image",
  position: (current: number, total: number) => `${current} of ${total}`,
} as const;

export const projectCaseStudy = {
  problem: "Problem",
  role: "Role",
  outcome: "Outcome",
} as const;

export const projectBuildNote = {
  label: "Build",
} as const;

export const projectsData = [
  {
    title: "MatterWorx",
    year: "2026-Present",
    description: [
      "MatterWorx is a private platform for workforce programs. Program admins open a dashboard for submissions, onboarding reviews, active assignments, pending timesheets, pending invoices, and credentials that are expiring or already expired. Each count links into that queue.",
      "A placement runs from an open position to a candidate submission, an assignment, shifts, and credentials. Timesheets, invoices, and remittance sit with the analytics, so hiring, time, and billing stay in one console.",
      "Program settings and organization tools configure the program. A performance view charts active workers by worksite and year.",
    ],
    caseStudy: {
      problem:
        "Program admins need one place for submissions, onboarding reviews, active assignments, pending timesheets, pending invoices, and credentials that are expiring or already expired.",
      role: "A placement runs from an open position to a candidate submission, an assignment, shifts, and credentials. Program settings and organization tools configure the program.",
      outcome:
        "Timesheets, invoices, and remittance sit with the analytics, so hiring, time, and billing stay in one console. Each count links into that queue.",
    },
    tags: [
      { label: "TypeScript", icon: React.createElement(SiTypescript) },
      { label: "React", icon: React.createElement(FaReact) },
      { label: "NextJS", icon: React.createElement(SiNextdotjs) },
      { label: "Material UI", icon: React.createElement(SiMui) },
      { label: "TanStack Query", icon: React.createElement(SiReactquery) },
      { label: "DevCycle", icon: React.createElement(TbToggleRight) },
      { label: "PostgreSQL", icon: React.createElement(SiPostgresql) },
      { label: "C#", icon: React.createElement(TbBrandCSharp) },
    ],
    imageUrl: MATTERWORX_IMAGE,
  },
  {
    title: "Potato V3",
    year: "2024-Present",
    description: [
      "Potato V3 is WealthPark's console for property-management companies. It replaces the original Potato workspace. Operators handle owners, chat, and program settings in one app.",
      "Chat is live. Property managers message owners, follow topics, share files, and see unread badges on the owner list and the room list.",
      "Settings cover users, roles, and property groups. The console is in English, Japanese, and Traditional Chinese.",
    ],
    caseStudy: {
      problem:
        "This console replaces the original Potato workspace. Operators need owners, chat, and program settings in one app.",
      role: "Chat is live. Property managers message owners, follow topics, share files, and see unread badges. Settings cover users, roles, and property groups.",
      outcome:
        "Operators handle owners, chat, and program settings in one app. The console is in English, Japanese, and Traditional Chinese.",
    },
    tags: [
      { label: "TypeScript", icon: React.createElement(SiTypescript) },
      { label: "React", icon: React.createElement(FaReact) },
      { label: "NextJS", icon: React.createElement(SiNextdotjs) },
      { label: "Tailwind CSS", icon: React.createElement(SiTailwindcss) },
      { label: "Radix UI", icon: React.createElement(SiRadixui) },
      { label: "TanStack Query", icon: React.createElement(SiReactquery) },
      { label: "Jotai", icon: React.createElement(SiXstate) },
    ],
    imageUrl: POTATO_V3_IMAGE,
  },
  {
    title: "Valuation",
    year: "2022-Present",
    description: [
      "Valuation is how operators put a number on a property. They inspect its condition, amenities, and location. The people who run the property add what they know about maintenance and day-to-day operations.",
      "The comparison also looks at distance from amenities and landmarks, and at similar properties nearby. Floor plan, age, and condition go into the fair market value, along with the other details that matter for that property.",
    ],
    tags: [
      { label: "TypeScript", icon: React.createElement(SiTypescript) },
      { label: "React", icon: React.createElement(FaReact) },
      { label: "NextJS", icon: React.createElement(SiNextdotjs) },
      { label: "Tailwind CSS", icon: React.createElement(SiTailwindcss) },
      { label: "Framer Motion", icon: React.createElement(SiFramer) },
      { label: "Jotai", icon: React.createElement(SiXstate) },
      { label: "Zustand", icon: React.createElement(TbBrandRedux) },
      { label: "NestJS", icon: React.createElement(SiNestjs) },
      { label: "GraphQL", icon: React.createElement(SiGraphql) },
    ],
    imageUrl: WEALTHPARK_VALUATION_IMAGE,
    videoUrl: "https://youtu.be/gK5PkM5Okz8",
    websiteUrl: "https://demo.business.wealth-park.com/",
  },
  {
    title: "Owner Web App",
    year: "2021-Present",
    description: [
      "The Owner app is for property owners and the companies that manage their buildings. They share contracts and repair photos there, instead of hunting through paper or old email.",
      "The documents sit in one place, so both sides spend less time on paper and can find a file when they need to decide what to do next.",
    ],
    caseStudy: {
      problem:
        "Property owners and the companies that manage their buildings were hunting through paper or old email for contracts and repair photos.",
      role: "The Owner app is where they share contracts and repair photos.",
      outcome:
        "The documents sit in one place, so both sides spend less time on paper and can find a file when they need to decide what to do next.",
    },
    tags: [
      { label: "TypeScript", icon: React.createElement(SiTypescript) },
      { label: "React", icon: React.createElement(FaReact) },
      {
        label: "Styled Components",
        icon: React.createElement(SiStyledcomponents),
      },
      { label: "Tailwind CSS", icon: React.createElement(SiTailwindcss) },
      { label: "Framer Motion", icon: React.createElement(SiFramer) },
      { label: "RadixUI", icon: React.createElement(SiRadixui) },
      { label: "Jotai", icon: React.createElement(SiXstate) },
      { label: "Webpack", icon: React.createElement(SiWebpack) },
      { label: "GraphQL", icon: React.createElement(SiGraphql) },
    ],
    imageUrl: WEALTHPARK_OWNER_APP_IMAGE,
    videoUrl: "https://youtu.be/Vm0_QV5_snY",
    websiteUrl: "https://owner.wealth-park.com/",
  },
  {
    title: "Workflow",
    year: "2021-Present",
    description: [
      "Workflow sits beside the Owner app. It lists what is happening on a property: expenses, income, and general updates. Each item has a category and a status, so managers and owners can see what is waiting and what is done.",
      "It is tied to the Owner app, so both sides can follow a task and act on its status.",
    ],
    caseStudy: {
      problem:
        "Managers and owners need to see expenses, income, and general updates on a property, and what is waiting versus done.",
      role: "Workflow sits beside the Owner app and lists those items, each with a category and a status.",
      outcome:
        "It is tied to the Owner app, so both sides can follow a task and act on its status.",
    },
    tags: [
      { label: "JavaScript", icon: React.createElement(SiJavascript) },
      { label: "React", icon: React.createElement(FaReact) },
      {
        label: "Styled Components",
        icon: React.createElement(SiStyledcomponents),
      },
      { label: "Redux", icon: React.createElement(SiRedux) },
      { label: "Vite", icon: React.createElement(SiVite) },
      { label: "GraphQL", icon: React.createElement(SiGraphql) },
    ],
    imageUrl: WEALTHPARK_ACTIVITY_IMAGE,
    videoUrl: "https://youtu.be/qTU8kAdfIWI",
    websiteUrl: "https://demo.workflow.wealth-park.com/operation/",
  },
  {
    title: "Chat-Admin",
    year: "2021-Present",
    description: [
      "Chat Admin is the messaging app next to the owner tools. People send messages and files, and they can organize and filter the conversations.",
      "It shows whether a property manager is available to answer. It also lists the owners under each management company.",
    ],
    caseStudy: {
      problem:
        "People need to send messages and files and organize the conversations next to the owner tools.",
      role: "Chat Admin is that messaging app. It shows whether a property manager is available to answer, and it lists the owners under each management company.",
      outcome: "People can organize and filter the conversations.",
    },
    tags: [
      { label: "JavaScript", icon: React.createElement(SiJavascript) },
      { label: "React", icon: React.createElement(FaReact) },
      { label: "Material UI", icon: React.createElement(SiMaterialdesign) },
      { label: "Redux", icon: React.createElement(SiRedux) },
      { label: "Websockets", icon: React.createElement(AiOutlineApi) },
    ],
    imageUrl: WEALTHPARK_CHAT_ADMIN_IMAGE,
    videoUrl: "https://youtu.be/3i2YZLn77tw",
    websiteUrl: "https://demo.wealth-park.com/webchat/",
  },
  {
    title: "House Elf",
    year: "2024-Present",
    description: [
      "House Elf is WealthPark's admin console for internal work. Operators manage user groups, single sign-on, and new accounts in one place, without writing a script or opening the database for ordinary tasks.",
      "Bulk jobs include instant accounts with invitation letters, investment notices to investors, chat broadcast tags from a CSV, and deleting owners, rooms, properties, tenants, and contracts from an Excel file. Each bulk action is checked and reviewed before it runs.",
      "A QA Toolbox in development and test environments covers API checks, member management, and configuration. The console is translated, has light and dark themes, and uses company SSO.",
    ],
    caseStudy: {
      problem:
        "Ordinary admin tasks for user groups, single sign-on, and new accounts required a script or opening the database.",
      role: "House Elf is WealthPark's admin console for that internal work, including bulk jobs that are checked and reviewed before they run.",
      outcome:
        "Operators manage those tasks in one place. The console is translated, has light and dark themes, and uses company SSO.",
    },
    tags: [
      { label: "TypeScript", icon: React.createElement(SiTypescript) },
      { label: "React", icon: React.createElement(FaReact) },
      { label: "NextJS", icon: React.createElement(SiNextdotjs) },
      { label: "Ant Design", icon: React.createElement(SiAntdesign) },
    ],
    imageUrl: WEALTHPARK_HOUSE_ELF_IMAGE,
  },
  {
    title: "LookingGlass",
    year: "2020-2020",
    description: [
      "LookingGlass is a fashion app that pairs someone with a stylist.",
      "After they buy a styling package, they get a one-on-one consult. The stylist asks about their goals, what they like to wear, and the look they want. In 7 to 10 days they get outfit boards that mix clothes already in the closet with new pieces the stylist recommends.",
    ],
    tags: [
      { label: "JavaScript", icon: React.createElement(SiJavascript) },
      { label: "Angular", icon: React.createElement(SiAngular) },
      { label: "Cordova", icon: React.createElement(SiApachecordova) },
      { label: "XCode", icon: React.createElement(SiXcode) },
    ],
    imageUrl: LOOKING_GLASS_SHOP_IMAGE,
    screenshots: [
      {
        src: LOOKING_GLASS_LOGIN_IMAGE,
        alt: "LookingGlass login screen",
      },
      {
        src: LOOKING_GLASS_SHOP_IMAGE,
        alt: "LookingGlass shop",
      },
    ],
  },
  {
    title: "MerchantSpring",
    year: "2020-2021",
    description: [
      "MerchantSpring reports on e-commerce brands for agencies, vendors, and investors who run more than one account. It covers Amazon, Shopify, Shopee, Lazada, Walmart, and other marketplaces.",
      "Teams watch sales, profit, and how each brand is doing on those marketplaces, across the accounts they manage.",
      "It pulls the latest numbers, notes, and charts into a brand report, so people spend less time copying data by hand.",
    ],
    caseStudy: {
      problem:
        "Agencies, vendors, and investors who run more than one account were copying sales data by hand across marketplaces.",
      role: "MerchantSpring reports on those e-commerce brands and covers Amazon, Shopify, Shopee, Lazada, Walmart, and other marketplaces.",
      outcome:
        "Teams watch sales, profit, and how each brand is doing, and the latest numbers, notes, and charts go into a brand report, so people spend less time copying data by hand.",
    },
    buildNote:
      "It pulls the latest numbers, notes, and charts into a brand report for the accounts those teams manage across those marketplaces.",
    tags: [
      { label: "TypeScript", icon: React.createElement(SiTypescript) },
      { label: "React", icon: React.createElement(FaReact) },
      { label: "Material UI", icon: React.createElement(SiMaterialdesign) },
      { label: "Redux", icon: React.createElement(SiRedux) },
      {
        label: "Styled Components",
        icon: React.createElement(SiStyledcomponents),
      },
      { label: "Node.js", icon: React.createElement(FaNodeJs) },
      { label: "Express", icon: React.createElement(SiExpress) },
      { label: "MySQL", icon: React.createElement(DiMysql) },
      { label: "MongoDB", icon: React.createElement(SiMongodb) },
      { label: "Cypress", icon: React.createElement(SiCypress) },
      { label: "Jest", icon: React.createElement(SiJest) },
      { label: "Webpack", icon: React.createElement(SiWebpack) },
      { label: "Docker", icon: React.createElement(DiDocker) },
      { label: "Terraform", icon: React.createElement(SiTerraform) },
    ],
    imageUrl: MERCHANTSPRING_IMAGE,
    videoUrl: "https://youtu.be/Hs6XEBY5BTI",
    websiteUrl: "https://mm.merchantspring.io/",
  },
  {
    title: "Lagoon",
    year: "2020-2021",
    description: [
      "Lagoon is a chat app. People send emoji, custom stickers, video, and other media. It stays in sync on desktop and on a phone, so a conversation can continue on either one.",
      "People can also join communities, find others with the same interests, and talk in groups.",
    ],
    tags: [
      { label: "TypeScript", icon: React.createElement(SiTypescript) },
      { label: "React", icon: React.createElement(FaReact) },
      { label: "Redux", icon: React.createElement(SiRedux) },
      {
        label: "Styled Components",
        icon: React.createElement(SiStyledcomponents),
      },
      { label: "Firebase", icon: React.createElement(SiFirebase) },
    ],
    imageUrl: X_CLIMB_LAGOON_IMAGE,
    videoUrl: "https://youtu.be/6XUYfT9k07A",
    websiteUrl: "https://lagoon.chat/",
  },
  {
    title: "Iris",
    year: "2019-2020",
    description: [
      "Iris is support and customer-success software for SaaS companies.",
      "A support team answers questions, explains the product, and helps when something breaks. A customer success team works with customers on their goals and on getting more out of the product.",
      "The two teams do different work and share the same customers.",
    ],
    caseStudy: {
      problem:
        "SaaS companies need support for questions and breakage, and customer success for goals and getting more out of the product.",
      role: "Iris is that support and customer-success software. The two teams do different work and share the same customers.",
      outcome:
        "A support team answers questions, explains the product, and helps when something breaks. A customer success team works with customers on their goals.",
    },
    tags: [
      { label: "TypeScript", icon: React.createElement(SiTypescript) },
      { label: "React", icon: React.createElement(FaReact) },
      { label: "Material UI", icon: React.createElement(SiMaterialdesign) },
      { label: "Redux", icon: React.createElement(SiRedux) },
      {
        label: "Styled Components",
        icon: React.createElement(SiStyledcomponents),
      },
      { label: "GraphQL", icon: React.createElement(SiGraphql) },

      { label: "Cypress", icon: React.createElement(SiCypress) },
      { label: "Jest", icon: React.createElement(SiJest) },
      { label: "Webpack", icon: React.createElement(SiWebpack) },
    ],
    imageUrl: ASURION_IRIS_IMAGE,
    videoUrl: "https://youtu.be/mLPL8-nIMnE",
    websiteUrl: "https://my.asurion.com/",
  },
  {
    title: "Rakuten Travel",
    year: "2018-2020",
    description: [
      "Rakuten Travel is an online travel agency in the Rakuten Group. It lists hotels, other places to stay, and package tours for leisure and business trips in Japan.",
      "The domestic list runs from city hotels to places in the countryside. It also lists stays outside Japan, with support in 8 languages. Package tours can include flights, local transport, and activities.",
    ],
    caseStudy: {
      problem:
        "Travelers need hotels, other places to stay, and package tours for leisure and business trips in Japan, including stays outside Japan.",
      role: "Rakuten Travel is the online travel agency in the Rakuten Group that lists them.",
      outcome:
        "The domestic list runs from city hotels to the countryside. Stays outside Japan have support in 8 languages. Package tours can include flights, local transport, and activities.",
    },
    tags: [
      { label: "JavaScript", icon: React.createElement(SiJavascript) },
      { label: "React", icon: React.createElement(FaReact) },
      { label: "Flux", icon: React.createElement(SiFlux) },
      { label: "Redux", icon: React.createElement(SiRedux) },
      { label: "LESS/SCSS", icon: React.createElement(SiLess) },
      { label: "Cypress", icon: React.createElement(SiCypress) },
      { label: "Jest", icon: React.createElement(SiJest) },
      { label: "Webpack", icon: React.createElement(SiWebpack) },
    ],
    imageUrl: RAKUTEN_TRAVEL_IMAGE,
    videoUrl: "https://youtu.be/xEo231TmRxc",
    websiteUrl: "https://travel.rakuten.com/",
  },
  {
    title: "ADT(Alliance Diagnostic Tool)",
    year: "2017-2018",
    description: [
      "GRADE-X, from ADT Tool, is a set of products for automotive diagnostic content: writing it, managing it, reusing it, and sending it out.",
      "Content is written once and published to more than one target, platform, or channel. That includes flash sequences for a service bay and updates sent over the air. Analytics show which content is actually needed, in support of fixing a problem the first time.",
      "Updates are gathered in one place for approval, and the current version is what the distribution channels serve.",
    ],
    caseStudy: {
      problem:
        "Automotive diagnostic content has to be written, managed, reused, and sent out, including to a service bay and over the air.",
      role: "GRADE-X, from ADT Tool, is the set of products for that. Content is written once and published to more than one target, platform, or channel.",
      outcome:
        "Analytics show which content is actually needed, in support of fixing a problem the first time. Updates are gathered in one place for approval, and the current version is what the distribution channels serve.",
    },
    tags: [
      { label: "JavaScript", icon: React.createElement(SiJavascript) },
      { label: "Angular", icon: React.createElement(SiAngular) },
      { label: "Bower", icon: React.createElement(SiBower) },
      { label: "Grunt", icon: React.createElement(FaGrunt) },
      { label: "LESS/SCSS", icon: React.createElement(SiLess) },
      { label: "Jest", icon: React.createElement(SiJest) },
    ],
    imageUrl: BOSCH_GRADE_X_IMAGE,
    videoUrl: "https://youtu.be/QRjNHXbdyvY",
    websiteUrl:
      "https://boschautomotiveservicesolutions.com/bosch-grade-x-suite",
  },
  {
    title: "WebOTX",
    year: "2016-2017",
    description: [
      "WebOTX is an enterprise service bus. It sits between services on a company network, including web services, EJBs, and mainframes, and it lines up their protocols and message formats so each side does not need its own conversion code.",
      "It also orchestrates those services and moves data between older mainframes and newer web services.",
    ],
    tags: [
      { label: "Java", icon: React.createElement(FaJava) },
      { label: "Spring Tools Suite", icon: React.createElement(SiSpring) },
    ],
    imageUrl: NEC_WEB_OTX_IMAGE,
    videoUrl: "https://youtu.be/uDpSI4LsSVk",
    websiteUrl: "https://www.nec.com/en/global/prod/webotx/index.html?",
  },
  {
    title: "ECUs Non-Toyota-Diesel",
    year: "2014-2016",
    description: [
      "This Denso project is ECU software for diesel engines that are not Toyota's. The work is on the logic that runs engine components, and on how that logic affects performance and efficiency.",
      "That behavior is what the control software is built from, for engines already in production and for later ones.",
    ],
    tags: [
      { label: "C", icon: React.createElement(TbHexagonLetterC) },
      { label: "Misra C", icon: React.createElement(TbHexagonLetterC) },
      { label: "GAIO Tech", icon: React.createElement(TbCloudDataConnection) },
    ],
    imageUrl: DENSO_ECU_IMAGE,
    videoUrl: "https://youtu.be/k8YHQkQekk0",
    websiteUrl: "https://www.denso.com/global/en/opensource/v2x/toyota/",
  },
  {
    title: "Lawson Smart Report",
    year: "2013-2014",
    description: [
      "Lawson Smart Report is for people who use the Infor Lawson Smart Reports Designer. They design reports from templates and adjust them for the question they need answered.",
      "They can work the data in the report and change the layout. The app runs inside the Infor Lawson environment.",
    ],
    tags: [
      { label: "Java", icon: React.createElement(FaJava) },
      { label: "Spring Tools Suite", icon: React.createElement(SiSpring) },
    ],
    imageUrl: LAWSON_SMART_REPORT_IMAGE,
    videoUrl: "https://youtu.be/FypJL83X9Yg",
    websiteUrl:
      "https://docs.infor.com/lsf/10.0/en-us/lsfwinolh/lsflsrdig/default.html",
  },
] as const;

export const skillsData = [
  { label: "HTML", icon: React.createElement(FaHtml5) },
  { label: "CSS", icon: React.createElement(FaReact) },
  { label: "JavaScript", icon: React.createElement(FaJs) },
  { label: "TypeScript", icon: React.createElement(SiTypescript) },
  { label: "Rust", icon: React.createElement(SiRust) },
  { label: "React", icon: React.createElement(FaReact) },
  { label: "Next.js", icon: React.createElement(SiNextdotjs) },
  { label: "Node.js", icon: React.createElement(FaNodeJs) },
  { label: "Git", icon: React.createElement(FaGitAlt) },
  { label: "Tailwind", icon: React.createElement(SiTailwindcss) },
  { label: "MongoDB", icon: React.createElement(SiMongodb) },
  { label: "MySQL", icon: React.createElement(DiMysql) },
  { label: "PostgreSQL", icon: React.createElement(SiPostgresql) },
  { label: "Firebase", icon: React.createElement(SiFirebase) },
  { label: "Redux", icon: React.createElement(SiRedux) },
  { label: "GraphQL", icon: React.createElement(SiGraphql) },
  { label: "Nest.js", icon: React.createElement(SiNestjs) },
  { label: "Express", icon: React.createElement(SiExpress) },
  { label: "Framer Motion", icon: React.createElement(SiFramer) },
] as const;
