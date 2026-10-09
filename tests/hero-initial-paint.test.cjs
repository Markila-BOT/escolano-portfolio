const fs = require("node:fs");
const vm = require("node:vm");
const assert = require("node:assert/strict");
const { test } = require("node:test");
const ts = require("typescript");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");

function loadRole(mocks = {}, globals = {}) {
  const module = { exports: {} };
  const source = ts.transpileModule(
    fs.readFileSync("components/role-title-loop.tsx", "utf8"),
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
    require: (name) =>
      name in mocks
        ? mocks[name]
        : name === "@/lib/utils"
          ? { cn: require("clsx").clsx }
          : require(name),
    ...globals,
  });
  return module.exports.RoleTitleLoop;
}

const titles = [
  "Senior Software Engineer",
  "Full Stack Engineer",
  "Lead Software Engineer",
  "Front-End Engineer",
];

test("actual Framer Motion SSR exposes a settled first role and stable accessible copy", () => {
  const html = renderToStaticMarkup(
    React.createElement(loadRole(), { titles, isPaused: false }),
  );
  assert.match(
    html,
    /class="absolute inset-0 flex items-center justify-center" style="opacity:1;transform:none"/,
  );
  assert.match(
    html,
    /<span aria-hidden="true" class="max-w-full leading-\[1.4\]">Senior Software Engineer<\/span>/,
  );
  assert.match(
    html,
    /class="sr-only">Senior Software Engineer, Full Stack Engineer, Lead Software Engineer, and Front-End Engineer/,
  );
  assert.match(html, /invisible col-start-1 row-start-1/);
  assert.ok(!html.includes("aria-live"));
});

function roleHarness() {
  const states = [];
  const effects = [];
  const timers = new Map();
  const listeners = new Map();
  const media = {
    matches: false,
    addEventListener: (_, callback) => listeners.set("motion", callback),
    removeEventListener: () => listeners.delete("motion"),
  };
  const document = {
    visibilityState: "visible",
    addEventListener: (_, callback) => listeners.set("visibility", callback),
    removeEventListener: () => listeners.delete("visibility"),
  };
  let cursor = 0;
  let timerId = 0;
  const Role = loadRole(
    {
      react: {
        ...React,
        useState: (initial) => {
          const index = cursor++;
          if (!(index in states)) states[index] = initial;
          return [
            states[index],
            (value) => {
              states[index] =
                typeof value === "function" ? value(states[index]) : value;
            },
          ];
        },
        useEffect: (callback, dependencies) => {
          const index = cursor++;
          const previous = effects[index];
          if (
            !previous ||
            dependencies.some(
              (value, position) => value !== previous.dependencies[position],
            )
          ) {
            previous?.cleanup?.();
            effects[index] = { dependencies, cleanup: callback() };
          }
        },
      },
    },
    {
      document,
      window: {
        matchMedia: () => media,
        setInterval: (callback, duration) => {
          timers.set(++timerId, { callback, duration });
          return timerId;
        },
        clearInterval: (identifier) => timers.delete(identifier),
      },
    },
  );
  return {
    media,
    document,
    timers,
    listeners,
    render: (isPaused = false) => {
      cursor = 0;
      return Role({ titles, isPaused });
    },
    active: () => states[0],
    tick: () => {
      for (const timer of timers.values()) timer.callback();
    },
    cleanup: () => {
      for (const effect of effects) effect?.cleanup?.();
    },
  };
}

test("role order wraps and pause/resume restarts a full display interval", () => {
  const harness = roleHarness();
  harness.render();
  assert.equal([...harness.timers.values()][0].duration, 4000);
  for (const expected of [1, 2, 3, 0]) {
    harness.tick();
    harness.render();
    assert.equal(harness.active(), expected);
  }
  harness.render(true);
  assert.equal(harness.timers.size, 0);
  harness.render(false);
  assert.equal(harness.active(), 0);
  assert.equal([...harness.timers.values()][0].duration, 4000);
  harness.document.visibilityState = "hidden";
  harness.listeners.get("visibility")();
  harness.render();
  assert.equal(harness.timers.size, 0);
  harness.document.visibilityState = "visible";
  harness.listeners.get("visibility")();
  harness.render();
  assert.equal([...harness.timers.values()][0].duration, 4000);
  harness.cleanup();
  assert.equal(harness.timers.size, 0);
  assert.equal(harness.listeners.size, 0);
});

test("reduced motion shows the first role without a timer", () => {
  const harness = roleHarness();
  harness.media.matches = true;
  harness.render();
  const element = harness.render();
  assert.equal(harness.timers.size, 0);
  const html = renderToStaticMarkup(element);
  assert.match(
    html,
    /class="max-w-full leading-\[1.4\]">Senior Software Engineer/,
  );
  harness.cleanup();
});
