import { useDoorStore } from "@/store/door_store";
import { DOOR_VALUES, DOOR_KEYS } from "@/utils/door_config";

export default function TypTab() {
  const doorType = useDoorStore((s) => s.door.doorType_store);
  const insertType = useDoorStore((s) => s.door.insertType_store);
  const anschlag = useDoorStore((s) => s.door.anschlag_store);
  const setDoorField = useDoorStore((s) => s.setDoorField);

  const { TURTYP_OPTION, ANSCHLAG_TYPES } = DOOR_VALUES;

  return (
    <div className="space-y-3">
      {/* Türtyp */}
      <div>
        <label className="block mb-1 font-medium text-black">Türtyp:</label>
        <select
          value={doorType}
          onChange={(e) => setDoorField(DOOR_KEYS.doorType_store, e.target.value)}
          className="w-full rounded p-2 bg-gray-100 text-black border border-black/20"
        >
          <option value={TURTYP_OPTION.Stumpf}>Stumpf</option>
          <option value={TURTYP_OPTION.Gefalzt}>Gefalzt</option>
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
          onChange={(e) => setDoorField(DOOR_KEYS.anschlag_store, e.target.value)}
          className="w-full rounded p-2 bg-gray-100 text-black border border-black/20"
        >
          <option value={ANSCHLAG_TYPES.DIN_RIGHT}>DIN rechts</option>
          <option value={ANSCHLAG_TYPES.DIN_LEFT}>DIN links</option>
        </select>
      </div>
    </div>
  );
}
