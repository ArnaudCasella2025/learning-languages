import { useCallback, useMemo, useRef, useState } from "react";
import { pronunciationScore } from "../lib/similarity";

interface Props {
  items: { id: string; text: string; translation: string }[];
  locale: string;
  onBack: () => void;
}

type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: ((event: unknown) => void) | null;
  onend: (() => void) | null;
};

function getSpeechRecognition(): (new () => SpeechRecognitionLike) | null {
  const w = window as unknown as {
    SpeechRecognition?: new () => SpeechRecognitionLike;
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

const speechSupported = typeof window !== "undefined" && !!getSpeechRecognition();
const ttsSupported = typeof window !== "undefined" && "speechSynthesis" in window;

export function Pronunciation({ items, locale, onBack }: Props) {
  const [index, setIndex] = useState(0);
  const [listening, setListening] = useState(false);
  const [heard, setHeard] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  const current = items[index] ?? null;

  const speak = useCallback(() => {
    if (!current || !ttsSupported) return;
    const utterance = new SpeechSynthesisUtterance(current.text);
    utterance.lang = locale;
    utterance.rate = 0.9;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }, [current, locale]);

  const record = useCallback(() => {
    if (!current) return;
    const Recognition = getSpeechRecognition();
    if (!Recognition) return;
    const recognition = new Recognition();
    recognitionRef.current = recognition;
    recognition.lang = locale;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    setHeard(null);
    setScore(null);
    setListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript ?? "";
      setHeard(transcript);
      setScore(pronunciationScore(current.text, transcript));
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognition.start();
  }, [current, locale]);

  const stopRecording = useCallback(() => {
    recognitionRef.current?.stop();
  }, []);

  const next = useCallback(() => {
    setHeard(null);
    setScore(null);
    setIndex((i) => (i + 1) % items.length);
  }, [items.length]);

  const scoreLabel = useMemo(() => {
    if (score === null) return null;
    if (score >= 85) return { text: "Excellent ! 🎯", cls: "score-great" };
    if (score >= 60) return { text: "Pas mal, continue 👍", cls: "score-ok" };
    return { text: "Réessaie 🔁", cls: "score-low" };
  }, [score]);

  if (!current) {
    return (
      <div className="module-screen">
        <button className="back-link" onClick={onBack}>
          ← Retour
        </button>
        <p>Aucun contenu disponible pour l'instant.</p>
      </div>
    );
  }

  return (
    <div className="module-screen">
      <button className="back-link" onClick={onBack}>
        ← Retour
      </button>
      <h2>Prononciation</h2>
      <p className="module-sub">
        {index + 1}/{items.length}
      </p>

      <div className="pronunciation-card">
        <div className="pronunciation-text">{current.text}</div>
        <div className="pronunciation-translation">{current.translation}</div>

        <div className="pronunciation-actions">
          <button onClick={speak} disabled={!ttsSupported}>
            🔊 Écouter
          </button>
          {speechSupported ? (
            <button
              className={listening ? "recording" : ""}
              onClick={listening ? stopRecording : record}
            >
              {listening ? "⏹ Arrêter" : "🎤 M'enregistrer"}
            </button>
          ) : (
            <span className="hint">
              Reconnaissance vocale non disponible dans ce navigateur (essaie Chrome).
            </span>
          )}
        </div>

        {heard !== null && (
          <div className="pronunciation-result">
            <p>Entendu : « {heard || "…"} »</p>
            {scoreLabel && (
              <p className={scoreLabel.cls}>
                {scoreLabel.text} ({score}%)
              </p>
            )}
          </div>
        )}
      </div>

      {!ttsSupported && (
        <p className="hint">
          Synthèse vocale non disponible dans ce navigateur.
        </p>
      )}

      <button className="primary" onClick={next}>
        Suivant →
      </button>
    </div>
  );
}
