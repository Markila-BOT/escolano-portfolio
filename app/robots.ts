import type { MetadataRoute } from "next";
import { portfolioIdentity } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("sitemap.xml", portfolioIdentity.url).href,
  };
}
