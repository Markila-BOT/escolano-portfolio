const fs = require("node:fs");
const vm = require("node:vm");
const assert = require("node:assert/strict");
const { test } = require("node:test");
const ts = require("typescript");
const React = require("react");
const { getImageProps } = require("next/image");

function load(filename, mocks) {
  const module = { exports: {} };
  const output = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
  }).outputText;
  vm.runInNewContext(output, {
    module,
    exports: module.exports,
    require: (name) => (name in mocks ? mocks[name] : require(name)),
  });
  return module.exports.default;
}

function descendants(tree) {
  if (!React.isValidElement(tree)) return [];
  return [
    tree,
    ...React.Children.toArray(tree.props.children).flatMap(descendants),
  ];
}

test("drawer is absent until activation and stays mounted for close/focus behavior", () => {
  const states = [];
  const refs = [];
  const cues = [];
  let stateCursor = 0;
  let refCursor = 0;
  const DeferredDrawer = () => null;
  const Projects = load("components/projects-interactive.tsx", {
    react: {
      ...React,
      useEffect: () => {},
      useState(initial) {
        const index = stateCursor++;
        if (!(index in states)) states[index] = initial;
        return [
          states[index],
          (value) => {
            states[index] = value;
          },
        ];
      },
      useRef(initial) {
        const index = refCursor++;
        if (!(index in refs)) refs[index] = { current: initial };
        return refs[index];
      },
    },
    "next/dynamic": () => DeferredDrawer,
    "@/lib/data": {
      projectsData: [{ title: "One" }],
      projectViews: {},
      projectCarousel: { position: () => "1 of 1" },
    },
    "@/components/project-rail": "rail",
    "./project": "project",
    "@/components/ui/carousel": {
      Carousel: "carousel",
      CarouselContent: "content",
      CarouselItem: "item",
      CarouselNext: "next",
      CarouselPrevious: "previous",
    },
    "@/components/ui/button": { Button: "button" },
    "@/context/sound-context": {
      useSoundContext: () => ({ playCue: (cue) => cues.push(cue) }),
    },
  });
  const render = () => {
    stateCursor = 0;
    refCursor = 0;
    return descendants(Projects());
  };
  const initial = render();
  assert.ok(!initial.some((element) => element.type === DeferredDrawer));
  const trigger = { focus: () => {} };
  initial
    .find((element) => element.type === "project")
    .props.onOpen({ currentTarget: trigger });
  const opened = render().find((element) => element.type === DeferredDrawer);
  assert.equal(opened.props.isOpen, true);
  assert.equal(opened.props.openedFromRef.current, trigger);
  opened.props.handleOpenChange(false);
  assert.equal(
    render().find((element) => element.type === DeferredDrawer).props.isOpen,
    false,
  );
  assert.deepEqual(cues, ["open", "close"]);
});

test("project image candidates follow card widths without changing lazy loading or geometry", () => {
  const Project = load("components/project.tsx", {
    "@/lib/data": {},
    "next/image": "image",
    "@/components/ui/tag-chip": { TagChip: "tag" },
    "framer-motion": {
      motion: { button: "button" },
      useReducedMotion: () => true,
      useMotionValue: () => ({ set: () => {} }),
      useSpring: (value) => value,
      useTransform: () => 0,
    },
  });
  const tree = Project({
    title: "One",
    year: "2026",
    tags: [],
    imageUrl: { src: "/project.png", width: 3000, height: 1600 },
    onOpen: () => {},
  });
  const image = descendants(tree).find((element) => element.type === "image");
  const { props } = getImageProps(image.props);
  assert.equal(props.loading, "lazy");
  assert.equal(props.width, 3000);
  assert.equal(props.height, 1600);
  assert.equal(
    props.sizes,
    "(min-width: 1024px) 360px, (min-width: 768px) 46vw, 85vw",
  );
  const widths = props.srcSet
    .split(", ")
    .map((candidate) => Number(candidate.match(/ (\d+)w$/)[1]));
  for (const displayWidth of [320 * 0.85, 412 * 0.85, 360]) {
    for (const density of [1, 1.75, 2]) {
      const selected = widths.find((width) => width >= displayWidth * density);
      assert.ok(selected < 1000);
    }
  }
  assert.match(tree.props.className, /h-72/);
  assert.match(image.props.className, /row-span-2 h-4\/5/);
});
