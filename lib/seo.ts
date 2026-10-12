export const portfolioIdentity = {
  name: "Mark Escolano",
  role: "Senior Software Engineer",
  title: "Mark Escolano Portfolio",
  description:
    "Senior software engineer with more than a decade of experience.",
  url: "https://escolano-portfolio.vercel.app/",
} as const;

export const portfolioShareImage = {
  url: new URL("og", portfolioIdentity.url).href,
  width: 1200,
  height: 630,
  alt: `${portfolioIdentity.name} — ${portfolioIdentity.role}`,
} as const;

export function serializeStructuredData(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function createPortfolioGraph(profileUrls: readonly string[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${portfolioIdentity.url}#person`,
        name: portfolioIdentity.name,
        jobTitle: portfolioIdentity.role,
        url: portfolioIdentity.url,
        sameAs: profileUrls,
      },
      {
        "@type": "WebSite",
        "@id": `${portfolioIdentity.url}#website`,
        name: portfolioIdentity.title,
        description: portfolioIdentity.description,
        url: portfolioIdentity.url,
        author: { "@id": `${portfolioIdentity.url}#person` },
      },
    ],
  };
}
