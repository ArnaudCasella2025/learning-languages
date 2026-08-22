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
    score: 0,
  };
}

/**
 * Compteur de gamification par carte : +1/-1, plancher 0. Volontairement
 * séparé de gradeCard (qui touche la planification SM-2) : une bonne
 * réponse doit incrémenter ce compteur même quand elle n'est pas encore
 * "confirmée" par la série de rappels de useFlashcards, et donc que la
 * planification SM-2 elle-même n'est pas encore mise à jour.
 */
export function bumpScore(card: SRSCard, delta: 1 | -1): SRSCard {
  return { ...card, score: Math.max(0, (card.score ?? 0) + delta) };
}

export function gradeCard(card: SRSCard, grade: number): SRSCard {
  const easiness = Math.max(
    1.3,
    card.easiness + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02)),
  );
  const { score } = bumpScore(card, grade >= 3 ? 1 : -1);

  if (grade < 3) {
    // "Encore" : la carte ne doit pas réapparaître immédiatement (elle
    // serait toujours en tête de la file mélangée), mais un peu plus tard
    // dans la session plutôt que le lendemain.
    return {
      ...card,
      easiness,
      repetitions: 0,
      interval: 0,
      lastGrade: grade,
      dueDate: addMinutes(new Date(), 10).toISOString(),
      score,
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
    score,
  };
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function addMinutes(date: Date, minutes: number): Date {
  const d = new Date(date);
  d.setMinutes(d.getMinutes() + minutes);
  return d;
}

export function isDue(card: SRSCard, now: Date = new Date()): boolean {
  return new Date(card.dueDate).getTime() <= now.getTime();
}
