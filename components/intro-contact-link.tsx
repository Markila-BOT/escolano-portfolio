"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useActiveSectionContext } from "@/context/active-section-context";
type IntroContactLinkProps = { children: React.ReactNode };
export function IntroContactLink({ children }: IntroContactLinkProps) {
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();
  function handleClick() {
    setActiveSection("Contact");
    setTimeOfLastClick(Date.now());
  }
  return (
    <Button className="mt-4" variant="pill" asChild>
      <Link href="#contact" onClick={handleClick}>
        {children}
      </Link>
    </Button>
  );
}
