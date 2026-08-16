import type { GrammarNote, VerbConjugation } from "../../types";

export const PRONOUN_LABELS: [string, string, string, string, string, string] = [
  "io",
  "tu",
  "lui/lei",
  "noi",
  "voi",
  "loro",
];

export const TENSE_LABELS: [string, string] = ["Présent", "Passé composé"];

export const conjugations: VerbConjugation[] = [
  // Modèles réguliers
  {
    infinitive: "parlare",
    meaning: "parler (modèle -ARE)",
    group: "are",
    auxiliary: "avere",
    tense1: ["parlo", "parli", "parla", "parliamo", "parlate", "parlano"],
    tense2: [
      "ho parlato",
      "hai parlato",
      "ha parlato",
      "abbiamo parlato",
      "avete parlato",
      "hanno parlato",
    ],
  },
  {
    infinitive: "vendere",
    meaning: "vendre (modèle -ERE)",
    group: "ere",
    auxiliary: "avere",
    tense1: ["vendo", "vendi", "vende", "vendiamo", "vendete", "vendono"],
    tense2: [
      "ho venduto",
      "hai venduto",
      "ha venduto",
      "abbiamo venduto",
      "avete venduto",
      "hanno venduto",
    ],
  },
  {
    infinitive: "dormire",
    meaning: "dormir (modèle -IRE)",
    group: "ire",
    auxiliary: "avere",
    tense1: ["dormo", "dormi", "dorme", "dormiamo", "dormite", "dormono"],
    tense2: [
      "ho dormito",
      "hai dormito",
      "ha dormito",
      "abbiamo dormito",
      "avete dormito",
      "hanno dormito",
    ],
  },
  {
    infinitive: "capire",
    meaning: "comprendre (modèle -IRE avec -isc-)",
    group: "ire-isc",
    auxiliary: "avere",
    tense1: ["capisco", "capisci", "capisce", "capiamo", "capite", "capiscono"],
    tense2: [
      "ho capito",
      "hai capito",
      "ha capito",
      "abbiamo capito",
      "avete capito",
      "hanno capito",
    ],
  },

  // Verbes irréguliers essentiels
  {
    infinitive: "essere",
    meaning: "être",
    group: "irregular",
    auxiliary: "essere",
    tense1: ["sono", "sei", "è", "siamo", "siete", "sono"],
    tense2: [
      "sono stato/a",
      "sei stato/a",
      "è stato/a",
      "siamo stati/e",
      "siete stati/e",
      "sono stati/e",
    ],
  },
  {
    infinitive: "avere",
    meaning: "avoir",
    group: "irregular",
    auxiliary: "avere",
    tense1: ["ho", "hai", "ha", "abbiamo", "avete", "hanno"],
    tense2: [
      "ho avuto",
      "hai avuto",
      "ha avuto",
      "abbiamo avuto",
      "avete avuto",
      "hanno avuto",
    ],
  },
  {
    infinitive: "andare",
    meaning: "aller",
    group: "irregular",
    auxiliary: "essere",
    tense1: ["vado", "vai", "va", "andiamo", "andate", "vanno"],
    tense2: [
      "sono andato/a",
      "sei andato/a",
      "è andato/a",
      "siamo andati/e",
      "siete andati/e",
      "sono andati/e",
    ],
  },
  {
    infinitive: "fare",
    meaning: "faire",
    group: "irregular",
    auxiliary: "avere",
    tense1: ["faccio", "fai", "fa", "facciamo", "fate", "fanno"],
    tense2: [
      "ho fatto",
      "hai fatto",
      "ha fatto",
      "abbiamo fatto",
      "avete fatto",
      "hanno fatto",
    ],
  },
  {
    infinitive: "dire",
    meaning: "dire",
    group: "irregular",
    auxiliary: "avere",
    tense1: ["dico", "dici", "dice", "diciamo", "dite", "dicono"],
    tense2: [
      "ho detto",
      "hai detto",
      "ha detto",
      "abbiamo detto",
      "avete detto",
      "hanno detto",
    ],
  },
  {
    infinitive: "potere",
    meaning: "pouvoir",
    group: "irregular",
    auxiliary: "avere",
    tense1: ["posso", "puoi", "può", "possiamo", "potete", "possono"],
    tense2: [
      "ho potuto",
      "hai potuto",
      "ha potuto",
      "abbiamo potuto",
      "avete potuto",
      "hanno potuto",
    ],
  },
  {
    infinitive: "volere",
    meaning: "vouloir",
    group: "irregular",
    auxiliary: "avere",
    tense1: ["voglio", "vuoi", "vuole", "vogliamo", "volete", "vogliono"],
    tense2: [
      "ho voluto",
      "hai voluto",
      "ha voluto",
      "abbiamo voluto",
      "avete voluto",
      "hanno voluto",
    ],
  },
  {
    infinitive: "dovere",
    meaning: "devoir",
    group: "irregular",
    auxiliary: "avere",
    tense1: ["devo", "devi", "deve", "dobbiamo", "dovete", "devono"],
    tense2: [
      "ho dovuto",
      "hai dovuto",
      "ha dovuto",
      "abbiamo dovuto",
      "avete dovuto",
      "hanno dovuto",
    ],
  },
  {
    infinitive: "sapere",
    meaning: "savoir",
    group: "irregular",
    auxiliary: "avere",
    tense1: ["so", "sai", "sa", "sappiamo", "sapete", "sanno"],
    tense2: [
      "ho saputo",
      "hai saputo",
      "ha saputo",
      "abbiamo saputo",
      "avete saputo",
      "hanno saputo",
    ],
  },
  {
    infinitive: "stare",
    meaning: "être / rester",
    group: "irregular",
    auxiliary: "essere",
    tense1: ["sto", "stai", "sta", "stiamo", "state", "stanno"],
    tense2: [
      "sono stato/a",
      "sei stato/a",
      "è stato/a",
      "siamo stati/e",
      "siete stati/e",
      "sono stati/e",
    ],
  },
  {
    infinitive: "venire",
    meaning: "venir",
    group: "irregular",
    auxiliary: "essere",
    tense1: ["vengo", "vieni", "viene", "veniamo", "venite", "vengono"],
    tense2: [
      "sono venuto/a",
      "sei venuto/a",
      "è venuto/a",
      "siamo venuti/e",
      "siete venuti/e",
      "sono venuti/e",
    ],
  },
  {
    infinitive: "dare",
    meaning: "donner",
    group: "irregular",
    auxiliary: "avere",
    tense1: ["do", "dai", "dà", "diamo", "date", "danno"],
    tense2: [
      "ho dato",
      "hai dato",
      "ha dato",
      "abbiamo dato",
      "avete dato",
      "hanno dato",
    ],
  },
  {
    infinitive: "uscire",
    meaning: "sortir",
    group: "irregular",
    auxiliary: "essere",
    tense1: ["esco", "esci", "esce", "usciamo", "uscite", "escono"],
    tense2: [
      "sono uscito/a",
      "sei uscito/a",
      "è uscito/a",
      "siamo usciti/e",
      "siete usciti/e",
      "sono usciti/e",
    ],
  },
  {
    infinitive: "bere",
    meaning: "boire",
    group: "irregular",
    auxiliary: "avere",
    tense1: ["bevo", "bevi", "beve", "beviamo", "bevete", "bevono"],
    tense2: [
      "ho bevuto",
      "hai bevuto",
      "ha bevuto",
      "abbiamo bevuto",
      "avete bevuto",
      "hanno bevuto",
    ],
  },
];

export const grammarNotes: GrammarNote[] = [
  {
    id: "presente",
    title: "Le présent de l'indicatif",
    explanation:
      "Les verbes réguliers se répartissent en 3 groupes selon leur infinitif : -ARE (parlare), -ERE (vendere) et -IRE (dormire). Un sous-groupe de verbes en -IRE insère -isc- entre le radical et la terminaison aux personnes io/tu/lui-lei/loro (capire → capisco). Il n'y a pas de règle pour savoir lesquels : ça s'apprend verbe par verbe.",
    examples: [
      { it: "Io parlo italiano.", fr: "Je parle italien." },
      { it: "Noi capiamo, ma loro non capiscono.", fr: "Nous comprenons, mais eux ne comprennent pas." },
    ],
  },
  {
    id: "passato-prossimo",
    title: "Le passé composé (passato prossimo)",
    explanation:
      "Se forme avec l'auxiliaire ESSERE ou AVERE au présent + le participe passé. AVERE pour la plupart des verbes transitifs (mangiare → ho mangiato). ESSERE surtout pour les verbes de mouvement/changement d'état (andare, venire, partire, arrivare, uscire, stare...) et les verbes réfléchis — avec ESSERE, le participe s'accorde en genre/nombre avec le sujet (andato/andata/andati/andate).",
    examples: [
      { it: "Ho mangiato una pizza.", fr: "J'ai mangé une pizza." },
      { it: "Maria è andata a casa.", fr: "Maria est rentrée à la maison." },
    ],
  },
  {
    id: "articoli",
    title: "Les articles",
    explanation:
      "Articles définis : il/lo (m. sing.), la (f. sing.), i/gli (m. plur.), le (f. plur.). LO (et GLI au pluriel) devant un mot masculin commençant par s+consonne, z, gn, ps, x ou y (lo studente, gli zii) ; IL/I dans les autres cas masculins. Articles indéfinis : un/uno (masculin, uno dans les mêmes conditions que lo), una/un' (féminin, un' devant voyelle).",
    examples: [
      { it: "il libro, i libri", fr: "le livre, les livres" },
      { it: "lo studente, gli studenti", fr: "l'étudiant, les étudiants" },
      { it: "una casa, un'amica", fr: "une maison, une amie" },
    ],
  },
  {
    id: "preposizioni-articolate",
    title: "Les prépositions articulées",
    explanation:
      "Quand une préposition (di, a, da, in, su) précède un article défini, les deux se combinent en un seul mot : di+il=del, a+il=al, da+il=dal, in+il=nel, su+il=sul (et de même avec lo/la/i/gli/le : dello, della, dei, degli, delle...).",
    examples: [
      { it: "Vado al mercato.", fr: "Je vais au marché." },
      { it: "Il libro è sul tavolo.", fr: "Le livre est sur la table." },
      { it: "Parliamo dei nostri progetti.", fr: "Nous parlons de nos projets." },
    ],
  },
  {
    id: "pronomi-complemento",
    title: "Les pronoms compléments directs",
    explanation:
      "Remplacent un complément d'objet direct déjà mentionné, placés avant le verbe conjugué : mi (me), ti (te), lo (le/l'), la (la/l'), ci (nous), vi (vous), li (les, masc.), le (les, fém.).",
    examples: [
      { it: "Vedo Marco. Lo vedo.", fr: "Je vois Marco. Je le vois." },
      { it: "Mi capisci?", fr: "Tu me comprends ?" },
    ],
  },
  {
    id: "accordo-aggettivi",
    title: "L'accord des adjectifs",
    explanation:
      "Les adjectifs en -o/-a (bello/bella, plur. belli/belle) varient en genre et en nombre. Les adjectifs en -e (grande, importante) ont une seule forme au singulier pour le masculin et le féminin, et se terminent en -i au pluriel dans les deux genres.",
    examples: [
      { it: "un ragazzo alto, una ragazza alta", fr: "un garçon grand, une fille grande" },
      { it: "un libro importante, due libri importanti", fr: "un livre important, deux livres importants" },
    ],
  },
  {
    id: "futuro",
    title: "Le futur simple",
    explanation:
      "Se forme sur l'infinitif (en changeant le -e final en -ò/-ai/-à/-emo/-ete/-anno), avec le -a- de -ARE qui devient -e- : parlare → parlerò. Plusieurs verbes courants ont un radical irrégulier au futur : essere → sarò, avere → avrò, andare → andrò, fare → farò, potere → potrò, dovere → dovrò, volere → vorrò, venire → verrò.",
    examples: [
      { it: "Domani parlerò con lei.", fr: "Demain je parlerai avec elle." },
      { it: "Sarà una bella giornata.", fr: "Ce sera une belle journée." },
    ],
  },
  {
    id: "domande",
    title: "Poser une question",
    explanation:
      "Pas d'inversion sujet-verbe obligatoire comme en français : à l'oral, l'intonation montante suffit à transformer une affirmation en question. Avec un mot interrogatif (chi, cosa, dove, quando, come, perché, quale, quanto), celui-ci se place en tête de phrase.",
    examples: [
      { it: "Parli italiano?", fr: "Tu parles italien ? (même mots qu'une affirmation, intonation différente)" },
      { it: "Dove abiti?", fr: "Où habites-tu ?" },
    ],
  },
];
