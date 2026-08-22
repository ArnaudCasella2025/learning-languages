import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { SRSDeckState } from "../types";
import { useFlashcards, type FlashcardItem } from "../hooks/useFlashcards";
import { remainingInCurrentBatch, unlockedCount } from "../lib/batches";
import { findVoice } from "../lib/voices";
import { store } from "../lib/storage";
import { usePersisted } from "../hooks/usePersisted";

const FRENCH_FLAG = "🇫🇷";
const ttsSupported = typeof window !== "undefined" && "speechSynthesis" in window;

interface Props {
  title: string;
  languageLabel: string;
  languageFlag: string;
  /** Locale BCP 47 pour la lecture audio automatique, ex. "it-IT". */
  locale: string;
  rtl?: boolean;
  items: FlashcardItem[];
  /** Taille des paliers de déblocage progressif (voir src/lib/batches.ts). */
  batchSize: number;
  deck: SRSDeckState;
  onDeckChange: (deck: SRSDeckState) => void;
  onBack: () => void;
}

export function Flashcards({
  title,
  languageLabel,
  languageFlag,
  locale,
  rtl,
  items,
  batchSize,
  deck,
  onDeckChange,
  onBack,
}: Props) {
  const unlocked = useMemo(
    () => unlockedCount(items, deck, batchSize),
    [items, deck, batchSize],
  );
  const visibleItems = useMemo(() => items.slice(0, unlocked), [items, unlocked]);
  const toUnlockNext = useMemo(
    () => remainingInCurrentBatch(items, deck, batchSize, unlocked),
    [items, deck, batchSize, unlocked],
  );

  const {
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
    dueCount,
    totalCount,
    knownCount,
    currentStreak,
    confirmStreak,
    currentScore,
  } = useFlashcards({ items: visibleItems, deck, onDeckChange });

  const promptFlag = direction === "it-fr" ? languageFlag : FRENCH_FLAG;
  const answerFlag = direction === "it-fr" ? FRENCH_FLAG : languageFlag;
  const promptDir = direction === "it-fr" && rtl ? "rtl" : "ltr";
  const answerDir = direction === "fr-it" && rtl ? "rtl" : "ltr";

  // Lecture audio du mot/de la phrase dans la langue apprise : dès que le
  // texte cible est visible à l'écran (directement dans le sens langue ->
  // français, ou une fois la réponse révélée dans le sens inverse), pas
  // avant (ça donnerait la réponse). Peut être coupée (préférence locale,
  // persistée) et relancée à la demande via le bouton 🔊.
  const [audioEnabled, setAudioEnabled] = usePersisted(
    store.getFlashcardAudio,
    store.setFlashcardAudio,
  );
  const [voice, setVoice] = useState<SpeechSynthesisVoice | undefined>();
  useEffect(() => {
    let cancelled = false;
    findVoice(locale).then((v) => {
      if (!cancelled) setVoice(v);
    });
    return () => {
      cancelled = true;
    };
  }, [locale]);

  const speak = useCallback(
    (text: string) => {
      if (!ttsSupported) return;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = locale;
      if (voice) utterance.voice = voice;
      utterance.rate = 0.9;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    },
    [locale, voice],
  );

  const targetTextVisible = direction === "it-fr" ? true : checked;
  const lastAutoSpokenRef = useRef<string | null>(null);
  useEffect(() => {
    if (!audioEnabled || !currentItem || !targetTextVisible) return;
    const key = `${currentItem.id}:${direction}:${checked}`;
    if (lastAutoSpokenRef.current === key) return;
    lastAutoSpokenRef.current = key;
    speak(currentItem.it);
  }, [audioEnabled, currentItem, direction, checked, targetTextVisible, speak]);

  return (
    <div className="module-screen">
      <button className="back-link" onClick={onBack}>
        ← Retour
      </button>
      <div className="module-header-row">
        <h2>{title}</h2>
        {ttsSupported && (
          <button
            type="button"
            className="ghost audio-toggle"
            onClick={() => setAudioEnabled(!audioEnabled)}
            aria-label={audioEnabled ? "Couper la lecture audio" : "Activer la lecture audio"}
            title={audioEnabled ? "Couper la lecture audio" : "Activer la lecture audio"}
          >
            {audioEnabled ? "🔊" : "🔇"}
          </button>
        )}
      </div>
      <p className="module-sub">
        {knownCount}/{totalCount} cartes débloquées maîtrisées · {dueCount} à réviser maintenant
        {unlocked < items.length && ` · ${unlocked}/${items.length} cartes débloquées au total`}
      </p>
      {unlocked < items.length && (
        <p className="hint">
          🔒 Encore {toUnlockNext} carte{toUnlockNext > 1 ? "s" : ""} à maîtriser dans ce palier
          pour débloquer {Math.min(batchSize, items.length - unlocked)} cartes de plus.
        </p>
      )}

      {!currentItem && (
        <div className="empty-state">
          <p>🎉 Rien à réviser pour l'instant.</p>
          <p className="hint">Reviens plus tard : les cartes reviennent selon leur intervalle.</p>
        </div>
      )}

      {currentItem && (
        <div className="flashcard">
          <div className="flashcard-direction">
            <span>
              {direction === "it-fr"
                ? `${languageLabel.toLowerCase()} → français`
                : `français → ${languageLabel.toLowerCase()}`}
            </span>
            <span className="flashcard-score" title="Bonnes réponses nettes pour cette carte">
              ⭐ {currentScore}
            </span>
          </div>
          <div className="flashcard-front" dir={promptDir}>
            <span className="flashcard-flag" aria-hidden="true">
              {promptFlag}
            </span>
            {prompt}
            {ttsSupported && direction === "it-fr" && (
              <button
                type="button"
                className="ghost audio-replay"
                onClick={() => speak(currentItem.it)}
                aria-label="Réécouter"
                title="Réécouter"
              >
                🔊
              </button>
            )}
          </div>
          {promptTranslit && <div className="flashcard-translit">{promptTranslit}</div>}
          {currentStreak > 0 && (
            <p className="hint">
              🔁 Déjà {currentStreak}/{confirmStreak} bonnes réponses dans cette session — encore
              une pour valider cette carte.
            </p>
          )}

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
              placeholder={
                expectedTranslit ? "Ta réponse (écriture originale ou translittération)..." : "Ta réponse..."
              }
              dir={answerDir}
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
                {" "}
                <span
                  className={
                    result.correct
                      ? "flashcard-score flashcard-score-pop score-delta-up"
                      : "flashcard-score flashcard-score-pop score-delta-down"
                  }
                >
                  ⭐ {currentScore} →{" "}
                  <span className="flashcard-score-delta">
                    {Math.max(0, currentScore + (result.correct ? 1 : -1))}
                  </span>
                </span>
              </p>
              <p className="flashcard-back">
                <span className="flashcard-flag" aria-hidden="true">
                  {answerFlag}
                </span>
                Réponse : <span dir={answerDir}>{expectedAnswer}</span>
                {expectedTranslit && (
                  <span className="flashcard-translit"> ({expectedTranslit})</span>
                )}
                {ttsSupported && direction === "fr-it" && (
                  <button
                    type="button"
                    className="ghost audio-replay"
                    onClick={() => speak(currentItem.it)}
                    aria-label="Réécouter"
                    title="Réécouter"
                  >
                    🔊
                  </button>
                )}
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
