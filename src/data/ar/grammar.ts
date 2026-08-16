import type { GrammarNote, VerbConjugation } from "../../types";

/**
 * Simplification, comme pour l'italien (qui regroupe lui/lei) : la 2e
 * personne ne distingue pas ici le masculin (أنتَ) du féminin (أنتِ), pour
 * garder un tableau à 6 colonnes cohérent avec les autres langues de
 * l'appli. Les deux formes existent bien en arabe et sont introduites dans
 * le vocabulaire et les notes de grammaire.
 */
export const PRONOUN_LABELS: [string, string, string, string, string, string] = [
  "أنا (ana)",
  "أنتَ (anta)",
  "هو/هي (huwa/hiya)",
  "نحن (nahnu)",
  "أنتم (antum)",
  "هم (hum)",
];

export const TENSE_LABELS: [string, string] = ["Présent (المضارع)", "Passé (الماضي)"];

/**
 * L'arabe n'a pas d'infinitif ni de temps composé avec auxiliaire : chaque
 * verbe est cité à la 3e personne du masculin singulier du passé (forme du
 * dictionnaire), et le passé/présent sont chacun une forme conjuguée à part
 * entière, pas "auxiliaire + participe" comme le passato prossimo italien.
 */
export const conjugations: VerbConjugation[] = [
  {
    infinitive: "ذهب (dhahaba)",
    meaning: "aller",
    group: "regular",
    tense1: ["أذهب", "تذهب", "يذهب / تذهب", "نذهب", "تذهبون", "يذهبون"],
    tense2: ["ذهبتُ", "ذهبتَ", "ذهب / ذهبت", "ذهبنا", "ذهبتم", "ذهبوا"],
  },
  {
    infinitive: "كتب (kataba)",
    meaning: "écrire",
    group: "regular",
    tense1: ["أكتب", "تكتب", "يكتب / تكتب", "نكتب", "تكتبون", "يكتبون"],
    tense2: ["كتبتُ", "كتبتَ", "كتب / كتبت", "كتبنا", "كتبتم", "كتبوا"],
  },
  {
    infinitive: "شرب (shariba)",
    meaning: "boire",
    group: "regular",
    tense1: ["أشرب", "تشرب", "يشرب / تشرب", "نشرب", "تشربون", "يشربون"],
    tense2: ["شربتُ", "شربتَ", "شرب / شربت", "شربنا", "شربتم", "شربوا"],
  },
  {
    infinitive: "درس (darasa)",
    meaning: "étudier",
    group: "regular",
    tense1: ["أدرس", "تدرس", "يدرس / تدرس", "ندرس", "تدرسون", "يدرسون"],
    tense2: ["درستُ", "درستَ", "درس / درست", "درسنا", "درستم", "درسوا"],
  },
  {
    infinitive: "فهم (fahima)",
    meaning: "comprendre",
    group: "regular",
    tense1: ["أفهم", "تفهم", "يفهم / تفهم", "نفهم", "تفهمون", "يفهمون"],
    tense2: ["فهمتُ", "فهمتَ", "فهم / فهمت", "فهمنا", "فهمتم", "فهموا"],
  },
  {
    infinitive: "أكل (akala)",
    meaning: "manger",
    group: "irregular",
    tense1: ["آكل", "تأكل", "يأكل / تأكل", "نأكل", "تأكلون", "يأكلون"],
    tense2: ["أكلتُ", "أكلتَ", "أكل / أكلت", "أكلنا", "أكلتم", "أكلوا"],
  },
  {
    infinitive: "قال (qaala)",
    meaning: "dire",
    group: "irregular",
    tense1: ["أقول", "تقول", "يقول / تقول", "نقول", "تقولون", "يقولون"],
    tense2: ["قلتُ", "قلتَ", "قال / قالت", "قلنا", "قلتم", "قالوا"],
  },
  {
    infinitive: "جاء (jaa'a)",
    meaning: "venir",
    group: "irregular",
    tense1: ["أجيء", "تجيء", "يجيء / تجيء", "نجيء", "تجيئون", "يجيئون"],
    tense2: ["جئتُ", "جئتَ", "جاء / جاءت", "جئنا", "جئتم", "جاءوا"],
  },
  {
    infinitive: "رأى (ra'aa)",
    meaning: "voir",
    group: "irregular",
    tense1: ["أرى", "ترى", "يرى / ترى", "نرى", "ترون", "يرون"],
    tense2: ["رأيتُ", "رأيتَ", "رأى / رأت", "رأينا", "رأيتم", "رأوا"],
  },
  {
    infinitive: "كان (kaana)",
    meaning: "être (au passé)",
    group: "irregular",
    tense1: ["أكون", "تكون", "يكون / تكون", "نكون", "تكونون", "يكونون"],
    tense2: ["كنتُ", "كنتَ", "كان / كانت", "كنا", "كنتم", "كانوا"],
  },
];

export const grammarNotes: GrammarNote[] = [
  {
    id: "phrase-nominale",
    title: "La phrase sans verbe « être »",
    explanation:
      "Au présent, l'arabe n'utilise pas de verbe « être » : « je suis fatigué » se dit littéralement « moi fatigué ». Le pronom (ou le sujet) est directement suivi de l'attribut. Ce n'est qu'au passé ou au futur qu'un verbe apparaît (كان kaana pour « était »).",
    examples: [
      { it: "أنا سعيد.", translit: "Anaa sa'iid.", fr: "Je suis heureux. (litt. « moi heureux »)" },
      { it: "هي طبيبة.", translit: "Hiya tabiiba.", fr: "Elle est médecin." },
    ],
  },
  {
    id: "avoir",
    title: "Exprimer « avoir »",
    explanation:
      "Il n'existe pas de verbe « avoir » non plus : on utilise la préposition عند ('inda, « chez ») ou لـ (li-, « à ») suivie d'un pronom attaché. عندي (indii) = « chez moi » = « j'ai ». Le pronom se colle à la fin du mot : عندي (j'ai), عندك (tu as), عنده (il a), عندها (elle a), عندنا (nous avons), عندكم (vous avez), عندهم (ils ont).",
    examples: [
      { it: "عندي سؤال.", translit: "'Indii su'aal.", fr: "J'ai une question." },
      { it: "هل عندك وقت؟", translit: "Hal 'indaka waqt?", fr: "As-tu du temps ?" },
    ],
  },
  {
    id: "racines",
    title: "Racines et schèmes",
    explanation:
      "La plupart des mots arabes se construisent à partir d'une racine de 3 consonnes qui porte le sens général, coulée dans un « schème » (motif de voyelles/préfixes) qui précise la fonction grammaticale. La racine ك-ت-ب (k-t-b, « écrire ») donne par exemple كَتَبَ (il a écrit), كِتاب (livre), مَكْتَب (bureau), كاتِب (écrivain). Repérer la racine aide à deviner le sens de mots nouveaux.",
    examples: [
      { it: "كَتَبَ، كِتاب، مَكْتَب، كاتِب", translit: "kataba, kitaab, maktab, kaatib", fr: "il a écrit, livre, bureau, écrivain (même racine k-t-b)" },
    ],
  },
  {
    id: "genre",
    title: "Le genre des noms",
    explanation:
      "La plupart des noms féminins se reconnaissent à la terminaison ة (ta marbuta), prononcée « a » en fin de phrase : طالب (étudiant) / طالبة (étudiante). Les adjectifs s'accordent de la même façon : كبير (grand, masc.) / كبيرة (grande, fém.).",
    examples: [
      { it: "طالب مجتهد، طالبة مجتهدة", translit: "taalib mujtahid, taaliba mujtahida", fr: "un étudiant sérieux, une étudiante sérieuse" },
    ],
  },
  {
    id: "article-idafa",
    title: "L'article défini et l'annexion (الإضافة)",
    explanation:
      "L'article défini ال (al-) est invariable et se colle au nom : الكتاب (le livre). Pour dire « le livre de Marie » ou « la maison du professeur », l'arabe n'utilise pas de mot pour « de » : les deux noms se suivent directement (le second porte l'article, pas le premier) — c'est l'annexion (إضافة).",
    examples: [
      { it: "كتاب الطالب", translit: "kitaab at-taalib", fr: "le livre de l'étudiant (litt. « livre l'-étudiant »)" },
      { it: "باب البيت", translit: "baab al-bayt", fr: "la porte de la maison" },
    ],
  },
  {
    id: "lettres-solaires-lunaires",
    title: "Lettres solaires et lunaires",
    explanation:
      "Le ل de l'article ال (al-) s'assimile à la consonne qui suit si celle-ci est une « lettre solaire » (t, th, d, dh, r, z, s, sh, s emphatique, d emphatique, t emphatique, dh emphatique, l, n) : on ne le prononce pas, et la consonne suivante est doublée à l'oral. Devant une « lettre lunaire » (les autres), le ل se prononce normalement.",
    examples: [
      { it: "الشمس", translit: "ash-shams (pas al-shams)", fr: "le soleil (lettre solaire ش)" },
      { it: "القمر", translit: "al-qamar", fr: "la lune (lettre lunaire ق)" },
    ],
  },
  {
    id: "pluriel",
    title: "Le pluriel",
    explanation:
      "Beaucoup de noms ont un pluriel « brisé » : le mot change de forme interne (comme singulier/pluriel irréguliers en français, mais beaucoup plus fréquent), ex. كتاب (livre) → كتب (livres). D'autres suivent un pluriel régulier en ون/ين (masculin) ou ات (féminin). Le pluriel brisé s'apprend au cas par cas, avec chaque mot.",
    examples: [
      { it: "كتاب، كتب", translit: "kitaab, kutub", fr: "livre, livres (pluriel brisé)" },
      { it: "معلم، معلمون", translit: "mu'allim, mu'allimuun", fr: "enseignant, enseignants (pluriel régulier)" },
    ],
  },
  {
    id: "questions",
    title: "Poser une question",
    explanation:
      "Une question fermée (oui/non) se forme en ajoutant هل (hal) en tête de phrase, sans changer l'ordre des mots. Avec un mot interrogatif (من، ماذا، متى، أين، لماذا، كيف، كم), celui-ci se place en tête de phrase, comme en français.",
    examples: [
      { it: "هل تتكلم العربية؟", translit: "Hal tatakallamu al-'arabiyya?", fr: "Parles-tu arabe ?" },
      { it: "أين تسكن؟", translit: "Ayna taskun?", fr: "Où habites-tu ?" },
    ],
  },
];
