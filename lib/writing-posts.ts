import fs from "node:fs";
import path from "node:path";

const writingDirectory = path.join(process.cwd(), "content", "writing");
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export type WritingPost = {
  slug: string;
  href: `/writing/${string}`;
};

function publishedSlugs(): string[] {
  if (!fs.existsSync(writingDirectory)) return [];

  return fs
    .readdirSync(writingDirectory)
    .flatMap((name) => {
      if (!name.endsWith(".md")) return [];
      const slug = name.slice(0, -".md".length);
      return slugPattern.test(slug) ? [slug] : [];
    })
    .sort();
}

export function listPublishedWritingPosts(): WritingPost[] {
  return publishedSlugs().map((slug) => ({
    slug,
    href: `/writing/${slug}`,
  }));
}

export function readPublishedWritingPost(
  slug: string,
): { slug: string; body: string } | null {
  if (!slugPattern.test(slug)) return null;

  const filePath = path.join(writingDirectory, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  return { slug, body: fs.readFileSync(filePath, "utf8") };
}
