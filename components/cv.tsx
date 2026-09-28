"use client";
import React from "react";
import { FaAddressCard } from "react-icons/fa";
import { Button } from "./ui/button";

const CVButton = () => {
  return (
    <Button
      variant="pill"
      onClick={() => window.open("https://escolano-cv.vercel.app/", "_blank")}
    >
      <>
        Go to CV{" "}
        <FaAddressCard className="text-xs opacity-70 transition-all group-hover:-translate-y-1 group-hover:translate-x-1" />
      </>
    </Button>
  );
};

export default CVButton;
