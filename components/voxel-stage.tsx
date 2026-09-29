"use client";

import { useEffect, useRef } from "react";
import {
  AmbientLight,
  BoxGeometry,
  Color,
  DirectionalLight,
  GridHelper,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Raycaster,
  Scene,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";
import type { Material, Object3D } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const CUBE_SIZE = 30;
const GRID_SIZE = 480;
const GRID_DIVISIONS = 16;
const CLICK_SLOP_PX = 6;
const MAX_PIXEL_RATIO = 2;

const START_CELLS = [
  { x: 0, z: 0 },
  { x: 1, z: 0 },
  { x: 0, z: 1 },
] as const;

const STAGE_INSTRUCTION =
  "Click to add a cube. Shift-click to remove a cube. Drag to rotate. Scroll to zoom. Pan to move the view.";

function readCssColor(variableName: string, fallback: string) {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(variableName)
    .trim();

  if (raw.length === 0) {
    return fallback;
  }

  const probe = document.createElement("span");
  probe.style.color = `hsl(${raw})`;
  document.body.append(probe);
  const resolved = getComputedStyle(probe).color;
  probe.remove();

  return resolved.length > 0 ? resolved : fallback;
}

function disposeMaterial(material: Material | Material[]) {
  if (Array.isArray(material)) {
    material.forEach((entry) => entry.dispose());
    return;
  }

  material.dispose();
}

function snapToCell(point: Vector3, normal: Vector3) {
  return point
    .clone()
    .add(normal)
    .divideScalar(CUBE_SIZE)
    .floor()
    .multiplyScalar(CUBE_SIZE)
    .addScalar(CUBE_SIZE / 2);
}

function mountVoxelStage(viewport: HTMLDivElement) {
  let renderer: WebGLRenderer;

  try {
    renderer = new WebGLRenderer({ antialias: true, alpha: true });
  } catch {
    return () => {};
  }

  const scene = new Scene();
  const camera = new PerspectiveCamera(45, 1, 1, 10000);
  camera.position.set(140, 130, 180);

  const cubeGeometry = new BoxGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE);
  const cubeMaterial = new MeshLambertMaterial();
  const rollOverMaterial = new MeshLambertMaterial({
    transparent: true,
    opacity: 0.35,
    depthWrite: false,
  });
  const rollOver = new Mesh(cubeGeometry, rollOverMaterial);
  rollOver.visible = false;
  scene.add(rollOver);

  const planeGeometry = new PlaneGeometry(GRID_SIZE, GRID_SIZE);
  const planeMaterial = new MeshBasicMaterial({
    transparent: true,
    opacity: 0,
    depthWrite: false,
  });
  const plane = new Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -Math.PI / 2;
  scene.add(plane);

  const voxels: Mesh[] = [];
  const raycastTargets: Object3D[] = [plane];

  const addVoxel = (position: Vector3) => {
    const occupied = voxels.some(
      (voxel) => voxel.position.distanceToSquared(position) < 1,
    );
    if (occupied) {
      return;
    }

    const voxel = new Mesh(cubeGeometry, cubeMaterial);
    voxel.position.copy(position);
    scene.add(voxel);
    voxels.push(voxel);
    raycastTargets.push(voxel);
  };

  for (const cell of START_CELLS) {
    addVoxel(
      new Vector3(
        cell.x * CUBE_SIZE + CUBE_SIZE / 2,
        CUBE_SIZE / 2,
        cell.z * CUBE_SIZE + CUBE_SIZE / 2,
      ),
    );
  }

  let grid = new GridHelper(GRID_SIZE, GRID_DIVISIONS);
  scene.add(grid);

  scene.add(new AmbientLight(0xffffff, 2));
  const directional = new DirectionalLight(0xffffff, 2);
  directional.position.set(1, 1.2, 0.6);
  scene.add(directional);

  const render = () => {
    renderer.render(scene, camera);
  };

  const applyTheme = () => {
    scene.background = new Color(readCssColor("--background", "#f6f8fb"));
    const cubeColor = readCssColor("--primary", "#0f766e");
    cubeMaterial.color.set(cubeColor);
    rollOverMaterial.color.set(cubeColor);

    const nextGrid = new GridHelper(
      GRID_SIZE,
      GRID_DIVISIONS,
      new Color(readCssColor("--foreground", "#0a192f")),
      new Color(readCssColor("--border", "#64748b")),
    );
    scene.remove(grid);
    grid.geometry.dispose();
    disposeMaterial(grid.material);
    grid = nextGrid;
    scene.add(grid);
    render();
  };

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = false;
  controls.autoRotate = false;
  controls.enableRotate = true;
  controls.enableZoom = true;
  controls.enablePan = true;
  controls.minDistance = 50;
  controls.maxDistance = 700;
  controls.target.set(CUBE_SIZE, CUBE_SIZE / 2, CUBE_SIZE);
  controls.update();
  controls.addEventListener("change", render);

  renderer.domElement.tabIndex = -1;
  renderer.domElement.className = "block h-full w-full";
  viewport.append(renderer.domElement);

  const raycaster = new Raycaster();
  const pointer = new Vector2();
  let isShiftPressed = false;
  let pointerDown: { x: number; y: number; isShift: boolean } | null = null;

  const resize = () => {
    const width = viewport.clientWidth;
    const height = viewport.clientHeight;
    if (width === 0 || height === 0) {
      return;
    }

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, MAX_PIXEL_RATIO));
    renderer.setSize(width, height);
    render();
  };

  const intersectPointer = (event: PointerEvent) => {
    const rect = viewport.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
      return undefined;
    }

    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    return raycaster.intersectObjects(raycastTargets, false)[0];
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key !== "Shift") {
      return;
    }

    isShiftPressed = true;
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key !== "Shift") {
      return;
    }

    isShiftPressed = false;
  };

  const handleBlur = () => {
    isShiftPressed = false;
  };

  const handlePointerLeave = () => {
    rollOver.visible = false;
    pointerDown = null;
    render();
  };

  const handlePointerMove = (event: PointerEvent) => {
    const hit = intersectPointer(event);
    if (hit?.face === undefined || hit.face === null || isShiftPressed) {
      rollOver.visible = false;
      render();
      return;
    }

    rollOver.visible = true;
    rollOver.position.copy(snapToCell(hit.point, hit.face.normal));
    render();
  };

  const handlePointerDown = (event: PointerEvent) => {
    if (event.button !== 0) {
      return;
    }

    pointerDown = {
      x: event.clientX,
      y: event.clientY,
      isShift: isShiftPressed,
    };
  };

  const handlePointerUp = (event: PointerEvent) => {
    if (event.button !== 0 || pointerDown === null) {
      return;
    }

    const moved = Math.hypot(
      event.clientX - pointerDown.x,
      event.clientY - pointerDown.y,
    );
    const isShift = pointerDown.isShift;
    pointerDown = null;

    if (moved > CLICK_SLOP_PX) {
      return;
    }

    const hit = intersectPointer(event);
    if (hit?.face === undefined || hit.face === null) {
      return;
    }

    if (isShift) {
      const index = voxels.findIndex((voxel) => voxel === hit.object);
      if (index < 0) {
        return;
      }

      const [removed] = voxels.splice(index, 1);
      if (removed === undefined) {
        return;
      }

      raycastTargets.splice(raycastTargets.indexOf(removed), 1);
      scene.remove(removed);
      render();
      return;
    }

    addVoxel(snapToCell(hit.point, hit.face.normal));
    render();
  };

  const handleContextMenu = (event: Event) => {
    event.preventDefault();
  };

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(viewport);
  const themeObserver = new MutationObserver(applyTheme);
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });

  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keyup", handleKeyUp);
  window.addEventListener("blur", handleBlur);
  renderer.domElement.addEventListener("pointermove", handlePointerMove);
  renderer.domElement.addEventListener("pointerdown", handlePointerDown);
  renderer.domElement.addEventListener("pointerup", handlePointerUp);
  renderer.domElement.addEventListener("pointerleave", handlePointerLeave);
  renderer.domElement.addEventListener("contextmenu", handleContextMenu);

  applyTheme();
  resize();

  return () => {
    themeObserver.disconnect();
    resizeObserver.disconnect();
    document.removeEventListener("keydown", handleKeyDown);
    document.removeEventListener("keyup", handleKeyUp);
    window.removeEventListener("blur", handleBlur);
    renderer.domElement.removeEventListener("pointermove", handlePointerMove);
    renderer.domElement.removeEventListener("pointerdown", handlePointerDown);
    renderer.domElement.removeEventListener("pointerup", handlePointerUp);
    renderer.domElement.removeEventListener("pointerleave", handlePointerLeave);
    renderer.domElement.removeEventListener("contextmenu", handleContextMenu);
    controls.dispose();
    cubeGeometry.dispose();
    cubeMaterial.dispose();
    rollOverMaterial.dispose();
    planeGeometry.dispose();
    planeMaterial.dispose();
    grid.geometry.dispose();
    disposeMaterial(grid.material);
    renderer.dispose();
    renderer.domElement.remove();
  };
}

export function VoxelStage() {
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (viewport === null) {
      return;
    }

    return mountVoxelStage(viewport);
  }, []);

  return (
    <div className="mx-auto mt-8 flex h-64 w-full max-w-full flex-col">
      <p className="shrink-0 px-4 text-center text-sm text-foreground">
        {STAGE_INSTRUCTION}
      </p>
      <div
        ref={viewportRef}
        aria-hidden="true"
        className="relative mt-2 min-h-0 flex-1 overflow-hidden rounded-md border border-border bg-background"
      />
    </div>
  );
}
