// Verse-structured stotra library.
// Every composition is stored verse-by-verse so the reader can interleave
// Sanskrit → transliteration → meaning, instead of three disconnected walls of text.

export interface StotraVerse {
  /** Devanagari text of this verse (1–4 lines). */
  sanskrit: string;
  /** IAST transliteration, line-matched to sanskrit. */
  iast: string;
  /** Plain-English meaning of this verse. */
  meaning: string;
  /** Optional label — "Doha", "Phala Shruti", verse number override. */
  label?: string;
}

export type StotraCategory = 'Mantra' | 'Stotra' | 'Aarti' | 'Vedic' | 'Chalisa';

export interface Stotra {
  id: string;
  title: string;
  /** Canonical deity label — drives the color map (see deityColor). */
  deity: string;
  category: StotraCategory;
  /** When / why to chant. */
  occasion: string;
  composer?: string;
  /** 2–4 sentences: what this is, where it comes from, what it is chanted for. */
  about: string;
  verses: StotraVerse[];
  /** False when only key verses of a longer work are included. */
  complete: boolean;
  /** Shown when complete=false, e.g. "7 of 100 verses". */
  note?: string;
}
