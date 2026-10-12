"use client";
import React from "react";
import { FaPaperPlane } from "react-icons/fa";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

export default function SubmitBtn() {
  const { pending } = useFormStatus();

  return (
    <Button
      variant="pill"
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className="w-auto min-w-32"
    >
      {pending ? (
        <>
          <span role="status">Submitting message…</span>
          <span
            aria-hidden="true"
            className="h-5 w-5 shrink-0 animate-spin rounded-full border-b-2 border-primary-foreground motion-reduce:animate-none"
          />
        </>
      ) : (
        <>
          Submit{" "}
          <FaPaperPlane
            aria-hidden="true"
            className="text-xs opacity-70 transition-all group-hover:-translate-y-1 group-hover:translate-x-1"
          />
        </>
      )}
    </Button>
  );
}
