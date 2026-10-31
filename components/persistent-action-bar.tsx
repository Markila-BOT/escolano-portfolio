import { professionalSocialLinks } from "@/lib/data";
import { cn } from "@/lib/utils";
import { FaAddressCard, FaGithub, FaLinkedinIn } from "react-icons/fa";

const cvHref = "https://escolano-cv.vercel.app/";

const icons = {
  CV: FaAddressCard,
  GitHub: FaGithub,
  LinkedIn: FaLinkedinIn,
} as const;

const actions = [
  { label: "CV", href: cvHref },
  ...professionalSocialLinks,
] as const;

type PersistentActionBarProps = {
  className?: string;
};

export default function PersistentActionBar({
  className,
}: PersistentActionBarProps) {
  return (
    <div
      className={cn(
        "fixed left-1/2 top-3 z-30 flex -translate-x-1/2 sm:left-4 sm:top-1/2 sm:translate-x-0 sm:-translate-y-1/2",
        className,
      )}
    >
      <ul aria-label="CV and profiles" className="flex gap-1 sm:flex-col">
        {actions.map((action) => {
          const Icon = icons[action.label];
          return (
            <li key={action.label}>
              <a
                className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                href={action.href}
                aria-label={action.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 rounded-md border border-border bg-background px-2 py-1 text-xs text-foreground opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 sm:left-full sm:top-1/2 sm:ml-2 sm:mt-0 sm:-translate-y-1/2 sm:translate-x-0"
                >
                  {action.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
