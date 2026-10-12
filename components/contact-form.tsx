"use client";
import React, { useState } from "react";
import { sendEmail } from "@/actions/sendEmail";
import SubmitBtn from "./submit-btn";
import toast from "react-hot-toast";
import CVButton from "./cv";
import { Field } from "@/components/ui/field";
import { useSoundContext } from "@/context/sound-context";
import { contactFormFeedback } from "@/lib/data";
export default function ContactForm() {
  const { playCue } = useSoundContext();
  const [senderEmail, setSenderEmail] = useState("");
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState("");
  return (
    <form
      className="mt-10 flex flex-col gap-4 text-foreground"
      action={async (formData) => {
        setFeedback("");
        const { error } = await sendEmail(formData);

        if (error) {
          setFeedback(error);
          toast.error(error, {
            ariaProps: { role: "status", "aria-live": "off" },
          });
          playCue("error");
          return;
        }

        setFeedback(contactFormFeedback.accepted);
        toast.success(contactFormFeedback.accepted, {
          ariaProps: { role: "status", "aria-live": "off" },
        });
        playCue("success");
      }}
    >
      <Field
        id="contact-sender-email"
        label="Your email"
        description="Enter an email address such as name@example.com (up to 500 characters)."
        autoComplete="email"
        value={senderEmail}
        onChange={(event) => setSenderEmail(event.target.value)}
        name="senderEmail"
        type="email"
        required
        maxLength={500}
        placeholder="Your email"
      />
      <Field
        id="contact-message"
        label="Your message"
        description="Enter your message (up to 5,000 characters); do not leave it blank."
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        multiline
        name="message"
        placeholder="Your message"
        required
        maxLength={5000}
      />
      <p role="status" aria-atomic="true" className="text-left text-sm">
        {feedback}
      </p>
      <div className="flex flex-wrap justify-center gap-3 self-start">
        <SubmitBtn />
        <CVButton />
      </div>
    </form>
  );
}
