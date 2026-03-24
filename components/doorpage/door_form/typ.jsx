import { useDoorStore } from "@/store/door_store";

export default function TypTab() {
  const doorType = useDoorStore((s) => s.door.doorType);
  const insertType = useDoorStore((s) => s.door.insertType);
  const anschlag = useDoorStore((s) => s.door.anschlag);
  const setDoorField = useDoorStore((s) => s.setDoorField);

  return (
    <div className="space-y-3">
      {/* Türtyp */}
      <div>
        <label className="block mb-1 font-medium text-black">Türtyp:</label>
        <select
          value={doorType}
          onChange={(e) => setDoorField("doorType", e.target.value)}
          className="w-full rounded p-2 bg-gray-100 text-black border border-black/20"
        >
          <option value="Stumpf">Stumpf</option>
          <option value="Gefalzt">Gefalzt</option>
        </select>
      </div>

      {/* Einlage */}
      <div>
        <label className="block mb-1 font-medium text-black">Einlage:</label>
        <select
          value={insertType}
          onChange={(e) => setDoorField("insertType", e.target.value)}
          className="w-full rounded p-2 bg-gray-100 text-black border border-black/20"
        >
          <option value="Röhrenspanplatte (RSP)">Röhrenspanplatte (RSP)</option>
          <option value="Vollspanplatte">Vollspanplatte</option>
        </select>
      </div>

      {/* Anschlag */}
      <div>
        <label className="block mb-1 font-medium text-black">Anschlag:</label>
        <select
          value={anschlag}
          onChange={(e) => setDoorField("anschlag", e.target.value)}
          className="w-full rounded p-2 bg-gray-100 text-black border border-black/20"
        >
          <option value="DIN rechts">DIN rechts</option>
          <option value="DIN links">DIN links</option>
        </select>
      </div>
    </div>
  );
}
