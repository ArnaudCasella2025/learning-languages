import { useCallback, useMemo, useState } from "react";
import { createCard, gradeCard, isDue } from "../lib/srs";
import type { SRSDeckState } from "../types";

export interface FlashcardItem {
  id: string;
  front: string;
  back: string;
}

interface Options {
  items: FlashcardItem[];
  deck: SRSDeckState;
  onDeckChange: (deck: SRSDeckState) => void;
}

export function useFlashcards({ items, deck, onDeckChange }: Options) {
  const [revealed, setRevealed] = useState(false);
  const [sessionTick, setSessionTick] = useState(0);

  const queue = useMemo(() => {
    const now = new Date();
    return items
      .map((item) => deck[item.id] ?? createCard(item.id))
      .filter((card) => isDue(card, now))
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    // sessionTick forces recompute after grading without changing deps shape
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, deck, sessionTick]);

  const currentCard = queue[0] ?? null;
  const currentItem = currentCard
    ? items.find((i) => i.id === currentCard.id) ?? null
    : null;

  const knownCount = items.filter((item) => {
    const card = deck[item.id];
    return card && card.repetitions > 0;
  }).length;

  const reveal = useCallback(() => setRevealed(true), []);

  const grade = useCallback(
    (value: number) => {
      if (!currentCard) return;
      const base = deck[currentCard.id] ?? createCard(currentCard.id);
      const updated = gradeCard(base, value);
      onDeckChange({ ...deck, [updated.id]: updated });
      setRevealed(false);
      setSessionTick((t) => t + 1);
    },
    [currentCard, deck, onDeckChange],
  );

  return {
    currentItem,
    revealed,
    reveal,
    grade,
    dueCount: queue.length,
    totalCount: items.length,
    knownCount,
  };
}
