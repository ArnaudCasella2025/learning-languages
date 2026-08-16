import type { LanguageConfig } from "../types";
import { vocab as itVocab } from "./it/vocab";
import { phrases as itPhrases } from "./it/phrases";
import { listeningResources as itListening } from "./it/listening";
import { scenarios as itScenarios, CORRECTION_SYSTEM_PROMPT as itCorrection } from "./it/scenarios";
import { milestonePodcasts as itMilestonePodcasts } from "./it/podcasts";
import {
  conjugations as itConjugations,
  grammarNotes as itGrammarNotes,
  PRONOUN_LABELS as itPronounLabels,
  TENSE_LABELS as itTenseLabels,
} from "./it/grammar";
import { vocab as arVocab } from "./ar/vocab";
import { phrases as arPhrases } from "./ar/phrases";
import { listeningResources as arListening } from "./ar/listening";
import { scenarios as arScenarios, CORRECTION_SYSTEM_PROMPT as arCorrection } from "./ar/scenarios";
import { milestonePodcasts as arMilestonePodcasts } from "./ar/podcasts";
import {
  conjugations as arConjugations,
  grammarNotes as arGrammarNotes,
  PRONOUN_LABELS as arPronounLabels,
  TENSE_LABELS as arTenseLabels,
} from "./ar/grammar";

/**
 * Registre des langues disponibles dans l'appli. Pour ajouter une langue :
 * créer un dossier src/data/<code>/ avec vocab.ts, phrases.ts, listening.ts
 * et scenarios.ts (même forme que src/data/it/), puis ajouter une entrée
 * ici.
 */
export const LANGUAGES: Record<string, LanguageConfig> = {
  it: {
    code: "it",
    label: "Italien",
    flag: "🇮🇹",
    ttsLocale: "it-IT",
    vocab: itVocab,
    phrases: itPhrases,
    listeningResources: itListening,
    scenarios: itScenarios,
    correctionSystemPrompt: itCorrection,
    milestonePodcasts: itMilestonePodcasts,
    pronounLabels: itPronounLabels,
    conjugations: itConjugations,
    tenseLabels: itTenseLabels,
    grammarNotes: itGrammarNotes,
  },
  ar: {
    code: "ar",
    label: "Arabe",
    flag: "🇸🇦",
    ttsLocale: "ar-SA",
    rtl: true,
    vocab: arVocab,
    phrases: arPhrases,
    listeningResources: arListening,
    scenarios: arScenarios,
    correctionSystemPrompt: arCorrection,
    milestonePodcasts: arMilestonePodcasts,
    pronounLabels: arPronounLabels,
    conjugations: arConjugations,
    tenseLabels: arTenseLabels,
    grammarNotes: arGrammarNotes,
  },
};

export const DEFAULT_LANGUAGE = "it";
