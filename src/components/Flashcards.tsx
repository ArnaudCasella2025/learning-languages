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
  const {
    currentItem,
    direction,
    prompt,
    expectedAnswer,
    userAnswer,
    setUserAnswer,
    checked,
    result,
    checkAnswer,
    grade,
    dueCount,
    totalCount,
    knownCount,
  } = useFlashcards({ items, deck, onDeckChange });

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
        <div className="flashcard">
          <div className="flashcard-direction">
            {direction === "it-fr" ? "italien → français" : "français → italien"}
          </div>
          <div className="flashcard-front">{prompt}</div>

          <form
            className="flashcard-answer-row"
            onSubmit={(e) => {
              e.preventDefault();
              if (!checked) checkAnswer();
            }}
          >
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Ta réponse..."
              disabled={checked}
              autoFocus
            />
            {!checked && (
              <button type="submit" className="primary">
                Vérifier
              </button>
            )}
          </form>

          {checked && result && (
            <div className="flashcard-result">
              <p className={result.correct ? "score-great" : "score-low"}>
                {result.correct ? "✅ Correct !" : "❌ Pas tout à fait."}
              </p>
              <p className="flashcard-back">Réponse : {expectedAnswer}</p>
            </div>
          )}
        </div>
      )}

      {currentItem && checked && (
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
