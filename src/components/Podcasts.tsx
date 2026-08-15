import { useState } from "react";
import type { GeneratedPodcast, Level, SRSDeckState, VocabItem } from "../types";
import { sendMessage, ClaudeApiError } from "../lib/claude";
import { availableMilestones, milestoneVocabPrompt, themePodcastPrompt } from "../lib/podcastPrompt";
import { useTtsReader } from "../hooks/useTtsReader";

interface Props {
  level: Level;
  languageLabel: string;
  locale: string;
  vocab: VocabItem[];
  vocabDeck: SRSDeckState;
  apiKey: string;
  podcasts: GeneratedPodcast[];
  onPodcastsChange: (podcasts: GeneratedPodcast[]) => void;
  onBack: () => void;
  onOpenSettings: () => void;
}

function knownCount(vocab: VocabItem[], deck: SRSDeckState): number {
  return vocab.filter((v) => deck[v.id]?.repetitions > 0).length;
}

function Player({ podcast, locale }: { podcast: GeneratedPodcast; locale: string }) {
  const { playing, progressPct, play, pause, stop, supported } = useTtsReader(
    podcast.script,
    locale,
  );

  if (!supported) {
    return <p className="hint">Synthèse vocale non disponible dans ce navigateur.</p>;
  }

  return (
    <div className="podcast-player">
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progressPct}%` }} />
      </div>
      <div className="podcast-player-controls">
        <button className="primary" onClick={playing ? pause : play}>
          {playing ? "⏸ Pause" : "▶ Lire"}
        </button>
        <button onClick={stop}>⏹ Arrêter</button>
      </div>
      <details>
        <summary>Voir le script</summary>
        <p className="podcast-script">{podcast.script}</p>
      </details>
    </div>
  );
}

export function Podcasts({
  level,
  languageLabel,
  locale,
  vocab,
  vocabDeck,
  apiKey,
  podcasts,
  onPodcastsChange,
  onBack,
  onOpenSettings,
}: Props) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState("");
  const [selected, setSelected] = useState<GeneratedPodcast | null>(null);

  const known = knownCount(vocab, vocabDeck);
  const milestones = availableMilestones(vocab.length);
  const milestonePodcasts = podcasts.filter((p) => p.kind === "milestone");
  const themePodcasts = podcasts.filter((p) => p.kind === "theme" && p.level === level);

  async function generateMilestone(m: number) {
    setError(null);
    setLoadingId(`m-${m}`);
    try {
      const words = vocab.slice(0, m);
      const { system, user } = milestoneVocabPrompt(languageLabel, level, words, m);
      const script = await sendMessage(apiKey, system, [{ role: "user", content: user }], 4096);
      const podcast: GeneratedPodcast = {
        id: crypto.randomUUID(),
        title: `${m} premiers mots`,
        level,
        kind: "milestone",
        milestone: m,
        script,
        createdAt: new Date().toISOString(),
      };
      onPodcastsChange([podcast, ...podcasts]);
      setSelected(podcast);
    } catch (e) {
      setError(e instanceof ClaudeApiError ? e.message : "Erreur inattendue.");
    } finally {
      setLoadingId(null);
    }
  }

  async function generateTheme() {
    if (!theme.trim()) return;
    setError(null);
    setLoadingId("theme");
    try {
      const { system, user } = themePodcastPrompt(languageLabel, level, theme.trim());
      const script = await sendMessage(apiKey, system, [{ role: "user", content: user }], 4096);
      const podcast: GeneratedPodcast = {
        id: crypto.randomUUID(),
        title: theme.trim(),
        level,
        kind: "theme",
        theme: theme.trim(),
        script,
        createdAt: new Date().toISOString(),
      };
      onPodcastsChange([podcast, ...podcasts]);
      setSelected(podcast);
      setTheme("");
    } catch (e) {
      setError(e instanceof ClaudeApiError ? e.message : "Erreur inattendue.");
    } finally {
      setLoadingId(null);
    }
  }

  if (!apiKey) {
    return (
      <div className="module-screen">
        <button className="back-link" onClick={onBack}>
          ← Retour
        </button>
        <h2>Podcasts générés</h2>
        <div className="empty-state">
          <p>La génération de podcasts nécessite une clé API Anthropic.</p>
          <button className="primary" onClick={onOpenSettings}>
            Configurer ma clé API
          </button>
        </div>
      </div>
    );
  }

  if (selected) {
    return (
      <div className="module-screen">
        <button className="back-link" onClick={() => setSelected(null)}>
          ← Retour aux podcasts
        </button>
        <h2>{selected.title}</h2>
        <Player podcast={selected} locale={locale} />
      </div>
    );
  }

  return (
    <div className="module-screen">
      <button className="back-link" onClick={onBack}>
        ← Retour
      </button>
      <h2>Podcasts générés</h2>
      <p className="module-sub">
        Scripts générés par l'IA (~2500 mots), lus par la synthèse vocale du navigateur.
      </p>
      {error && <p className="error-text">{error}</p>}

      <h3>Par palier de vocabulaire</h3>
      <p className="hint">{known} mots connus pour l'instant.</p>
      <div className="resource-list">
        {milestones.map((m) => {
          const existing = milestonePodcasts.find((p) => p.milestone === m);
          const unlocked = known >= m;
          return (
            <div key={m} className="resource-card milestone-card">
              <strong>{m} premiers mots</strong>
              {existing ? (
                <button className="primary" onClick={() => setSelected(existing)}>
                  ▶ Écouter
                </button>
              ) : unlocked ? (
                <button
                  className="primary"
                  disabled={loadingId === `m-${m}`}
                  onClick={() => generateMilestone(m)}
                >
                  {loadingId === `m-${m}` ? "Génération…" : "Générer"}
                </button>
              ) : (
                <span className="hint">🔒 {m - known} mots restants à apprendre</span>
              )}
            </div>
          );
        })}
      </div>

      <h3>Sur un thème</h3>
      <div className="chat-input-row">
        <input
          type="text"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          placeholder="Ex : la cuisine, le sport, un voyage à Rome..."
        />
        <button
          className="primary"
          onClick={generateTheme}
          disabled={loadingId === "theme" || !theme.trim()}
        >
          {loadingId === "theme" ? "Génération…" : "Générer"}
        </button>
      </div>

      {themePodcasts.length > 0 && (
        <div className="resource-list">
          {themePodcasts.map((p) => (
            <button key={p.id} className="scenario-card" onClick={() => setSelected(p)}>
              <strong>{p.title}</strong>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
