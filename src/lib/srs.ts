import type { SRSCard } from "../types";

/**
 * Répétition espacée façon SM-2 (algorithme historique d'Anki/SuperMemo).
 * grade va de 0 (total échec) à 5 (parfait) ; on n'utilise que 3 boutons
 * dans l'UI (Encore / Difficile / Facile) mappés sur des grades représentatifs.
 */
export function createCard(id: string): SRSCard {
  return {
    id,
    easiness: 2.5,
    interval: 0,
    repetitions: 0,
    dueDate: new Date().toISOString(),
  };
}

export function gradeCard(card: SRSCard, grade: number): SRSCard {
  const easiness = Math.max(
    1.3,
    card.easiness + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02)),
  );

  if (grade < 3) {
    return {
      ...card,
      easiness,
      repetitions: 0,
      interval: 0,
      lastGrade: grade,
      dueDate: addDays(new Date(), 0).toISOString(),
    };
  }

  const repetitions = card.repetitions + 1;
  let interval: number;
  if (repetitions === 1) interval = 1;
  else if (repetitions === 2) interval = 6;
  else interval = Math.round(card.interval * easiness);

  return {
    ...card,
    easiness,
    repetitions,
    interval,
    lastGrade: grade,
    dueDate: addDays(new Date(), interval).toISOString(),
  };
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export function isDue(card: SRSCard, now: Date = new Date()): boolean {
  return new Date(card.dueDate).getTime() <= now.getTime();
}
