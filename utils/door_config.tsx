const DOOR_VALUES = {
  HOHE: 2100,
  BREITE: 900,
  TURTYP_OPTION: {
    Gefalzt: "Gefalzt",
    Stumpf: "Stumpf",
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

export default DOOR_VALUES;
