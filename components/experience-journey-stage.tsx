"use client";

import { useEffect, useRef } from "react";
import {
  Color,
  DirectionalLight,
  Fog,
  HemisphereLight,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
  PCFSoftShadowMap,
  ACESFilmicToneMapping,
  Group,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { createJourneyResources } from "@/lib/journey-scene-resources";
import { createJourneyCharacter } from "@/lib/journey-character";
import {
  createJourneyScenery,
  createJourneyPlane,
} from "@/lib/journey-scenery";
import { journeyTravelMode } from "@/lib/experience-journey";
import type { JourneyStop } from "@/lib/experience-journey";

type ExperienceJourneyStageProps = {
  stops: readonly JourneyStop[];
  currentIndex: number;
};
type JourneyApi = { setIndex: (index: number) => void; dispose: () => void };

function readCssColor(variableName: string, fallback: string) {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(variableName)
    .trim();
  if (!raw) return fallback;
  const probe = document.createElement("span");
  probe.style.color = `hsl(${raw})`;
  document.body.append(probe);
  const resolved = getComputedStyle(probe).color;
  probe.remove();
  return resolved || fallback;
}

function mountJourney(
  viewport: HTMLDivElement,
  stops: readonly JourneyStop[],
): JourneyApi {
  const resources = createJourneyResources();
  const cleanups: (() => void)[] = [];
  let frame = 0,
    disposed = false;
  const dispose = () => {
    if (disposed) return;
    disposed = true;
    cancelAnimationFrame(frame);
    frame = 0;
    cleanups.reverse().forEach((cleanup) => cleanup());
    resources.dispose();
    delete viewport.dataset.journeyPhase;
    delete viewport.dataset.journeyLeg;
    delete viewport.dataset.journeyDrawCalls;
    delete viewport.dataset.journeyTriangles;
  };
  try {
    const renderer = new WebGLRenderer({ antialias: true, alpha: true });
    cleanups.push(() => {
      resources.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    });
    renderer.shadowMap.type = PCFSoftShadowMap;
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.domElement.className = "block h-full w-full";
    viewport.append(renderer.domElement);
    const scene = new Scene();
    const camera = new PerspectiveCamera(40, 1, 0.1, 1500);
    const hemisphere = new HemisphereLight("#d1e6ff", "#9b7051", 1.4);
    const sunlight = new DirectionalLight("#ffe2b2", 3.6);
    sunlight.position.set(-12, 24, 14);
    sunlight.castShadow = true;
    sunlight.shadow.mapSize.set(1024, 1024);
    sunlight.shadow.camera.left = -14;
    sunlight.shadow.camera.right = 14;
    sunlight.shadow.camera.top = 14;
    sunlight.shadow.camera.bottom = -14;
    sunlight.shadow.normalBias = 0.025;
    sunlight.shadow.bias = -0.00015;
    sunlight.shadow.radius = 3;
    const rim = new DirectionalLight("#adcfe5", 1.8);
    rim.position.set(8, 12, -12);
    scene.add(rim, rim.target);
    cleanups.push(() => sunlight.shadow.dispose());
    scene.add(hemisphere, sunlight, sunlight.target);
    let x = 0;
    const chapters = stops.map((stop, index) => {
      if (index > 0) x += stops[index - 1].country === stop.country ? 24 : 62;
      const chapter = createJourneyScenery(resources, stop);
      chapter.root.position.x = x;
      chapter.root.visible = index === 0;
      scene.add(chapter.root);
      return chapter;
    });
    const path = new Group();
    for (let index = 1; index < chapters.length; index += 1) {
      if (stops[index - 1].country !== stops[index].country) continue;
      const start = chapters[index - 1].root.position.x,
        end = chapters[index].root.position.x;
      resources.mesh(
        path,
        "box",
        "#c4beaf",
        [end - start, 0.16, 1.65],
        [(start + end) / 2, -0.02, 4.8],
      );
    }
    const joinedPath = resources.batch(path);
    joinedPath.visible = false;
    scene.add(joinedPath);
    const avatar = createJourneyCharacter(resources);
    resources.contactShadow(avatar.root, [0, 0.012, 0.4]);
    scene.add(avatar.root);
    const plane = createJourneyPlane(resources);
    plane.visible = false;
    scene.add(plane);
    const controls = new OrbitControls(camera, renderer.domElement);
    cleanups.push(() => controls.dispose());
    controls.enableDamping = false;
    controls.autoRotate = false;
    controls.enablePan = false;
    controls.minDistance = 12;
    controls.maxDistance = 80;
    controls.minPolarAngle = 0.35;
    controls.maxPolarAngle = Math.PI / 2.2;
    const offset = new Vector3(8, 5.8, 18);
    let following = false,
      shownIndex = 0,
      transitioning = false;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const render = () => {
      if (disposed) return;
      renderer.render(scene, camera);
      viewport.dataset.journeyDrawCalls = String(renderer.info.render.calls);
      viewport.dataset.journeyTriangles = String(
        renderer.info.render.triangles,
      );
    };
    const handleLook = () => {
      if (following) return;
      offset.copy(camera.position).sub(controls.target);
      render();
    };
    controls.addEventListener("change", handleLook);
    const follow = (target: Vector3) => {
      following = true;
      controls.target.copy(target);
      camera.position.copy(target).add(offset);
      controls.update();
      sunlight.position.copy(target).add(new Vector3(-12, 24, 14));
      sunlight.target.position.copy(target);
      rim.position.copy(target).add(new Vector3(8, 12, -12));
      rim.target.position.copy(target);
      following = false;
    };
    const fittedOffset = (index: number, direction: Vector3) => {
      const vertical = (camera.fov * Math.PI) / 360;
      const horizontal = Math.atan(Math.tan(vertical) * camera.aspect);
      const size = chapters[index].frameBounds.getSize(new Vector3());
      const distance = Math.max(
        (size.x * 0.54) / Math.sin(horizontal),
        (size.y * 0.48 + size.z * 0.12) / Math.sin(vertical),
        18,
      );
      return direction.clone().normalize().multiplyScalar(distance);
    };
    const fit = () => {
      offset.copy(fittedOffset(shownIndex, offset));
      controls.maxDistance = Math.max(60, offset.length() * 1.7);
    };
    const chapterTarget = (index: number) =>
      chapters[index].root.position.clone().add(chapters[index].cameraTarget);
    const positionAt = (index: number) =>
      chapters[index].avatarPosition.clone().add(chapters[index].root.position);
    const expose = (...indices: number[]) =>
      chapters.forEach((chapter, index) => {
        chapter.root.visible = indices.includes(index);
      });
    const settle = (index: number) => {
      cancelAnimationFrame(frame);
      frame = 0;
      transitioning = false;
      joinedPath.visible = false;
      shownIndex = index;
      const stop = stops[index],
        chapter = chapters[index];
      if (!stop || !chapter) return;
      offset.copy(chapter.cameraOffset);
      fit();
      expose(index);
      plane.visible = false;
      avatar.root.visible = true;
      avatar.configure(stop.scene);
      avatar.root.rotation.set(0, chapter.facing, 0);
      avatar.root.position.copy(positionAt(index));
      follow(chapterTarget(index));
      viewport.dataset.journeyPhase = "rest";
      render();
    };
    const setIndex = (index: number) => {
      if (
        disposed ||
        !chapters[index] ||
        (index === shownIndex && !transitioning)
      )
        return;
      if (motion.matches) {
        settle(index);
        return;
      }
      if (transitioning) settle(shownIndex);
      const departure = shownIndex;
      const leg = journeyTravelMode(stops[departure], stops[index]);
      joinedPath.visible = leg === "walk";
      viewport.dataset.journeyLeg = leg;
      viewport.dataset.journeyPhase = leg;
      shownIndex = index;
      transitioning = true;
      expose(departure, index);
      const fromOffset = offset.clone();
      const toOffset = fittedOffset(index, chapters[index].cameraOffset);
      const from = positionAt(departure),
        to = positionAt(index);
      const start = performance.now(),
        duration = leg === "flight" ? 1700 : 1000,
        gestureMs = 1200;
      const tick = (now: number) => {
        if (disposed) return;
        if (motion.matches) {
          settle(index);
          return;
        }
        const elapsed = now - start,
          progress = Math.min(1, elapsed / duration);
        const eased = progress * progress * (3 - 2 * progress);
        offset.lerpVectors(fromOffset, toOffset, eased);
        if (progress < 1) {
          if (leg === "flight") {
            avatar.root.visible = false;
            plane.visible = true;
            plane.position.lerpVectors(from, to, eased);
            plane.position.y = 5 + Math.sin(progress * Math.PI) * 10;
            plane.rotation.y = to.x >= from.x ? 0 : Math.PI;
            plane.rotation.z =
              Math.cos(progress * Math.PI) * 0.15 * (to.x >= from.x ? 1 : -1);
            follow(plane.position);
          } else {
            plane.visible = false;
            avatar.root.visible = true;
            avatar.root.position.lerpVectors(from, to, eased);
            avatar.root.position.z =
              4.8 * Math.sin(progress * Math.PI) +
              from.z * (1 - eased) +
              to.z * eased;
            avatar.walk(progress, to.x - from.x);
            follow(avatar.root.position.clone().add(new Vector3(0, 2, 0)));
          }
        } else {
          if (viewport.dataset.journeyPhase !== "gesture") {
            avatar.configure(stops[index].scene);
            avatar.root.position.copy(to);
            avatar.root.rotation.set(0, chapters[index].facing, 0);
            avatar.root.visible = true;
            plane.visible = false;
            expose(index);
            joinedPath.visible = false;
            follow(chapterTarget(index));
            viewport.dataset.journeyPhase = "gesture";
          }
          avatar.gesture(Math.min(1, (elapsed - duration) / gestureMs));
        }
        render();
        if (elapsed < duration + gestureMs) frame = requestAnimationFrame(tick);
        else settle(index);
      };
      frame = requestAnimationFrame(tick);
    };
    const resize = () => {
      const width = viewport.clientWidth,
        height = viewport.clientHeight;
      if (!width || !height || disposed) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, width < 640 ? 1 : 2),
      );
      renderer.setSize(width, height);
      renderer.shadowMap.enabled = width >= 640;
      chapters.forEach((chapter) => {
        chapter.background.visible = width >= 640;
        chapter.reducedBackground.visible = width < 640;
      });
      fit();
      follow(controls.target.clone());
      render();
    };
    const applyTheme = () => {
      const color = new Color(readCssColor("--background", "#f6f8fb"));
      scene.background = color;
      scene.fog = new Fog(color, 50, 150);
      hemisphere.color.copy(color).lerp(new Color("#e2eeff"), 0.8);
      render();
    };
    const handleMotion = () => {
      if (motion.matches && transitioning) settle(shownIndex);
    };
    motion.addEventListener("change", handleMotion);
    cleanups.push(() => motion.removeEventListener("change", handleMotion));
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      dispose();
    };
    renderer.domElement.addEventListener("webglcontextlost", handleContextLost);
    cleanups.push(() =>
      renderer.domElement.removeEventListener(
        "webglcontextlost",
        handleContextLost,
      ),
    );
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(viewport);
    cleanups.push(() => resizeObserver.disconnect());
    const themeObserver = new MutationObserver(applyTheme);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    cleanups.push(() => themeObserver.disconnect());
    camera.position.copy(offset);
    controls.target.set(0, 2, 0);
    controls.update();
    applyTheme();
    resize();
    settle(0);
    return { setIndex, dispose };
  } catch {
    dispose();
    return { setIndex: () => {}, dispose };
  }
}

export function ExperienceJourneyStage({
  stops,
  currentIndex,
}: Readonly<ExperienceJourneyStageProps>) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<JourneyApi | null>(null);
  const indexRef = useRef(currentIndex);
  indexRef.current = currentIndex;
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const api = mountJourney(viewport, stops);
    apiRef.current = api;
    api.setIndex(indexRef.current);
    return () => {
      api.dispose();
      apiRef.current = null;
    };
  }, [stops]);
  useEffect(() => {
    apiRef.current?.setIndex(currentIndex);
  }, [currentIndex]);
  return (
    <div
      ref={viewportRef}
      aria-hidden="true"
      className="h-[26rem] w-full overflow-hidden rounded-md border border-border bg-background sm:h-[32rem]"
    />
  );
}
