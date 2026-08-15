import type { SRSDeckState } from "../types";
import { useFlashcards, type FlashcardItem } from "../hooks/useFlashcards";

interface Props {
  title: string;
  items: FlashcardItem[];
  deck: SRSDeckState;
  onDeckChange: (deck: SRSDeckState) => void;
  onBack: () => void;
}

export function Flashcards({ title, items, deck, onDeckChange, onBack }: Props) {
  const { currentItem, revealed, reveal, grade, dueCount, totalCount, knownCount } =
    useFlashcards({ items, deck, onDeckChange });

  return (
    <div className="module-screen">
      <button className="back-link" onClick={onBack}>
        ← Retour
      </button>
      <h2>{title}</h2>
      <p className="module-sub">
        {knownCount}/{totalCount} cartes déjà vues · {dueCount} à réviser maintenant
      </p>

      {!currentItem && (
        <div className="empty-state">
          <p>🎉 Rien à réviser pour l'instant.</p>
          <p className="hint">Reviens plus tard : les cartes reviennent selon leur intervalle.</p>
        </div>
      )}

      {currentItem && (
        <div className="flashcard" onClick={!revealed ? reveal : undefined}>
          <div className="flashcard-front">{currentItem.front}</div>
          {revealed && <div className="flashcard-back">{currentItem.back}</div>}
          {!revealed && <div className="hint">Touche la carte pour révéler</div>}
        </div>
      )}

      {currentItem && revealed && (
        <div className="grade-buttons">
          <button className="grade-again" onClick={() => grade(1)}>
            Encore
          </button>
          <button className="grade-hard" onClick={() => grade(3)}>
            Difficile
          </button>
          <button className="grade-easy" onClick={() => grade(5)}>
            Facile
          </button>
        </div>
      )}
    </div>
  );
}
