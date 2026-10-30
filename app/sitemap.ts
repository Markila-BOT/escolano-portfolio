import type { MetadataRoute } from "next";
import { portfolioIdentity } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: portfolioIdentity.url },
    { url: new URL("tools", portfolioIdentity.url).href },
  ];
}
