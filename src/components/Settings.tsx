import { useState } from "react";

interface Props {
  apiKey: string;
  onApiKeyChange: (key: string) => void;
  onBack: () => void;
}

export function Settings({ apiKey, onApiKeyChange, onBack }: Props) {
  const [draft, setDraft] = useState(apiKey);
  const [saved, setSaved] = useState(false);

  function save() {
    onApiKeyChange(draft.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="module-screen">
      <button className="back-link" onClick={onBack}>
        ← Retour
      </button>
      <h2>Réglages</h2>

      <label className="field-label" htmlFor="api-key">
        Clé API Anthropic
      </label>
      <input
        id="api-key"
        type="password"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        placeholder="sk-ant-..."
        autoComplete="off"
      />
      <p className="hint">
        Stockée uniquement dans ton navigateur (localStorage), jamais envoyée ailleurs
        qu'à api.anthropic.com. Nécessaire pour la conversation avec l'IA et la
        correction du journal. Crée une clé sur{" "}
        <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noreferrer">
          console.anthropic.com
        </a>
        .
      </p>

      <button className="primary" onClick={save}>
        Enregistrer
      </button>
      {saved && <p className="success-text">Clé enregistrée ✅</p>}
    </div>
  );
}
