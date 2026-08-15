import type { ListeningResource } from "../../types";

export const listeningResources: ListeningResource[] = [
  // Niveau 1 — survie : podcasts pour débutants, débit ralenti
  {
    id: "nisi-beginner",
    title: "News in Slow Italian — Beginner",
    description:
      "Actualité et culture italienne racontées lentement, avec vocabulaire expliqué.",
    level: 1,
    url: "https://www.newsinslowitalian.com/home/news/beginner",
    source: "newsinslowitalian.com",
  },
  {
    id: "coffee-break-italian",
    title: "Coffee Break Italian",
    description:
      "Cours audio progressif de 15-20 min, pensé pour de vrais débutants.",
    level: 1,
    url: "https://coffeebreaklanguages.com/coffeebreakitalian/",
    source: "coffeebreaklanguages.com",
  },
  {
    id: "podcast-italiano-principiante",
    title: "Podcast Italiano — Principiante",
    description: "La version pour grands débutants de Podcast Italiano.",
    level: 1,
    url: "https://podcasts.apple.com/us/podcast/podcast-italiano-principiante/id1756726796",
    source: "Apple Podcasts",
  },

  // Niveau 2 — conversation : contenu intermédiaire
  {
    id: "nisi-intermediate",
    title: "News in Slow Italian — Intermediate",
    description:
      "Même format que la version débutant, à un rythme plus naturel.",
    level: 2,
    url: "https://www.newsinslowitalian.com/home/news/intermediate",
    source: "newsinslowitalian.com",
  },
  {
    id: "podcast-italiano",
    title: "Podcast Italiano",
    description:
      "Épisodes avec transcription sur la langue et la culture italiennes, niveau intermédiaire/avancé.",
    level: 2,
    url: "https://www.podcastitaliano.com/en",
    source: "podcastitaliano.com",
  },

  // Niveau 3 — immersion : contenu natif, vitesse normale
  {
    id: "nisi-advanced",
    title: "News in Slow Italian — Advanced",
    description: "Débit natif, sujets d'actualité approfondis.",
    level: 3,
    url: "https://www.newsinslowitalian.com/home/news/advanced",
    source: "newsinslowitalian.com",
  },
  {
    id: "tintoria",
    title: "Tintoria",
    description:
      "Talk-show comique entre amis, langage familier et rythme 100% natif.",
    level: 3,
    url: "https://show.thecomedyclub.it/pages/tintoriapodcast",
    source: "The Comedy Club",
  },
  {
    id: "il-post",
    title: "Il Post — Podcasts",
    description:
      "Catalogue de podcasts d'actualité d'un grand média italien, pour de l'écoute 100% native.",
    level: 3,
    url: "https://www.ilpost.it/podcasts/",
    source: "ilpost.it",
  },
];
