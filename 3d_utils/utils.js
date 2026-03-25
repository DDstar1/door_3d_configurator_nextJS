import * as THREE from "three";

export const getHardwareColour = (schloss) => {
  if (!schloss) return null;

  if (schloss.includes("Edelstahl")) return "Edelstahl";
  if (schloss.includes("Matt Schwarz")) return "Matt Schwarz";

  return "Silberfarbig"; // fallback if needed
};

/* ===============================
   BOUNDING BOX METRICS
=============================== */
export const getMetrics = (ref) => {
  if (!ref.current) return null;

  const object = ref.current;

  // Make sure world matrices are up to date
  object.updateWorldMatrix(true, true);

  /* ===============================
     WORLD POSITION
  =============================== */
  const pos = new THREE.Vector3();
  object.getWorldPosition(pos);

  /* ===============================
     BOUNDING BOX
  =============================== */
  const box = new THREE.Box3().setFromObject(object);

  const size = new THREE.Vector3();
  const center = new THREE.Vector3();

  box.getSize(size);
  box.getCenter(center);

  return {
    /* size */
    width: size.x,
    height: size.y,
    depth: size.z,

    /* bounding center */
    centerX: center.x,
    centerY: center.y,
    centerZ: center.z,

    /* world position */
    worldX: pos.x,
    worldY: pos.y,
    worldZ: pos.z,
  };
};
