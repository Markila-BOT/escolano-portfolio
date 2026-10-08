"use client";
import React from "react";
import { sendEmail } from "@/actions/sendEmail";
import SubmitBtn from "./submit-btn";
import toast from "react-hot-toast";
import CVButton from "./cv";
import { Field } from "@/components/ui/field";
import { useSoundContext } from "@/context/sound-context";
import { contactFormFeedback } from "@/lib/data";
export default function ContactForm() {
  const { playCue } = useSoundContext();
  return (
    <form
      className="mt-10 flex flex-col text-foreground"
      action={async (formData) => {
        const { error } = await sendEmail(formData);

        if (error) {
          toast.error(error);
          playCue("error");
          return;
        }

        toast.success(contactFormFeedback.accepted);
        playCue("success");
      }}
    >
      <Field
        name="senderEmail"
        type="email"
        required
        maxLength={500}
        placeholder="Your email"
      />
      <Field
        multiline
        className="my-3"
        name="message"
        placeholder="Your message"
        required
        maxLength={5000}
      />
      <div className="flex justify-center gap-x-3 self-start">
        <SubmitBtn />
        <CVButton />
      </div>
    </form>
  );
}
