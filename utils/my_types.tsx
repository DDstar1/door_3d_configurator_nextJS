type DoorState = {
  lueftung: string;
  dichtung: string;
  boden: string;
  lichtoeffnung: string;

  verglasung: string;
  doorType: "Stumpf" | "Gefälzt"; // extend if needed
  anschlag: "DIN links" | "DIN rechts";

  width: number;
  height: number;

  schloss: string;
  band: string;
  schliessblech: string;

  zarge: string;
  bekleidung: string;
  wandstaerke: string;

  glassType: string;
  handle: string;
  handleColor: string;
};

export type { DoorState };
