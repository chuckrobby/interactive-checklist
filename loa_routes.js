const LOA_ROUTES = [
  {
    destinations: ["KMCO", "KORL", "KSFB", "KISM", "KLEE"],
    routes: [
      { type: "TJ", route: "FRSBE2 WAPOM MUNGI1", maxAlt: 230 },
      { type: "TP", route: "DORRL2 MATLK SLOAO1", maxAlt: 230 },
      { type: "P",  route: "SHANC T347 BAIRN",     maxAlt: 90  }
    ]
  },
  {
    destinations: ["KMLB", "KCOF", "KCOI", "KTIX", "KTTS", "KXMR"],
    routes: [
      { type: "TJ", route: "FRSBE2 WAPOM VALKA",  maxAlt: 190 },
      { type: "TP", route: "SHANC T208 VALKA",     maxAlt: 90  },
      { type: "P",  route: "SHANC T208 VALKA",     maxAlt: 90  }
    ]
  },
  {
    destinations: ["KTPA", "KPIE", "KMCF", "KSPG"],
    routes: [
      { type: "TJ", route: "BNICE2 COREA BLFRG3",     maxAlt: 240 },
      { type: "TP", route: "FLL2 BNICE COREA BLFRG3", maxAlt: 240 },
      { type: "P",  route: "FLL2 BNICE COREA BLFRG3", maxAlt: 240 }
    ]
  },
  {
    destinations: ["KSRQ", "KVNC"],
    routes: [
      { type: "TJ", route: "BNICE2 COREA TUBBA CURSD", maxAlt: 200 },
      { type: "TP", route: "FLL2 BNICE LBELL CAYOO",   maxAlt: 200 },
      { type: "P",  route: "FLL2 BNICE LBELL CAYOO",   maxAlt: 200 }
    ]
  },
  {
    destinations: ["KLAL", "KBOW", "KBKV"],
    routes: [
      { type: "TJ", route: "BNICE2 COREA LBELL LAL", maxAlt: 200 },
      { type: "TP", route: "FLL2 BNICE LBELL LAL",   maxAlt: 200 },
      { type: "P",  route: "FLL2 BNICE LBELL LAL",   maxAlt: 200 }
    ]
  },
  {
    destinations: ["KEYW", "KNQX"],
    routes: [
      { type: "TJ", route: "MAYNR3 MAYNR FNTSY FNTSY1", maxAlt: 200 },
      { type: "TP", route: "FLL2 MAYNR GUCEL",           maxAlt: 200 },
      { type: "P",  route: "FLL2 MAYNR GUCEL",           maxAlt: 200 }
    ]
  },
  {
    destinations: ["KPBI", "KBCT", "06FA"],
    routes: [
      { type: "TJ", route: "AGERS1 HURGI AARPS",    maxAlt: 50 },
      { type: "TP", route: "WILBA RADAR VECTORS",   maxAlt: 40 },
      { type: "P",  route: "WILBA RADAR VECTORS",   maxAlt: 40 }
    ]
  },
  {
    destinations: ["KSUA", "KVRB", "KFPR"],
    routes: [
      { type: "TJ", route: "LIFRR2 WIXED",             maxAlt: 60 },
      { type: "TP", route: "SHANC T208 CLEFF SHEDS",   maxAlt: 60 },
      { type: "P",  route: "SHANC T208 CLEFF SHEDS",   maxAlt: 60 }
    ]
  },
  {
    destinations: ["KRSW", "KPGD", "KAPF", "KFMY"],
    routes: [
      { type: "TJ", route: "BNICE2 MERKS RSW", maxAlt: 100 },
      { type: "TP", route: "FLL2 BNICE",        maxAlt: 100 },
      { type: "P",  route: "FLL2 BNICE",        maxAlt: 100 }
    ]
  },
  {
    destinations: ["KMIA", "KPMP", "KFXE", "KHWO", "KOPF", "KTMB"],
    routes: [
      { type: "TJ", route: "RADAR VECTORS", maxAlt: 40 },
      { type: "TP", route: "RADAR VECTORS", maxAlt: 20 },
      { type: "P",  route: "RADAR VECTORS", maxAlt: 20 }
    ]
  },
  {
    destinations: ["KJAX", "KCRG", "KNIP", "KNRB"],
    routes: [
      { type: "TJ", route: "FRSBE2 STYMY ORL HAINY QUBEN2", maxAlt: 310, note: "Option 1" },
      { type: "TJ", route: "FLL2 DORRL ORL POGIE2",          maxAlt: 310, note: "Option 2" },
      { type: "TP", route: "SHANC T208 FOXAM SEBAG",          maxAlt: 90  },
      { type: "P",  route: "SHANC T208 FOXAM SEBAG",          maxAlt: 90  }
    ]
  },
  {
    destinations: ["KDAB", "KOMN", "KDED", "KEVB", "KFIN"],
    routes: [
      { type: "TJ", route: "FRSBE2 WAPOM VALKA T208 SMYRA", maxAlt: 230 },
      { type: "TP", route: "SHANC T208 SMYRA",               maxAlt: 90  },
      { type: "P",  route: "SHANC T208 SMYRA",               maxAlt: 90  }
    ]
  },
  {
    destinations: ["MUHA"],
    routes: [
      { type: "TJ", route: "GLADZ4 LULLS Y196 CANOA ENTRY5", maxAlt: 300, opsConfig: "east" },
      { type: "TJ", route: "MAYNR3 CANOA ENTRY5",             maxAlt: 300, opsConfig: "west" }
    ]
  },
  {
    destinations: ["MYNN"],
    routes: [
      { type: "TJ", route: "SNAPR2 RAJAY",            maxAlt: 210 },
      { type: "TP", route: "FLL2 BEECH BAHMA RAJAY",  maxAlt: 170 },
      { type: "P",  route: "FLL2 BEECH BAHMA RAJAY",  maxAlt: 170 }
    ]
  },
  {
    destinations: ["MYGF"],
    routes: [
      { type: "TJ", route: "FEALX2 PADUS",    maxAlt: 110 },
      { type: "TP", route: "FLL2 FEALX PADUS", maxAlt: 110 },
      { type: "P",  route: "FLL2 FEALX PADUS", maxAlt: 110 }
    ]
  },
  {
    destinations: ["MBPV"],
    routes: [
      { type: "TJ", route: "SNAPR2 SUMAC SOLEI", maxAlt: null }
    ]
  },
  {
    destinations: ["TNCM"],
    routes: [
      { type: "TJ", route: "SNAPR2 SUMAC Y421 HAGIT Y290 SLUGO PJM", maxAlt: null }
    ]
  },
  {
    destinations: ["TJSJ"],
    routes: [
      { type: "TJ", route: "SNAPR2 SUMAC Y421 HAGIT Y290 BEANO BEANO3", maxAlt: null }
    ]
  },
  {
    destinations: ["MDSD"],
    routes: [
      { type: "TJ", route: "SNAPR2 SUMAC Y443 RUMFO Y441 JUELE UW38 PTA KODIX KODIX2H", maxAlt: null }
    ]
  },
  {
    destinations: ["MDPC"],
    routes: [
      { type: "TJ", route: "SNAPR2 SUMAC Y443 RUMFO Y441 JUELE UW38 PTA UW28 DEMBU BEREL POKEG1W", maxAlt: null }
    ]
  }
];
