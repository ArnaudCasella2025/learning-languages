export type Level = 1 | 2 | 3;

export type ModuleId =
  | "vocab"
  | "phrases"
  | "pronunciation"
  | "listening"
  | "aiPodcasts"
  | "conversation"
  | "journal";

export interface VocabItem {
  id: string;
  it: string;
  fr: string;
  category: string;
  /** 1 = coeur des 1000 mots (niveau survie), 2 = vocabulaire de continuation */
  tier: 1 | 2;
}

export interface PhraseItem {
  id: string;
  it: string;
  fr: string;
  /** 1 = phrases de survie, 2 = phrases de conversation */
  tier: 1 | 2;
  tags: string[];
}

/** Carte générique pour le moteur de répétition espacée (SM-2). */
export interface SRSCard {
  id: string;
  /** facteur de facilité, >= 1.3 */
  easiness: number;
  /** intervalle courant en jours */
  interval: number;
  repetitions: number;
  /** date ISO à laquelle la carte redevient due */
  dueDate: string;
  lastGrade?: number;
}

export type SRSDeckState = Record<string, SRSCard>;

export interface ListeningResource {
  id: string;
  title: string;
  description: string;
  level: Level;
  url: string;
  source: string;
}

export interface ConversationScenario {
  id: string;
  level: Level;
  title: string;
  description: string;
  systemPrompt: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  text: string;
  correction: string | null;
  createdAt: string;
}

export interface ListeningLog {
  /** clé YYYY-MM-DD -> minutes écoutées ce jour */
  minutesByDay: Record<string, number>;
}

export interface ConversationLog {
  /** horodatages ISO de chaque session de conversation terminée */
  sessions: string[];
}

export interface LanguageConfig {
  code: string;
  label: string;
  flag: string;
  /** locale BCP 47 pour la synthèse vocale et la reconnaissance vocale, ex. "it-IT" */
  ttsLocale: string;
  vocab: VocabItem[];
  phrases: PhraseItem[];
  listeningResources: ListeningResource[];
  scenarios: ConversationScenario[];
  correctionSystemPrompt: string;
  milestonePodcasts: Omit<GeneratedPodcast, "id" | "createdAt">[];
}

export interface GeneratedPodcast {
  id: string;
  title: string;
  level: Level;
  kind: "milestone" | "theme";
  milestone?: number;
  theme?: string;
  script: string;
  createdAt: string;
}

/**
 * Sous-ensemble de la progression qui peut être synchronisé entre
 * appareils (voir lib/sync.ts). La clé API reste volontairement en
 * dehors : elle ne doit jamais transiter par Firestore.
 */
export interface SyncableProgress {
  vocabDeck: SRSDeckState;
  phraseDeck: SRSDeckState;
  listeningLog: ListeningLog;
  conversationLog: ConversationLog;
  journal: JournalEntry[];
  podcasts: GeneratedPodcast[];
  currentLevel: Level;
  language: string;
}

