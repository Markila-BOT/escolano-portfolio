const filesystem = require("node:fs");
const filesystemPromises = require("node:fs/promises");
const path = require("node:path");

const manifestPath = path.resolve(".next/server/pages-manifest.json");
const originalRead = filesystem.readFileSync.bind(filesystem);
const isManifest = (filename) => String(filename).endsWith("/server/pages-manifest.json");
const summarize = (contents) => {
  try {
    return { keys: Object.keys(JSON.parse(String(contents))) };
  } catch {
    return { invalidJson: true };
  }
};
const record = (hypothesisId, message, data) => {
  // #region debug log
  fetch("http://127.0.0.1:50171/ingest/50dd9f", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sessionId: "50dd9f",
      runId: process.env.DEBUG_BUILD_RUN || "build-reproduction",
      hypothesisId,
      location: "scripts/debug-build-manifest.cjs",
      message,
      data: { pid: process.pid, parentPid: process.ppid, ...data },
      timestamp: Date.now(),
    }),
  }).catch(() => {});
  // #endregion
};

let initialManifest;
try {
  initialManifest = summarize(originalRead(manifestPath, "utf8"));
} catch (error) {
  initialManifest = { errorCode: error.code };
}
record("A", "Process initial manifest state", {
  ...initialManifest,
  nodeVersion: process.version,
  documentExists: filesystem.existsSync(path.resolve(".next/server/pages/_document.js")),
});

filesystem.readFileSync = function (filename, ...options) {
  const result = originalRead(filename, ...options);
  if (isManifest(filename)) {
    record("A,C", "Manifest synchronous read", {
      ...summarize(result),
      caller: new Error().stack.split("\n").slice(2, 6),
    });
  }
  return result;
};

const originalWrite = filesystem.writeFile;
filesystem.writeFile = function (filename, contents, ...options) {
  if (isManifest(filename)) {
    record("B,C", "Manifest callback write requested", {
      ...summarize(contents),
      caller: new Error().stack.split("\n").slice(2, 6),
    });
  }
  return originalWrite.call(this, filename, contents, ...options);
};

const originalPromiseWrite = filesystemPromises.writeFile;
filesystemPromises.writeFile = async function (filename, contents, ...options) {
  const result = await originalPromiseWrite.call(this, filename, contents, ...options);
  if (isManifest(filename)) {
    record("B,C", "Manifest promise write completed", {
      ...summarize(contents),
      caller: new Error().stack.split("\n").slice(2, 6),
    });
  }
  return result;
};
