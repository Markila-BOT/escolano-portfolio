import {
  CanvasTexture,
  DoubleSide,
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
  SRGBColorSpace,
  Group,
} from "three";
import type { JourneyResources } from "@/lib/journey-scene-resources";

function polygon(
  context: CanvasRenderingContext2D,
  points: readonly (readonly [number, number])[],
  color: string,
) {
  context.fillStyle = color;
  context.beginPath();
  points.forEach(([x, y], index) =>
    index === 0 ? context.moveTo(x, y) : context.lineTo(x, y),
  );
  context.closePath();
  context.fill();
}
function star(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  points: number,
  color: string,
  angle = -Math.PI / 2,
) {
  const vertices: [number, number][] = [];
  for (let i = 0; i < points * 2; i += 1) {
    const r = i % 2 === 0 ? radius : radius * 0.42;
    vertices.push([
      x + Math.cos(angle + (i * Math.PI) / points) * r,
      y + Math.sin(angle + (i * Math.PI) / points) * r,
    ]);
  }
  polygon(context, vertices, color);
}
function unionJack(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
) {
  context.save();
  context.scale(width / 60, height / 30);
  context.fillStyle = "#012169";
  context.fillRect(0, 0, 60, 30);
  polygon(
    context,
    [
      [0, 0],
      [6, 0],
      [60, 27],
      [60, 30],
      [54, 30],
      [0, 3],
    ],
    "#fff",
  );
  polygon(
    context,
    [
      [60, 0],
      [54, 0],
      [0, 27],
      [0, 30],
      [6, 30],
      [60, 3],
    ],
    "#fff",
  );
  polygon(
    context,
    [
      [0, 0],
      [20, 10],
      [16, 10],
      [0, 2],
    ],
    "#c8102e",
  );
  polygon(
    context,
    [
      [60, 30],
      [40, 20],
      [44, 20],
      [60, 28],
    ],
    "#c8102e",
  );
  polygon(
    context,
    [
      [60, 0],
      [40, 10],
      [36, 10],
      [56, 0],
    ],
    "#c8102e",
  );
  polygon(
    context,
    [
      [0, 30],
      [20, 20],
      [24, 20],
      [4, 30],
    ],
    "#c8102e",
  );
  context.fillStyle = "#fff";
  context.fillRect(25, 0, 10, 30);
  context.fillRect(0, 10, 60, 10);
  context.fillStyle = "#c8102e";
  context.fillRect(27, 0, 6, 30);
  context.fillRect(0, 12, 60, 6);
  context.restore();
}

export function createCountryFlag(
  resources: JourneyResources,
  country: string,
) {
  const group = new Group();
  const canvas = document.createElement("canvas");
  canvas.width = 600;
  canvas.height = country === "Japan" ? 400 : 300;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Flag canvas is unavailable");
  const w = canvas.width,
    h = canvas.height;
  context.fillStyle = "#fff";
  context.fillRect(0, 0, w, h);
  if (country === "Philippines") {
    context.fillStyle = "#0038a8";
    context.fillRect(0, 0, w, h / 2);
    context.fillStyle = "#ce1126";
    context.fillRect(0, h / 2, w, h / 2);
    polygon(
      context,
      [
        [0, 0],
        [(h * Math.sqrt(3)) / 2, h / 2],
        [0, h],
      ],
      "#fff",
    );
    const sunX = (h * Math.sqrt(3)) / 6,
      sunY = h / 2,
      diameter = h / 5;
    context.fillStyle = "#fcd116";
    context.beginPath();
    context.arc(sunX, sunY, diameter / 2, 0, Math.PI * 2);
    context.fill();
    for (let ray = 0; ray < 8; ray += 1) {
      context.save();
      context.translate(sunX, sunY);
      context.rotate((ray * Math.PI) / 4);
      polygon(
        context,
        [
          [diameter * 0.42, -diameter * 0.08],
          [diameter * 1.05, -diameter * 0.04],
          [diameter * 1.05, diameter * 0.04],
          [diameter * 0.42, diameter * 0.08],
        ],
        "#fcd116",
      );
      for (const side of [-1, 1])
        polygon(
          context,
          [
            [diameter * 0.4, side * diameter * 0.1],
            [diameter * 0.92, side * diameter * 0.18],
            [diameter * 0.92, side * diameter * 0.24],
            [diameter * 0.4, side * diameter * 0.16],
          ],
          "#fcd116",
        );
      context.restore();
    }
    star(context, 30, 42, (diameter * 5) / 18, 5, "#fcd116", -2.1);
    star(context, 30, h - 42, (diameter * 5) / 18, 5, "#fcd116", 2.1);
    star(
      context,
      (h * Math.sqrt(3)) / 2 - 48,
      h / 2,
      (diameter * 5) / 18,
      5,
      "#fcd116",
      0,
    );
  } else if (country === "Japan") {
    context.fillStyle = "#bc002d";
    context.beginPath();
    context.arc(w / 2, h / 2, h * 0.3, 0, Math.PI * 2);
    context.fill();
  } else if (country === "United Kingdom") {
    unionJack(context, w, h);
  } else if (country === "Australia") {
    context.fillStyle = "#012169";
    context.fillRect(0, 0, w, h);
    unionJack(context, w / 2, h / 2);
    star(context, w / 4, h * 0.75, h * 0.15, 7, "#fff");
    for (const [x, y, r, points] of [
      [0.75, 0.18, 0.071, 7],
      [0.64, 0.44, 0.071, 7],
      [0.85, 0.39, 0.071, 7],
      [0.75, 0.82, 0.071, 7],
      [0.81, 0.56, 0.04, 5],
    ]) {
      star(context, w * x, h * y, h * r, points, "#fff");
    }
  }
  const texture = resources.texture(new CanvasTexture(canvas));
  texture.colorSpace = SRGBColorSpace;
  const surface = resources.ownMaterial(
    new MeshStandardMaterial({ map: texture, side: DoubleSide, roughness: 1 }),
  );
  const flag = new Mesh(
    resources.ownGeometry(new PlaneGeometry(3.2, (3.2 * h) / w)),
    surface,
  );
  flag.position.set(1.65, 5.7, 0);
  group.add(flag);
  resources.mesh(
    group,
    "cylinder",
    "#b8c4c4",
    [0.055, 6.6, 0.055],
    [0, 3.3, 0],
  );
  resources.mesh(group, "sphere", "#d9b56d", [0.11, 0.11, 0.11], [0, 6.65, 0]);
  resources.mesh(
    group,
    "cylinder",
    "#cbd1c6",
    [0.45, 0.12, 0.45],
    [0, 0.08, 0],
  );
  return group;
}
