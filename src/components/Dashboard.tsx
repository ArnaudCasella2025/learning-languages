import type {
  ConversationLog,
  JournalEntry,
  Level,
  ListeningLog,
  SRSDeckState,
  VocabItem,
  PhraseItem,
} from "../types";
import { todayKey } from "../lib/storage";

interface Props {
  currentLevel: Level;
  onLevelChange: (level: Level) => void;
  vocab: VocabItem[];
  phrases: PhraseItem[];
  vocabDeck: SRSDeckState;
  phraseDeck: SRSDeckState;
  listeningLog: ListeningLog;
  conversationLog: ConversationLog;
  journal: JournalEntry[];
}

function knownCount(items: { id: string }[], deck: SRSDeckState): number {
  return items.filter((i) => deck[i.id]?.repetitions > 0).length;
}

export function Dashboard({
  currentLevel,
  onLevelChange,
  vocab,
  phrases,
  vocabDeck,
  phraseDeck,
  listeningLog,
  conversationLog,
  journal,
}: Props) {
  const wordsKnown = knownCount(vocab, vocabDeck);
  const phrasesKnown = knownCount(phrases, phraseDeck);
  const minutesToday = Math.round(listeningLog.minutesByDay[todayKey()] ?? 0);
  const weekConversations = conversationLog.sessions.filter(
    (s) => Date.now() - new Date(s).getTime() < 7 * 24 * 60 * 60 * 1000,
  ).length;

  return (
    <div className="module-screen">
      <h2>Tableau de bord</h2>

      <div className="level-picker">
        {([1, 2, 3] as Level[]).map((lvl) => (
          <button
            key={lvl}
            className={lvl === currentLevel ? "level-pill active" : "level-pill"}
            onClick={() => onLevelChange(lvl)}
          >
            {lvl === 1 && "Niveau 1 — Survie"}
            {lvl === 2 && "Niveau 2 — Conversation"}
            {lvl === 3 && "Niveau 3 — Immersion"}
          </button>
        ))}
      </div>

      <div className="stats-grid">
        <div className="stat-tile">
          <div className="stat-value">
            {wordsKnown}/{vocab.length}
          </div>
          <div className="stat-label">mots vus</div>
        </div>
        <div className="stat-tile">
          <div className="stat-value">
            {phrasesKnown}/{phrases.length}
          </div>
          <div className="stat-label">phrases vues</div>
        </div>
        <div className="stat-tile">
          <div className="stat-value">{minutesToday} min</div>
          <div className="stat-label">écoute aujourd'hui</div>
        </div>
        <div className="stat-tile">
          <div className="stat-value">{weekConversations}/3</div>
          <div className="stat-label">conversations cette semaine</div>
        </div>
        <div className="stat-tile">
          <div className="stat-value">{journal.length}</div>
          <div className="stat-label">entrées de journal</div>
        </div>
      </div>
    </div>
  );
}
