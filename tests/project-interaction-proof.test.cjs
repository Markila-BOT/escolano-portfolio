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
    requestAnimationFrame: (callback) => {
      callback();
      return 0;
    },
    require: (request) => {
      if (request in mocks) return mocks[request];
      if (/\.(png|jpe?g|webp)$/.test(request)) return { src: "test-image" };
      return require(request);
    },
  });
  return module.exports;
}

function walk(node, found = []) {
  if (!node || typeof node !== "object" || !node.props) return found;
  found.push(node);
  for (const child of React.Children.toArray(node.props.children))
    walk(child, found);
  return found;
}

function buttonText(node) {
  return React.Children.toArray(node.props.children)
    .filter((child) => typeof child === "string")
    .join("");
}

function hasSentence(node, sentence) {
  return walk(node).some(
    (item) => item.props.text === sentence || item.props.children === sentence,
  );
}

const data = load("lib/data.ts");
const matterworx = data.projectsData.find(
  (project) => project.title === "MatterWorx",
);
const potato = data.projectsData.find(
  (project) => project.title === "Potato V3",
);

function loadCaseStudy(reduceMotion) {
  const state = [];
  let cursor = 0;
  const CaseStudy = load("components/project-case-study.tsx", {
    react: {
      ...React,
      useState(initial) {
        const index = cursor++;
        if (!(index in state)) state[index] = initial;
        return [
          state[index],
          (value) => {
            state[index] =
              typeof value === "function" ? value(state[index]) : value;
          },
        ];
      },
      useRef: (initial) => ({ current: initial }),
      useEffect() {},
    },
    "framer-motion": {
      motion: { div: "motion" },
      useReducedMotion: () => reduceMotion,
    },
    "@/lib/data": data,
    "@/components/project-description": {
      __esModule: true,
      default: function ProjectDescription({ text }) {
        return React.createElement("p", null, text);
      },
    },
    "@/components/ui/button": {
      Button: React.forwardRef(function Button({ children, ...props }, ref) {
        return React.createElement("button", { ...props, ref }, children);
      }),
    },
  }).default;

  const render = (caseStudy, walkthrough) => {
    cursor = 0;
    return CaseStudy({ caseStudy, walkthrough });
  };
  return { render };
}

test("part controls move aria-current across MatterWorx and stay off other projects", () => {
  const { render } = loadCaseStudy(false);
  const before = render(matterworx.caseStudy, true);
  const beforeSections = walk(before).filter((node) => node.type === "section");
  assert.equal(beforeSections.length, 3);
  assert.equal(
    beforeSections.every(
      (section) => section.props["aria-current"] === undefined,
    ),
    true,
  );
  for (const sentence of Object.values(matterworx.caseStudy)) {
    assert.equal(hasSentence(before, sentence), true);
  }

  const next = walk(before).find((node) => buttonText(node) === "Next part");
  const previous = walk(before).find(
    (node) => buttonText(node) === "Previous part",
  );
  assert.equal(previous.props.disabled, true);
  next.props.onClick();
  next.props.onClick();
  const current = walk(render(matterworx.caseStudy, true)).filter(
    (node) => node.props["aria-current"] === "step",
  );
  assert.equal(current.length, 1);
  assert.equal(hasSentence(current[0], matterworx.caseStudy.role), true);
  assert.equal(
    walk(render(matterworx.caseStudy, true)).some(
      (node) => node.type === "motion",
    ),
    true,
  );

  const nextAgain = walk(render(matterworx.caseStudy, true)).find(
    (node) => buttonText(node) === "Next part",
  );
  nextAgain.props.onClick();
  const outcome = walk(render(matterworx.caseStudy, true)).find(
    (node) => node.props["aria-current"] === "step",
  );
  assert.equal(hasSentence(outcome, matterworx.caseStudy.outcome), true);

  const other = render(potato.caseStudy, false);
  assert.equal(
    walk(other).some((node) => buttonText(node) === "Previous part"),
    false,
  );
  assert.equal(
    walk(other).some((node) => buttonText(node) === "Next part"),
    false,
  );
});

test("static MatterWorx details keep every sentence before a part is chosen", () => {
  const CaseStudy = load("components/project-case-study.tsx", {
    "framer-motion": {
      motion: { div: "motion" },
      useReducedMotion: () => false,
    },
    "@/lib/data": data,
    "@/components/project-description": {
      __esModule: true,
      default: function ProjectDescription({ text }) {
        return React.createElement("p", null, text);
      },
    },
    "@/components/ui/button": {
      Button: React.forwardRef(function Button({ children, ...props }, ref) {
        return React.createElement("button", { ...props, ref }, children);
      }),
    },
  }).default;
  const markup = renderToStaticMarkup(
    React.createElement(CaseStudy, {
      caseStudy: matterworx.caseStudy,
      walkthrough: true,
    }),
  );
  assert.equal(markup.includes('aria-current="step"'), false);
  for (const sentence of Object.values(matterworx.caseStudy)) {
    assert.equal(markup.split(sentence).length - 1, 1);
  }
  assert.match(markup, /Previous part/);
  assert.match(markup, /Next part/);
  assert.equal(markup.includes("<iframe"), false);
});

test("reduced motion moves the step without a highlight transition", () => {
  const { render } = loadCaseStudy(true);
  const first = render(matterworx.caseStudy, true);
  walk(first)
    .find((node) => buttonText(node) === "Next part")
    .props.onClick();
  const currentTree = render(matterworx.caseStudy, true);
  assert.equal(
    walk(currentTree).some((node) => node.type === "motion"),
    false,
  );
  assert.equal(
    walk(currentTree).filter((node) => node.props.transition).length,
    0,
  );
  const current = walk(currentTree).find(
    (node) => node.props["aria-current"] === "step",
  );
  assert.equal(hasSentence(current, matterworx.caseStudy.problem), true);
  for (const sentence of Object.values(matterworx.caseStudy)) {
    assert.equal(hasSentence(currentTree, sentence), true);
  }
});

test("drawer Previous and Next still change projects and are not the part controls", () => {
  const selected = [];
  const Drawer = load("components/project-details-drawer.tsx", {
    react: {
      ...React,
      useRef: (initial) => ({ current: initial }),
    },
    "@/lib/data": {
      projectsData: [matterworx, potato],
      projectDrawer: data.projectDrawer,
    },
    "@/components/project-case-study": {
      __esModule: true,
      default: function ProjectCaseStudy(props) {
        return React.createElement("case-study", props);
      },
    },
    "@/components/project-build-note": "build",
    "@/components/project-screenshot-preview": "shots",
    "@/components/project-video-frame": "video",
    "@/components/project-description": "description",
    "@/components/ui/drawer": {
      Drawer: "drawer",
      DrawerClose: "drawer-close",
      DrawerContent: "drawer-content",
      DrawerTitle: "drawer-title",
    },
    "@/components/ui/card": {
      Card: "card",
      CardContent: "card-content",
      CardDescription: "card-description",
      CardHeader: "card-header",
      CardTitle: "card-title",
    },
    "@/components/ui/tag-chip": { TagChip: "tag" },
    "@/components/ui/button": {
      Button: function Button(props) {
        return React.createElement("button", props);
      },
    },
    "@/lib/animations": { fadeInAnimationVariants: {} },
    "framer-motion": { motion: { div: "motion", li: "motion-li" } },
    "next/image": "image",
    "next/link": "link",
    "react-icons/lu": {
      LuChevronLeft: "left",
      LuChevronRight: "right",
      LuLink: "link-icon",
      LuLock: "lock",
    },
    "react-icons/fa": { FaWindowClose: "close" },
  }).default;

  const open = (selectedIndex) =>
    Drawer({
      isOpen: true,
      selectedIndex,
      colorIndex: 0,
      setSelectedIndex: (index) => selected.push(index),
      handleOpenChange: () => {},
      openedFromRef: { current: null },
    });

  const matterworxTree = open(0);
  const studies = walk(matterworxTree).filter(
    (node) => node.props.caseStudy && "walkthrough" in node.props,
  );
  assert.equal(studies.length, 1);
  assert.equal(studies[0].props.walkthrough, true);
  const matterworxButtons = walk(matterworxTree).filter((node) =>
    ["Previous project", `Next ${potato.title}`].includes(buttonText(node)),
  );
  assert.deepEqual(matterworxButtons.map(buttonText), [
    "Previous project",
    `Next ${potato.title}`,
  ]);
  matterworxButtons[1].props.onClick();
  assert.deepEqual(selected, [1]);

  const potatoTree = open(1);
  assert.equal(
    walk(potatoTree).find(
      (node) => node.props.caseStudy && "walkthrough" in node.props,
    ).props.walkthrough,
    false,
  );
  const potatoButtons = walk(potatoTree).filter((node) =>
    [`Previous ${matterworx.title}`, "Next project"].includes(buttonText(node)),
  );
  assert.deepEqual(potatoButtons.map(buttonText), [
    `Previous ${matterworx.title}`,
    "Next project",
  ]);
});
