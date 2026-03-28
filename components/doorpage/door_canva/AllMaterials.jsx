import * as THREE from 'three';
import { useTexture } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { useMemo } from 'react';
import DOOR_VALUES from '@/utils/door_config';

/* =========================
   GLASS MATERIAL HOOK
========================= */
export function useGlassMaterial(verglasung) {
  // ✅ Always load texture (safe)
  const chinchillaTexture = useTexture('/textures/glass/chinchilla.png');

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
export function useMaterial(color) {
  const silverTextures = useLoader(THREE.TextureLoader, ['/textures/silver/silver_albedo.png', '/textures/silver/silver_metallic.png', '/textures/silver/silver_roughness.png', '/textures/silver/silver_normal-ogl.png', '/textures/silver/silver_ao.png']);

  return useMemo(() => {
    switch (color) {
      case 'silberfarbig': {
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

      case 'edelstahl':
        return new THREE.MeshPhysicalMaterial({
          color: 0xdddddd,
          metalness: 1,
          roughness: 0.4,
          clearcoat: 0.5,
          clearcoatRoughness: 0.2,
        });

      case 'matt schwarz':
        return new THREE.MeshPhysicalMaterial({
          color: 0x111111,
          metalness: 0,
          roughness: 0.8,
          clearcoat: 0,
        });

      case 'vernickelt':
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
