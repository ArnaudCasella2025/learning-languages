import { useEffect, useRef, useState } from "react";
import type { Level, ListeningLog, ListeningResource } from "../types";
import { todayKey } from "../lib/storage";

interface Props {
  level: Level;
  resources: ListeningResource[];
  log: ListeningLog;
  onLogChange: (log: ListeningLog) => void;
  onBack: () => void;
}

const DAILY_GOAL_MINUTES = 30;

export function Listening({ level, resources, log, onLogChange, onBack }: Props) {
  const [running, setRunning] = useState(false);
  const startRef = useRef<number | null>(null);
  const [elapsedSec, setElapsedSec] = useState(0);

  const today = todayKey();
  const minutesToday = Math.round((log.minutesByDay[today] ?? 0) + elapsedSec / 60);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      if (startRef.current) {
        setElapsedSec((Date.now() - startRef.current) / 1000);
      }
    }, 1000);
    return () => window.clearInterval(id);
  }, [running]);

  function toggleTimer() {
    if (running) {
      const addedMinutes = elapsedSec / 60;
      const current = log.minutesByDay[today] ?? 0;
      onLogChange({
        minutesByDay: { ...log.minutesByDay, [today]: current + addedMinutes },
      });
      setElapsedSec(0);
      startRef.current = null;
      setRunning(false);
    } else {
      startRef.current = Date.now();
      setRunning(true);
    }
  }

  const progressPct = Math.min(100, Math.round((minutesToday / DAILY_GOAL_MINUTES) * 100));

  return (
    <div className="module-screen">
      <button className="back-link" onClick={onBack}>
        ← Retour
      </button>
      <h2>Écoute</h2>
      <p className="module-sub">Objectif : {DAILY_GOAL_MINUTES} min/jour</p>

      <div className="listening-progress">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progressPct}%` }} />
        </div>
        <p>
          {minutesToday} / {DAILY_GOAL_MINUTES} min aujourd'hui
        </p>
      </div>

      <button className={running ? "primary recording" : "primary"} onClick={toggleTimer}>
        {running ? "⏸ Mettre en pause" : "▶ Démarrer une session d'écoute"}
      </button>
      <p className="hint">
        Lance le chrono pendant que tu écoutes un des contenus ci-dessous, en dehors de
        l'appli.
      </p>

      <div className="resource-list">
        {resources
          .filter((r) => r.level === level)
          .map((r) => (
            <a
              key={r.id}
              className="resource-card"
              href={r.url}
              target="_blank"
              rel="noreferrer"
            >
              <strong>{r.title}</strong>
              <span className="resource-source">{r.source}</span>
              <p>{r.description}</p>
            </a>
          ))}
      </div>
    </div>
  );
}
