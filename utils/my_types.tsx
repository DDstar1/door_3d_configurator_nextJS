import DOOR_VALUES from "./door_config";

type ValueOf<T> = T[keyof T];

export type DoorType = ValueOf<typeof DOOR_VALUES.TURTYP_OPTION>;
export type BodenDichtung = ValueOf<typeof DOOR_VALUES.BODENDICHTUNG>;
export type Anschlag = ValueOf<typeof DOOR_VALUES.ANSCHLAG_TYPES>;
export type Zarge = ValueOf<typeof DOOR_VALUES.ZARGEN_OPTIONS>;
export type Lock = ValueOf<typeof DOOR_VALUES.LOCK_OPTIONS>;
export type Band = ValueOf<typeof DOOR_VALUES.BAND_OPTIONS>;
export type Schliessblech = ValueOf<typeof DOOR_VALUES.SCHLIESSBLECHE_OPTIONS>;
export type Verglasung = ValueOf<typeof DOOR_VALUES.VERGLASUNG_OPTIONS>;

export type DoorState = {
  lueftung: string;
  dichtung: string;
  boden: BodenDichtung;
  lichtoeffnung: string;

  verglasung: Verglasung;
  doorType: DoorType;
  anschlag: Anschlag;

  width: number;
  height: number;

  schloss: Lock;
  band: Band;
  schliessblech: Schliessblech;

  zarge: Zarge;
  bekleidung: string;
  wandstaerke: string;
};
