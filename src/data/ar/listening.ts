import type { ListeningResource } from "../../types";

export const listeningResources: ListeningResource[] = [
  // Niveau 1 — survie : contenu pour débutants, débit ralenti
  {
    id: "arabicpod101-absolute-beginner",
    title: "ArabicPod101 — Absolute Beginner",
    description:
      "Dialogues audio courts en arabe standard moderne, pensés pour de vrais débutants, avec notes de leçon.",
    level: 1,
    url: "https://www.arabicpod101.com/lesson-library/absolute-beginner",
    source: "arabicpod101.com",
  },
  {
    id: "news-in-slow-arabic",
    title: "News in Slow Arabic — Aladin's Linguistics",
    description:
      "Actualité racontée lentement, en arabe standard moderne mélangé au levantin, pour l'entraînement à l'écoute.",
    level: 1,
    url: "https://podcasts.apple.com/us/podcast/news-in-slow-arabic-aladins-linguistics/id1543548118",
    source: "Apple Podcasts",
  },

  // Niveau 2 — conversation : contenu intermédiaire
  {
    id: "arabicpod101-beginner",
    title: "ArabicPod101 — Beginner",
    description: "Dialogues un peu plus longs, rythme plus naturel, toujours en arabe standard moderne.",
    level: 2,
    url: "https://www.arabicpod101.com/lesson-library/beginner",
    source: "arabicpod101.com",
  },
  {
    id: "learn-arabic-msa-course",
    title: "Learn Arabic (MSA) — Course for Beginners",
    description: "Podcast qui enseigne l'arabe standard moderne en contexte, phrase par phrase.",
    level: 2,
    url: "https://open.spotify.com/show/5vvl3MhZm8N1DsG8QWwhhW",
    source: "Spotify",
  },

  // Niveau 3 — immersion : contenu natif, vitesse normale
  {
    id: "arabicpod101-advanced",
    title: "ArabicPod101 — Advanced",
    description: "Dialogues et sujets avancés en arabe standard moderne, débit proche du natif.",
    level: 3,
    url: "https://www.arabicpod101.com/lesson-library/advanced",
    source: "arabicpod101.com",
  },
  {
    id: "al-jazeera-podcasts",
    title: "Al Jazeera Podcasts (الجزيرة بودكاست)",
    description:
      "Catalogue de podcasts d'actualité et de débat d'un grand média arabophone, pour de l'écoute 100% native.",
    level: 3,
    url: "https://podcasts.apple.com/us/artist/al-jazeera-podcasts-%D8%A7%D9%84%D8%AC%D8%B2%D9%8A%D8%B1%D8%A9-%D8%A8%D9%88%D8%AF%D9%83%D8%A7%D8%B3%D8%AA/1458126450",
    source: "Apple Podcasts",
  },
];
