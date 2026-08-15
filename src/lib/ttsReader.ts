/** Découpe un texte long en phrases pour une lecture séquentielle par la synthèse vocale. */
export function splitIntoChunks(text: string): string[] {
  return text
    .split(/(?<=[.!?…])\s+|\n+/)
    .map((s) => s.trim())
    .filter(Boolean);
}
