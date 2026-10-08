import { ObservedSection } from "@/components/observed-section";
import SectionHeading from "@/components/section-heading";
import ContactForm from "@/components/contact-form";
import { hiringContact } from "@/lib/data";
export default function Contact() {
  return (
    <ObservedSection
      name="Contact"
      id="contact"
      className="mb-20 w-[min(100%,38rem)] text-center sm:mb-28"
    >
      <SectionHeading>Contact me</SectionHeading>

      <p className="-mt-6 text-muted-foreground">
        {hiringContact.availability}
      </p>
      <p className="mt-3 text-muted-foreground">
        {hiringContact.emailIntroduction}{" "}
        <a className="underline" href={`mailto:${hiringContact.email}`}>
          {hiringContact.email}
        </a>{" "}
        {hiringContact.formAlternative}
      </p>

      <ContactForm />
    </ObservedSection>
  );
}
