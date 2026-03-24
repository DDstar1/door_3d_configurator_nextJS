import { useState, useEffect } from "react";
import { useDoorStore } from "@/store/door_store";

export default function MassTab() {
  // Subscribe to width and height in the store
  const width = useDoorStore((s) => s.door.width);
  const height = useDoorStore((s) => s.door.height);
  const setDoorField = useDoorStore((s) => s.setDoorField);

  // Local temporary state for typing
  const [tempWidth, setTempWidth] = useState(width);
  const [tempHeight, setTempHeight] = useState(height);

  // Sync temp state if store changes externally
  useEffect(() => setTempWidth(width), [width]);
  useEffect(() => setTempHeight(height), [height]);

  return (
    <div className="space-y-4">
      {/* Width */}
      <div>
        <label className="block mb-1 font-medium text-black">Breite (mm)</label>
        <input
          type="number"
          value={tempWidth}
          min={600}
          max={1200}
          onChange={(e) => setTempWidth(e.target.value)}
          onBlur={() =>
            setDoorField(
              "width",
              Math.min(1200, Math.max(600, Number(tempWidth))),
            )
          }
          className="w-full rounded p-2 bg-gray-100 text-black border border-black/20"
        />
      </div>

      {/* Height */}
      <div>
        <label className="block mb-1 font-medium text-black">Höhe (mm)</label>
        <input
          type="number"
          value={tempHeight}
          min={1900}
          max={2400}
          onChange={(e) => setTempHeight(e.target.value)}
          onBlur={() =>
            setDoorField(
              "height",
              Math.min(2400, Math.max(1900, Number(tempHeight))),
            )
          }
          className="w-full rounded p-2 bg-gray-100 text-black border border-black/20"
        />
      </div>

      {/* Info */}
      <p className="text-xs text-gray-500 mt-1">
        Standard: 985 × 2100 mm | Breite: 600–1200 mm | Höhe: 1900–2400 mm
      </p>
    </div>
  );
}
