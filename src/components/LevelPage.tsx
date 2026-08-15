import type { Level, ModuleId } from "../types";
import { ModuleCard } from "./ModuleCard";

interface CardDef {
  id: ModuleId;
  icon: string;
  title: string;
  description: string;
}

const CARDS_BY_LEVEL: Record<Level, CardDef[]> = {
  1: [
    { id: "vocab", icon: "📚", title: "1000 mots fréquents", description: "Flashcards à répétition espacée" },
    { id: "phrases", icon: "💬", title: "Phrases de base", description: "Expressions du quotidien" },
    { id: "pronunciation", icon: "🗣️", title: "Prononciation", description: "Écoute et répète" },
    { id: "listening", icon: "🎧", title: "Écoute quotidienne", description: "30 min/jour, podcasts débutants" },
  ],
  2: [
    { id: "vocab", icon: "📚", title: "Vocabulaire", description: "La suite du deck de mots" },
    { id: "phrases", icon: "💬", title: "Phrases", description: "Expressions de conversation" },
    { id: "conversation", icon: "🤖", title: "Parler avec l'IA", description: "3 fois par semaine" },
    { id: "listening", icon: "🎧", title: "Écoute", description: "Contenus niveau intermédiaire" },
    { id: "journal", icon: "📓", title: "Journal quotidien", description: "5 phrases corrigées par l'IA" },
  ],
  3: [
    { id: "listening", icon: "🎧", title: "Contenus natifs", description: "Podcasts et médias italiens authentiques" },
    { id: "conversation", icon: "🤖", title: "Conversations longues", description: "Sujets techniques, à vitesse native" },
    { id: "journal", icon: "✍️", title: "Correction systématique", description: "Corrige tout ce que tu écris" },
  ],
};

const LEVEL_TITLES: Record<Level, { title: string; subtitle: string }> = {
  1: { title: "Niveau 1 — Survie", subtitle: "Les bases pour se débrouiller" },
  2: { title: "Niveau 2 — Conversation", subtitle: "Échanger et progresser au quotidien" },
  3: { title: "Niveau 3 — Immersion", subtitle: "Contenus natifs et correction fine" },
};

interface Props {
  level: Level;
  onSelectModule: (module: ModuleId) => void;
}

export function LevelPage({ level, onSelectModule }: Props) {
  const { title, subtitle } = LEVEL_TITLES[level];
  return (
    <div className="module-screen">
      <h2>{title}</h2>
      <p className="module-sub">{subtitle}</p>
      <div className="module-grid">
        {CARDS_BY_LEVEL[level].map((card) => (
          <ModuleCard
            key={card.id}
            icon={card.icon}
            title={card.title}
            description={card.description}
            onClick={() => onSelectModule(card.id)}
          />
        ))}
      </div>
    </div>
  );
}
