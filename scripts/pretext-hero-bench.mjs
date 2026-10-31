// scripts/pretext-hero-bench.mjs
import { spawn } from "node:child_process";
import { gzipSync } from "node:zlib";
import { readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "node_modules/@chenglou/pretext/dist");
const heroModules = [
  "bidi.js",
  "analysis.js",
  "measurement.js",
  "line-break.js",
  "line-text.js",
  "layout.js",
];
const gzipLimitBytes = 15_000;
const chrome =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const blobs = heroModules.map((name) => readFileSync(join(dist, name)));
const gzipBytes = gzipSync(Buffer.concat(blobs)).length;

const page = `<!doctype html>
<meta charset="utf-8">
<pre id="out">pending</pre>
<script type="module">
const out = document.getElementById("out");
try {
  const mod = await import("./layout.js");
  const strings = [
    "Welcome!🇬🇧🇺🇸 👋",
    "Mabuhay!🇵🇭 👋",
    "ようこそ🇯🇵 🙇",
    "I help product teams take new code all the way to deployment, writing most of it in TypeScript with AI and spec-driven development.",
  ];
  const start = performance.now();
  const prepared = strings.map((text) =>
    mod.prepareWithSegments(text, "16px Geist", { letterSpacing: 0 }),
  );
  const prepareMs = performance.now() - start;
  const layoutStart = performance.now();
  let layouts = 0;
  for (let width = 280; width <= 520; width += 8) {
    for (const item of prepared) {
      mod.layoutWithLines(item, width, 24);
      layouts += 1;
    }
  }
  const layoutMs = performance.now() - layoutStart;
  let cursor = { segmentIndex: 0, graphemeIndex: 0 };
  let ranges = 0;
  while (cursor) {
    const line = mod.layoutNextLineRange(prepared[3], cursor, 160);
    if (!line) break;
    ranges += 1;
    cursor = line.end;
  }
  out.textContent = JSON.stringify({
    prepareMs,
    layoutMs,
    layouts,
    averageLayoutMs: layoutMs / layouts,
    ranges,
  });
} catch (error) {
  out.textContent = JSON.stringify({ error: String(error) });
}
</script>`;

const htmlPath = join(dist, "hero-bench.html");
writeFileSync(htmlPath, page);
const port = 8766;
const server = spawn(
  "python3",
  [
    "-m",
    "http.server",
    String(port),
    "--bind",
    "127.0.0.1",
    "--directory",
    dist,
  ],
  { stdio: "ignore" },
);

const debugPort = 9227;
let chromeProcess;
let timing = { error: "Chrome timing did not run" };
try {
  let ready = false;
  for (let attempt = 0; attempt < 20; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/hero-bench.html`);
      if (response.ok) {
        ready = true;
        break;
      }
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
  if (!ready) throw new Error("bench server did not accept connections");
  chromeProcess = spawn(
    chrome,
    [
      "--headless=new",
      "--disable-gpu",
      `--remote-debugging-port=${debugPort}`,
      "--remote-allow-origins=*",
      `http://127.0.0.1:${port}/hero-bench.html`,
    ],
    { stdio: "ignore" },
  );
  let socketUrl = "";
  for (let attempt = 0; attempt < 40 && !socketUrl; attempt += 1) {
    try {
      const targets = await fetch(
        `http://127.0.0.1:${debugPort}/json/list`,
      ).then((response) => response.json());
      const pageTarget = targets.find((target) => target.type === "page");
      socketUrl = pageTarget?.webSocketDebuggerUrl ?? "";
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
  if (!socketUrl) throw new Error("Chrome debugging socket did not open");
  const socket = new WebSocket(socketUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", () => reject(new Error("socket failed")), {
      once: true,
    });
  });
  let text = "pending";
  for (let attempt = 0; attempt < 40 && text === "pending"; attempt += 1) {
    const id = attempt + 1;
    const payload = await new Promise((resolve) => {
      const onMessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.id !== id) return;
        socket.removeEventListener("message", onMessage);
        resolve(message);
      };
      socket.addEventListener("message", onMessage);
      socket.send(
        JSON.stringify({
          id,
          method: "Runtime.evaluate",
          params: {
            expression: "document.getElementById('out').textContent",
            returnByValue: true,
          },
        }),
      );
    });
    text = payload.result?.result?.value ?? "pending";
    if (text === "pending") {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
  socket.close();
  timing = text === "pending" ? { error: "bench stayed pending" } : JSON.parse(text);
} catch (error) {
  timing = { error: String(error) };
} finally {
  chromeProcess?.kill();
  server.kill();
  rmSync(htmlPath, { force: true });
}

const report = {
  gzipBytes,
  gzipLimitBytes,
  exceedsGzipLimit: gzipBytes > gzipLimitBytes,
  modules: heroModules,
  timing,
};
console.log(JSON.stringify(report, null, 2));
