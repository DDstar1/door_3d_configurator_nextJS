import { useEffect, useRef } from "react";
import * as THREE from "three";

export const getHardwareColour = (hardware: any) => {
  if (!hardware) return null;

  if (hardware.includes("edelstahl")) return "edelstahl";
  if (hardware.includes("matt schwarz")) return "matt schwarz";
  if (hardware.includes("vernickelt")) return "vernickelt";

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
