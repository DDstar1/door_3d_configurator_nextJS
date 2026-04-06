import { useDoorStore } from "@/store/door_store";
import DOOR_VALUES from "@/utils/door_config";

export default function ExtrasTab() {
  const lueftung = useDoorStore((s) => s.door.lueftung);
  const dichtung = useDoorStore((s) => s.door.dichtung);
  const boden = useDoorStore((s) => s.door.boden);
  const lichtoeffnung = useDoorStore((s) => s.door.lichtoeffnung);
  const verglasung = useDoorStore((s) => s.door.verglasung);
  const setDoorField = useDoorStore((s) => s.setDoorField);

  const { BODENDICHTUNG, VERGLASUNG_OPTIONS, LUEFTUNGSBOHRUNG } = DOOR_VALUES;

  return (
    <div className="space-y-4">
      {/* Lüftungsbohrung */}
      <div>
        <label className="block mb-1 font-medium text-black">
          Lüftungsbohrung
        </label>
        <select
          value={lueftung}
          onChange={(e) => setDoorField("lueftung", e.target.value)}
          className="w-full rounded p-2 bg-gray-100 text-black border border-black/20"
        >
          <option value={LUEFTUNGSBOHRUNG.OHNE_KERNLOCHBOHRUNG}>
            Ohne Kernlochbohrung
          </option>
          <option value={LUEFTUNGSBOHRUNG.UNTEN}>Unten</option>
          <option value={LUEFTUNGSBOHRUNG.OBEN}>Oben</option>
          <option value={LUEFTUNGSBOHRUNG.UNTEN_UND_OBEN}>Unten & Oben</option>
        </select>
      </div>

      {/* Bodendichtung */}
      <div>
        <label className="block mb-1 font-medium text-black">
          Bodendichtung
        </label>
        <select
          value={boden}
          onChange={(e) => setDoorField("boden", e.target.value)}
          className="w-full rounded p-2 bg-gray-100 text-black border border-black/20"
        >
          <option value={BODENDICHTUNG.OHNE_BODENDICHTUNG}>
            Ohne Bodendichtung
          </option>
          <option value={BODENDICHTUNG.MIT_BODENDICHTUNG}>
            Mit Bodendichtung
          </option>
        </select>
      </div>

      {/* Lichtöffnung */}
      <div>
        <label className="block mb-1 font-medium text-black">
          Lichtöffnung
        </label>
        <select
          value={lichtoeffnung}
          onChange={(e) => setDoorField("lichtoeffnung", e.target.value)}
          className="w-full rounded p-2 bg-gray-100 text-black border border-black/20"
        >
          <option value="Norm-LÖ 1011 V003">Norm-LÖ 1011 V003</option>
        </select>
      </div>

      {/* Verglasung */}
      <div>
        <label className="block mb-1 font-medium text-black">Verglasung</label>
        <select
          value={verglasung}
          onChange={(e) => setDoorField("verglasung", e.target.value)}
          className="w-full rounded p-2 bg-gray-100 text-black border border-black/20"
        >
          <option value={VERGLASUNG_OPTIONS.OHNE_VERGLASUNG}>
            Ohne Verglasung
          </option>
          <option value={VERGLASUNG_OPTIONS.KLAR_GLAS}>Klar Glas</option>
          <option value={VERGLASUNG_OPTIONS.SATINATO_WEISS}>
            Satinato Weiß
          </option>
          <option value={VERGLASUNG_OPTIONS.MASTERCARRE_KLAR}>
            Mastercarrè Klar
          </option>
          <option value={VERGLASUNG_OPTIONS.CHINCHILLA_WEISS}>
            Chinchilla Weiß
          </option>
        </select>
      </div>
    </div>
  );
}
