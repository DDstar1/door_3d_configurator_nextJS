import { useDoorStore } from "@/store/door_store";
import { DOOR_VALUES } from "@/utils/door_config";

export default function SicherheitTab() {
  const schloss = useDoorStore((s) => s.door.schloss_store);
  const band = useDoorStore((s) => s.door.band_store);
  const schliessblech = useDoorStore((s) => s.door.schliessblech_store);
  const doorType = useDoorStore((s) => s.door.doorType_store);

  const setDoorField = useDoorStore((s) => s.setDoorField);

  const { LOCK_OPTIONS, BAND_OPTIONS, SCHLIESSBLECHE_OPTIONS, TURTYP_OPTION } =
    DOOR_VALUES;

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
          <option value={LOCK_OPTIONS.OHNE}>Ohne</option>
          <option value={LOCK_OPTIONS.BB_EDELSTAHL}>BB – Edelstahl</option>
          <option value={LOCK_OPTIONS.BB_MATT_SCHWARZ}>
            BB – Matt Schwarz (RAL 9005)
          </option>
          <option value={LOCK_OPTIONS.WC_EDELSTAHL}>WC – Edelstahl</option>
          <option value={LOCK_OPTIONS.WC_MATT_SCHWARZ}>
            WC – Matt Schwarz (RAL 9005)
          </option>
          <option value={LOCK_OPTIONS.PZ_EDELSTAHL}>PZ – Edelstahl</option>
          <option value={LOCK_OPTIONS.PZ_MATT_SCHWARZ}>
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
          {/* Only for Stumpf */}
          {doorType == TURTYP_OPTION.Gefalzt && (
            <>
              {/* Standard options */}
              <option value={BAND_OPTIONS.EINBOHRBAND_2TLG_VERNICKELT}>
                Einbohrband 2-tlg. vernickelt (Standard)
              </option>
              <option value={BAND_OPTIONS.EINBOHRBAND_2TLG_EDELSTAHL}>
                Einbohrband 2-tlg. Edelstahl
              </option>
              <option value={BAND_OPTIONS.EINBOHRBAND_3TLG_VERNICKELT}>
                Einbohrband 3-tlg. vernickelt
              </option>
              <option value={BAND_OPTIONS.EINBOHRBAND_3TLG_MATT_SCHWARZ}>
                Einbohrband 3-tlg. matt schwarz, RAL 9005
              </option>
              <option value={BAND_OPTIONS.EINBOHRBAND_3TLG_EDELSTAHL_LOOK}>
                Einbohrband 3-tlg. Edelstahl-Look
              </option>
              <option value={BAND_OPTIONS.EINBOHRBAND_3TLG_EDELSTAHL}>
                Einbohrband 3-tlg. Edelstahl
              </option>
              <option value={BAND_OPTIONS.VX_160_F_VERNICKELT}>
                VX 160 F vernickelt (max. 160 kg Türgewicht)
              </option>
              <option value={BAND_OPTIONS.VX_160_F_EDELSTAHL}>
                VX 160 F Edelstahl (max. 160 kg Türgewicht)
              </option>
            </>
          )}

          {/* Only for Stumpf */}
          {doorType == TURTYP_OPTION.Stumpf && (
            <>
              <option value={BAND_OPTIONS.PIVOTA_DX_38_3D_VERNICKELT}>
                Pivota DX "N" 38 3D, velour vernickelt (Standard)
              </option>
              <option value={BAND_OPTIONS.PIVOTA_DX_38_3D_MATT_SCHWARZ}>
                Pivota DX 38 "N" 3-D, Design, matt schwarz, RAL 9005
              </option>
              <option value={BAND_OPTIONS.PIVOTA_DX_62_3D_VERNICKELT}>
                Pivota DX 62 3-D, Design, velour vernickelt
              </option>
              <option value={BAND_OPTIONS.PIVOTA_DX_62_3D_MATT_SCHWARZ}>
                Pivota DX 62 3-D, Design, matt schwarz, RAL 9005
              </option>
            </>
          )}
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
          <option value={SCHLIESSBLECHE_OPTIONS.NR_418_EDELSTAHL}>
            Nr. 418 – Edelstahl
          </option>
          <option value={SCHLIESSBLECHE_OPTIONS.NR_418_MATT_SCHWARZ}>
            Nr. 418 – Matt Schwarz (RAL 9005)
          </option>
        </select>
      </div>
    </div>
  );
}
