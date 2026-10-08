const fs = require("node:fs");
const assert = require("node:assert/strict");
const { test } = require("node:test");
const { getImageProps } = require("next/image");
const ts = require("typescript");
const vm = require("node:vm");

test("actual Intro portrait generates accurate density-aware image props", () => {
  const module = { exports: {} };
  const output = ts.transpileModule(
    fs.readFileSync("components/intro.tsx", "utf8"),
    {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        jsx: ts.JsxEmit.ReactJSX,
        esModuleInterop: true,
      },
    },
  ).outputText;
  vm.runInNewContext(output, {
    module,
    exports: module.exports,
    require: (name) => {
      if (name === "next/image") return "image";
      if (name === "@/public/profile.png")
        return { src: "/profile.png", width: 640, height: 640 };
      if (name === "@/components/observed-section")
        return { ObservedSection: "section" };
      if (name === "@/components/intro-greeting") return "greeting";
      if (name === "@/components/intro-contact-link")
        return { IntroContactLink: "link" };
      if (name === "@/lib/data")
        return { hiringContact: {}, introCallToAction: {} };
      return require(name);
    },
  });
  const root = module.exports.default();
  const portrait = root.props.children[0].props.children.props.children[0];
  assert.equal(portrait.type, "image");
  assert.equal(portrait.props.quality, 95);
  assert.equal(portrait.props.priority, true);
  assert.equal(portrait.props.width, 160);
  assert.equal(portrait.props.height, 160);
  assert.equal(portrait.props.sizes, "160px");
  assert.match(portrait.props.className, /h-40 w-40 rounded-full/);
  const { props } = getImageProps(portrait.props);
  assert.equal(props.alt, "Mark Escolano portrait");
  assert.equal(props.fetchPriority, "high");
  assert.notEqual(props.loading, "lazy");
  const widths = props.srcSet
    .split(", ")
    .map((candidate) => Number(candidate.match(/ (\d+)w$/)[1]));
  for (const density of [1, 2]) {
    const selected = widths.find((width) => width >= 160 * density);
    assert.ok(selected >= 160 * density && selected < 640);
  }
});
