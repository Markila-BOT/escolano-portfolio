import { ObservedSection } from "@/components/observed-section";
import SectionHeading from "@/components/section-heading";
import ContactForm from "@/components/contact-form";
import { hiringContact, professionalSocialLinks } from "@/lib/data";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

const socialIcons = { GitHub: FaGithub, LinkedIn: FaLinkedinIn };

export default function Contact() {
  return (
    <ObservedSection
      name="Contact"
      id="contact"
      className="mx-auto mb-20 w-[min(100%,38rem)] text-center sm:mb-28"
    >
      <SectionHeading>Contact me</SectionHeading>

      <p className="text-muted-foreground -mt-6">
        {hiringContact.availability}
      </p>
      <p className="text-muted-foreground mt-3">
        {hiringContact.emailIntroduction}{" "}
        <a className="underline" href={`mailto:${hiringContact.email}`}>
          {hiringContact.email}
        </a>{" "}
        {hiringContact.formAlternative}
      </p>

      <ul className="mt-4 flex flex-wrap justify-center gap-3">
        {professionalSocialLinks.map((profile) => {
          const Icon = socialIcons[profile.label];
          return (
            <li key={profile.label}>
              <a
                className="text-muted-foreground hover:text-foreground focus-visible:ring-ring focus-visible:ring-offset-background inline-flex min-h-11 min-w-11 items-center justify-center rounded-md focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                href={profile.href}
                aria-label={profile.label}
                title={profile.label}
              >
                <Icon className="h-6 w-6" aria-hidden="true" />
              </a>
            </li>
          );
        })}
      </ul>

      <ContactForm />
    </ObservedSection>
  );
}
