const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const assert = require("node:assert/strict");
const { test } = require("node:test");
const ts = require("typescript");
const React = require("react");

const projectFilter = {
  label: "Filter projects by technology",
  all: "All",
  empty: "No projects use that technology.",
};

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
    require: (request) =>
      request in mocks ? mocks[request] : require(request),
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

function text(node) {
  return React.Children.toArray(node.props.children)
    .filter((child) => typeof child === "string")
    .join("");
}

const projects = [
  {
    title: "Alpha",
    description: ["Alpha work"],
    tags: [{ label: "React" }, { label: "Git" }],
  },
  {
    title: "Beta",
    description: ["Beta work"],
    tags: [{ label: "Django" }],
  },
  {
    title: "Gamma",
    description: ["Gamma work"],
    tags: [{ label: "React" }],
  },
];

function host(preset = {}) {
  const states = [];
  let stateCursor = 0;
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
            states[index] =
              typeof value === "function" ? value(states[index]) : value;
          },
        ];
      },
      useRef: (initial) => ({ current: initial }),
    },
    "next/dynamic": () =>
      function Drawer(props) {
        return React.createElement("drawer", props);
      },
    "@/lib/data": {
      projectsData: projects,
      projectFilter,
      projectViews: {
        label: "Project view",
        carousel: "Carousel",
        rail: "Rail",
      },
      projectCarousel: {
        position: (current, total) => `${current} of ${total}`,
      },
    },
    "@/components/project-rail": function Rail(props) {
      return React.createElement(
        "rail",
        props,
        props.projects.map((project) =>
          React.createElement(
            "rail-title",
            { key: project.title },
            project.title,
          ),
        ),
      );
    },
    "./project": function Project(props) {
      return React.createElement("project", props, props.title);
    },
    "@/components/ui/carousel": {
      Carousel: function Carousel(props) {
        return React.createElement("carousel", props);
      },
      CarouselContent: function CarouselContent(props) {
        return React.createElement("carousel-content", props);
      },
      CarouselItem: function CarouselItem(props) {
        return React.createElement("carousel-item", props);
      },
      CarouselNext: "next",
      CarouselPrevious: "previous",
    },
    "@/components/ui/button": {
      Button: function Button(props) {
        return React.createElement("button", props);
      },
    },
    "@/components/ui/label": {
      Label: function Label(props) {
        return React.createElement("label", props);
      },
    },
    "@/components/ui/select": {
      Select: function Select(props) {
        return React.createElement("select-root", props);
      },
      SelectTrigger: function SelectTrigger(props) {
        return React.createElement("select-trigger", props);
      },
      SelectValue: function SelectValue(props) {
        return React.createElement("select-value", props);
      },
      SelectContent: function SelectContent(props) {
        return React.createElement("select-content", props);
      },
      SelectItem: function SelectItem(props) {
        return React.createElement("select-item", props);
      },
    },
    "@/context/sound-context": {
      useSoundContext: () => ({ playCue: () => {} }),
    },
  }).default;

  Object.assign(states, preset);
  const render = () => {
    stateCursor = 0;
    return walk(Projects());
  };
  return { render, states };
}

function titles(tree) {
  return tree
    .filter((node) => node.type.name === "Project")
    .map((node) => node.props.title);
}

function filterSelect(tree) {
  const selects = tree.filter((node) => node.type.name === "Select");
  assert.equal(selects.length, 1);
  return selects[0];
}

function choose(tree, value) {
  filterSelect(tree).props.onValueChange(value);
}

function press(tree, label) {
  const button = tree.find(
    (node) => node.type.name === "Button" && text(node) === label,
  );
  assert.equal(button.props.type, "button");
  button.props.onClick();
}

test("tag controls keep published order and All restores the full list", () => {
  const { render } = host();
  const initial = render();
  const select = filterSelect(initial);
  assert.equal(select.props.value, "All");
  assert.deepEqual(
    initial
      .filter((node) => node.type.name === "SelectItem")
      .map((node) => text(node)),
    ["All", "React", "Git", "Django"],
  );
  assert.equal(
    initial.find((node) => node.type.name === "Label").props.htmlFor,
    "project-technology-filter",
  );
  assert.equal(
    initial.some(
      (node) => node.type.name === "Button" && text(node) === "React",
    ),
    false,
  );
  assert.deepEqual(titles(initial), ["Alpha", "Beta", "Gamma"]);
  assert.equal(
    text(initial.find((node) => text(node).endsWith("of 3"))),
    "1 of 3",
  );

  choose(initial, "React");
  const filtered = render();
  assert.equal(filterSelect(filtered).props.value, "React");
  assert.deepEqual(titles(filtered), ["Alpha", "Gamma"]);
  assert.equal(
    text(filtered.find((node) => text(node).endsWith("of 2"))),
    "1 of 2",
  );

  choose(filtered, "All");
  assert.deepEqual(titles(render()), ["Alpha", "Beta", "Gamma"]);
});

test("rail and drawer Next follow the filtered list, and a miss closes the drawer", () => {
  const { render, states } = host();
  states[2] = true;
  const opened = render();
  choose(opened, "Django");
  const django = render();
  titles(django);
  django
    .find((node) => node.props.title === "Beta")
    .props.onOpen({ currentTarget: { focus() {} } });
  const openDrawer = render().find((node) => node.type.name === "Drawer");
  assert.equal(openDrawer.props.isOpen, true);
  assert.deepEqual(
    openDrawer.props.projects.map((project) => project.title),
    ["Beta"],
  );

  choose(render(), "React");
  const closed = render().find((node) => node.type.name === "Drawer");
  assert.equal(closed.props.isOpen, false);
  assert.deepEqual(titles(render()), ["Alpha", "Gamma"]);

  press(render(), "Rail");
  const rail = render().find((node) => node.type.name === "Rail");
  assert.deepEqual(
    rail.props.projects.map((project) => project.title),
    ["Alpha", "Gamma"],
  );

  const Drawer = load("components/project-details-drawer.tsx", {
    react: { ...React, useRef: (initial) => ({ current: initial }) },
    "@/lib/data": {
      projectsData: projects,
      projectDrawer: {
        previous: (title) => (title ? `Previous ${title}` : "Previous project"),
        next: (title) => (title ? `Next ${title}` : "Next project"),
      },
      projectCaseStudy: {
        problem: "Problem",
        role: "Role",
        outcome: "Outcome",
      },
      projectWalkthrough: { previous: "Previous part", next: "Next part" },
    },
    "@/components/project-case-study": "case",
    "@/components/project-build-note": "build",
    "@/components/project-screenshot-preview": "shots",
    "@/components/project-video-frame": "video",
    "@/components/project-description": "description",
    "@/components/ui/drawer": {
      Drawer: function Shell(props) {
        return React.createElement("shell", props);
      },
      DrawerClose: function DrawerClose(props) {
        return React.createElement("drawer-close", props);
      },
      DrawerContent: function DrawerContent(props) {
        return React.createElement("drawer-content", props);
      },
      DrawerTitle: "title",
    },
    "@/components/ui/card": {
      Card: "card",
      CardContent: "content",
      CardDescription: "description",
      CardHeader: "header",
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
  const selected = [];
  const tree = Drawer({
    projects: [projects[0], projects[2]],
    isOpen: true,
    selectedIndex: 0,
    colorIndex: 0,
    setSelectedIndex: (index) => selected.push(index),
    handleOpenChange: () => {},
    openedFromRef: { current: null },
  });
  const next = walk(tree).find((node) => text(node) === "Next Gamma");
  next.props.onClick();
  assert.deepEqual(selected, [1]);
  assert.equal(
    walk(tree).some((node) => text(node).includes("Beta")),
    false,
  );
});

test("an empty tag renders the empty sentence and no project card", () => {
  const { render } = host({ 10: "Missing" });
  const tree = render();
  assert.equal(titles(tree).length, 0);
  assert.equal(
    tree.some((node) => text(node) === projectFilter.empty),
    true,
  );
});
