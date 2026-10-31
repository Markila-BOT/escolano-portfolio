import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  portfolioIdentity,
  portfolioShareImage,
  writingIdentity,
} from "@/lib/seo";
import { readPublishedWritingPost } from "@/lib/writing-posts";

type WritingPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: WritingPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = readPublishedWritingPost(slug);
  if (!post) return {};

  const url = new URL(`writing/${post.slug}`, portfolioIdentity.url).href;
  return {
    title: `${post.slug} | Mark Escolano`,
    description: writingIdentity.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      siteName: portfolioIdentity.title,
      title: post.slug,
      description: writingIdentity.description,
      images: [portfolioShareImage],
    },
    twitter: {
      card: "summary_large_image",
      title: post.slug,
      description: writingIdentity.description,
      images: [portfolioShareImage],
    },
  };
}

export default async function WritingPostPage({
  params,
}: WritingPostPageProps) {
  const { slug } = await params;
  const post = readPublishedWritingPost(slug);
  if (!post) notFound();

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="focus-visible:outline-ring mx-auto mb-16 w-full max-w-[52rem] min-w-0 scroll-mt-28 px-4 focus-visible:outline focus-visible:outline-2 sm:px-6 md:px-8"
    >
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        {post.slug}
      </h1>
      <pre className="mt-6 font-sans text-base leading-relaxed whitespace-pre-wrap">
        {post.body}
      </pre>
    </main>
  );
}
