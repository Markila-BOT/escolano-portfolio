import { Group, SphereGeometry } from "three";
import type { Mesh } from "three";
import type { JourneyResources } from "@/lib/journey-scene-resources";
import type {
  JourneySceneDescriptor,
  JourneyActivity,
} from "@/lib/journey-scene-types";

type CharacterVariant = boolean | 1 | 2;

export function createJourneyCharacter(
  resources: JourneyResources,
  supporting: CharacterVariant = false,
) {
  const variant = supporting === true ? 1 : supporting || 0;
  const root = new Group();
  const torso = new Group();
  root.add(torso);
  const skin = ["#c98a61", "#995c45", "#e2b795"][variant];
  const hairColor = ["#29262a", "#493029", "#a05a36"][variant];
  const ink = "#263647";
  const ivory = "#fff4df";
  const oval = (
    parent: Group,
    color: string,
    size: readonly [number, number, number],
    position: readonly [number, number, number],
  ) => resources.mesh(parent, "sphere", color, size, position);
  const rounded = (
    parent: Group,
    color: string,
    size: readonly [number, number, number],
    position: readonly [number, number, number],
  ) => resources.mesh(parent, "rounded", color, size, position);
  const tube = (
    parent: Group,
    key: string,
    color: string,
    points: readonly (readonly [number, number, number])[],
    radius: number,
  ) => resources.surface(parent, resources.curve(key, points, radius), color);
  const shirtGeometry = resources.profile(
    "tailored-shirt",
    [
      [0, -0.67],
      [0.45, -0.66],
      [0.57, -0.55],
      [0.6, -0.18],
      [0.7, 0.28],
      [0.73, 0.55],
      [0.56, 0.7],
      [0.22, 0.78],
      [0, 0.78],
    ],
    0.65,
  );
  const shirt = resources.surface(torso, shirtGeometry, "#dcac4e");
  const bodyDetails = new Group();
  const neck = resources.surface(
    bodyDetails,
    resources.profile("neck", [
      [0, 0],
      [0.22, 0],
      [0.22, 0.4],
      [0.15, 0.44],
      [0, 0.44],
    ]),
    skin,
    [0, 0.66, 0],
  );
  neck.scale.z = 0.9;
  for (const side of [-1, 1]) {
    const collar = rounded(
      bodyDetails,
      ivory,
      [0.24, 0.32, 0.1],
      [side * 0.16, 0.61, 0.38],
    );
    collar.rotation.z = side * -0.35;
    rounded(bodyDetails, "#d8c7a3", [0.045, 0.9, 0.035], [0, -0.04, 0.397]);
    for (let i = 0; i < 3; i += 1)
      oval(
        bodyDetails,
        ivory,
        [0.035, 0.035, 0.024],
        [0, 0.32 - i * 0.24, 0.423],
      );
  }
  torso.add(resources.batch(bodyDetails));
  const jacket = new Group();
  for (const side of [-1, 1]) {
    const panel = resources.surface(
      jacket,
      resources.profile(
        "jacket-panel",
        [
          [0, -0.64],
          [0.27, -0.62],
          [0.31, 0.3],
          [0.33, 0.52],
          [0.23, 0.69],
          [0, 0.7],
        ],
        0.8,
      ),
      "#285f63",
      [side * 0.44, 0, 0.09],
    );
    panel.rotation.z = side * 0.09;
    const lapel = rounded(
      jacket,
      "#38787a",
      [0.16, 0.86, 0.07],
      [side * 0.21, 0.16, 0.48],
    );
    lapel.rotation.z = side * 0.2;
    rounded(
      jacket,
      "#79aaa2",
      [0.28, 0.035, 0.045],
      [side * 0.46, -0.23, 0.37],
    );
  }
  torso.add(jacket);
  const head = new Group();
  head.position.y = 1.64;
  torso.add(head);
  const face = new Group();
  const headGeometry = resources.sculpt("sculpted-head", () => {
    const geometry = new SphereGeometry(1, 28, 20);
    const positions = geometry.getAttribute("position");
    for (let i = 0; i < positions.count; i += 1) {
      const x = positions.getX(i),
        y = positions.getY(i),
        z = positions.getZ(i);
      const jaw = y < -0.28 ? 1 + (y + 0.28) * 0.22 : 1;
      const cheek = z > 0 ? Math.exp(-Math.pow((y + 0.12) * 3, 2)) * 0.06 : 0;
      positions.setXYZ(i, x * 0.77 * jaw, y * 0.91, z * 0.67 + cheek);
    }
    geometry.computeVertexNormals();
    return geometry;
  });
  resources.surface(face, headGeometry, skin);
  for (const side of [-1, 1]) {
    oval(face, skin, [0.16, 0.24, 0.14], [side * 0.74, -0.02, 0]);
    oval(face, "#b97453", [0.07, 0.125, 0.045], [side * 0.81, -0.02, 0.07]);
    oval(face, skin, [0.26, 0.19, 0.08], [side * 0.39, -0.2, 0.555]);
    oval(face, "#bc7759", [0.13, 0.068, 0.018], [side * 0.43, -0.21, 0.629]);
  }
  oval(face, skin, [0.155, 0.21, 0.2], [0, -0.08, 0.68]);
  oval(face, "#d69b73", [0.13, 0.09, 0.13], [0, -0.13, 0.81]);
  for (const side of [-1, 1])
    oval(face, "#925c46", [0.025, 0.018, 0.02], [side * 0.073, -0.195, 0.815]);
  const smile = new Group();
  oval(smile, "#693e35", [0.28, 0.096, 0.036], [0, -0.43, 0.59]);
  tube(
    smile,
    "smile-teeth",
    ivory,
    [
      [-0.21, -0.406, 0.619],
      [0, -0.433, 0.638],
      [0.21, -0.406, 0.619],
    ],
    0.026,
  );
  tube(
    smile,
    "lower-lip",
    "#b66b52",
    [
      [-0.22, -0.45, 0.609],
      [0, -0.505, 0.621],
      [0.22, -0.45, 0.609],
    ],
    0.022,
  );
  head.add(resources.batch(face), resources.batch(smile));
  const eyes: Group[] = [],
    brows: Group[] = [];
  for (const side of [-1, 1]) {
    const eye = new Group();
    eye.position.set(side * 0.285, 0.17, 0.584);
    eye.rotation.y = side * 0.14;
    oval(eye, "#a76448", [0.239, 0.255, 0.116], [0, 0, 0]);
    const white = oval(eye, "#fff8ed", [0.21, 0.224, 0.11], [0, 0.012, 0.035]);
    white.material = resources.material("#fff8ed", 0.28);
    const iris = oval(
      eye,
      "#7b532f",
      [0.112, 0.137, 0.038],
      [-side * 0.018, 0, 0.142],
    );
    iris.material = resources.material("#7b532f", 0.3);
    oval(eye, "#22232a", [0.062, 0.091, 0.022], [-side * 0.018, 0, 0.173]);
    oval(eye, "#ffffff", [0.03, 0.034, 0.012], [-0.035, 0.056, 0.196]);
    oval(eye, "#ffffff", [0.013, 0.016, 0.008], [0.032, -0.03, 0.196]);
    tube(
      eye,
      "upper-eyelid",
      hairColor,
      [
        [-0.205, 0.07, 0.072],
        [-0.11, 0.202, 0.099],
        [0.075, 0.22, 0.093],
        [0.198, 0.08, 0.066],
      ],
      0.018,
    );
    const mergedEye = resources.batch(eye);
    head.add(mergedEye);
    eyes.push(mergedEye);
    const brow = new Group();
    brow.position.set(side * 0.29, 0.49, 0.55);
    tube(
      brow,
      "arched-brow",
      hairColor,
      [
        [-0.19, -0.018, 0],
        [-0.07, 0.041, 0.025],
        [0.1, 0.027, 0.02],
        [0.19, -0.025, 0],
      ],
      0.049,
    );
    head.add(brow);
    brows.push(brow);
  }
  const hair = new Group();
  oval(hair, hairColor, [0.77, 0.48, 0.64], [0, 0.56, -0.12]);
  oval(hair, hairColor, [0.72, 0.5, 0.18], [0, 0.32, -0.58]);
  for (const side of [-1, 1])
    oval(hair, hairColor, [0.105, 0.29, 0.14], [side * 0.69, 0.2, -0.065]);
  if (variant === 1) {
    for (let i = 0; i < 7; i += 1)
      oval(
        hair,
        hairColor,
        [0.25, 0.28, 0.25],
        [
          Math.cos(i * 1.7) * 0.49,
          0.82 + (i % 2) * 0.07,
          Math.sin(i * 1.7) * 0.33,
        ],
      );
  } else {
    for (let i = 0; i < 5; i += 1) {
      const lock = oval(
        hair,
        hairColor,
        [0.31, 0.17, 0.39],
        [-0.43 + i * 0.2, 0.71 + i * 0.045, 0.25 - i * 0.07],
      );
      lock.rotation.z = -0.3;
      tube(
        hair,
        `hair-ridge-${i}`,
        variant === 2 ? "#b86e43" : "#3c3435",
        [
          [-0.52 + i * 0.2, 0.73 + i * 0.04, 0.47 - i * 0.06],
          [-0.44 + i * 0.2, 0.88 + i * 0.035, 0.26 - i * 0.04],
          [-0.25 + i * 0.2, 0.8, -0.04],
        ],
        0.015,
      );
    }
  }
  head.add(resources.batch(hair));
  const arms: Group[] = [],
    elbows: Group[] = [],
    hands: Group[] = [];
  const legs: Group[] = [],
    knees: Group[] = [],
    sleeves: Mesh[] = [];
  const upperArm = resources.profile("shirt-sleeve", [
    [0, 0.08],
    [0.22, 0.08],
    [0.25, -0.1],
    [0.21, -0.42],
    [0.18, -0.48],
    [0, -0.48],
  ]);
  const forearm = resources.profile(
    "sculpted-arm",
    [
      [0, 0.02],
      [0.17, 0.02],
      [0.18, -0.2],
      [0.135, -0.58],
      [0.11, -0.68],
      [0, -0.68],
    ],
    0.92,
  );
  for (const side of [-1, 1]) {
    const arm = new Group();
    arm.position.set(side * 0.7, 0.58, 0);
    torso.add(arm);
    arms.push(arm);
    sleeves.push(resources.surface(arm, upperArm, "#dcac4e"));
    const upper = resources.surface(arm, forearm, skin, [0, -0.41, 0]);
    upper.scale.y = 0.66;
    const elbow = new Group();
    elbow.position.y = -0.84;
    arm.add(elbow);
    elbows.push(elbow);
    resources.surface(elbow, forearm, skin);
    const hand = new Group();
    hand.position.set(0, -0.66, 0);
    elbow.add(hand);
    hands.push(hand);
    const palm = new Group();
    oval(palm, skin, [0.17, 0.21, 0.085], [0, -0.14, 0.015]);
    for (let finger = 0; finger < 4; finger += 1) {
      const digit = resources.surface(
        palm,
        resources.profile(`finger-${finger}`, [
          [0, 0],
          [0.038, -0.01],
          [0.044, -0.06],
          [0.04, -0.16],
          [0.025, -0.2],
          [0, -0.22],
        ]),
        skin,
        [-0.12 + finger * 0.076, -0.24 + Math.abs(finger - 1.5) * 0.04, 0.03],
      );
      digit.rotation.x = -0.18;
    }
    const thumb = oval(
      palm,
      skin,
      [0.073, 0.145, 0.065],
      [side * -0.19, -0.12, 0.08],
    );
    thumb.rotation.z = -side * 0.45;
    hand.add(resources.batch(palm));
    const leg = new Group();
    leg.position.set(side * 0.3, 2.05, 0);
    root.add(leg);
    legs.push(leg);
    resources.surface(
      leg,
      resources.profile(
        "tailored-trouser-thigh",
        [
          [0, 0],
          [0.27, -0.025],
          [0.27, -0.26],
          [0.23, -0.62],
          [0.21, -0.93],
          [0, -0.93],
        ],
        0.94,
      ),
      ink,
    );
    const knee = new Group();
    knee.position.y = -0.9;
    leg.add(knee);
    knees.push(knee);
    resources.surface(
      knee,
      resources.profile(
        "tailored-trouser-calf",
        [
          [0, 0],
          [0.21, 0],
          [0.22, -0.23],
          [0.175, -0.66],
          [0.17, -0.9],
          [0, -0.91],
        ],
        0.94,
      ),
      ink,
    );
    const shoe = new Group();
    oval(shoe, "#394756", [0.235, 0.18, 0.44], [0, -0.94, 0.16]);
    rounded(shoe, "#e6dcc5", [0.46, 0.08, 0.76], [0, -1.065, 0.15]);
    for (let lace = 0; lace < 3; lace += 1)
      rounded(
        shoe,
        ivory,
        [0.22, 0.025, 0.032],
        [0, -0.79, 0.07 + lace * 0.06],
      );
    knee.add(resources.batch(shoe));
  }
  const bag = new Group();
  rounded(bag, "#b96539", [0.87, 1.1, 0.45], [0, 0.05, -0.51]);
  rounded(bag, "#da8b50", [0.64, 0.55, 0.12], [0, -0.15, -0.77]);
  for (const side of [-1, 1])
    tube(
      bag,
      `bag-strap-${side}`,
      "#805337",
      [
        [side * 0.4, -0.4, 0.18],
        [side * 0.5, 0.65, 0.28],
        [side * 0.34, 0.82, -0.5],
      ],
      0.055,
    );
  torso.add(bag);
  const badge = new Group();
  tube(
    badge,
    "lanyard",
    "#337b83",
    [
      [-0.17, 0.71, 0.39],
      [0, 0.02, 0.46],
      [0.17, 0.71, 0.39],
    ],
    0.026,
  );
  rounded(badge, ivory, [0.24, 0.31, 0.04], [0, -0.045, 0.48]);
  rounded(badge, "#5d96a0", [0.16, 0.035, 0.02], [0, 0.01, 0.51]);
  torso.add(badge);
  root.traverse((object) => {
    object.castShadow = true;
  });
  let descriptor: JourneySceneDescriptor;
  const pose = (activity: JourneyActivity, phase = 0, expression = 0) => {
    torso.rotation.set(0, 0, 0);
    head.rotation.set(0, -0.12, 0.035);
    brows.forEach((brow, index) => {
      brow.rotation.z = (index === 0 ? -1 : 1) * (0.045 + expression * 0.12);
      brow.position.y = 0.49 + expression * 0.065;
    });
    eyes.forEach((eye) => {
      eye.scale.y = 1 - expression * 0.06;
    });
    arms.forEach((arm, index) =>
      arm.rotation.set(0, 0, index === 0 ? -0.1 : 0.1),
    );
    elbows.forEach((elbow) => elbow.rotation.set(-0.12, 0, 0));
    hands.forEach((hand) => hand.rotation.set(0, 0, 0));
    legs.forEach((leg) => {
      leg.rotation.set(0, 0, 0);
      leg.position.y = 2.05;
    });
    knees.forEach((knee) => knee.rotation.set(0, 0, 0));
    torso.position.y = 2.55;
    if (activity === "study" || activity === "code" || activity === "learn") {
      torso.position.y = 1.55;
      torso.rotation.x = descriptor.careerStage === "senior" ? 0.025 : 0.08;
      head.rotation.x = activity === "learn" ? -0.05 : 0.07;
      head.rotation.y = activity === "study" ? -0.1 : -0.2;
      legs.forEach((leg) => {
        leg.position.y = 1.13;
        leg.rotation.x = -Math.PI / 2;
      });
      knees.forEach((knee) => {
        knee.rotation.x = Math.PI / 2;
      });
      arms.forEach((arm, index) => {
        arm.rotation.x = -0.78 + phase * (index === 0 ? 0.06 : -0.06);
        arm.rotation.z = index === 0 ? -0.18 : 0.18;
      });
      elbows.forEach((elbow, index) => {
        elbow.rotation.x = -1.12 + phase * (index === 0 ? 0.12 : -0.12);
      });
      hands.forEach((hand, index) => {
        hand.rotation.x = 0.52 + phase * (index === 0 ? 0.08 : -0.08);
        hand.rotation.z = index === 0 ? -0.15 : 0.15;
      });
    } else if (activity === "guide" || activity === "collaborate") {
      arms[1].rotation.x = -0.8;
      arms[1].rotation.z = -0.55 - phase * 0.12;
      elbows[1].rotation.x = -0.65;
      hands[1].rotation.z = -0.35;
      head.rotation.y = -0.18 + phase * 0.08;
      arms[0].rotation.x = -0.3;
    } else if (activity === "celebrate") {
      arms[1].rotation.x = -0.6;
      arms[1].rotation.z = -0.75 - phase * 0.22;
      elbows[1].rotation.x = -1.7;
      hands[1].rotation.x = 0.25;
      head.rotation.z = -0.045;
    } else {
      arms[1].rotation.z = -0.18;
      head.rotation.y = -0.1 + phase * 0.16;
    }
  };
  return {
    root,
    configure: (scene: JourneySceneDescriptor) => {
      descriptor = scene;
      const color = supporting
        ? variant === 1
          ? "#b7654c"
          : "#c6a05d"
        : scene.careerStage === "student"
          ? "#dcac4e"
          : scene.careerStage === "junior"
            ? "#88a8ba"
            : scene.careerStage === "senior"
              ? "#eee0c3"
              : "#527e9a";
      shirt.material = resources.material(color, 0.95);
      sleeves.forEach((sleeve) => {
        sleeve.material = resources.material(
          !supporting && scene.careerStage === "senior" ? "#285f63" : color,
          0.95,
        );
      });
      jacket.visible = !supporting && scene.careerStage === "senior";
      bag.visible = !supporting && scene.careerStage === "student";
      badge.visible = !supporting && scene.careerStage === "junior";
      pose(scene.activity);
    },
    gesture: (progress: number) =>
      pose(
        descriptor.activity,
        progress <= 0 || progress >= 1
          ? 0
          : Math.sin(progress * Math.PI) * Math.sin(progress * Math.PI * 6),
        progress <= 0 || progress >= 1 ? 0 : Math.sin(progress * Math.PI),
      ),
    walk: (progress: number, direction: number) => {
      pose("travel");
      root.rotation.y = direction > 0 ? Math.PI / 2 : -Math.PI / 2;
      const swing = Math.sin(progress * Math.PI * 8) * 0.45;
      legs[0].rotation.x = swing;
      legs[1].rotation.x = -swing;
      knees[0].rotation.x = Math.max(0, -swing);
      knees[1].rotation.x = Math.max(0, swing);
      arms[0].rotation.x = -swing;
      arms[1].rotation.x = swing;
    },
  };
}
