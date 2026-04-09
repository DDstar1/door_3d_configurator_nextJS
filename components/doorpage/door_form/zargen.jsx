"use client";

import { useDoorStore } from "@/store/door_store";
import { DOOR_VALUES, DOOR_KEYS } from "@/utils/door_config";

export default function ZargenTab() {
  const zarge = useDoorStore((s) => s.door.zarge_store);
  const bekleidung = useDoorStore((s) => s.door.bekleidung_store);
  const wandstaerke = useDoorStore((s) => s.door.wandstaerke_store);
  const setDoorField = useDoorStore((s) => s.setDoorField);

  const { ZARGEN_OPTIONS } = DOOR_VALUES;

  const wandOptions = [
    "80 mm (77 - 97 mm)",
    "100 mm (97 - 117 mm)",
    "120 mm (117 - 137 mm)",
    "140 mm (137 - 157 mm)",
    "160 mm (157 - 177 mm)",
    "180 mm (177 - 197 mm)",
  ];

  return (
    <div className="space-y-4">
      {/* Zargen */}
      <div>
        <label className="block mb-1 font-medium text-black">Zargen</label>
        <select
          value={zarge}
          onChange={(e) => setDoorField(DOOR_KEYS.zarge_store, e.target.value)}
          className="w-full rounded p-2 bg-gray-100 text-black border border-black/20"
        >
          <option value={ZARGEN_OPTIONS.OHNE_ZARGEN}>ohne Zarge</option>
          <option value={ZARGEN_OPTIONS.MIT_ZARGEN}>mit Zarge</option>
        </select>
      </div>

      {/* Conditional fields */}
      {ZARGEN_OPTIONS.MIT_ZARGEN === zarge && (
        <>
          {/* Bekleidung */}
          <div>
            <label className="block mb-1 font-medium text-black">
              Bekleidung Breite
            </label>
            <select
              value={bekleidung}
              onChange={(e) => setDoorField(DOOR_KEYS.bekleidung_store, e.target.value)}
              className="w-full rounded p-2 bg-gray-100 text-black border border-black/20"
            >
              <option value="62,5 mm">62,5 mm</option>
              <option value="70 mm">70 mm</option>
              <option value="80 mm">80 mm</option>
            </select>
          </div>

          {/* Wandstärke */}
          <div>
            <label className="block mb-1 font-medium text-black">
              Wandstärke
            </label>
            <select
              value={wandstaerke}
              onChange={(e) => setDoorField(DOOR_KEYS.wandstaerke_store, e.target.value)}
              className="w-full rounded p-2 bg-gray-100 text-black border border-black/20"
            >
              {wandOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
    </div>
  );
}
