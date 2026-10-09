const fs = require("node:fs");
const vm = require("node:vm");
const { test } = require("node:test");
const assert = require("node:assert/strict");
const ts = require("typescript");
const React = require("react");

const feedback = { loading: "Loading", failed: "Failed" };
const props = { url: "video-one", image: { src: "screenshot" }, title: "One" };

function load(file, overrides = {}, onRequire = () => {}) {
  const module = { exports: {} };
  const source = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
  }).outputText;
  const mocks = {
    "next/image": "image",
    "react-player": "player",
    "@/lib/data": { projectVideoFeedback: feedback },
    "@/components/project-video-fallback": "fallback",
    "@/components/project-video-boundary": "boundary",
    ...overrides,
  };
  vm.runInNewContext(source, {
    module,
    exports: module.exports,
    require: (name) => {
      onRequire(name);
      if (mocks[name] instanceof Error) throw mocks[name];
      return name in mocks ? mocks[name] : require(name);
    },
  });
  return module.exports.default;
}

function children(tree) {
  return React.Children.toArray(tree.props.children);
}

test("media loading, readiness, errors and stale readiness retain stable fallback", () => {
  const state = [];
  let cursor;
  const Video = load("components/project-video.tsx", {
    react: {
      useState(initial) {
        const index = cursor++;
        if (!(index in state)) state[index] = initial;
        return [
          state[index],
          (value) => {
            state[index] = value;
          },
        ];
      },
    },
  });
  const render = () => {
    cursor = 0;
    return Video(props);
  };
  const pending = render();
  assert.match(pending.props.className, /aspect-video/);
  assert.deepEqual(
    children(pending).map((child) => child.type),
    ["image", "player", "p"],
  );
  const player = children(pending)[1];
  assert.equal(player.props.playing, true);
  assert.equal(player.props.loop, true);
  assert.equal(player.props.style.visibility, "hidden");
  assert.equal(children(pending)[2].props.children, feedback.loading);
  player.props.onReady();
  assert.deepEqual(
    children(render()).map((child) => child.type),
    ["player"],
  );
  player.props.onError();
  player.props.onReady();
  assert.deepEqual(
    children(render()).map((child) => child.type),
    ["image", "p"],
  );
  assert.equal(children(render())[1].props.children, feedback.failed);
});

test("deferred module is not invoked on frame creation; delayed and failed imports remain usable", async () => {
  let loader;
  let options;
  let requests = 0;
  const Frame = load(
    "components/project-video-frame.tsx",
    {
      "next/dynamic": (importer, settings) => {
        loader = importer;
        options = settings;
        return "deferred";
      },
      "@/components/project-video": new Error("Chunk unavailable"),
    },
    (name) => {
      if (name === "@/components/project-video") requests++;
    },
  );
  const tree = Frame(props);
  assert.equal(requests, 0);
  assert.equal(tree.key, props.url);
  assert.equal(Frame({ ...props, url: "video-two" }).key, "video-two");
  assert.equal(options.ssr, false);
  assert.equal(options.loading().props.role, "status");
  assert.match(options.loading().props.className, /aspect-video/);
  const pending = loader();
  assert.equal((await pending).default, "fallback");
  assert.equal(requests, 1);
  assert.equal(tree.props.fallback.type, "fallback");
});

test("render failures show fallback and keyed remount resets errors", () => {
  const Boundary = load("components/project-video-boundary.tsx");
  const boundary = new Boundary({ children: "player", fallback: "screenshot" });
  assert.equal(boundary.render(), "player");
  boundary.state = Boundary.getDerivedStateFromError();
  assert.equal(boundary.render(), "screenshot");
  assert.equal(
    new Boundary({
      children: "next player",
      fallback: "next screenshot",
    }).render(),
    "next player",
  );
});

test("closed and image-only drawers do not mount video; departures unmount instead of hiding players", () => {
  const source = fs.readFileSync(
    "components/project-details-drawer.tsx",
    "utf8",
  );
  assert.match(source, /videoUrl && isOpen/);
  assert.doesNotMatch(source, /from ["']react-player/);
  assert.match(source, /<ProjectVideoFrame/);
});

test("project cards preserve the reduced-motion preference without moving media", () => {
  let writes = 0;
  const Project = load("components/project.tsx", {
    "@/components/ui/tag-chip": "tag",
    "framer-motion": {
      motion: { button: "button" },
      useReducedMotion: () => true,
      useMotionValue: () => ({ set: () => writes++ }),
      useSpring: (value) => value,
      useTransform: () => "animated",
    },
  });
  const tree = Project({
    ...props,
    imageUrl: props.image,
    year: "2026",
    tags: [],
    onOpen: () => {},
  });
  assert.equal(tree.props.style.rotateX, 0);
  assert.equal(tree.props.style.rotateY, 0);
  tree.props.onMouseMove({});
  assert.equal(writes, 0);
});
