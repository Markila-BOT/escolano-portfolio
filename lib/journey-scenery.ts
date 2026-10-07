import { Box3, Group, Vector3, Shape, ExtrudeGeometry } from "three";
import { createJourneyCharacter } from "@/lib/journey-character";
import { createCountryFlag } from "@/lib/journey-flags";
import type { JourneyResources } from "@/lib/journey-scene-resources";
import type { JourneyStop } from "@/lib/experience-journey";

export function createJourneyPlane(resources: JourneyResources) {
  const group = new Group();
  const hull = resources.mesh(
    group,
    "capsule",
    "#f7eedb",
    [1.1, 4.8, 1.1],
    [0, 0, 0],
  );
  hull.rotation.z = -Math.PI / 2;
  const wings = resources.mesh(
    group,
    "rounded",
    "#bcccd0",
    [2.2, 0.13, 8],
    [-0.3, -0.1, 0],
  );
  wings.rotation.y = 0.15;
  resources.mesh(group, "rounded", "#bcccd0", [1.4, 0.12, 3.8], [-3.7, 0.4, 0]);
  const tail = resources.mesh(
    group,
    "box",
    "#4e7b82",
    [1.6, 1.6, 0.15],
    [-3.7, 0.8, 0],
  );
  tail.rotation.z = -0.2;
  for (const side of [-1, 1]) {
    const engine = resources.mesh(
      group,
      "cylinder",
      "#556e7c",
      [0.4, 1.6, 0.4],
      [-0.3, -0.65, side * 2.3],
    );
    engine.rotation.z = Math.PI / 2;
    resources.mesh(
      group,
      "sphere",
      "#284956",
      [0.66, 0.43, 0.69],
      [3.4, 0.2, side * 0.5],
    );
    for (let i = 0; i < 7; i += 1)
      resources.mesh(
        group,
        "sphere",
        "#38586a",
        [0.15, 0.18, 0.025],
        [2.5 - i * 0.7, 0.28, side * 1.06],
      );
  }
  return resources.batch(group);
}

export function createJourneyScenery(
  resources: JourneyResources,
  stop: JourneyStop,
) {
  const root = new Group();
  const foreground = new Group();
  const background = new Group();
  const box = (
    parent: Group,
    color: string,
    size: readonly [number, number, number],
    pos: readonly [number, number, number],
  ) =>
    resources.mesh(
      parent,
      Math.min(...size) < 0.09 ? "box" : "rounded",
      color,
      size,
      pos,
    );
  const sphere = (
    parent: Group,
    color: string,
    size: readonly [number, number, number],
    pos: readonly [number, number, number],
  ) => resources.mesh(parent, "sphere", color, size, pos);
  const cylinder = (
    parent: Group,
    color: string,
    size: readonly [number, number, number],
    pos: readonly [number, number, number],
  ) => resources.mesh(parent, "cylinder", color, size, pos);
  const country = stop.country;
  const brick =
    country === "United Kingdom"
      ? "#ac735b"
      : country === "Japan"
        ? "#bfc6c7"
        : country === "Australia"
          ? "#9aaea6"
          : "#d9c9a8";
  const trim = "#3b5961",
    wood = "#c39058",
    white = "#fff1d6",
    dark = "#354757",
    green = "#7d9970";
  const tree = (parent: Group, x: number, z: number, palm = false) => {
    cylinder(parent, "#96755b", [0.16, 3.7, 0.16], [x, 1.9, z]);
    if (palm) {
      for (let i = 0; i < 6; i += 1) {
        const leaf = sphere(parent, green, [1.8, 0.15, 0.35], [x, 3.7, z]);
        leaf.rotation.y = (i * Math.PI) / 3;
        leaf.position.x += Math.cos((i * Math.PI) / 3) * 0.8;
        leaf.position.z += Math.sin((i * Math.PI) / 3) * 0.8;
      }
    } else sphere(parent, green, [1.25, 1.8, 1.25], [x, 4.3, z]);
  };
  const book = (
    parent: Group,
    x: number,
    y: number,
    z: number,
    color: string,
  ) => {
    box(parent, color, [0.7, 0.13, 0.92], [x, y, z]);
    box(parent, white, [0.64, 0.08, 0.87], [x, y + 0.07, z]);
  };
  const monitor = (
    parent: Group,
    x: number,
    y: number,
    z: number,
    laptop = false,
  ) => {
    const group = new Group();
    box(
      group,
      dark,
      [laptop ? 1.35 : 1.6, laptop ? 0.85 : 1.08, 0.12],
      [0, 0, 0],
    );
    box(
      group,
      "#263f4c",
      [laptop ? 1.18 : 1.4, laptop ? 0.68 : 0.9, 0.02],
      [0, 0, 0.071],
    );
    for (let i = 0; i < 4; i += 1) {
      box(
        group,
        i % 2 === 0 ? "#83b7a4" : "#e0be77",
        [0.4 + i * 0.13, 0.035, 0.01],
        [-0.28 + i * 0.055, 0.2 - i * 0.12, 0.085],
      );
    }
    if (laptop) box(group, dark, [1.35, 0.07, 0.85], [0, -0.45, 0.38]);
    else {
      cylinder(group, trim, [0.065, 0.44, 0.065], [0, -0.72, 0]);
      box(group, trim, [0.7, 0.06, 0.4], [0, -0.94, 0]);
    }
    group.position.set(x, y, z);
    group.rotation.y = x < 0 ? -0.28 : 0.18;
    parent.add(group);
  };
  const chair = (parent: Group, x: number, z: number, facing = 0) => {
    const group = new Group();
    box(group, trim, [1.15, 0.17, 1.12], [0, 1.02, 0]);
    box(group, trim, [1.1, 1.04, 0.16], [0, 1.61, -0.45]);
    for (const side of [-1, 1])
      for (const end of [-1, 1])
        cylinder(
          group,
          dark,
          [0.055, 0.9, 0.055],
          [side * 0.43, 0.5, end * 0.38],
        );
    group.position.set(x, 0, z);
    group.rotation.y = facing;
    parent.add(group);
  };
  const board = (parent: Group, x: number, z: number) => {
    box(parent, wood, [3.8, 2.5, 0.2], [x, 3.2, z]);
    box(parent, white, [3.55, 2.25, 0.05], [x, 3.2, z + 0.13]);
    for (const side of [-1, 1])
      cylinder(parent, trim, [0.045, 2.05, 0.045], [x + side * 1.6, 1.03, z]);
    for (let i = 0; i < 6; i += 1) {
      const bx = x - 1.1 + (i % 3) * 1.1,
        by = 3.8 - Math.floor(i / 3) * 1;
      box(
        parent,
        i % 2 === 0 ? "#d9b96d" : "#80a69d",
        [0.73, 0.5, 0.018],
        [bx, by, z + 0.168],
      );
      if (i < 3)
        box(parent, trim, [0.022, 0.4, 0.012], [bx, by - 0.42, z + 0.18]);
    }
  };
  const mug = (parent: Group, x: number, y: number, z: number) => {
    resources.surface(
      parent,
      resources.profile(
        "ceramic-mug",
        [
          [0, -0.16],
          [0.13, -0.16],
          [0.16, -0.12],
          [0.17, 0.16],
          [0.14, 0.17],
          [0.14, -0.1],
        ],
        1,
      ),
      white,
      [x, y, z],
      0.22,
    );
    cylinder(parent, "#644b3c", [0.135, 0.012, 0.135], [x, y + 0.165, z]);
    resources.surface(
      parent,
      resources.curve(
        "mug-handle",
        [
          [0, 0.12, 0],
          [0.21, 0.14, 0],
          [0.24, -0.1, 0],
          [0, -0.12, 0],
        ],
        0.045,
      ),
      white,
      [x + 0.14, y, z],
      0.25,
    );
  };
  const lamp = (parent: Group, x: number, z: number) => {
    cylinder(parent, trim, [0.28, 0.05, 0.28], [x, 1.81, z]);
    resources.surface(
      parent,
      resources.curve(
        "desk-lamp-arm",
        [
          [0, 0, 0],
          [0, 0.68, 0],
          [0.22, 0.96, 0],
          [0.5, 1, 0],
        ],
        0.04,
      ),
      trim,
      [x, 1.84, z],
      0.3,
      0.35,
    );
    const shade = resources.surface(
      parent,
      resources.profile(
        "lamp-shade",
        [
          [0, 0.25],
          [0.12, 0.24],
          [0.32, 0],
          [0.3, -0.03],
        ],
        0.85,
      ),
      "#e0ad4c",
      [x + 0.5, 2.7, z],
      0.4,
    );
    shade.rotation.z = -0.2;
    sphere(parent, white, [0.19, 0.045, 0.14], [x + 0.5, 2.68, z]);
  };
  const plant = (parent: Group, x: number, z: number) => {
    resources.surface(
      parent,
      resources.profile(
        "terracotta-pot",
        [
          [0, 0],
          [0.26, 0],
          [0.35, 0.57],
          [0.38, 0.62],
          [0.36, 0.68],
          [0.31, 0.65],
        ],
        1,
      ),
      "#bd7955",
      [x, 0.1, z],
      0.9,
    );
    cylinder(parent, "#70513d", [0.31, 0.025, 0.31], [x, 0.74, z]);
    for (const side of [-1, -0.5, 0, 0.5, 1]) {
      const leaf = sphere(
        parent,
        green,
        [0.28, 0.7, 0.19],
        [
          x + side * 0.38,
          1.25 + Math.cos(side * 2) * 0.22,
          z + Math.abs(side) * 0.12,
        ],
      );
      leaf.rotation.z = side * 0.3;
    }
  };
  box(foreground, "#617d70", [12.4, 0.65, 9.4], [0, -0.4, 0]);
  box(foreground, "#e7d8b9", [12.1, 0.2, 9.1], [0, -0.05, 0]);
  box(foreground, "#c7c8b4", [12, 0.13, 1.3], [0, 0.09, 3.7]);
  for (let i = 0; i < 9; i += 1)
    box(
      foreground,
      "#f5e9d0",
      [0.035, 0.025, 1.25],
      [-5.6 + i * 1.4, 0.17, 3.7],
    );
  box(foreground, wood, [9.7, 0.17, 6.8], [-0.3, 0.08, -0.6]);
  for (let i = 0; i < 8; i += 1)
    box(
      foreground,
      "#ad7a4d",
      [0.025, 0.012, 6.5],
      [-4.5 + i * 1.2, 0.174, -0.6],
    );
  box(foreground, brick, [9.7, 4.8, 0.22], [-0.3, 2.5, -3.8]);
  box(foreground, white, [10.1, 0.28, 0.5], [-0.3, 4.98, -3.8]);
  box(foreground, trim, [9.6, 0.18, 0.3], [-0.3, 0.4, -3.6]);
  for (const x of [-3.1, 1, 3.7]) {
    const width = x === -3.1 ? 2.6 : 2;
    box(foreground, white, [width + 0.2, 2.65, 0.15], [x, 3.1, -3.64]);
    box(foreground, "#a6c6cb", [width, 2.4, 0.06], [x, 3.1, -3.54]);
    box(foreground, trim, [0.07, 2.45, 0.065], [x, 3.1, -3.47]);
    box(foreground, trim, [width, 0.065, 0.065], [x, 3.1, -3.47]);
    box(foreground, wood, [width + 0.35, 0.13, 0.5], [x, 1.86, -3.42]);
    const reflection = box(
      foreground,
      "#d6e5dc",
      [0.24, 2.25, 0.018],
      [x - width * 0.28, 3.1, -3.5],
    );
    reflection.rotation.z = -0.16;
  }
  if (stop.scene.setting === "campus") {
    box(foreground, brick, [0.28, 3.1, 5], [-5, 1.63, -1.4]);
    for (let row = 0; row < 3; row += 1) {
      box(foreground, wood, [1.3, 0.12, 0.65], [-3.7, 0.7 + row * 1, -2.6]);
      for (let i = 0; i < 5; i += 1)
        box(
          foreground,
          ["#638c91", "#c88c62", "#d4b56b"][i % 3],
          [0.16, 0.6, 0.48],
          [-4.2 + i * 0.2, 1.07 + row, -2.6],
        );
    }
    box(foreground, wood, [0.9, 0.2, 1.1], [0, 1.87, 1.3]);
    box(foreground, white, [0.83, 0.05, 1.05], [0, 2, 1.3]);
    book(foreground, 1.1, 1.84, 1.3, "#bc775b");
    book(foreground, 1.1, 2.03, 1.3, "#739391");
  }
  const travel = stop.scene.setting === "terminal";
  const communal =
    stop.scene.setting === "team" || stop.scene.setting === "training";
  const seated =
    stop.scene.activity === "study" ||
    stop.scene.activity === "code" ||
    stop.scene.activity === "learn";
  const avatarPosition = new Vector3(
    communal && !seated ? -1.6 : 0,
    0.18,
    travel ? 1 : -0.4,
  );
  if (!travel) {
    box(foreground, wood, [communal ? 5 : 4, 0.16, 1.8], [0, 1.7, 1.6]);
    for (const side of [-1, 1])
      for (const end of [-1, 1])
        box(
          foreground,
          trim,
          [0.1, 1.55, 0.1],
          [side * (communal ? 2.1 : 1.65), 0.9, 1.6 + end * 0.7],
        );
    if (seated) chair(foreground, 0, -0.4);
    if (stop.scene.props !== "books") {
      const laptop = stop.scene.props === "laptop" || communal;
      monitor(foreground, -1.25, laptop ? 2.27 : 2.7, 1.65, laptop);
      if (stop.scene.props === "dual-monitors")
        monitor(foreground, 1.55, 2.7, 1.9);
      if (!laptop) {
        box(foreground, dark, [1.3, 0.065, 0.44], [0, 1.85, 0.91]);
        box(foreground, "#b5c3bd", [1.12, 0.02, 0.31], [0, 1.89, 0.91]);
      }
      book(foreground, -1.5, 1.83, 1.4, "#b28156");
      mug(foreground, 1.6, 1.98, 1.65);
      if (!communal) lamp(foreground, -1.6, 2.08);
    }
    if (communal || stop.scene.careerStage === "senior")
      board(foreground, communal ? 2.1 : -3.2, -2.6);
    plant(foreground, 4, -2.5);
    if (communal && stop.scene.activity !== "celebrate") {
      for (const [variant, x, z, angle] of [
        [1, 2.6, -0.6, -0.25],
        [2, -3.4, 0.1, 0.45],
      ] as const) {
        const colleague = createJourneyCharacter(resources, variant);
        colleague.configure({
          ...stop.scene,
          activity: stop.scene.activity === "learn" ? "learn" : "collaborate",
          careerStage: "professional",
        });
        colleague.root.position.set(x, 0.18, z);
        colleague.root.rotation.y = angle;
        colleague.root.scale.setScalar(0.9);
        foreground.add(colleague.root);
        resources.contactShadow(foreground, [x, 0.19, z + 0.4], 0.9);
      }
      chair(foreground, 2.5, -1.2);
      chair(foreground, -3.7, 2.3, 0.8);
      monitor(foreground, 1.7, 2.28, 1.75, true);
    }
  } else {
    box(foreground, "#a7c5c6", [9, 2.6, 0.13], [0, 2.8, -2.8]);
    for (const x of [-3, 0, 3])
      box(foreground, trim, [0.1, 3.7, 0.15], [x, 2, -2.65]);
    box(foreground, trim, [4, 0.18, 0.85], [-2, 0.85, -0.4]);
    for (const x of [-3.4, -0.6])
      box(foreground, trim, [0.13, 0.75, 0.65], [x, 0.46, -0.4]);
    box(foreground, wood, [4, 0.85, 0.15], [-2, 1.3, -0.8]);
    const luggage = resources.mesh(
      foreground,
      "rounded",
      "#c6884b",
      [0.8, 1.3, 0.54],
      [1.15, 1, 1.15],
    );
    luggage.rotation.z = -0.08;
    for (const x of [0.95, 1.13, 1.31])
      box(foreground, "#e3b475", [0.045, 0.9, 0.025], [x, 1, 1.44]);
    box(foreground, white, [0.2, 0.3, 0.035], [1.4, 1.45, 1.45]);
    for (const x of [0.83, 1.42]) {
      cylinder(foreground, dark, [0.07, 0.09, 0.07], [x, 0.25, 1.15]);
      box(foreground, trim, [0.045, 0.65, 0.045], [x, 1.94, 1.15]);
    }
    box(foreground, trim, [0.64, 0.065, 0.06], [1.14, 2.26, 1.15]);
    const parked = createJourneyPlane(resources);
    parked.scale.setScalar(0.48);
    parked.position.set(-7, 1.2, -1.8);
    parked.rotation.y = -0.35;
    parked.userData.keepInNarrow = true;
    background.add(parked);
  }
  if (!travel) tree(foreground, -5.4, 0.9, country === "Philippines");
  plant(foreground, 4.9, 2.7);
  const flag = createCountryFlag(resources, country);
  flag.scale.setScalar(0.82);
  flag.position.set(4.6, 0.1, -0.1);
  root.add(flag);
  for (let i = 0; i < 5; i += 1) {
    const building = new Group();
    const x = -10 + i * 4.8;
    const height =
      country === "United Kingdom" ? 4.5 + (i % 2) : 4.2 + ((i * 3) % 5);
    box(
      building,
      i % 2 ? brick : country === "Japan" ? "#dbb799" : "#b4b7a0",
      [3.8, height, 3.1],
      [0, height / 2, 0],
    );
    box(building, white, [4.1, 0.3, 3.35], [0, 0.2, 0]);
    box(building, trim, [0.7, 1.4, 0.1], [0.7, 0.9, 1.62]);
    box(building, "#d9b065", [0.6, 1.15, 0.05], [-0.9, 0.95, 1.63]);
    box(building, trim, [4.1, 0.25, 3.4], [0, height + 0.1, 0]);
    for (let row = 0; row < Math.floor(height / 1.5); row += 1) {
      for (const dx of [-1, 0, 1])
        box(
          building,
          "#78999f",
          [0.48, 0.75, 0.04],
          [dx, row * 1.45 + 1, 1.58],
        );
    }
    if (country === "United Kingdom" || country === "Philippines") {
      const attic = resources.surface(
        building,
        resources.sculpt("roof-gable", () => {
          const shape = new Shape();
          shape.moveTo(-0.5, 0);
          shape.lineTo(0, 1);
          shape.lineTo(0.5, 0);
          shape.closePath();
          const geometry = new ExtrudeGeometry(shape, {
            depth: 1,
            bevelEnabled: false,
          });
          geometry.translate(0, 0, -0.5);
          return geometry;
        }),
        brick,
        [0, height + 0.18, 0],
      );
      attic.scale.set(3.75, country === "United Kingdom" ? 0.75 : 0.63, 3.1);
    }
    if (country === "United Kingdom") {
      for (const side of [-1, 1]) {
        const roof = box(
          building,
          "#775b50",
          [2.2, 0.14, 3.4],
          [side * 0.92, height + 0.53, 0],
        );
        roof.rotation.z = side * -0.45;
      }
      box(building, "#ac735b", [0.6, 1.4, 0.6], [1, height + 1.3, 0]);
      for (let row = 0; row < Math.floor(height / 0.4); row += 1) {
        box(
          building,
          "#c99375",
          [3.6, 0.025, 0.02],
          [0, row * 0.4 + 0.1, 1.57],
        );
      }
    } else if (country === "Japan") {
      box(building, "#e7e3d9", [0.55, 2, 0.05], [1.25, height * 0.6, 1.65]);
      for (let line = 0; line < 4; line += 1)
        box(
          building,
          "#ac5e51",
          [0.3, 0.16, 0.025],
          [1.25, height * 0.6 + 0.6 - line * 0.4, 1.69],
        );
      box(building, trim, [3.7, 0.15, 0.7], [0, 0.85, 1.8]);
    } else if (country === "Australia") {
      box(
        building,
        "#c6dbd8",
        [3.1, height * 0.7, 0.06],
        [0, height * 0.55, 1.63],
      );
      for (const dx of [-1, 0, 1])
        box(
          building,
          trim,
          [0.035, height * 0.7, 0.04],
          [dx, height * 0.55, 1.68],
        );
    }
    if (country === "Philippines") {
      for (const side of [-1, 1]) {
        const roof = box(
          building,
          "#ba704f",
          [2.4, 0.18, 3.7],
          [side * 0.9, height + 0.5, 0],
        );
        roof.rotation.z = side * -0.35;
      }
      box(building, wood, [4.25, 0.16, 0.75], [0, 1.7, 1.7]);
      for (const side of [-1.5, 1.5])
        box(building, white, [0.16, 1.6, 0.16], [side, 0.9, 1.9]);
    }
    if (country === "Japan") {
      const awning = box(building, "#c66b51", [3.6, 0.16, 0.9], [0, 1.8, 1.85]);
      awning.rotation.x = 0.2;
      for (const side of [-1.4, -0.7, 0, 0.7, 1.4])
        box(building, white, [0.25, 0.12, 0.9], [side, 1.85, 1.85]);
      cylinder(building, "#dbad5d", [0.16, 0.45, 0.16], [-1.3, 1.5, 2]);
    }
    building.rotation.y = (i - 2) * 0.035;
    building.position.set(x, 0, -8.5 - (i % 2) * 1.2);
    background.add(building);
  }
  if (country === "Japan" || country === "Australia") {
    const transit = new Group();
    const tramColor = country === "Australia" ? "#507f6b" : "#bbd0c8";
    box(transit, tramColor, [4, 1.65, 1.1], [0, 1.1, 0]);
    box(transit, white, [4.2, 0.12, 1.3], [0, 1.98, 0]);
    box(transit, "#d8b657", [4.05, 0.14, 0.04], [0, 0.86, 0.59]);
    for (const side of [-1, 1])
      sphere(transit, "#f7db9e", [0.09, 0.09, 0.035], [1.96, 0.85, side * 0.4]);
    if (country === "Australia") {
      const arm = box(transit, trim, [0.06, 0.6, 0.06], [0, 2.32, 0]);
      arm.rotation.z = -0.45;
      box(transit, trim, [0.8, 0.045, 0.12], [0.15, 2.57, 0]);
    }
    for (let i = 0; i < 4; i += 1)
      box(transit, "#3e5967", [0.6, 0.7, 0.04], [-1.4 + i * 0.9, 1.3, 0.58]);
    for (const dx of [-1.2, 1.2]) {
      const wheel = cylinder(
        transit,
        dark,
        [0.27, 0.16, 0.27],
        [dx, 0.28, 0.4],
      );
      wheel.rotation.x = Math.PI / 2;
    }
    box(transit, trim, [5, 0.04, 0.04], [0, 0.12, 0.6]);
    box(transit, trim, [5, 0.04, 0.04], [0, 0.12, -0.6]);
    transit.position.set(6.6, 0, -3.7);
    transit.userData.keepInNarrow = true;
    background.add(transit);
  }
  if (country === "Philippines") {
    tree(background, 10, -6, true);
    tree(background, -10, -6, true);
  }
  const sparse = new Group();
  background.children
    .filter(
      (object) =>
        Math.abs(object.position.x) < 6 ||
        object.userData.keepInNarrow === true,
    )
    .forEach((object) => sparse.add(object.clone()));
  const reduced = resources.batch(sparse);
  reduced.visible = false;
  const detailed = resources.batch(background);
  const framing = new Group();
  framing.add(resources.batch(foreground), flag);
  root.add(framing, detailed, reduced);
  const frameBounds = new Box3().setFromObject(framing);
  return {
    root,
    frameBounds,
    background: detailed,
    reducedBackground: reduced,
    avatarPosition,
    facing: communal && !seated ? -0.2 : 0,
    cameraTarget: new Vector3(0.3, travel ? 2.5 : 2.2, 0),
    cameraOffset: travel
      ? new Vector3(6, 7, 20)
      : stop.scene.setting === "campus"
        ? new Vector3(-6, 5.8, 20)
        : communal
          ? new Vector3(9, 5.8, 20)
          : stop.scene.props === "dual-monitors"
            ? new Vector3(-7, 6, 20)
            : stop.scene.careerStage === "senior"
              ? new Vector3(7, 5.2, 20)
              : new Vector3(8, 6, 20),
  };
}
