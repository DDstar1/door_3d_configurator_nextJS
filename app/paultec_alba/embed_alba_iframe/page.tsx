"use client";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  GizmoHelper,
  GizmoViewport,
  Environment,
} from "@react-three/drei";
import { useEffect, useRef, Suspense } from "react";
import { Model } from "./Alba_model";
import { useDoorStore } from "@/store/door_store";
import { mapDoorOptions } from "@/utils/3d_utils/3d_AI_mapDoorOptions";
import { DoorConfigurationForm2 } from "@/components/doorpage/door_form/Total_door_form";

export default function AlbaCanva() {
  const setDoorField = useDoorStore((state) => state.setDoorField);

  // Debounce ref — avoids hammering Groq on every keystroke
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    async function handleMessage(event: MessageEvent) {
      if (event.data?.type !== "DOOR_OPTIONS") return;

      const rawDict: Record<string, string | null> = event.data.options;
      console.log("[AlbaCanva] raw options received →", rawDict);

      // Debounce: wait 600 ms of silence before calling Groq
      if (debounceTimer.current) clearTimeout(debounceTimer.current);

      debounceTimer.current = setTimeout(async () => {
        const mapped = await mapDoorOptions(rawDict);

        // Push every matched value into the Zustand store
        Object.entries(mapped).forEach(([key, value]) => {
          if (value !== null) {
            setDoorField(key as any, value as any);
          }
        });
      }, 600);
    }

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [setDoorField]);

  return (
    <div className="flex flex-col w-full h-screen">
      <Canvas
        shadows
        camera={{ position: [0, 1, 2] }}
        className="flex-1 bg-[#1f1f1f]"
      >
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
      {/* <DoorConfigurationForm2 /> */}
    </div>
  );
}
