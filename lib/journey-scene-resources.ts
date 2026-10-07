import {
  BoxGeometry,
  PlaneGeometry,
  CanvasTexture,
  MeshBasicMaterial,
  CapsuleGeometry,
  LatheGeometry,
  Vector2,
  Vector3,
  CatmullRomCurve3,
  TubeGeometry,
  CylinderGeometry,
  SphereGeometry,
  Mesh,
  MeshStandardMaterial,
  Group,
} from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import type { BufferGeometry, Material, Texture } from "three";

export function createJourneyResources() {
  const geometries = new Map<string, BufferGeometry>();
  const materials = new Map<string, MeshStandardMaterial>();
  const textures = new Set<Texture>();
  const merged = new Set<BufferGeometry>();
  const ownedMaterials = new Set<Material>();
  const geometry = (
    shape: "box" | "rounded" | "sphere" | "cylinder" | "capsule",
  ) => {
    const existing = geometries.get(shape);
    if (existing) return existing;
    const result =
      shape === "box"
        ? new BoxGeometry(1, 1, 1)
        : shape === "rounded"
          ? new RoundedBoxGeometry(1, 1, 1, 1, 0.12)
          : shape === "sphere"
            ? new SphereGeometry(1, 16, 12)
            : shape === "cylinder"
              ? new CylinderGeometry(1, 1, 1, 12)
              : new CapsuleGeometry(0.5, 1, 4, 12);
    geometries.set(shape, result);
    return result;
  };
  const sculpt = (key: string, create: () => BufferGeometry) => {
    const existing = geometries.get(key);
    if (existing) return existing;
    const result = create();
    geometries.set(key, result);
    return result;
  };
  const profile = (
    key: string,
    points: readonly (readonly [number, number])[],
    depth = 1,
  ) =>
    sculpt(key, () => {
      const result = new LatheGeometry(
        points.map(([radius, y]) => new Vector2(radius, y)),
        20,
      );
      result.scale(1, 1, depth);
      result.computeVertexNormals();
      return result;
    });
  const curve = (
    key: string,
    points: readonly (readonly [number, number, number])[],
    radius: number,
  ) =>
    sculpt(
      key,
      () =>
        new TubeGeometry(
          new CatmullRomCurve3(points.map((point) => new Vector3(...point))),
          16,
          radius,
          6,
          false,
        ),
    );
  const surface = (
    parent: Group,
    geometry: BufferGeometry,
    color: string,
    position: readonly [number, number, number] = [0, 0, 0],
    roughness = 0.8,
    metalness = 0,
  ) => {
    const result = new Mesh(geometry, material(color, roughness, metalness));
    result.position.set(...position);
    parent.add(result);
    return result;
  };
  const material = (color: string, roughness = 0.8, metalness = 0) => {
    const key = `${color}:${roughness}:${metalness}`;
    const existing = materials.get(key);
    if (existing) return existing;
    const result = new MeshStandardMaterial({ color, roughness, metalness });
    materials.set(key, result);
    return result;
  };
  const mesh = (
    parent: Group,
    shape: "box" | "rounded" | "sphere" | "cylinder" | "capsule",
    color: string,
    size: readonly [number, number, number],
    position: readonly [number, number, number],
  ) => {
    const result = new Mesh(geometry(shape), material(color));
    result.scale.set(...size);
    result.position.set(...position);
    parent.add(result);
    return result;
  };
  let shadowMaterial: MeshBasicMaterial | undefined;
  const contactShadow = (
    parent: Group,
    position: readonly [number, number, number],
    size = 1,
  ) => {
    if (!shadowMaterial) {
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = 64;
      const context = canvas.getContext("2d");
      if (!context) return;
      const gradient = context.createRadialGradient(32, 32, 2, 32, 32, 32);
      gradient.addColorStop(0, "rgba(41, 30, 23, 0.34)");
      gradient.addColorStop(0.5, "rgba(41, 30, 23, 0.18)");
      gradient.addColorStop(1, "rgba(41, 30, 23, 0)");
      context.fillStyle = gradient;
      context.fillRect(0, 0, 64, 64);
      const texture = new CanvasTexture(canvas);
      textures.add(texture);
      shadowMaterial = new MeshBasicMaterial({
        map: texture,
        transparent: true,
        depthWrite: false,
      });
      ownedMaterials.add(shadowMaterial);
    }
    const shadow = new Mesh(
      sculpt("contact-shadow-plane", () => new PlaneGeometry(1, 1)),
      shadowMaterial,
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.scale.set(2.2 * size, 1.6 * size, 1);
    shadow.position.set(...position);
    parent.add(shadow);
    return shadow;
  };
  const batch = (group: Group) => {
    group.updateMatrixWorld(true);
    const buckets = new Map<Material, BufferGeometry[]>();
    group.traverseVisible((object) => {
      if (!(object instanceof Mesh) || Array.isArray(object.material)) return;
      const clone = object.geometry.index
        ? object.geometry.toNonIndexed()
        : object.geometry.clone();
      clone.applyMatrix4(object.matrixWorld);
      const bucket = buckets.get(object.material) ?? [];
      bucket.push(clone);
      buckets.set(object.material, bucket);
    });
    const result = new Group();
    buckets.forEach((parts, surface) => {
      const joined = mergeGeometries(parts);
      parts.forEach((part) => part.dispose());
      if (!joined) throw new Error("Journey scenery could not be assembled");
      merged.add(joined);
      const object = new Mesh(joined, surface);
      object.receiveShadow = true;
      result.add(object);
    });
    return result;
  };
  return {
    geometry,
    sculpt,
    profile,
    curve,
    surface,
    material,
    mesh,
    batch,
    contactShadow,
    ownGeometry: <T extends BufferGeometry>(value: T) => {
      merged.add(value);
      return value;
    },
    ownMaterial: <T extends Material>(value: T) => {
      ownedMaterials.add(value);
      return value;
    },
    texture: (texture: Texture) => {
      textures.add(texture);
      return texture;
    },
    dispose: () => {
      geometries.forEach((item) => item.dispose());
      merged.forEach((item) => item.dispose());
      materials.forEach((item) => item.dispose());
      textures.forEach((item) => item.dispose());
      ownedMaterials.forEach((item) => item.dispose());
      geometries.clear();
      merged.clear();
      materials.clear();
      textures.clear();
      ownedMaterials.clear();
    },
  };
}

export type JourneyResources = ReturnType<typeof createJourneyResources>;
