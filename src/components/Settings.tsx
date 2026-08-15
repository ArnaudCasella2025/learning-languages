import { useState } from "react";
import { generateSyncCode, isFirebaseConfigured } from "../lib/sync";

interface Props {
  apiKey: string;
  onApiKeyChange: (key: string) => void;
  syncCode: string;
  onSyncCodeChange: (code: string) => void;
  onBack: () => void;
}

export function Settings({ apiKey, onApiKeyChange, syncCode, onSyncCodeChange, onBack }: Props) {
  const [draft, setDraft] = useState(apiKey);
  const [saved, setSaved] = useState(false);
  const [linkDraft, setLinkDraft] = useState("");
  const [copied, setCopied] = useState(false);

  function save() {
    onApiKeyChange(draft.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function generate() {
    onSyncCodeChange(generateSyncCode());
  }

  function copyCode() {
    navigator.clipboard.writeText(syncCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function disable() {
    if (window.confirm("Arrêter la synchronisation sur cet appareil ? Ta progression locale reste intacte, mais ne sera plus mise à jour automatiquement.")) {
      onSyncCodeChange("");
    }
  }

  function link() {
    const code = linkDraft.trim().toUpperCase();
    if (!code) return;
    if (
      window.confirm(
        `Lier cet appareil au code ${code} ? Ta progression locale sur cet appareil sera remplacée par celle associée à ce code.`,
      )
    ) {
      onSyncCodeChange(code);
      setLinkDraft("");
    }
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
        qu'à api.anthropic.com, et jamais synchronisée entre appareils (voir
        ci-dessous). Nécessaire pour la conversation avec l'IA et la
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

      <h3>Synchronisation entre appareils</h3>

      {!isFirebaseConfigured ? (
        <p className="hint">
          Non configurée pour ce déploiement (voir README, section
          « Synchronisation multi-appareils »). Ta progression reste locale à cet
          appareil.
        </p>
      ) : (
        <>
          {syncCode ? (
            <>
              <p className="hint">
                Synchronisation active. Entre ce code sur ton autre appareil (dans ses
                Réglages) pour lier sa progression à celle-ci :
              </p>
              <div className="sync-code-row">
                <span className="sync-code">{syncCode}</span>
                <button onClick={copyCode}>{copied ? "Copié ✅" : "Copier"}</button>
              </div>
              <button className="ghost" onClick={disable}>
                Arrêter la synchronisation
              </button>
            </>
          ) : (
            <>
              <p className="hint">
                Génère un code pour synchroniser ta progression (vocabulaire,
                phrases, journal, podcasts écoutés...) entre plusieurs appareils. La
                clé API n'est jamais synchronisée.
              </p>
              <button className="primary" onClick={generate}>
                Générer un code de synchronisation
              </button>
            </>
          )}

          <label className="field-label" htmlFor="link-code">
            Ou lier un code existant (depuis un autre appareil)
          </label>
          <div className="chat-input-row">
            <input
              id="link-code"
              type="text"
              value={linkDraft}
              onChange={(e) => setLinkDraft(e.target.value)}
              placeholder="Ex : A7K2M9PQ"
              autoComplete="off"
            />
            <button className="primary" onClick={link} disabled={!linkDraft.trim()}>
              Lier
            </button>
          </div>
        </>
      )}
    </div>
  );
}
