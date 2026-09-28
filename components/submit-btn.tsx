"use client";
import React from "react";
import { FaPaperPlane } from "react-icons/fa";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

export default function SubmitBtn() {
  const { pending } = useFormStatus();

  return (
    <Button variant="pill" type="submit" disabled={pending}>
      {pending ? (
        <div className="border-primary-foreground h-5 w-5 animate-spin rounded-full border-b-2"></div>
      ) : (
        <>
          Submit{" "}
          <FaPaperPlane className="text-xs opacity-70 transition-all group-hover:-translate-y-1 group-hover:translate-x-1" />
        </>
      )}
    </Button>
  );
}
