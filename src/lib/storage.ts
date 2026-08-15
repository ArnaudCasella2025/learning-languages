import type {
  ConversationLog,
  JournalEntry,
  Level,
  ListeningLog,
  SRSDeckState,
} from "../types";

const KEYS = {
  vocabDeck: "ll_vocab_deck_v1",
  phraseDeck: "ll_phrase_deck_v1",
  listeningLog: "ll_listening_log_v1",
  conversationLog: "ll_conversation_log_v1",
  journal: "ll_journal_v1",
  apiKey: "ll_anthropic_api_key_v1",
  currentLevel: "ll_current_level_v1",
} as const;

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export const store = {
  getVocabDeck: () => read<SRSDeckState>(KEYS.vocabDeck, {}),
  setVocabDeck: (v: SRSDeckState) => write(KEYS.vocabDeck, v),

  getPhraseDeck: () => read<SRSDeckState>(KEYS.phraseDeck, {}),
  setPhraseDeck: (v: SRSDeckState) => write(KEYS.phraseDeck, v),

  getListeningLog: () => read<ListeningLog>(KEYS.listeningLog, { minutesByDay: {} }),
  setListeningLog: (v: ListeningLog) => write(KEYS.listeningLog, v),

  getConversationLog: () =>
    read<ConversationLog>(KEYS.conversationLog, { sessions: [] }),
  setConversationLog: (v: ConversationLog) => write(KEYS.conversationLog, v),

  getJournal: () => read<JournalEntry[]>(KEYS.journal, []),
  setJournal: (v: JournalEntry[]) => write(KEYS.journal, v),

  getApiKey: () => read<string>(KEYS.apiKey, ""),
  setApiKey: (v: string) => write(KEYS.apiKey, v),

  getCurrentLevel: () => read<Level>(KEYS.currentLevel, 1),
  setCurrentLevel: (v: Level) => write(KEYS.currentLevel, v),
};

export function todayKey(date: Date = new Date()): string {
  return date.toISOString().slice(0, 10);
}
