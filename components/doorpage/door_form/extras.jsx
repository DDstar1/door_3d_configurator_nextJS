import { useDoorStore } from "@/store/door_store";

export default function ExtrasTab() {
  const lueftung = useDoorStore((s) => s.door.lueftung);
  const dichtung = useDoorStore((s) => s.door.dichtung);
  const boden = useDoorStore((s) => s.door.boden);
  const lichtoeffnung = useDoorStore((s) => s.door.lichtoeffnung);
  const verglasung = useDoorStore((s) => s.door.verglasung);
  const setDoorField = useDoorStore((s) => s.setDoorField);

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
          <option value="Ohne Kernlochbohrung">Ohne Kernlochbohrung</option>
          <option value="Unten">Unten</option>
          <option value="Oben">Oben</option>
          <option value="Unten & Oben">Unten & Oben</option>
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
          <option value="Ohne Bodendichtung">Ohne Bodendichtung</option>
          <option value="Mit Bodendichtung">Mit Bodendichtung</option>
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
          <option value="Ohne Verglasung">Ohne Verglasung</option>
          <option value="Klar Glas">Klar Glas</option>
          <option value="Satinato Weiß">Satinato Weiß</option>
          <option value="Mastercarrè Klar">Mastercarrè Klar</option>
          <option value="Chinchilla Weiß">Chinchilla Weiß</option>
        </select>
      </div>
    </div>
  );
}
