import { create } from "zustand";

const initialDoorState = {
  lueftung: "Ohne Kernlochbohrung",
  dichtung: "Standard (Zargendichtung)",
  boden: "Ohne Bodendichtung",
  lichtoeffnung: "Norm-LÖ 1011 V003",
  //verglasung: "Ohne Verglasung",
  verglasung: "Chinchilla Weiß",
  doorType: "Stumpf",
  anschlag: "DIN links",

  width: 900,
  height: 2100,

  schloss: "Ohne",
  band: "Einbohrband 3-tlg. matt schwarz, RAL 9005",
  schliessblech: "Nr. 418 – Edelstahl",

  zarge: "ohne Zarge",
  bekleidung: "62,5 mm",
  wandstaerke: "80 mm (77 - 97 mm)",

  glassType: "Klar",
  handle: "Ohne",
  handleColor: "Matt Schwarz",
};

export const useDoorStore = create((set) => ({
  door: initialDoorState,

  // Update one field
  setDoorField: (field, value) =>
    set((state) => ({
      door: {
        ...state.door,
        [field]: value,
      },
    })),

  // Replace entire door object
  setDoor: (newDoor) =>
    set(() => ({
      door: newDoor,
    })),

  // Reset
  resetDoor: () =>
    set(() => ({
      door: initialDoorState,
    })),
}));
