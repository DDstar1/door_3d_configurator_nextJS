import { create } from "zustand";
import { DoorState } from "@/utils/my_types";

import { INITIAL_DOOR_STATE } from "@/utils/door_config";

type DoorStore = {
  door: DoorState;
  setDoorField: <K extends keyof DoorState>(
    field: K,
    value: DoorState[K],
  ) => void;
  setDoor: (door: DoorState) => void;
  resetDoor: () => void;
};

export const useDoorStore = create<DoorStore>((set) => ({
  door: INITIAL_DOOR_STATE,

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
      door: INITIAL_DOOR_STATE,
    })),
}));
