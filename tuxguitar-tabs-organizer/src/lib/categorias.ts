// src/lib/categorias.ts

export interface Categoria {
  id: string;
  nombre: string;
  // palabras clave en minúscula, sin tildes, que identifican esta categoría
  keywords: string[];
}

export const CATEGORIAS: Categoria[] = [
  {
    id: "sweep_picking",
    nombre: "Sweep Picking",
    keywords: ["barrido", "sweeppiking", "sweeppicking", "sweep_picking", "sweep picking"],
  },
  {
    id: "fretboard_crawler",
    nombre: "Fretboard Crawler",
    keywords: ["crawler", "freatboard", "fretboard"],
  },
  {
    id: "licks",
    nombre: "Licks",
    keywords: ["lick"],
  },
  {
    id: "power_chords",
    nombre: "Power Chords",
    keywords: ["power_chord", "power chord", "power_chords"],
  },
  {
    id: "arpegios",
    nombre: "Arpegios",
    keywords: ["arpegio", "arpegios"],
  },
  {
    id: "warm_up",
    nombre: "Warm Up",
    keywords: ["warm_up", "warmup", "warm up"],
  },
  {
    id: "shred_pattern",
    nombre: "Shred / Patterns",
    keywords: ["shead", "shred", "pantern", "patern", "pattern"],
  },
  {
    id: "tapping",
    nombre: "Tapping",
    keywords: ["taping", "tapping"],
  },
  {
    id: "rhythm",
    nombre: "Rhythm",
    keywords: ["rhythm", "ritmo"],
  },
  {
    id: "octavas_intervalos",
    nombre: "Octavas / Intervalos",
    keywords: ["octave", "octava", "interval"],
  },
];

// Categoría por defecto cuando ningún keyword matchea
export const SIN_CATEGORIA: Categoria = {
  id: "sin_categoria",
  nombre: "Sin categoría / Temas",
  keywords: [],
};