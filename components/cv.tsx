"use client";
import React from "react";
import { FaAddressCard } from "react-icons/fa";

const CVButton = () => {
  return (
    <button
      className="group flex items-center justify-center gap-2 h-[3rem] w-[8rem] bg-gray-900 text-white rounded-full outline-none transition-all focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 dark:bg-white dark:bg-opacity-10 disabled:scale-100 disabled:bg-opacity-65"
      onClick={() => window.open("https://escolano-cv.vercel.app/", "_blank")}
    >
      <>
        Go to CV{" "}
        <FaAddressCard className="text-xs transition-all opacity-70 group-hover:translate-x-1 group-hover:-translate-y-1" />
      </>
    </button>
  );
};

export default CVButton;
