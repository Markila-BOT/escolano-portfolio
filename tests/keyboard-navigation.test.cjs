const fs = require("node:fs");
const vm = require("node:vm");
const ts = require("typescript");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const assert = require("node:assert/strict");
const { test } = require("node:test");

function load(filename, mocks = {}, globals = {}) {
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
    require: (name) =>
      Object.hasOwn(mocks, name) ? mocks[name] : require(name),
    ...globals,
  });
  return module.exports;
}

function nodes(root) {
  if (!root || typeof root !== "object") return [];
  return [root, ...React.Children.toArray(root.props?.children).flatMap(nodes)];
}

const dialogTags = Object.fromEntries(
  [
    "Dialog",
    "DialogPortal",
    "DialogTrigger",
    "DialogOverlay",
    "DialogContent",
    "DialogTitle",
    "DialogClose",
  ].map((name) => [name, name]),
);
const navigationLinks = [
  { name: "Home", hash: "#home" },
  { name: "About", hash: "#about" },
];

test("shared dialog preserves refs, override slots and primitive closed mounting", () => {
  const primitives = load("components/ui/dialog.tsx", {
    "@/lib/utils": { cn: (...values) => values.filter(Boolean).join(" ") },
  });
  const ref = React.createRef();
  const trigger = primitives.DialogTrigger.render(
    { "data-slot": "custom-trigger", asChild: true },
    ref,
  );
  assert.equal(trigger.ref, ref);
  assert.equal(trigger.props["data-slot"], "custom-trigger");
  assert.equal(trigger.props.asChild, true);
  for (const name of [
    "DialogContent",
    "DialogClose",
    "DialogTitle",
    "DialogOverlay",
  ]) {
    assert.equal(primitives[name].render({}, ref).ref, ref);
  }
  const markup = renderToStaticMarkup(
    React.createElement(
      primitives.Dialog,
      { open: false },
      React.createElement(primitives.DialogTrigger, null, "Open menu"),
      React.createElement(
        primitives.DialogPortal,
        null,
        React.createElement(primitives.DialogContent, null, "Hidden links"),
      ),
    ),
  );
  assert.match(markup, /Open menu/);
  assert.doesNotMatch(markup, /Hidden links|role="dialog"/);
});

test("mobile modal focuses its close control and preserves section selection feedback", () => {
  const events = [];
  const closeRef = { current: { focus: () => events.push("focus-close") } };
  const MobileNav = load("components/mobile-nav.tsx", {
    react: { ...React, useRef: () => closeRef },
    "framer-motion": {
      motion: { div: "div", li: "li", span: "span" },
      useReducedMotion: () => true,
    },
    "next/link": "a",
    "@/lib/data": { links: navigationLinks },
    "@/components/ui/dialog": dialogTags,
    "@/components/ui/button": { Button: "button" },
    "@/context/active-section-context": {
      useActiveSectionContext: () => ({
        activeSection: "Home",
        setActiveSection: (name) => events.push(name),
        setTimeOfLastClick: () => events.push("timestamp"),
      }),
    },
    "@/context/sound-context": {
      useSoundContext: () => ({ playCue: (name) => events.push(name) }),
    },
  }).default;
  const tree = nodes(
    MobileNav({
      onClose: () => events.push("closed"),
      onCloseAutoFocus: () => {},
      onFocusChange: () => {},
    }),
  );
  const content = tree.find((element) => element.type === "DialogContent");
  assert.equal(content.props.id, "mobile-navigation");
  assert.equal(content.props["aria-describedby"], undefined);
  content.props.onOpenAutoFocus({
    preventDefault: () => events.push("prevent-default"),
  });
  assert.deepEqual(events, ["prevent-default", "focus-close"]);
  events.length = 0;
  const link = tree.find(
    (element) => element.type === "a" && element.props.href === "#about",
  );
  link.props.onClick();
  assert.deepEqual(events, ["About", "timestamp", "navigate", "closed"]);
  assert.equal(
    tree.find((element) => element.type === "button").props["aria-label"],
    "Close menu",
  );
  assert.equal(
    tree.find((element) => element.type === "div").props.initial,
    false,
  );
  assert.equal(
    tree.find((element) => element.type === "div").props.transition.duration,
    0,
  );
  assert(
    tree
      .filter((element) => element.type === "a")
      .every((element) =>
        element.props.className.includes("focus-visible:ring"),
      ),
  );
});

function headerHarness(isDesktop, hasFocus = false, hasActiveLink = true) {
  let isMediaDesktop = isDesktop;
  const events = [];
  const effects = [];
  const desktopLink = { focus: () => events.push("desktop-focus") };
  const navigation = {
    querySelector: (selector) =>
      selector === "a[href]" || hasActiveLink ? desktopLink : null,
  };
  const refs = [{ current: navigation }, { current: hasFocus }];
  const Header = load(
    "components/header.tsx",
    {
      react: {
        ...React,
        useRef: () => refs.shift(),
        useState: () => [true, (value) => events.push(value)],
        useEffect: (callback) => effects.push(callback),
      },
      "framer-motion": {
        motion: { div: "div", li: "li", span: "span" },
        useReducedMotion: () => true,
      },
      "next/link": "a",
      "@/lib/data": { links: navigationLinks },
      "@/hooks/useMediaQuery": () => isDesktop,
      "@/components/ui/dialog": dialogTags,
      "@/components/ui/button": { Button: "button" },
      "@/components/logo-mark": { LogoMark: "logo" },
      "./mobile-nav": {
        __esModule: true,
        default: "MobileNav",
        mobileNavigationId: "mobile-navigation",
      },
      "@/lib/utils": { cn: (...values) => values.filter(Boolean).join(" ") },
      "@/context/active-section-context": {
        useActiveSectionContext: () => ({
          activeSection: "Home",
          setActiveSection: () => {},
          setTimeOfLastClick: () => {},
        }),
      },
      "@/context/sound-context": {
        useSoundContext: () => ({ playCue: () => {} }),
      },
    },
    { window: { matchMedia: () => ({ matches: isMediaDesktop }) } },
  ).default;
  return {
    root: Header(),
    events,
    effects,
    setMediaDesktop: () => {
      isMediaDesktop = true;
    },
  };
}

test("desktop transition clears stale menu state and disables modal", () => {
  const harness = headerHarness(true);
  assert.equal(harness.root.props.open, false);
  harness.effects.forEach((effect) => effect());
  assert.deepEqual(harness.events, [false]);
});

test("compact close delegates focus return; desktop close uses visible fallback only with modal focus", () => {
  for (const hasFocus of [true, false]) {
    const harness = headerHarness(false, hasFocus, false);
    const menu = nodes(harness.root).find(
      (element) => element.type === "MobileNav",
    );
    menu.props.onCloseAutoFocus({
      preventDefault: () => harness.events.push("prevent-default"),
    });
    assert.deepEqual(harness.events, []);
    harness.setMediaDesktop();
    menu.props.onCloseAutoFocus({
      preventDefault: () => harness.events.push("prevent-default"),
    });
    assert.deepEqual(
      harness.events,
      hasFocus ? ["prevent-default", "desktop-focus"] : ["prevent-default"],
    );
  }
});

test("main is a stable skip target outside normal tab order", () => {
  const sections = Object.fromEntries(
    [
      "about",
      "contact",
      "experience",
      "intro",
      "projects",
      "section-divider",
      "skills",
    ].map((name) => [`@/components/${name}`, name]),
  );
  const main = load("app/page.tsx", sections).default();
  assert.equal(main.type, "main");
  assert.equal(main.props.id, "main-content");
  assert.equal(main.props.tabIndex, -1);
  const layout = fs.readFileSync("app/layout.tsx", "utf8");
  assert(layout.indexOf('href="#main-content"') < layout.indexOf("<Header"));
  assert.match(layout, /focus:not-sr-only/);
});
