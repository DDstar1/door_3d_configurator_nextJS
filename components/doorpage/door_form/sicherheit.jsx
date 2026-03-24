import { useDoorStore } from "@/store/door_store";

export default function SicherheitTab() {
  const schloss = useDoorStore((s) => s.door.schloss);
  const band = useDoorStore((s) => s.door.band);
  const schliessblech = useDoorStore((s) => s.door.schliessblech);
  const setDoorField = useDoorStore((s) => s.setDoorField);

  return (
    <div className="space-y-4">
      {/* Einsteckschlösser */}
      <div>
        <label className="block mb-1 font-medium text-black">
          Einsteckschlösser (Magnet)
        </label>
        <select
          value={schloss}
          onChange={(e) => setDoorField("schloss", e.target.value)}
          className="w-full rounded p-2 bg-gray-100 text-black border border-black/20"
        >
          <option value="Ohne">Ohne</option>
          <option value="BB – Edelstahl">BB – Edelstahl</option>
          <option value="BB – Matt Schwarz (RAL 9005)">
            BB – Matt Schwarz (RAL 9005)
          </option>
          <option value="WC – Edelstahl">WC – Edelstahl</option>
          <option value="WC – Matt Schwarz (RAL 9005)">
            WC – Matt Schwarz (RAL 9005)
          </option>
          <option value="PZ – Edelstahl">PZ – Edelstahl</option>
          <option value="PZ – Matt Schwarz (RAL 9005)">
            PZ – Matt Schwarz (RAL 9005)
          </option>
        </select>
      </div>

      {/* Bänder */}
      <div>
        <label className="block mb-1 font-medium text-black">Bänder</label>
        <select
          value={band}
          onChange={(e) => setDoorField("band", e.target.value)}
          className="w-full rounded p-2 bg-gray-100 text-black border border-black/20"
        >
          <option value="Einbohrband 2-tlg. vernickelt (Standard)">
            Einbohrband 2-tlg. vernickelt (Standard)
          </option>
          <option value="Einbohrband 2-tlg. Edelstahl">
            Einbohrband 2-tlg. Edelstahl
          </option>
          <option value="Einbohrband 3-tlg. vernickelt">
            Einbohrband 3-tlg. vernickelt
          </option>
          <option value="Einbohrband 3-tlg. matt schwarz, RAL 9005">
            Einbohrband 3-tlg. matt schwarz, RAL 9005
          </option>
          <option value="Einbohrband 3-tlg. Edelstahl-Look">
            Einbohrband 3-tlg. Edelstahl-Look
          </option>
          <option value="Einbohrband 3-tlg. Edelstahl">
            Einbohrband 3-tlg. Edelstahl
          </option>
          <option value="VX 160 F vernickelt (max. 160 kg Türgewicht)">
            VX 160 F vernickelt (max. 160 kg Türgewicht)
          </option>
          <option value="VX 160 F Edelstahl (max. 160 kg Türgewicht)">
            VX 160 F Edelstahl (max. 160 kg Türgewicht)
          </option>
        </select>
      </div>

      {/* Schließbleche */}
      <div>
        <label className="block mb-1 font-medium text-black">
          Schließbleche
        </label>
        <select
          value={schliessblech}
          onChange={(e) => setDoorField("schliessblech", e.target.value)}
          className="w-full rounded p-2 bg-gray-100 text-black border border-black/20"
        >
          <option value="Nr. 418 – Edelstahl">Nr. 418 – Edelstahl</option>
          <option value="Nr. 418 – Matt Schwarz (RAL 9005)">
            Nr. 418 – Matt Schwarz (RAL 9005)
          </option>
        </select>
      </div>
    </div>
  );
}
