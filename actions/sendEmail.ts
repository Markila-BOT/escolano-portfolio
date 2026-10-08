"use server";

import React from "react";
import { Resend } from "resend";
import { validateString } from "@/lib/utils";
import ContactFormEmail from "@/email/contact-form-email";

const deliveryError =
  "Unable to send your message right now. Please try again later.";

function isEmail(value: string) {
  return value.length <= 500 && /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(value);
}

function isSender(value: string) {
  const mailbox = value.match(/^[^<>\r\n]+<([^<>]+)>$/);
  return isEmail(mailbox ? mailbox[1] : value);
}

export const sendEmail = async (formData: FormData) => {
  const senderEmail = formData.get("senderEmail");
  const message = formData.get("message");

  if (!validateString(senderEmail, 500) || !isEmail(senderEmail)) {
    return {
      error: "Invalid sender email",
    };
  }
  if (!validateString(message, 5000) || !message.trim()) {
    return {
      error: "Invalid message",
    };
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.CONTACT_EMAIL_FROM?.trim();
  const to = process.env.CONTACT_EMAIL_TO?.trim();
  if (!apiKey || !from || !to || !isSender(from) || !isEmail(to)) {
    return { error: deliveryError };
  }

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject: "Message from contact form portfolio",
      replyTo: senderEmail,
      react: React.createElement(ContactFormEmail, {
        message: message,
        senderEmail: senderEmail,
      }),
    });
    if (error || typeof data?.id !== "string" || !data.id.trim()) {
      return { error: deliveryError };
    }

    return { data: { id: data.id } };
  } catch {
    return { error: deliveryError };
  }
};
