import type { Level } from "../types";

const LEVEL_DESC: Record<Level, string> = {
  1: "grand débutant (A1) : phrases très courtes et simples, présent uniquement",
  2: "intermédiaire (A2-B1) : phrases variées, passé et futur proche autorisés",
  3: "avancé natif (B2-C1) : langue naturelle et idiomatique, sans simplification",
};

const TARGET_WORDS = 2500;

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
