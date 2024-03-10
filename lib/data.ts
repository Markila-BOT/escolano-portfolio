import React from "react";
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
} from "react-icons/si";
import {
  TbBrandRedux,
  TbCloudDataConnection,
  TbHexagonLetterC,
} from "react-icons/tb";
import { AiOutlineApi } from "react-icons/ai";
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
    description: [
      "Valuation is the application of assessing the worth or value of a property. This involves various steps, including conducting a thorough inspection of the property, which may include examining its condition, amenities, and location. Operators who manage the property are typically involved in this process to provide insights into its maintenance and operational aspects.",
      "During the valuation process, it's essential to consider factors such as the distance of the property from key amenities or landmarks, as well as its proximity to other similar properties in the area. This comparative analysis helps in determining the fair market value of the property by assessing how it stacks up against others in terms of floor plans, age, condition, and other relevant criteria.",
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
      "The Owner Application is a digital platform revolutionizing property management for both owners and management companies. It offers a seamless solution for sharing crucial documents such as contracts and repair photos, eliminating the hassle of searching through paper documents or past emails. With this app, owners can effortlessly access and share information, leading to improved convenience and efficiency.",
      "By centralizing document management, the Owner Application reduces reliance on traditional paper-based communication methods, benefiting both owners and management companies. This streamlined approach not only saves time but also enhances collaboration and decision-making processes. Overall, the Owner Application is a game-changer in property management, offering a user-friendly interface and efficient document sharing capabilities for all stakeholders involved.",
    ],
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
      "The Workflow application serves as a complementary tool to the Owner Application, offering detailed insights into property-related activities for owners and property managers. It provides comprehensive information on various activities within a property, including expenses, income, and general updates. These activities are categorized and can be tracked through different statuses, facilitating organized management for both property managers and owners.",
      "By integrating with the Owner Application, Workflow enhances transparency and communication regarding property-related tasks and events. Property managers and owners can easily monitor the progress of each activity and take necessary actions based on its status. This streamlined approach fosters efficiency and coordination, ultimately leading to more effective property management practices.",
      "In summary, the Workflow application acts as a vital link between owners and property managers, offering a structured framework for managing property-related activities and ensuring smooth operations. Its integration with the Owner Application provides a comprehensive solution for organizing and tracking various tasks, expenses, and updates within a property.",
    ],
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
    websiteUrl: "https://demo.workflow.wealth-park.com/operation",
  },
  {
    title: "Chat-Admin",
    year: "2021-Present",
    description: [
      "The Chat Admin application serves as the instant messaging counterpart, providing real-time responses, file sharing capabilities, and robust organization features. Users can quickly send messages, share files, and attachments, all while benefiting from powerful organization and filtering options.",
      "One of the key features of the Chat Admin application is its ability to display the availability of property managers to respond to queries. This ensures timely and efficient communication between property managers and users. Additionally, the application provides visibility into the owners under each property management company, facilitating seamless collaboration and coordination.",
      "With its intuitive interface and advanced features, the Chat Admin application streamlines communication processes and enhances productivity for property management teams. Whether it's addressing inquiries, sharing updates, or coordinating tasks, this application offers a comprehensive solution for efficient communication and collaboration within the property management ecosystem.",
    ],
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
    title: "LookingGlass",
    year: "2020-2020",
    description: [
      "LookingGlass is a revolutionary fashion app offering personalized styling services tailored to individual style and preferences. This innovative platform allows users to effortlessly elevate their wardrobe and unlock their full fashion potential through a seamless, convenient experience.",
      "After purchasing one of the styling packages, LookingGlass connects each user with a dedicated personal stylist for a one-on-one consultation. The stylist takes the time to understand the user's fashion goals, clothing preferences, and desired aesthetic. Within 7-10 days, they curate a custom collection of outfit boards showcasing fresh looks that incorporate pieces from the user's existing closet alongside recommended new items.",
      "With LookingGlass, users receive expert guidance from seasoned fashion professionals committed to helping them look and feel their absolute best. Style ruts become a thing of the past as LookingGlass provides a cutting-edge personal styling solution, rejuvenating wardrobes with a fashionable, customized approach.",
    ],
    tags: [
      { label: "JavaScript", icon: React.createElement(SiJavascript) },
      { label: "Angular", icon: React.createElement(SiAngular) },
      { label: "Cordova", icon: React.createElement(SiApachecordova) },
      { label: "XCode", icon: React.createElement(SiXcode) },
    ],
    imageUrl: LOOKING_GLASS_IMAGE,
    videoUrl: "https://youtu.be/Vm0_QV5_snY",
    websiteUrl: "https://lookingglasslifestyle.com/",
  },
  {
    title: "MerchantSpring",
    year: "2020-2021",
    description: [
      "MerchantSpring is a powerful analytics and reporting platform designed for agencies, vendors, and investors managing multiple e-commerce brands and accounts across major marketplaces like Amazon, Shopify, Shopee, Lazada, Walmart, and more. It provides a centralized solution for in-depth marketplace analytics and comprehensive brand performance tracking.",
      "With MerchantSpring, professionals can streamline their brand management operations through advanced multi-account performance monitoring across these top marketplaces. The platform generates robust insights into sales metrics, profitability, and overall marketplace success for every brand under management. This enables data-driven decision-making to drive sustainable growth.",
      "MerchantSpring simplifies the reporting process by efficiently consolidating up-to-date performance data, actionable insights, and visualizations into comprehensive brand reports for marketplaces like Amazon, Shopify, Shopee, and others. This eliminates manual data consolidation, ensuring faster and more accurate reporting for clients and stakeholders. Whether managing a brand portfolio, serving vendor clients, or overseeing e-commerce investments across major platforms, MerchantSpring empowers teams with the powerful cross-marketplace analytics needed to accelerate success.",
    ],
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
      "The Next-Gen Chat Experience",
      "Lagoon is a cutting-edge chat app designed for the new generation of digital natives. This innovative platform redefines the way people connect and communicate, offering an immersive and feature-rich experience tailored for modern users.",
      "With Lagoon, users can express themselves without limits through a visually stunning interface. From sending expressive emojis and custom stickers to sharing captivating videos and multimedia content, this app ensures every interaction is engaging and memorable. Lagoon seamlessly syncs across desktop and mobile devices, allowing users to pick up conversations wherever they left off and stay connected at all times.",
      "Beyond one-on-one chats, Lagoon offers opportunities to join vibrant communities, discover new connections based on shared interests, and engage in lively group discussions. With its innovative features and modern design, Lagoon elevates the chat experience, enabling users to forge lasting bonds and embrace the future of digital communication.",
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
      "Iris is a cutting-edge solution designed to revolutionize the way SaaS companies approach customer support and success. It offers a comprehensive model that encompasses both reactive customer support and proactive customer success strategies.",
      "At its core, Iris empowers SaaS providers to assist customers effectively with their questions and needs through a dedicated support team. This team acts as a safety net, operating within a standard model to address inquiries, provide guidance, and offer troubleshooting assistance. Complementing the support team, Iris's customer success team takes a proactive approach, actively engaging with customers to help them achieve their goals and maximize value from the SaaS solution.",
      "While the support and success teams have slightly different approaches, they work in tandem toward the shared goal of delivering exceptional customer service. This seamless collaboration ensures customers receive consistent and comprehensive assistance throughout their journey, driving satisfaction, retention, and growth.",
    ],
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
      "Rakuten Travel is a premier online travel agency and a leading force in the Japanese travel industry. As part of the renowned Rakuten Group, it offers an unparalleled selection of hotels, accommodations, and package tours tailored for leisure and business travelers exploring Japan.",
      "With an extensive domestic network, Rakuten Travel provides access to Japan's broadest range of accommodation options, from vibrant city hotels to serene rural retreats. While deeply rooted in Japan, its reach extends globally, offering curated international accommodations and multilingual support in 8 languages. Beyond just lodging, Rakuten Travel simplifies travel planning with comprehensive package tours that seamlessly combine flights, transportation, and activities.",
      "Through its vast selection, local expertise, and commitment to exceptional service, Rakuten Travel empowers travelers to unlock authentic experiences in Japan and create unforgettable journeys worldwide with confidence and ease.",
    ],
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
      "The GRADE-X suite of products from ADT Tool brings unprecedented efficiency to the automotive diagnostic content lifecycle. This cutting-edge solution revolutionizes how content is developed, managed, reused, and distributed, enabling businesses to streamline processes and optimize resources.",
      "With GRADE-X, diagnostic content can be authored once and seamlessly published across multiple targets, platforms, and channels. Create rich media assets like flash sequences for service bays or deliver them over-the-air, eliminating redundant efforts. Leveraging advanced data analytics, GRADE-X drives a targeted and efficient content development approach, prioritizing creation based on real-world demand to promote 'fix it right the first time' efficiency.",
      "The suite simplifies validation by consolidating content updates and streamlining the approval process. Its robust management capabilities ensure the most current and accurate information is readily available across all distribution channels. With its innovative features, GRADE-X redefines diagnostic content, enabling unparalleled efficiency, consistency, and accuracy.",
    ],
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
      "WebOTX is an enterprise service bus that seamlessly mediates interactions between diverse services across corporate systems. From web services and EJBs to mainframes, WebOTX ensures compatibility in communication protocols and message formats, eliminating the need for custom integration and conversion logic.",
      "By acting as a centralized intermediary, WebOTX streamlines interoperability between disparate systems. It handles the complexities of translating protocols and data formats, allowing services to communicate efficiently without extensive development efforts. This capability significantly reduces integration costs and development timelines, enabling organizations to focus on their core business objectives.",
      "Whether operating in a hybrid environment with legacy mainframes or leveraging modern web services, WebOTX provides a unified platform for service orchestration and secure, reliable data exchange. Its robust service bus architecture simplifies the integration landscape, promoting agility and scalability for evolving enterprise needs.",
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
      "The Denso ECU project represents Japan's commitment to automotive excellence, focusing on advancing engine technology beyond Toyota vehicles. Through intensive research and development, the project delves into the intricate logical behaviors governing engine components, aiming to decipher the complex interplay that drives performance and efficiency.",
      "With a focus on understanding fundamental mechanics, the project seeks to unlock innovative advancements in engine control units (ECUs) and related technologies. By unraveling these intricate relationships, Denso's initiative not only improves the performance and reliability of existing models but also lays the groundwork for future automotive solutions.",
      "In essence, the Denso ECU project embodies Japan's relentless pursuit of technological mastery in automotive engineering. Through its endeavors, it not only elevates industry standards but also contributes to the global automotive landscape, empowering manufacturers to deliver vehicles that excel in quality, efficiency, and driving experience.",
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
      "The Lawson Smart Report application is a powerful tool designed for users of the Infor Lawson Smart Reports Designer. It offers a streamlined platform for designing and generating insightful reports with ease. With intuitive interfaces and customizable templates, users can effortlessly create reports tailored to their specific needs.",
      "Key features of the Lawson Smart Report application include robust data analysis capabilities and flexible report design options. Users can manipulate data to extract meaningful insights and visualize trends, facilitating informed decision-making processes within their organizations. Additionally, the application provides seamless integration with the Infor Lawson environment, ensuring compatibility and efficiency.",
      "In summary, the Lawson Smart Report application enhances reporting efficiency and effectiveness, empowering users to leverage their data to drive business success. With its user-friendly interface and powerful features, it serves as an essential tool for organizations seeking to optimize their reporting processes and maximize the value of their data.",
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
