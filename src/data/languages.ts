import type { LanguageConfig } from "../types";
import { vocab as itVocab } from "./it/vocab";
import { phrases as itPhrases } from "./it/phrases";
import { listeningResources as itListening } from "./it/listening";
import { scenarios as itScenarios, CORRECTION_SYSTEM_PROMPT as itCorrection } from "./it/scenarios";

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
  },
};

export const DEFAULT_LANGUAGE = "it";
