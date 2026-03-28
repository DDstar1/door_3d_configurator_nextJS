import React, { useRef, useEffect, useState, use } from "react";
import { useGLTF } from "@react-three/drei";
import { useGlassMaterial, useMaterial } from "./AllMaterials";
import { useDoorStore } from "@/store/door_store";
import { getHardwareColour, getMetrics } from "@/utils/utils";

export function DoorModelJSX(props) {
  const { nodes, materials } = useGLTF("/models/door.glb");
  const [original_handle_metrics, setOriginalHandleMetrics] = useState(null);
  const [original_handle001_metrics, setOriginalHandle001Metrics] =
    useState(null);
  const door_ref = useRef();
  const lock_hole_ref = useRef();
  const handle_ref = useRef(); // ← new ref on the handle mesh
  const handle001_ref = useRef(); // ← new ref on the handle mesh
  const schlossGroup = useRef(); // Group ref for the handle and lock hole

  /* ===============================
     BASE MODEL DIMENSIONS (GLB SIZE)
  =============================== */
  const BASE_WIDTH = 900;
  const BASE_HEIGHT = 2100;

  /* ===============================
     GLOBAL STORE VALUES
  =============================== */
  const verglasung = useDoorStore((s) => s.door.verglasung);
  const doorWidth = useDoorStore((s) => s.door.width);
  const doorHeight = useDoorStore((s) => s.door.height);
  const schloss = useDoorStore((s) => s.door.schloss);
  const doorType = useDoorStore((s) => s.door.doorType);
  const anschlag = useDoorStore((s) => s.door.anschlag);

  const schlossColour = getHardwareColour(schloss);

  /* ===============================
     SCALE CALCULATION
  =============================== */
  const scaleX = doorWidth / BASE_WIDTH;
  const scaleY = doorHeight / BASE_HEIGHT;

  /* ===============================
     HANDLE POSITION CALCULATIONs
  =============================== */
  const originalX = nodes.handle.position.x;
  const originalY = nodes.handle.position.y;
  let handleX = originalX;

  useEffect(() => {
    if (!handle_ref.current || !handle001_ref.current) return;

    const handle_metrics = getMetrics(handle_ref);
    const handle001_metrics = getMetrics(handle001_ref);

    setOriginalHandleMetrics(handle_metrics);
    setOriginalHandle001Metrics(handle001_metrics);
  }, [schloss]); // run only once

  useEffect(() => {
    console.log(
      "Door width changed, recalculating handle position...",
      doorWidth,
    );
    if (!door_ref.current || !lock_hole_ref.current) return;
    if (anschlag === "DIN rechts") {
      schlossGroup.current.position.x = doorWidth / 1000;
      schlossGroup.current.scale.x = -1; // flip horizontally
    } else {
      schlossGroup.current.position.x = 0;
      schlossGroup.current.scale.x = 1; // flip horizontally
    }
  }, [anschlag, doorWidth]);

  /* ===============================
     VISIBILITY LOGIC
  =============================== */
  const showGlass = verglasung && verglasung !== "Ohne Verglasung";
  const showSchloss = schloss && schloss !== "Ohne";
  const showRebateEdge = doorType === "Gefalzt";

  /* ===============================
     DYNAMIC MATERIALS
  =============================== */
  const glassMaterial = useGlassMaterial(verglasung);
  const schlossMaterial = useMaterial(schlossColour);

  return (
    <group ref={door_ref} dispose={null}>
      {/* ===============================
          Scalable group
      =============================== */}
      <group scale={[scaleX, scaleY, 1]}>
        <mesh geometry={nodes.door.geometry} material={materials.Material} />
        {showGlass && (
          <mesh geometry={nodes.glass.geometry} material={glassMaterial} />
        )}
        {showRebateEdge && (
          <mesh
            geometry={nodes.rebate_edge.geometry}
            material={nodes.rebate_edge.material}
          />
        )}
      </group>

      {/* ===============================
          HANDLE (fixed size)
      =============================== */}
      {showSchloss && (
        <group ref={schlossGroup} position={[0, 0, 0]}>
          <mesh
            ref={handle_ref}
            geometry={nodes.handle.geometry}
            material={schlossMaterial}
          />
          <mesh
            ref={lock_hole_ref}
            geometry={nodes.lock_hole.geometry}
            material={schlossMaterial}
          />
          <mesh
            ref={handle001_ref}
            geometry={nodes.handle001.geometry}
            material={schlossMaterial}
          />
          <mesh
            geometry={nodes.lock_hole001.geometry}
            material={schlossMaterial}
          />
        </group>
      )}
    </group>
  );
}

useGLTF.preload("/models/door.glb");
