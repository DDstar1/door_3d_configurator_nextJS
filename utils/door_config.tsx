const DOOR_VALUES = {
  HOHE: 2100,
  BREITE: 900,
  TURTYP_OPTION: {
    Gefalzt: "Gefalzt",
    Stumpf: "Stumpf",
    Schiebetur: "Schiebetür",
  },

  BODENDICHTUNG: {
    OHNE_BODENDICHTUNG: "ohne bodendichtung",
    MIT_BODENDICHTUNG: "mit bodendichtung",
  },

  ANSCHLAG_TYPES: {
    DIN_LEFT: "DIN links",
    DIN_RIGHT: "DIN rechts",
  },

  ZARGEN_OPTIONS: {
    OHNE_ZARGEN: "Ohne Zarge",
    MIT_ZARGEN: "Mit Zarge",
  },

  LOCK_OPTIONS: {
    OHNE: "ohne",
    BB_EDELSTAHL: "BB - edelstahl",
    BB_MATT_SCHWARZ: "BB - matt schwarz (ral 9005)",
    WC_EDELSTAHL: "WC - edelstahl",
    WC_MATT_SCHWARZ: "WC - matt schwarz (ral 9005)",
    PZ_EDELSTAHL: "PZ - edelstahl",
    PZ_MATT_SCHWARZ: "PZ - matt schwarz (ral 9005)",
  },

  BAND_OPTIONS: {
    EINBOHRBAND_2TLG_VERNICKELT: "einbohrband 2-tlg. vernickelt (standard)",
    EINBOHRBAND_2TLG_EDELSTAHL: "einbohrband 2-tlg. edelstahl",
    EINBOHRBAND_3TLG_VERNICKELT: "einbohrband 3-tlg. vernickelt",
    EINBOHRBAND_3TLG_MATT_SCHWARZ: "einbohrband 3-tlg. matt schwarz, ral 9005",
    EINBOHRBAND_3TLG_EDELSTAHL_LOOK: "einbohrband 3-tlg. edelstahl-look",
    EINBOHRBAND_3TLG_EDELSTAHL: "einbohrband 3-tlg. edelstahl",
    VX_160_F_VERNICKELT: "vx 160 f vernickelt (max. 160 kg türgewicht)",
    VX_160_F_EDELSTAHL: "vx 160 f edelstahl (max. 160 kg türgewicht)",

    // NEW (only for Stumpf)
    PIVOTA_DX_38_3D_VERNICKELT:
      'Pivota DX "N" 38 3D, velour vernickelt (Standard)',
    PIVOTA_DX_38_3D_MATT_SCHWARZ:
      'Pivota DX 38 "N" 3-D, Design, matt schwarz, RAL 9005',
    PIVOTA_DX_62_3D_VERNICKELT: "Pivota DX 62 3-D, Design, velour vernickelt",
    PIVOTA_DX_62_3D_MATT_SCHWARZ:
      "Pivota DX 62 3-D, Design, matt schwarz, RAL 9005",
  },

  SCHLIESSBLECHE_OPTIONS: {
    NR_418_EDELSTAHL: "nr. 418 – edelstahl",
    NR_418_MATT_SCHWARZ: "nr. 418 – matt schwarz (ral 9005)",
  },

  VERGLASUNG_OPTIONS: {
    OHNE_VERGLASUNG: "ohne verglasung",
    KLAR_GLAS: "klar glas",
    SATINATO_WEISS: "satinato weiß",
    MASTERCARRE_KLAR: "mastercarrè klar",
    CHINCHILLA_WEISS: "chinchilla weiß",
  },
  LUEFTUNGSBOHRUNG: {
    OHNE_KERNLOCHBOHRUNG: "Ohne Kernlochbohrung",
    UNTEN: "Unten",
    OBEN: "Oben",
    UNTEN_UND_OBEN: "Unten & Oben",
  },
} as const;

const INITIAL_DOOR_STATE = {
  lueftung_store: DOOR_VALUES.LUEFTUNGSBOHRUNG.OHNE_KERNLOCHBOHRUNG,
  dichtung_store: "Standard (Zargendichtung)",
  boden_store: DOOR_VALUES.BODENDICHTUNG.OHNE_BODENDICHTUNG,
  lichtoeffnung_store: "Norm-LÖ 1011 V003",

  verglasung_store: DOOR_VALUES.VERGLASUNG_OPTIONS.CHINCHILLA_WEISS,
  doorType_store: DOOR_VALUES.TURTYP_OPTION.Gefalzt,
  anschlag_store: DOOR_VALUES.ANSCHLAG_TYPES.DIN_LEFT,

  width_store: 900,
  height_store: 2100,

  schloss_store: DOOR_VALUES.LOCK_OPTIONS.BB_EDELSTAHL,
  band_store: DOOR_VALUES.BAND_OPTIONS.EINBOHRBAND_3TLG_MATT_SCHWARZ,
  schliessblech_store: DOOR_VALUES.SCHLIESSBLECHE_OPTIONS.NR_418_EDELSTAHL,

  zarge_store: DOOR_VALUES.ZARGEN_OPTIONS.OHNE_ZARGEN,
  bekleidung_store: "62,5 mm",
  wandstaerke_store: "80 mm (77 - 97 mm)",
} as const;

// Typed key map — use DOOR_KEYS.lueftung_store instead of hardcoding "lueftung_store"
const DOOR_KEYS = Object.fromEntries(
  Object.keys(INITIAL_DOOR_STATE).map((k) => [k, k]),
) as { [K in keyof typeof INITIAL_DOOR_STATE]: K };

export { DOOR_VALUES, INITIAL_DOOR_STATE, DOOR_KEYS };
