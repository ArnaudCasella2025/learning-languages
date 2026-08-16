import type { SRSDeckState } from "../types";

function isKnown(id: string, deck: SRSDeckState): boolean {
  return (deck[id]?.repetitions ?? 0) > 0;
}

/**
 * Déblocage progressif par palier : seules les `batchSize` premières
 * cartes (dans l'ordre du fichier de contenu) sont proposées au départ.
 * Un palier suivant de `batchSize` cartes se débloque dès que toutes les
 * cartes du palier courant sont "connues" (au moins une bonne réponse),
 * et ainsi de suite. Un palier déjà débloqué le reste même si une carte
 * y redevient "Encore" ensuite.
 */
export function unlockedCount(
  items: { id: string }[],
  deck: SRSDeckState,
  batchSize: number,
): number {
  let masteredBatches = 0;
  for (let start = 0; start < items.length; start += batchSize) {
    const batch = items.slice(start, start + batchSize);
    if (!batch.every((item) => isKnown(item.id, deck))) break;
    masteredBatches++;
  }
  return Math.min((masteredBatches + 1) * batchSize, items.length);
}

/** Combien de cartes du palier courant (le dernier débloqué) manquent encore à maîtriser. */
export function remainingInCurrentBatch(
  items: { id: string }[],
  deck: SRSDeckState,
  batchSize: number,
  unlocked: number,
): number {
  if (unlocked >= items.length) return 0;
  const batchStart = Math.floor((unlocked - 1) / batchSize) * batchSize;
  const batch = items.slice(batchStart, unlocked);
  return batch.filter((item) => !isKnown(item.id, deck)).length;
}
