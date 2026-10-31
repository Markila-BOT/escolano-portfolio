const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const { test } = require("node:test");
const assert = require("node:assert/strict");

const root = path.resolve(__dirname, "..");
const ts = require("typescript");
const originalResolve = Module._resolveFilename;

Module._resolveFilename = function (request, parent, ...rest) {
  return originalResolve.call(
    this,
    request.startsWith("@/") ? path.join(root, request.slice(2)) : request,
    parent,
    ...rest,
  );
};

Module._extensions[".ts"] = function (module, file) {
  module._compile(
    ts.transpileModule(fs.readFileSync(file, "utf8"), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
        esModuleInterop: true,
      },
    }).outputText,
    file,
  );
};

for (const extension of [".png", ".jpg", ".jpeg", ".webp"]) {
  Module._extensions[extension] = (module) => {
    module.exports = { src: "test-image", width: 1, height: 1 };
  };
}

const { projectsData } = require("../lib/data.ts");

test("Truck Driver Guide is the last personal project and links to the live route desk", () => {
  const project = projectsData.at(-1);
  const description = project.description.join(" ");

  assert.equal(project.title, "Truck Driver Guide");
  assert.equal(project.websiteUrl, "https://truck-driver-guide-web.vercel.app/");
  assert.equal("videoUrl" in project, false);
  assert.equal("buildNote" in project, false);
  assert.match(description, /builds an HGV route from one trip brief/);
  assert.match(description, /verify the route, parking, and the actual duty record/);
  assert.doesNotMatch(description, /health check/i);
  assert.deepEqual(
    project.tags.map((tag) => tag.label),
    ["Personal", "Django", "React", "TypeScript", "Git"],
  );
  assert.equal(
    fs.existsSync(path.join(root, "public/projects/truck-driver-guide.png")),
    true,
  );
});
