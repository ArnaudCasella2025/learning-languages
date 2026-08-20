import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createCard, gradeCard, isDue } from "../lib/srs";
import { shuffle } from "../lib/shuffle";
import { bestAnswerScore } from "../lib/similarity";
import type { SRSDeckState } from "../types";

export interface FlashcardItem {
  id: string;
  it: string;
  fr: string;
  /** Translittération latine du champ `it` (langues à écriture non-latine, ex. arabe). */
  translit?: string;
}

export type Direction = "it-fr" | "fr-it";

interface Options {
  items: FlashcardItem[];
  deck: SRSDeckState;
  onDeckChange: (deck: SRSDeckState) => void;
}

const CORRECT_THRESHOLD = 80;
// Nombre de bonnes réponses d'affilée nécessaires, dans la même session,
// avant qu'une carte ne quitte la file de révision. Une seule bonne
// réponse ne suffit pas à confirmer que la connaissance est acquise (ça
// peut être de la chance ou de la mémoire à très court terme) : la carte
// est donc remise plus loin dans la session pour vérifier la rétention,
// et ce n'est qu'une fois la série confirmée que la note SM-2 réelle est
// appliquée (et donc que la carte compte comme "connue").
const CONFIRM_STREAK = 2;

function idsKey(items: FlashcardItem[]): string {
  return items.map((i) => i.id).join("|");
}

// Position à laquelle une carte remise en jeu est réinsérée dans la file
// de la session. Volontairement petite et fixe pour que la carte revienne
// vite (l'objectif est de vérifier la rétention à chaud) ; un décalage
// proportionnel à la taille de la file règlerait le cas extrême où une
// carte n'est jamais réussie, mais retarderait le retour de toutes les
// autres cartes dans le cas courant, ce qui va à l'encontre du but.
function wrongRequeueOffset(restLength: number): number {
  return Math.min(3, restLength);
}

function unconfirmedRequeueOffset(restLength: number): number {
  return Math.min(6, restLength);
}

function dueIds(ids: string[], items: FlashcardItem[], deck: SRSDeckState): string[] {
  const now = new Date();
  return ids.filter((id) => {
    const item = items.find((i) => i.id === id);
    if (!item) return false;
    // Une carte jamais vue (absente du deck) n'a pas encore de date
    // d'échéance : elle est due par définition, pas de comparaison à faire
    // (créer une SRSCard ici pour la comparer à `now` serait sujet à une
    // course avec l'horodatage interne de createCard).
    const card = deck[item.id];
    return !card || isDue(card, now);
  });
}

export function useFlashcards({ items, deck, onDeckChange }: Options) {
  const [userAnswer, setUserAnswer] = useState("");
  const [checked, setChecked] = useState(false);

  // Ordre mélangé, figé pour la session : ne change que si le jeu de
  // cartes lui-même change (changement de niveau/deck), jamais à cause
  // d'un simple re-rendu (sinon la carte affichée "saute" en boucle).
  const [order, setOrder] = useState<string[]>(() => shuffle(items.map((i) => i.id)));
  const orderKeyRef = useRef(idsKey(items));

  // File de révision de la session en cours. Contrairement à un simple
  // filtre "due" recalculé à chaque rendu, une réponse fausse remet
  // explicitement la carte plus loin dans cette file (voir `grade`) au
  // lieu d'attendre les 10 min de pénalité programmées par gradeCard :
  // sinon, revoir 50 cartes d'un coup obligerait à attendre 10 min à
  // chaque erreur avant de pouvoir la retravailler dans la même session.
  const [sessionQueue, setSessionQueue] = useState<string[]>(() =>
    dueIds(order, items, deck),
  );

  // Compteur de bonnes réponses consécutives par carte, dans la session en
  // cours uniquement (pas persisté : recommence à 0 à chaque nouvelle
  // session, voir CONFIRM_STREAK ci-dessus).
  const [streaks, setStreaks] = useState<Record<string, number>>({});

  useEffect(() => {
    const key = idsKey(items);
    if (key !== orderKeyRef.current) {
      orderKeyRef.current = key;
      const newOrder = shuffle(items.map((i) => i.id));
      setOrder(newOrder);
      setSessionQueue(dueIds(newOrder, items, deck));
      setStreaks({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  const currentItem = useMemo(
    () => (sessionQueue.length ? (items.find((i) => i.id === sessionQueue[0]) ?? null) : null),
    [sessionQueue, items],
  );
  const currentCard = currentItem ? (deck[currentItem.id] ?? createCard(currentItem.id)) : null;

  const direction = useMemo<Direction>(
    () => (Math.random() < 0.5 ? "it-fr" : "fr-it"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentItem?.id],
  );

  const prompt = currentItem ? (direction === "it-fr" ? currentItem.it : currentItem.fr) : "";
  const promptTranslit = currentItem && direction === "it-fr" ? currentItem.translit : undefined;
  const expectedAnswer = currentItem
    ? direction === "it-fr"
      ? currentItem.fr
      : currentItem.it
    : "";
  // Translittération acceptée comme réponse alternative uniquement dans le
  // sens fr -> langue cible (écriture non-latine, ex. arabe) : dans l'autre
  // sens, le prompt affiche déjà le mot en écriture originale.
  const expectedTranslit = currentItem && direction === "fr-it" ? currentItem.translit : undefined;

  const knownCount = items.filter((item) => {
    const card = deck[item.id];
    return card && card.repetitions > 0;
  }).length;

  const checkAnswer = useCallback(() => {
    setChecked(true);
  }, []);

  const giveUp = useCallback(() => {
    setUserAnswer("");
    setChecked(true);
  }, []);

  const result = useMemo(() => {
    if (!checked || !expectedAnswer) return null;
    const score = expectedTranslit
      ? Math.max(bestAnswerScore(expectedAnswer, userAnswer), bestAnswerScore(expectedTranslit, userAnswer))
      : bestAnswerScore(expectedAnswer, userAnswer);
    return { correct: score >= CORRECT_THRESHOLD, score };
  }, [checked, expectedAnswer, expectedTranslit, userAnswer]);

  const grade = useCallback(
    (value: number) => {
      if (!currentItem || !currentCard) return;
      const id = currentItem.id;
      setUserAnswer("");
      setChecked(false);

      if (value < 3) {
        // Réponse fausse ("Encore") : la série de bonnes réponses repart de
        // zéro, note SM-2 appliquée tout de suite (comme avant), et la
        // carte revient assez vite dans la session pour retenter.
        const updated = gradeCard(currentCard, value);
        onDeckChange({ ...deck, [id]: updated });
        setStreaks((s) => ({ ...s, [id]: 0 }));
        setSessionQueue((q) => {
          const rest = q.slice(1);
          const requeueAt = wrongRequeueOffset(rest.length);
          return [...rest.slice(0, requeueAt), id, ...rest.slice(requeueAt)];
        });
        return;
      }

      const streak = (streaks[id] ?? 0) + 1;
      if (streak < CONFIRM_STREAK) {
        // Bonne réponse, mais pas encore confirmée : la carte reste dans
        // la session (plus loin que pour une erreur, pour vraiment tester
        // la rétention) et sa note SM-2 n'est pas encore appliquée.
        setStreaks((s) => ({ ...s, [id]: streak }));
        setSessionQueue((q) => {
          const rest = q.slice(1);
          const requeueAt = unconfirmedRequeueOffset(rest.length);
          return [...rest.slice(0, requeueAt), id, ...rest.slice(requeueAt)];
        });
        return;
      }

      // Série confirmée : note SM-2 réelle appliquée, la carte quitte la
      // session (elle reviendra à son prochain palier d'échéance).
      const updated = gradeCard(currentCard, value);
      onDeckChange({ ...deck, [id]: updated });
      setStreaks((s) => ({ ...s, [id]: 0 }));
      setSessionQueue((q) => q.slice(1));
    },
    [currentItem, currentCard, deck, onDeckChange, streaks],
  );

  const currentStreak = currentItem ? (streaks[currentItem.id] ?? 0) : 0;

  return {
    currentItem,
    direction,
    prompt,
    promptTranslit,
    expectedAnswer,
    expectedTranslit,
    userAnswer,
    setUserAnswer,
    checked,
    result,
    checkAnswer,
    giveUp,
    grade,
    dueCount: sessionQueue.length,
    totalCount: items.length,
    knownCount,
    currentStreak,
    confirmStreak: CONFIRM_STREAK,
  };
}
