import { useState } from "react";
import type { ChatMessage, ConversationLog, ConversationScenario, Level } from "../types";
import { sendMessage, ClaudeApiError } from "../lib/claude";

interface Props {
  level: Level;
  scenarios: ConversationScenario[];
  apiKey: string;
  log: ConversationLog;
  onLogChange: (log: ConversationLog) => void;
  onBack: () => void;
  onOpenSettings: () => void;
}

const WEEKLY_GOAL = 3;

function sessionsThisWeek(log: ConversationLog): number {
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  return log.sessions.filter((s) => new Date(s).getTime() >= weekAgo).length;
}

export function Conversation({
  level,
  scenarios,
  apiKey,
  log,
  onLogChange,
  onBack,
  onOpenSettings,
}: Props) {
  const [scenario, setScenario] = useState<ConversationScenario | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [logged, setLogged] = useState(false);

  const levelScenarios = scenarios.filter((s) => s.level === level);
  const weekCount = sessionsThisWeek(log);

  function startScenario(s: ConversationScenario) {
    setScenario(s);
    setMessages([]);
    setError(null);
    setLogged(false);
  }

  async function send() {
    if (!scenario || !input.trim() || loading) return;
    const next = [...messages, { role: "user" as const, content: input.trim() }];
    setMessages(next);
    setInput("");
    setLoading(true);
    setError(null);
    try {
      const reply = await sendMessage(apiKey, scenario.systemPrompt, next);
      setMessages([...next, { role: "assistant", content: reply }]);
      if (!logged) {
        onLogChange({ sessions: [...log.sessions, new Date().toISOString()] });
        setLogged(true);
      }
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
        <h2>Conversation avec l'IA</h2>
        <div className="empty-state">
          <p>Cette fonctionnalité nécessite une clé API Anthropic.</p>
          <button className="primary" onClick={onOpenSettings}>
            Configurer ma clé API
          </button>
        </div>
      </div>
    );
  }

  if (!scenario) {
    return (
      <div className="module-screen">
        <button className="back-link" onClick={onBack}>
          ← Retour
        </button>
        <h2>Conversation avec l'IA</h2>
        {level === 2 && (
          <p className="module-sub">
            Objectif : {weekCount}/{WEEKLY_GOAL} conversations cette semaine
          </p>
        )}
        <div className="scenario-list">
          {levelScenarios.map((s) => (
            <button key={s.id} className="scenario-card" onClick={() => startScenario(s)}>
              <strong>{s.title}</strong>
              <p>{s.description}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="module-screen">
      <button className="back-link" onClick={() => setScenario(null)}>
        ← Changer de scénario
      </button>
      <h2>{scenario.title}</h2>

      <div className="chat-log">
        {messages.length === 0 && (
          <p className="hint">Écris le premier message pour démarrer la conversation.</p>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`chat-bubble chat-${m.role}`}>
            {m.content}
          </div>
        ))}
        {loading && <div className="chat-bubble chat-assistant">…</div>}
      </div>

      {error && <p className="error-text">{error}</p>}

      <div className="chat-input-row">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          placeholder="Scrivi in italiano..."
          rows={2}
        />
        <button className="primary" onClick={send} disabled={loading || !input.trim()}>
          Envoyer
        </button>
      </div>
    </div>
  );
}
