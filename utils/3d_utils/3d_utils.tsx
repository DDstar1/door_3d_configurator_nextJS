import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useMemo } from "react";
import { DOOR_VALUES } from "@/utils/door_config";

export const getHardwareColour = (hardware: any) => {
  if (!hardware) return null;

  if (hardware.toLowerCase().includes("edelstahl")) return "edelstahl";
  if (hardware.toLowerCase().includes("matt schwarz")) return "matt schwarz";
  if (hardware.toLowerCase().includes("vernickelt")) return "vernickelt";

  return null; // fallback if needed
};

/* ===============================
   BOUNDING BOX METRICS
=============================== */

export const getMetrics = (
  ref: React.RefObject<THREE.Object3D>,
  options: any = {},
) => {
  const { addBoundingBox = false, color = 0xff0000 } = options;

  if (!ref?.current) return null;

  const object = ref.current;
  object.updateWorldMatrix(true, true);

  const pos = new THREE.Vector3();
  object.getWorldPosition(pos);

  const box = new THREE.Box3().setFromObject(object);

  // Normalize axes — negative scale can swap min/max
  const minX = Math.min(box.min.x, box.max.x);
  const maxX = Math.max(box.min.x, box.max.x);
  const minY = Math.min(box.min.y, box.max.y);
  const maxY = Math.max(box.min.y, box.max.y);
  const minZ = Math.min(box.min.z, box.max.z);
  const maxZ = Math.max(box.min.z, box.max.z);
  box.min.set(minX, minY, minZ);
  box.max.set(maxX, maxY, maxZ);

  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);

  let helper = null;

  if (addBoundingBox && object.parent) {
    // Clean up previous helper
    if (object.userData.__bboxHelper) {
      object.userData.__bboxHelper.parent?.remove(object.userData.__bboxHelper);
      object.userData.__bboxHelper.geometry?.dispose?.();
      object.userData.__bboxHelper.material?.dispose?.();
      object.userData.__bboxHelper = null;
    }

    // ✅ Build helper from the normalized Box3, NOT from the live object.
    // Box3Helper(box) uses the already-correct world-space corners directly.
    helper = new THREE.Box3Helper(box, new THREE.Color(color));

    // ✅ Attach to the SCENE ROOT, not object.parent.
    // If parent has scale.x = -1, adding there re-mirrors the helper.
    // Walking to the root ensures no parent transform is applied.
    let root: THREE.Object3D = object;
    while (root.parent) root = root.parent;
    root.add(helper);

    object.userData.__bboxHelper = helper;
  }

  return {
    width: size.x,
    height: size.y,
    depth: size.z,
    centerX: center.x,
    centerY: center.y,
    centerZ: center.z,
    worldX: pos.x,
    worldY: pos.y,
    worldZ: pos.z,
    minX,
    maxX,
    left: minX,
    right: maxX,
    helper,
  };
};
export function GroupWithMaterial({ material, children, ...props }: any) {
  const ref = useRef<THREE.Group>(null);

  useEffect(() => {
    ref.current?.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (!mesh.isMesh) return;

      mesh.material = material;
      (mesh.material as THREE.Material).needsUpdate = true;
    });
  }, [material]);

  return (
    <group ref={ref} {...props}>
      {children}
    </group>
  );
}

/* =========================
   GLASS MATERIAL HOOK
========================= */
export function useGlassMaterial(verglasung: any) {
  // ✅ Always load texture (safe)
  const chinchillaTexture = useTexture("/textures/glass/chinchilla.png");

  const { VERGLASUNG_OPTIONS, LOCK_OPTIONS } = DOOR_VALUES;

  return useMemo(() => {
    switch (verglasung) {
      case VERGLASUNG_OPTIONS.KLAR_GLAS:
        return new THREE.MeshPhysicalMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.2,
          roughness: 0,
          metalness: 0,
          clearcoat: 1,
        });
      case VERGLASUNG_OPTIONS.SATINATO_WEISS:
        return new THREE.MeshPhysicalMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.5,
          roughness: 0.6,
          metalness: 0,
        });
      case VERGLASUNG_OPTIONS.MASTERCARRE_KLAR:
        return new THREE.MeshPhysicalMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.3,
          roughness: 0.2,
          metalness: 0,
        });
      case VERGLASUNG_OPTIONS.CHINCHILLA_WEISS:
        return new THREE.MeshPhysicalMaterial({
          map: chinchillaTexture, // your Chinchilla pattern
          transparent: true, // allows see-through
          opacity: 0.5, // adjust 0.3–0.7 for more/less transparency
          roughness: 0.8, // makes it frosted
          metalness: 0,
          clearcoat: 0.1, // subtle shine
          side: THREE.DoubleSide, // ensures it renders from both sides
        });
      default:
        return null; // hide if "Ohne"
    }
  }, [verglasung, chinchillaTexture]);
}

/* =========================
   HANDLE MATERIAL HOOK
========================= */
export function useMaterial(color: string) {
  const silverTextures = useLoader(THREE.TextureLoader, [
    "/textures/silver/silver_albedo.png",
    "/textures/silver/silver_metallic.png",
    "/textures/silver/silver_roughness.png",
    "/textures/silver/silver_normal-ogl.png",
    "/textures/silver/silver_ao.png",
  ]);

  return useMemo(() => {
    switch (color) {
      case "silberfarbig": {
        const [albedo, metallic, roughness, normal, ao] = silverTextures;

        return new THREE.MeshPhysicalMaterial({
          map: albedo,
          metalnessMap: metallic,
          roughnessMap: roughness,
          normalMap: normal,
          aoMap: ao,
          metalness: 1,
          roughness: 0.2,
          clearcoat: 1,
          clearcoatRoughness: 0,
        });
      }

      case "edelstahl":
        return new THREE.MeshPhysicalMaterial({
          color: 0xdddddd,
          metalness: 1,
          roughness: 0.4,
          clearcoat: 0.5,
          clearcoatRoughness: 0.2,
        });

      case "matt schwarz":
        return new THREE.MeshPhysicalMaterial({
          color: 0x111111,
          metalness: 0,
          roughness: 0.8,
          clearcoat: 0,
        });

      case "vernickelt":
        return new THREE.MeshPhysicalMaterial({
          color: 0xc8c8c8, // cool light grey — nickel tone
          metalness: 0.9,
          roughness: 0.3,
          clearcoat: 0.8,
          clearcoatRoughness: 0.1,
        });

      default:
        return null;
    }
  }, [color, silverTextures]);
}
