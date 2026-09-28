"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { sendEmail } from "@/actions/sendEmail";
import SubmitBtn from "./submit-btn";
import toast from "react-hot-toast";
import CVButton from "./cv";

export default function Contact() {
  const { ref } = useSectionInView("Contact");

  return (
    <motion.section
      id="contact"
      ref={ref}
      className="mb-20 w-[min(100%,38rem)] text-center sm:mb-28"
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
      viewport={{
        once: true,
      }}
    >
      <SectionHeading>Contact me</SectionHeading>

      <p className="text-muted-foreground -mt-6">
        Please contact me directly at{" "}
        <a className="underline" href="mailto:mark.escolano14@gmail.com">
          mark.escolano14@gmail.com
        </a>{" "}
        or through this form.
      </p>

      <form
        className="text-foreground mt-10 flex flex-col"
        action={async (formData) => {
          const { error } = await sendEmail(formData);

          if (error) {
            toast.error(error);
            return;
          }

          toast.success("Email sent successfully!");
        }}
      >
        <input
          className="border-input bg-background text-foreground h-14 rounded-lg border px-4 transition-all"
          name="senderEmail"
          type="email"
          required
          maxLength={500}
          placeholder="Your email"
        />
        <textarea
          className="border-input bg-background text-foreground my-3 h-52 rounded-lg border p-4 transition-all"
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
    </motion.section>
  );
}
