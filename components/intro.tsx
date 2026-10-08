import Image from "next/image";
import profile from "@/public/profile.png";
import { ObservedSection } from "@/components/observed-section";
import IntroGreeting from "@/components/intro-greeting";
import { IntroContactLink } from "@/components/intro-contact-link";
import { hiringContact, introCallToAction } from "@/lib/data";
export default function Intro() {
  return (
    <ObservedSection
      name="Home"
      threshold={0.5}
      id="home"
      className="mb-20 max-w-[50rem] scroll-mt-28 text-center sm:mb-0"
    >
      <div className="flex items-center justify-center">
        <div className="relative">
          <Image
            src={profile}
            alt="Mark Escolano portrait"
            width={160}
            height={160}
            sizes="160px"
            quality={95}
            priority
            className="h-40 w-40 rounded-full border-[0.35rem] border-border object-cover shadow-xl"
          />
          <span
            aria-hidden="true"
            className="absolute bottom-0 right-0 text-4xl"
          >
            💻
          </span>
        </div>
      </div>
      <IntroGreeting />
      <p className="px-4 text-base text-foreground sm:text-lg">
        {introCallToAction.positioning}
      </p>
      <IntroContactLink>{introCallToAction.startLabel}</IntroContactLink>
      <p className="mt-3 px-4 text-sm text-muted-foreground">
        {hiringContact.availability}
      </p>
    </ObservedSection>
  );
}
