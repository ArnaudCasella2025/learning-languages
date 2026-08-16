import { useEffect, useState } from "react";
import { shuffle } from "../lib/shuffle";

interface SentenceItem {
  id: string;
  it: string;
  fr: string;
}

interface Props {
  items: SentenceItem[];
  onBack: () => void;
}

function wordsOf(item: SentenceItem | null): string[] {
  return item ? item.it.split(/\s+/) : [];
}

export function SentenceBuilder({ items, onBack }: Props) {
  const [order] = useState(() => shuffle(items.map((_, i) => i)));
  const [position, setPosition] = useState(0);
  const [pool, setPool] = useState<number[]>([]);
  const [answer, setAnswer] = useState<number[]>([]);
  const [checked, setChecked] = useState(false);

  const current = items[order[position]] ?? null;
  const words = wordsOf(current);

  useEffect(() => {
    setPool(shuffle(wordsOf(current).map((_, i) => i)));
    setAnswer([]);
    setChecked(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current?.id]);

  if (!current) {
    return (
      <div className="module-screen">
        <button className="back-link" onClick={onBack}>
          ← Retour
        </button>
        <p>Aucune phrase disponible pour l'instant.</p>
      </div>
    );
  }

  function pickChip(i: number) {
    if (checked) return;
    setPool((p) => p.filter((x) => x !== i));
    setAnswer((a) => [...a, i]);
  }

  function removeChip(pos: number) {
    if (checked) return;
    setAnswer((a) => {
      const removed = a[pos];
      setPool((p) => [...p, removed]);
      return a.filter((_, i) => i !== pos);
    });
  }

  function reset() {
    setPool(shuffle(words.map((_, i) => i)));
    setAnswer([]);
  }

  function next() {
    setPosition((p) => (p + 1) % items.length);
  }

  const isComplete = answer.length === words.length;
  const isCorrect = checked && isComplete && answer.every((v, i) => v === i);

  return (
    <div className="module-screen">
      <button className="back-link" onClick={onBack}>
        ← Retour
      </button>
      <h2>Constructeur de phrases</h2>
      <p className="module-sub">
        {position + 1}/{items.length} · remets les mots italiens dans l'ordre
      </p>

      <div className="sentence-builder-card">
        <p className="sentence-builder-prompt">{current.fr}</p>

        <div className="sentence-builder-answer">
          {answer.length === 0 && (
            <span className="hint">Touche les mots ci-dessous, dans l'ordre</span>
          )}
          {answer.map((i, pos) => (
            <button key={pos} className="chip chip-answer" onClick={() => removeChip(pos)}>
              {words[i]}
            </button>
          ))}
        </div>

        <div className="sentence-builder-pool">
          {pool.map((i) => (
            <button key={i} className="chip" onClick={() => pickChip(i)}>
              {words[i]}
            </button>
          ))}
        </div>

        {checked && (
          <p className={isCorrect ? "score-great" : "score-low"}>
            {isCorrect ? "✅ Correct !" : `❌ Pas tout à fait. Réponse : ${current.it}`}
          </p>
        )}
      </div>

      <div className="grade-buttons">
        {!checked ? (
          <>
            <button className="ghost" onClick={reset} disabled={answer.length === 0}>
              Réinitialiser
            </button>
            <button className="primary" onClick={() => setChecked(true)} disabled={!isComplete}>
              Vérifier
            </button>
          </>
        ) : (
          <button className="primary" onClick={next}>
            Suivant →
          </button>
        )}
      </div>
    </div>
  );
}
