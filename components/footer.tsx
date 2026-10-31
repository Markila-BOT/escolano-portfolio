import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-muted-foreground mb-10 px-4 text-center">
      <nav aria-label="Secondary" className="mb-2">
        <Link
          href="/writing"
          className="decoration-border focus-visible:ring-ring underline underline-offset-4 focus-visible:ring-2 focus-visible:outline-none"
        >
          Writing
        </Link>
      </nav>
      <small className="block text-xs">
        &copy; 2026 Mark Escolano. All rights reserved.
      </small>
    </footer>
  );
}
