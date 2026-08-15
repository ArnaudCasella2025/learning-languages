import type { Level, VocabItem } from "../types";

const LEVEL_DESC: Record<Level, string> = {
  1: "grand débutant (A1) : phrases très courtes et simples, présent uniquement",
  2: "intermédiaire (A2-B1) : phrases variées, passé et futur proche autorisés",
  3: "avancé natif (B2-C1) : langue naturelle et idiomatique, sans simplification",
};

const TARGET_WORDS = 2500;

export const MILESTONES = [50, 100, 150, 200, 250, 500, 1000] as const;

export function availableMilestones(totalVocab: number): number[] {
  return MILESTONES.filter((m) => m <= totalVocab);
}

export function milestoneVocabPrompt(
  languageLabel: string,
  level: Level,
  words: VocabItem[],
  milestone: number,
): { system: string; user: string } {
  const wordList = words.map((w) => w.it).join(", ");
  const system = `Tu es un rédacteur de contenu pédagogique pour l'apprentissage du ${languageLabel}, spécialisé dans les podcasts pour apprenants francophones. Tu réponds UNIQUEMENT avec le script du podcast, en ${languageLabel}, sans aucun commentaire, titre ou traduction.`;
  const user = `Écris le script d'un podcast en ${languageLabel} d'environ ${TARGET_WORDS} mots, destiné à un apprenant francophone qui connaît les ${milestone} mots de ${languageLabel} les plus fréquents suivants :

${wordList}

Contraintes :
- Utilise QUASI EXCLUSIVEMENT ces mots (tu peux ajouter quelques mots grammaticaux indispensables comme des articles ou des prépositions même absents de la liste, mais évite tout autre vocabulaire nouveau).
- Niveau : ${LEVEL_DESC[level]}.
- Structure naturelle de podcast : courte introduction, 2 à 3 sujets simples de la vie quotidienne, conclusion.
- Phrases courtes, rythme clair, répétitions bienvenues pour ancrer le vocabulaire.
- Réponds uniquement avec le texte du script, en ${languageLabel}, sans titre ni note.`;
  return { system, user };
}

export function themePodcastPrompt(
  languageLabel: string,
  level: Level,
  theme: string,
): { system: string; user: string } {
  const system = `Tu es un rédacteur de contenu pédagogique pour l'apprentissage du ${languageLabel}, spécialisé dans les podcasts pour apprenants francophones. Tu réponds UNIQUEMENT avec le script du podcast, en ${languageLabel}, sans aucun commentaire, titre ou traduction.`;
  const user = `Écris le script d'un podcast en ${languageLabel} d'environ ${TARGET_WORDS} mots sur le thème suivant : "${theme}".

Contraintes :
- Niveau visé : ${LEVEL_DESC[level]}.
- Ton naturel et vivant, comme un vrai podcast (monologue ou dialogue court entre deux personnes, à ton choix).
- Structure claire : introduction du sujet, développement, conclusion.
- Réponds uniquement avec le texte du script, en ${languageLabel}, sans titre ni note.`;
  return { system, user };
}
