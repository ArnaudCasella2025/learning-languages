import type {
  ConversationLog,
  GeneratedPodcast,
  JournalEntry,
  Level,
  ListeningLog,
  SRSDeckState,
} from "../types";
import { DEFAULT_LANGUAGE } from "../data/languages";

const KEYS = {
  vocabDeck: "ll_vocab_deck_v1",
  phraseDeck: "ll_phrase_deck_v1",
  listeningLog: "ll_listening_log_v1",
  conversationLog: "ll_conversation_log_v1",
  journal: "ll_journal_v1",
  apiKey: "ll_anthropic_api_key_v1",
  currentLevel: "ll_current_level_v1",
  language: "ll_language_v1",
  podcasts: "ll_podcasts_v1",
  syncCode: "ll_sync_code_v1",
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

  getLanguage: () => read<string>(KEYS.language, DEFAULT_LANGUAGE),
  setLanguage: (v: string) => write(KEYS.language, v),

  getPodcasts: () => read<GeneratedPodcast[]>(KEYS.podcasts, []),
  setPodcasts: (v: GeneratedPodcast[]) => write(KEYS.podcasts, v),

  /**
   * Code de synchronisation multi-appareils. Reste strictement local
   * (jamais envoyé où que ce soit) : c'est l'identifiant du document
   * Firestore, pas une donnée synchronisée elle-même.
   */
  getSyncCode: () => read<string>(KEYS.syncCode, ""),
  setSyncCode: (v: string) => write(KEYS.syncCode, v),
};

export function todayKey(date: Date = new Date()): string {
  return date.toISOString().slice(0, 10);
}
