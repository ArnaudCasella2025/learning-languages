import { useState } from "react";
import type { GeneratedPodcast } from "../types";
import { splitIntoChunks } from "../lib/ttsReader";
import { findVoice } from "../lib/voices";
import { store } from "../lib/storage";
import { usePersisted } from "../hooks/usePersisted";

interface Props {
  sources: GeneratedPodcast[];
  locale: string;
  onBack: () => void;
}

export function Shadowing({ sources, locale, onBack }: Props) {
  const [selected, setSelected] = useState<GeneratedPodcast | null>(null);
  const [index, setIndex] = useState(0);
  const [rate, setRate] = usePersisted(store.getPodcastRate, store.setPodcastRate);

  async function speak(text: string) {
    if (!("speechSynthesis" in window)) return;
    const voice = await findVoice(locale);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = locale;
    if (voice) utterance.voice = voice;
    utterance.rate = rate;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  if (!selected) {
    return (
      <div className="module-screen">
        <button className="back-link" onClick={onBack}>
          ← Retour
        </button>
        <h2>Shadowing</h2>
        <p className="module-sub">
          Écoute chaque phrase et répète-la en même temps ou juste après, à voix haute, en
          imitant le rythme et l'intonation. Choisis un contenu déjà écouté ou généré :
        </p>
        {sources.length === 0 ? (
          <p className="hint">
            Écoute d'abord un podcast (palier ou thème) pour avoir du contenu à répéter ici.
          </p>
        ) : (
          <div className="resource-list">
            {sources.map((s) => (
              <button
                key={s.id}
                className="scenario-card"
                onClick={() => {
                  setSelected(s);
                  setIndex(0);
                }}
              >
                <strong>{s.title}</strong>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  const chunks = splitIntoChunks(selected.script);
  const current = chunks[index] ?? "";

  return (
    <div className="module-screen">
      <button className="back-link" onClick={() => setSelected(null)}>
        ← Retour aux contenus
      </button>
      <h2>Shadowing — {selected.title}</h2>
      <p className="module-sub">
        {index + 1}/{chunks.length}
      </p>

      <div className="pronunciation-card">
        <div className="pronunciation-text">{current}</div>
        <div className="pronunciation-actions">
          <button onClick={() => speak(current)}>🔊 Écouter</button>
        </div>
      </div>

      <div className="podcast-settings">
        <label className="podcast-settings-row">
          <span>Vitesse</span>
          <input
            type="range"
            min="0.5"
            max="1.5"
            step="0.05"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
          />
          <span className="podcast-settings-value">{rate.toFixed(2)}x</span>
        </label>
      </div>

      <div className="grade-buttons">
        <button
          className="ghost"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
        >
          ← Précédent
        </button>
        <button
          className="primary"
          onClick={() => setIndex((i) => Math.min(chunks.length - 1, i + 1))}
          disabled={index >= chunks.length - 1}
        >
          Suivant →
        </button>
      </div>
    </div>
  );
}
