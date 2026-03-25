import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useMemo } from "react";

/* =========================
   GLASS MATERIAL HOOK
========================= */
export function useGlassMaterial(verglasung) {
  // ✅ Always load texture (safe)
  const chinchillaTexture = useTexture("/textures/glass/chinchilla.png");

  return useMemo(() => {
    switch (verglasung) {
      case "Klar Glas":
        return new THREE.MeshPhysicalMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.2,
          roughness: 0,
          metalness: 0,
          clearcoat: 1,
        });
      case "Satinato Weiß":
        return new THREE.MeshPhysicalMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.5,
          roughness: 0.6,
          metalness: 0,
        });
      case "Mastercarrè Klar":
        return new THREE.MeshPhysicalMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.3,
          roughness: 0.2,
          metalness: 0,
        });
      case "Chinchilla Weiß":
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
        return new THREE.MeshStandardMaterial({ visible: false }); // hide if "Ohne"
    }
  }, [verglasung, chinchillaTexture]);
}

/* =========================
   HANDLE MATERIAL HOOK
========================= */
export function useMaterial(color) {
  const silverTextures = useLoader(THREE.TextureLoader, [
    "/textures/silver/silver_albedo.png",
    "/textures/silver/silver_metallic.png",
    "/textures/silver/silver_roughness.png",
    "/textures/silver/silver_normal-ogl.png",
    "/textures/silver/silver_ao.png",
  ]);

  return useMemo(() => {
    switch (color) {
      case "Silberfarbig": {
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

      case "Edelstahl":
        return new THREE.MeshPhysicalMaterial({
          color: 0xdddddd,
          metalness: 1,
          roughness: 0.4,
          clearcoat: 0.5,
          clearcoatRoughness: 0.2,
        });

      case "Matt Schwarz":
        return new THREE.MeshPhysicalMaterial({
          color: 0x111111,
          metalness: 0,
          roughness: 0.8,
          clearcoat: 0,
        });

      default:
        return new THREE.MeshPhysicalMaterial({
          color: "black",
          metalness: 0,
          roughness: 0.8,
          clearcoat: 0,
        });
    }
  }, [color, silverTextures]);
}
