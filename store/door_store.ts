import { create } from "zustand";
import { DoorState } from "@/utils/my_types";

import DOOR_VALUES from "@/utils/door_config";

type DoorStore = {
  door: DoorState;
  setDoorField: <K extends keyof DoorState>(
    field: K,
    value: DoorState[K],
  ) => void;
  setDoor: (door: DoorState) => void;
  resetDoor: () => void;
};

const initialDoorState = {
  lueftung: "Ohne Kernlochbohrung",
  dichtung: "Standard (Zargendichtung)",
  boden: DOOR_VALUES.BODENDICHTUNG.OHNE_BODENDICHTUNG,
  lichtoeffnung: "Norm-LÖ 1011 V003",

  verglasung: DOOR_VALUES.VERGLASUNG_OPTIONS.CHINCHILLA_WEISS,
  doorType: DOOR_VALUES.TURTYP_OPTION.Stumpf,
  anschlag: DOOR_VALUES.ANSCHLAG_TYPES.DIN_LEFT,

  width: 900,
  height: 2100,

  schloss: DOOR_VALUES.LOCK_OPTIONS.BB_EDELSTAHL,
  band: DOOR_VALUES.BAND_OPTIONS.EINBOHRBAND_3TLG_MATT_SCHWARZ,
  schliessblech: DOOR_VALUES.SCHLIESSBLECHE_OPTIONS.NR_418_EDELSTAHL,

  zarge: DOOR_VALUES.ZARGEN_OPTIONS.OHNE_ZARGEN,
  bekleidung: "62,5 mm",
  wandstaerke: "80 mm (77 - 97 mm)",
};

export const useDoorStore = create<DoorStore>((set) => ({
  door: initialDoorState,

  setDoorField: (field, value) =>
    set((state) => {
      console.log("Updating door field:", field, "=>", value);

      return {
        door: {
          ...state.door,
          [field]: value,
        },
      };
    }),
  setDoor: (newDoor) =>
    set(() => ({
      door: newDoor,
    })),

  resetDoor: () =>
    set(() => ({
      door: initialDoorState,
    })),
}));
