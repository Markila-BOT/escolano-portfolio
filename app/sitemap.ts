import type { MetadataRoute } from "next";
import { portfolioIdentity, writingUrl } from "@/lib/seo";
import { listPublishedWritingPosts } from "@/lib/writing-posts";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: portfolioIdentity.url },
    { url: new URL("tools", portfolioIdentity.url).href },
    { url: writingUrl },
    ...listPublishedWritingPosts().map((post) => ({
      url: new URL(`writing/${post.slug}`, portfolioIdentity.url).href,
    })),
  ];
}
