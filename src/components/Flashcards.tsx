import type { SRSDeckState } from "../types";
import { useFlashcards, type FlashcardItem } from "../hooks/useFlashcards";

const FRENCH_FLAG = "🇫🇷";

interface Props {
  title: string;
  languageLabel: string;
  languageFlag: string;
  items: FlashcardItem[];
  deck: SRSDeckState;
  onDeckChange: (deck: SRSDeckState) => void;
  onBack: () => void;
}

export function Flashcards({
  title,
  languageLabel,
  languageFlag,
  items,
  deck,
  onDeckChange,
  onBack,
}: Props) {
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
    giveUp,
    grade,
    dueCount,
    totalCount,
    knownCount,
  } = useFlashcards({ items, deck, onDeckChange });

  const promptFlag = direction === "it-fr" ? languageFlag : FRENCH_FLAG;
  const answerFlag = direction === "it-fr" ? FRENCH_FLAG : languageFlag;

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
            {direction === "it-fr"
              ? `${languageLabel.toLowerCase()} → français`
              : `français → ${languageLabel.toLowerCase()}`}
          </div>
          <div className="flashcard-front">
            <span className="flashcard-flag" aria-hidden="true">
              {promptFlag}
            </span>
            {prompt}
          </div>

          <form
            className="flashcard-answer-form"
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
              <div className="flashcard-answer-buttons">
                <button type="submit" className="primary">
                  Vérifier
                </button>
                <button type="button" className="ghost" onClick={giveUp}>
                  Je ne sais pas
                </button>
              </div>
            )}
          </form>

          {checked && result && (
            <div className="flashcard-result">
              <p className={result.correct ? "score-great" : "score-low"}>
                {result.correct ? "✅ Correct !" : "❌ Pas tout à fait."}
              </p>
              <p className="flashcard-back">
                <span className="flashcard-flag" aria-hidden="true">
                  {answerFlag}
                </span>
                Réponse : {expectedAnswer}
              </p>
            </div>
          )}
        </div>
      )}

      {currentItem &&
        checked &&
        result &&
        (result.correct ? (
          <div className="grade-buttons">
            <button className="grade-hard" onClick={() => grade(3)}>
              Difficile
            </button>
            <button className="grade-easy" onClick={() => grade(5)}>
              Facile
            </button>
          </div>
        ) : (
          <div className="grade-buttons">
            <button className="grade-again" onClick={() => grade(1)}>
              Continuer →
            </button>
          </div>
        ))}
    </div>
  );
}
