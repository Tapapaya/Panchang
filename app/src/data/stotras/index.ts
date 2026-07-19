import { GANESHA_STOTRAS } from './ganesha';
import { SHIVA_STOTRAS } from './shiva';
import { VISHNU_STOTRAS } from './vishnu';
import { DEVI_STOTRAS } from './devi';
import { HANUMAN_STOTRAS } from './hanuman';
import { UNIVERSAL_STOTRAS } from './universal';
import type { Stotra } from './types';

export type { Stotra, StotraVerse, StotraCategory } from './types';

// Library order: invocations (Ganesha) first, then the major deities, then universal.
export const STOTRA_LIBRARY: Stotra[] = [
  ...GANESHA_STOTRAS,
  ...SHIVA_STOTRAS,
  ...VISHNU_STOTRAS,
  ...DEVI_STOTRAS,
  ...HANUMAN_STOTRAS,
  ...UNIVERSAL_STOTRAS,
];

export function getStotra(id: string): Stotra | undefined {
  return STOTRA_LIBRARY.find(s => s.id === id);
}

/** Distinct deity filter values in library order. */
export const STOTRA_DEITIES: string[] = [...new Set(STOTRA_LIBRARY.map(s => s.deity))];
