"use client";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  GizmoHelper,
  GizmoViewport,
  Environment,
} from "@react-three/drei";
import { useEffect, useRef, useState, Suspense } from "react";
import { Model } from "./Alba_model";
import { useDoorStore } from "@/store/door_store";
import { mapDoorOptions } from "@/utils/3d_utils/3d_AI_mapDoorOptions";

export default function AlbaCanva() {
  const setDoorField = useDoorStore((state) => state.setDoorField);

  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function handleMessage(event: MessageEvent) {
      if (event.data?.type !== "DOOR_OPTIONS") return;

      const rawDict: Record<string, string | null> = event.data.options;
      console.log("[AlbaCanva] raw options received →", rawDict);

      if (debounceTimer.current) clearTimeout(debounceTimer.current);

      debounceTimer.current = setTimeout(async () => {
        try {
          setIsLoading(true); // 🔴 start spinner

          const mapped = await mapDoorOptions(rawDict);

          Object.entries(mapped).forEach(([key, value]) => {
            if (value !== null) {
              setDoorField(key as any, value as any);
            }
          });
        } catch (err) {
          console.error("Mapping failed:", err);
        } finally {
          setIsLoading(false); // 🔴 stop spinner
        }
      }, 600);
    }

    window.addEventListener("message", handleMessage);
    window.parent.postMessage({ type: "IFRAME_READY" }, "*");
    return () => {
      window.removeEventListener("message", handleMessage);
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [setDoorField]);

  return (
    <div className="relative flex flex-col w-full h-screen">
      <Canvas
        shadows
        camera={{ position: [0, 1, 2] }}
        className="flex-1 bg-[#1f1f1f]"
      >
        <fog attach="fog" args={["#1f1f1f", 10, 40]} />

        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          <GizmoViewport />
        </GizmoHelper>

        <axesHelper args={[10]} />
        <gridHelper args={[40, 20, "red", 0x55ccff]} />
        <OrbitControls target={[0, 1, 0]} enablePan={true} />
        <directionalLight intensity={2} position={[2, 5, 1]} />

        <Suspense fallback={null}>
          <Environment preset="city" />
        </Suspense>

        <Model />
      </Canvas>

      {/* 🔴 Red Transparent Spinner Overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50 transition-opacity duration-300">
          <div className="flex flex-col items-center">
            {/* Spinner */}
            <div className="w-14 h-14 border-4 border-red-500/80 border-t-transparent rounded-full animate-spin" />

            {/* Glow ring */}
            <div className="absolute w-20 h-20 rounded-full bg-red-500/20 blur-xl animate-pulse" />

            {/* Text */}
            <p className="text-red-400 mt-4 text-sm tracking-wide">
              Mapping options...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
