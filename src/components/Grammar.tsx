import { useState } from "react";
import type { GrammarNote, VerbConjugation } from "../types";

interface Props {
  conjugations: VerbConjugation[];
  notes: GrammarNote[];
  pronounLabels: [string, string, string, string, string, string];
  tenseLabels: [string, string];
  rtl?: boolean;
  onBack: () => void;
}

export function Grammar({ conjugations, notes, pronounLabels, tenseLabels, rtl, onBack }: Props) {
  const [selectedVerb, setSelectedVerb] = useState<VerbConjugation | null>(null);
  const dir = rtl ? "rtl" : "ltr";

  if (selectedVerb) {
    return (
      <div className="module-screen">
        <button className="back-link" onClick={() => setSelectedVerb(null)}>
          ← Retour à la grammaire
        </button>
        <h2 dir={dir}>{selectedVerb.infinitive}</h2>
        <p className="module-sub">{selectedVerb.meaning}</p>

        <h3>{tenseLabels[0]}</h3>
        <table className="grammar-table">
          <tbody>
            {pronounLabels.map((pn, i) => (
              <tr key={pn}>
                <td>{pn}</td>
                <td dir={dir}>{selectedVerb.tense1[i]}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>{tenseLabels[1]}{selectedVerb.auxiliary ? ` (${selectedVerb.auxiliary})` : ""}</h3>
        <table className="grammar-table">
          <tbody>
            {pronounLabels.map((pn, i) => (
              <tr key={pn}>
                <td>{pn}</td>
                <td dir={dir}>{selectedVerb.tense2[i]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="module-screen">
      <button className="back-link" onClick={onBack}>
        ← Retour
      </button>
      <h2>Grammaire</h2>
      <p className="module-sub">Tableaux de conjugaison et notes essentielles</p>

      <h3>Conjugaison</h3>
      <div className="resource-list">
        {conjugations.map((v) => (
          <button key={v.infinitive} className="scenario-card" onClick={() => setSelectedVerb(v)}>
            <strong dir={dir}>{v.infinitive}</strong>
            <p>{v.meaning}</p>
          </button>
        ))}
      </div>

      <h3>Notes de grammaire</h3>
      <div className="grammar-notes">
        {notes.map((n) => (
          <details key={n.id} className="grammar-note">
            <summary>{n.title}</summary>
            <p>{n.explanation}</p>
            <ul>
              {n.examples.map((ex, i) => (
                <li key={i}>
                  <strong dir={dir}>{ex.it}</strong>
                  {ex.translit && <em className="translit"> ({ex.translit})</em>} — {ex.fr}
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>
    </div>
  );
}
