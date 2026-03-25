"use client";

import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  GizmoHelper,
  GizmoViewport,
  Environment,
} from "@react-three/drei";
import { useState, Suspense } from "react";
import { DoorModelJSX } from "./AlbaDoor";

export default function AlbaCanva() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 1, 2] }}
      style={{ background: "#1f1f1f" }}
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

      {/* Door Model */}
      <DoorModelJSX />
    </Canvas>
  );
}
