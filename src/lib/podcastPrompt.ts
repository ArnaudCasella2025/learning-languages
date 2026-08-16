import type { Level } from "../types";

const LEVEL_DESC: Record<Level, string> = {
  1: "grand débutant (A1) : phrases très courtes et simples, présent uniquement",
  2: "intermédiaire (A2-B1) : phrases variées, passé et futur proche autorisés",
  3: "avancé natif (B2-C1) : langue naturelle et idiomatique, sans simplification",
};

const TARGET_WORDS = 2500;

export interface PodcastRegister {
  id: string;
  label: string;
  instruction: string;
}

export const REGISTERS: PodcastRegister[] = [
  { id: "neutre", label: "Neutre", instruction: "" },
  {
    id: "actualite",
    label: "Actualité",
    instruction: "Style journalistique, ton informatif, comme une chronique d'actualité.",
  },
  {
    id: "culture",
    label: "Culture",
    instruction: "Ton culturel/documentaire : art, histoire ou société.",
  },
  {
    id: "informel",
    label: "Conversation informelle",
    instruction: "Registre familier, entre amis, expressions courantes.",
  },
  {
    id: "technique",
    label: "Technique / professionnel",
    instruction: "Registre professionnel et soutenu, vocabulaire technique lié au sujet.",
  },
  {
    id: "litteraire",
    label: "Littéraire",
    instruction: "Style narratif et littéraire, riche en descriptions.",
  },
];

export function themePodcastPrompt(
  languageLabel: string,
  level: Level,
  theme: string,
  registerId = "neutre",
): { system: string; user: string } {
  const register = REGISTERS.find((r) => r.id === registerId) ?? REGISTERS[0];
  const system = `Tu es un rédacteur de contenu pédagogique pour l'apprentissage du ${languageLabel}, spécialisé dans les podcasts pour apprenants francophones. Tu réponds UNIQUEMENT avec le script du podcast, en ${languageLabel}, sans aucun commentaire, titre ou traduction.`;
  const user = `Écris le script d'un podcast en ${languageLabel} d'environ ${TARGET_WORDS} mots sur le thème suivant : "${theme}".

Contraintes :
- Niveau visé : ${LEVEL_DESC[level]}.
${register.instruction ? `- Registre : ${register.instruction}` : "- Ton naturel et vivant, comme un vrai podcast (monologue ou dialogue court entre deux personnes, à ton choix)."}
- Structure claire : introduction du sujet, développement, conclusion.
- Réponds uniquement avec le texte du script, en ${languageLabel}, sans titre ni note.`;
  return { system, user };
}
