import { useState } from "react";
import type { JournalEntry } from "../types";
import { sendMessage, ClaudeApiError } from "../lib/claude";
import { todayKey } from "../lib/storage";

interface Props {
  apiKey: string;
  languageLabel: string;
  rtl?: boolean;
  correctionSystemPrompt: string;
  entries: JournalEntry[];
  onEntriesChange: (entries: JournalEntry[]) => void;
  onBack: () => void;
  onOpenSettings: () => void;
}

function computeStreak(entries: JournalEntry[]): number {
  const days = new Set(entries.map((e) => e.date));
  let streak = 0;
  const d = new Date();
  while (days.has(todayKey(d))) {
    streak += 1;
    d.setDate(d.getDate() - 1);
  }
  return streak;
}

export function Journal({
  apiKey,
  languageLabel,
  rtl,
  correctionSystemPrompt,
  entries,
  onEntriesChange,
  onBack,
  onOpenSettings,
}: Props) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const streak = computeStreak(entries);
  const sorted = [...entries].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  async function submit() {
    if (!text.trim() || loading) return;
    setLoading(true);
    setError(null);
    try {
      const correction = await sendMessage(apiKey, correctionSystemPrompt, [
        { role: "user", content: text.trim() },
      ]);
      const entry: JournalEntry = {
        id: crypto.randomUUID(),
        date: todayKey(),
        text: text.trim(),
        correction,
        createdAt: new Date().toISOString(),
      };
      onEntriesChange([entry, ...entries]);
      setText("");
    } catch (e) {
      setError(e instanceof ClaudeApiError ? e.message : "Erreur inattendue.");
    } finally {
      setLoading(false);
    }
  }

  if (!apiKey) {
    return (
      <div className="module-screen">
        <button className="back-link" onClick={onBack}>
          ← Retour
        </button>
        <h2>Journal quotidien</h2>
        <div className="empty-state">
          <p>La correction du journal nécessite une clé API Anthropic.</p>
          <button className="primary" onClick={onOpenSettings}>
            Configurer ma clé API
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="module-screen">
      <button className="back-link" onClick={onBack}>
        ← Retour
      </button>
      <h2>Journal quotidien</h2>
      <p className="module-sub">
        Écris 5 phrases en {languageLabel.toLowerCase()} sur ta journée · série actuelle : {streak} jour
        {streak > 1 ? "s" : ""}
      </p>

      <textarea
        className="journal-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={`Écris 5 phrases en ${languageLabel.toLowerCase()}...`}
        dir={rtl ? "rtl" : "ltr"}
        rows={6}
      />
      {error && <p className="error-text">{error}</p>}
      <button className="primary" onClick={submit} disabled={loading || !text.trim()}>
        {loading ? "Correction en cours…" : "Corriger"}
      </button>

      <div className="journal-history">
        {sorted.map((entry) => (
          <div key={entry.id} className="journal-entry">
            <div className="journal-date">{entry.date}</div>
            <div className="journal-original" dir={rtl ? "rtl" : "ltr"}>
              {entry.text}
            </div>
            {entry.correction && (
              <div className="journal-correction" dir={rtl ? "rtl" : "ltr"}>
                {entry.correction}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
