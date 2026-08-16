import { useState } from "react";
import type { GrammarNote, VerbConjugation } from "../types";

interface Props {
  conjugations: VerbConjugation[];
  notes: GrammarNote[];
  pronounLabels: [string, string, string, string, string, string];
  onBack: () => void;
}

export function Grammar({ conjugations, notes, pronounLabels, onBack }: Props) {
  const [selectedVerb, setSelectedVerb] = useState<VerbConjugation | null>(null);

  if (selectedVerb) {
    return (
      <div className="module-screen">
        <button className="back-link" onClick={() => setSelectedVerb(null)}>
          ← Retour à la grammaire
        </button>
        <h2>{selectedVerb.infinitive}</h2>
        <p className="module-sub">{selectedVerb.meaning}</p>

        <h3>Présent</h3>
        <table className="grammar-table">
          <tbody>
            {pronounLabels.map((pn, i) => (
              <tr key={pn}>
                <td>{pn}</td>
                <td>{selectedVerb.presente[i]}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>Passé composé ({selectedVerb.auxiliary})</h3>
        <table className="grammar-table">
          <tbody>
            {pronounLabels.map((pn, i) => (
              <tr key={pn}>
                <td>{pn}</td>
                <td>{selectedVerb.passatoProssimo[i]}</td>
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
            <strong>{v.infinitive}</strong>
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
                  <strong>{ex.it}</strong> — {ex.fr}
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>
    </div>
  );
}
