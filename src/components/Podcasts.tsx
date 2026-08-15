import { useState } from "react";
import type { GeneratedPodcast, Level, SRSDeckState, VocabItem } from "../types";
import { sendMessage, ClaudeApiError } from "../lib/claude";
import { themePodcastPrompt } from "../lib/podcastPrompt";
import { useTtsReader } from "../hooks/useTtsReader";

type MilestoneEpisode = Omit<GeneratedPodcast, "id" | "createdAt">;

interface Props {
  level: Level;
  languageLabel: string;
  locale: string;
  vocab: VocabItem[];
  vocabDeck: SRSDeckState;
  milestoneEpisodes: MilestoneEpisode[];
  apiKey: string;
  podcasts: GeneratedPodcast[];
  onPodcastsChange: (podcasts: GeneratedPodcast[]) => void;
  onBack: () => void;
  onOpenSettings: () => void;
}

function knownCount(vocab: VocabItem[], deck: SRSDeckState): number {
  return vocab.filter((v) => deck[v.id]?.repetitions > 0).length;
}

function toPodcast(episode: MilestoneEpisode): GeneratedPodcast {
  return { ...episode, id: `milestone-${episode.milestone}`, createdAt: "" };
}

function Player({ podcast, locale }: { podcast: GeneratedPodcast; locale: string }) {
  const { playing, progressPct, play, pause, stop, supported, voiceAvailable, voiceChecked } =
    useTtsReader(podcast.script, locale);

  if (!supported) {
    return <p className="hint">Synthèse vocale non disponible dans ce navigateur.</p>;
  }

  return (
    <div className="podcast-player">
      {voiceChecked && !voiceAvailable && (
        <p className="hint">
          ⚠️ Aucune voix {locale} trouvée sur cet appareil : la lecture utilisera la voix par
          défaut du navigateur (probablement française), pas une vraie voix italienne. Installe
          une voix italienne dans les réglages de synthèse vocale de ton système ou navigateur
          (voir le README) pour une meilleure prononciation.
        </p>
      )}
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
  milestoneEpisodes,
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
  const themePodcasts = podcasts.filter((p) => p.kind === "theme" && p.level === level);

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
        Écoute avec le bouton ▶, lu par la synthèse vocale du navigateur.
      </p>

      <h3>Par palier de vocabulaire</h3>
      <p className="hint">
        Épisodes écrits à l'avance, pas besoin de clé API. {known} mots connus pour l'instant.
      </p>
      <div className="resource-list">
        {milestoneEpisodes.map((episode) => {
          const unlocked = known >= (episode.milestone ?? 0);
          return (
            <div key={episode.milestone} className="resource-card milestone-card">
              <strong>{episode.title}</strong>
              {unlocked ? (
                <button className="primary" onClick={() => setSelected(toPodcast(episode))}>
                  ▶ Écouter
                </button>
              ) : (
                <span className="hint">
                  🔒 {(episode.milestone ?? 0) - known} mots restants à apprendre
                </span>
              )}
            </div>
          );
        })}
      </div>

      <h3>Sur un thème</h3>
      {!apiKey ? (
        <div className="empty-state">
          <p>Générer un podcast sur un thème libre nécessite une clé API Anthropic.</p>
          <button className="primary" onClick={onOpenSettings}>
            Configurer ma clé API
          </button>
        </div>
      ) : (
        <>
          {error && <p className="error-text">{error}</p>}
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
        </>
      )}
    </div>
  );
}
