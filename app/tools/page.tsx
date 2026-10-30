import type { Metadata } from "next";
import BrowserTool from "@/components/browser-tool";
import { browserTools, browserToolsIdentity } from "@/lib/browser-tools-data";
import { portfolioIdentity, portfolioShareImage } from "@/lib/seo";

const toolsUrl = new URL("tools", portfolioIdentity.url).href;

export const metadata: Metadata = {
  title: browserToolsIdentity.title,
  description: browserToolsIdentity.description,
  alternates: { canonical: toolsUrl },
  openGraph: {
    type: "website",
    url: toolsUrl,
    siteName: portfolioIdentity.title,
    title: browserToolsIdentity.title,
    description: browserToolsIdentity.description,
    images: [portfolioShareImage],
  },
  twitter: {
    card: "summary_large_image",
    title: browserToolsIdentity.title,
    description: browserToolsIdentity.description,
    images: [portfolioShareImage],
  },
};

export default function ToolsPage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="mx-auto mb-16 w-full min-w-0 max-w-[52rem] scroll-mt-28 px-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring sm:px-6 md:px-8"
    >
      <div className="pb-10 sm:pb-14">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Tools
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground dark:text-foreground">
          Small utilities for the text in front of you. Format, count, or
          convert without leaving your browser.
        </p>
        <p className="mt-4 text-sm text-muted-foreground dark:text-foreground">
          Your utility input stays on this page. No uploads, accounts, or saved
          history.
        </p>
        <noscript>
          <p className="mt-4">
            Enable JavaScript to use the tools. Instructions and links still
            work.{" "}
            <a href="/#home" className="underline">
              Return to the portfolio
            </a>
            .
          </p>
        </noscript>
        <nav aria-label="Tools directory" className="mt-8">
          <ul className="divide-y divide-border border-y border-border">
            {browserTools.map((tool) => (
              <li key={tool.id}>
                <a
                  href={`#${tool.id}`}
                  className="block py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:flex sm:items-baseline sm:justify-between sm:gap-6"
                >
                  <span className="font-medium underline decoration-border underline-offset-4">
                    {tool.title}
                  </span>
                  <span className="mt-1 block text-sm text-muted-foreground dark:text-foreground sm:mt-0">
                    {tool.summary}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {browserTools.map((tool) => (
        <BrowserTool key={tool.id} tool={tool} />
      ))}
    </main>
  );
}
