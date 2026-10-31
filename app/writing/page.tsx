import type { Metadata } from "next";
import Link from "next/link";
import { writingIndex } from "@/lib/data";
import {
  portfolioIdentity,
  portfolioShareImage,
  writingIdentity,
  writingUrl,
} from "@/lib/seo";
import { listPublishedWritingPosts } from "@/lib/writing-posts";

export const metadata: Metadata = {
  title: writingIdentity.title,
  description: writingIdentity.description,
  alternates: { canonical: writingUrl },
  openGraph: {
    type: "website",
    url: writingUrl,
    siteName: portfolioIdentity.title,
    title: writingIdentity.title,
    description: writingIdentity.description,
    images: [portfolioShareImage],
  },
  twitter: {
    card: "summary_large_image",
    title: writingIdentity.title,
    description: writingIdentity.description,
    images: [portfolioShareImage],
  },
};

export default function WritingPage() {
  const posts = listPublishedWritingPosts();

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="focus-visible:outline-ring mx-auto mb-16 w-full max-w-[52rem] min-w-0 scroll-mt-28 px-4 focus-visible:outline focus-visible:outline-2 sm:px-6 md:px-8"
    >
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        {writingIndex.heading}
      </h1>
      {posts.length === 0 ? (
        <p className="text-muted-foreground dark:text-foreground mt-4 max-w-xl text-lg leading-relaxed">
          {writingIndex.empty}
        </p>
      ) : (
        <ul className="divide-border border-border mt-8 divide-y border-y">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={post.href}
                className="decoration-border focus-visible:ring-ring block py-4 font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:outline-none"
              >
                {post.slug}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
