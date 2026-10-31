const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const assert = require("node:assert/strict");
const { test } = require("node:test");
const ts = require("typescript");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");

function load(filename, mocks = {}) {
  const module = { exports: {} };
  const source = ts.transpileModule(
    fs.readFileSync(path.join(__dirname, "..", filename), "utf8"),
    {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        jsx: ts.JsxEmit.ReactJSX,
        esModuleInterop: true,
      },
    },
  ).outputText;
  vm.runInNewContext(source, {
    module,
    exports: module.exports,
    URL,
    process,
    require: (request) => {
      if (request in mocks) return mocks[request];
      if (/\.(png|jpe?g|webp)$/.test(request)) return { src: "test-image" };
      return require(request);
    },
  });
  return module.exports;
}

function Link({ href, className, children }) {
  return React.createElement("a", { href, className }, children);
}

const data = load("lib/data.ts");
const seo = load("lib/seo.ts");
const posts = load("lib/writing-posts.ts");
const page = load("app/writing/page.tsx", {
  "@/lib/data": data,
  "@/lib/seo": seo,
  "@/lib/writing-posts": posts,
  "next/link": { __esModule: true, default: Link },
});
const Footer = load("components/footer.tsx", {
  "next/link": { __esModule: true, default: Link },
}).default;

test("writing index shows the empty sentence and no sample post", () => {
  const markdown = fs
    .readdirSync(path.join(__dirname, "..", "content", "writing"))
    .filter((name) => name.endsWith(".md"));
  assert.deepEqual(markdown, []);
  assert.deepEqual(posts.listPublishedWritingPosts(), []);

  const markup = renderToStaticMarkup(React.createElement(page.default));
  assert.equal((markup.match(/<h1\b/g) || []).length, 1);
  assert.match(markup, new RegExp(`<h1[^>]*>${data.writingIndex.heading}</h1>`));
  assert.equal(markup.split(data.writingIndex.empty).length - 1, 1);
  assert.equal(markup.includes("<a "), false);
  assert.equal(markup.includes("<time"), false);
  assert.equal(/author/i.test(markup), false);
});

test("writing canonical is the production writing URL", () => {
  assert.equal(
    page.metadata.alternates.canonical,
    "https://escolano-portfolio.vercel.app/writing",
  );
  assert.equal(page.metadata.alternates.canonical, seo.writingUrl);
  assert.equal(page.metadata.openGraph.url, seo.writingUrl);
  assert.equal(page.metadata.title, seo.writingIdentity.title);
});

test("footer links to writing and the header has no Writing item", () => {
  assert.equal(
    data.links.some((link) => link.name === "Writing"),
    false,
  );
  for (const filename of ["components/header.tsx", "components/mobile-nav.tsx"]) {
    const source = fs.readFileSync(path.join(__dirname, "..", filename), "utf8");
    assert.equal(source.includes("Writing"), false);
    assert.equal(source.includes('"/writing"'), false);
  }

  const markup = renderToStaticMarkup(React.createElement(Footer));
  assert.match(markup, /href="\/writing"/);
  assert.equal((markup.match(/href="\/writing"/g) || []).length, 1);
});

test("sitemap lists the homepage, tools, and writing and no post URL", () => {
  const sitemap = load("app/sitemap.ts", {
    "@/lib/seo": seo,
    "@/lib/writing-posts": posts,
  }).default();
  const urls = Array.from(sitemap, (entry) => entry.url);
  assert.deepEqual(urls, [
    seo.portfolioIdentity.url,
    seo.portfolioIdentity.url + "tools",
    seo.writingUrl,
  ]);
  assert.equal(
    urls.some((url) => url.includes("/writing/")),
    false,
  );
});
