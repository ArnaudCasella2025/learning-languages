import type { PhraseItem } from "../../types";

function p(it: string, fr: string, tags: string[], tier: 1 | 2 = 1): PhraseItem {
  return { id: it, it, fr, tier, tags };
}

export const phrases: PhraseItem[] = [
  // Niveau 1 — survie
  p("Ciao, come stai?", "Salut, comment vas-tu ?", ["salutations"]),
  p("Sto bene, grazie. E tu?", "Je vais bien, merci. Et toi ?", ["salutations"]),
  p("Come ti chiami?", "Comment tu t'appelles ?", ["salutations"]),
  p("Mi chiamo...", "Je m'appelle...", ["salutations"]),
  p("Piacere di conoscerti.", "Enchanté(e) de te rencontrer.", ["salutations"]),
  p("Di dove sei?", "D'où viens-tu ?", ["salutations"]),
  p("Sono francese.", "Je suis français(e).", ["salutations"]),
  p("Non capisco.", "Je ne comprends pas.", ["survie"]),
  p("Puoi ripetere, per favore?", "Tu peux répéter, s'il te plaît ?", ["survie"]),
  p("Parli inglese?", "Tu parles anglais ?", ["survie"]),
  p("Parlo un po' di italiano.", "Je parle un peu italien.", ["survie"]),
  p("Quanto costa?", "Combien ça coûte ?", ["achats"]),
  p("Dov'è il bagno?", "Où sont les toilettes ?", ["survie"]),
  p("Vorrei un caffè, per favore.", "Je voudrais un café, s'il vous plaît.", ["restaurant"]),
  p("Il conto, per favore.", "L'addition, s'il vous plaît.", ["restaurant"]),
  p("Mi scusi.", "Excusez-moi.", ["survie"]),
  p("Non lo so.", "Je ne sais pas.", ["survie"]),
  p("Aiuto!", "Au secours !", ["urgence"]),
  p("Che ore sono?", "Quelle heure est-il ?", ["temps"]),
  p("Sono le tre.", "Il est trois heures.", ["temps"]),
  p("A che ora parte il treno?", "À quelle heure part le train ?", ["transport"]),
  p("Dov'è la stazione?", "Où est la gare ?", ["transport"]),
  p("Sono perso.", "Je suis perdu(e).", ["survie"]),
  p("Buon appetito!", "Bon appétit !", ["restaurant"]),
  p("Buon viaggio!", "Bon voyage !", ["salutations"]),
  p("Auguri!", "Félicitations ! / Bons vœux !", ["salutations"]),
  p("Buona fortuna!", "Bonne chance !", ["salutations"]),
  p("Mi piace molto.", "J'aime beaucoup.", ["opinion"]),
  p("Non mi piace.", "Je n'aime pas.", ["opinion"]),
  p("Ho fame.", "J'ai faim.", ["besoins"]),
  p("Ho sete.", "J'ai soif.", ["besoins"]),
  p("Sono stanco.", "Je suis fatigué(e).", ["besoins"]),
  p("Va bene.", "D'accord / Ça va.", ["survie"]),
  p("A dopo!", "À plus tard !", ["salutations"]),
  p("A domani!", "À demain !", ["salutations"]),
  p("Ci vediamo!", "On se voit !", ["salutations"]),

  // Niveau 2 — conversation
  p("Cosa ne pensi?", "Qu'en penses-tu ?", ["opinion"], 2),
  p("Secondo me...", "Selon moi...", ["opinion"], 2),
  p("Sono d'accordo.", "Je suis d'accord.", ["opinion"], 2),
  p("Non sono d'accordo.", "Je ne suis pas d'accord.", ["opinion"], 2),
  p("Potresti spiegarmi meglio?", "Pourrais-tu m'expliquer mieux ?", ["survie"], 2),
  p("Mi puoi aiutare?", "Peux-tu m'aider ?", ["survie"], 2),
  p("Che cosa hai fatto ieri?", "Qu'as-tu fait hier ?", ["conversation"], 2),
  p("Cosa farai domani?", "Que feras-tu demain ?", ["conversation"], 2),
  p(
    "Da quanto tempo studi italiano?",
    "Depuis combien de temps étudies-tu l'italien ?",
    ["conversation"],
    2,
  ),
  p("Qual è la tua opinione?", "Quel est ton avis ?", ["opinion"], 2),
  p("Mi dispiace.", "Je suis désolé(e).", ["salutations"], 2),
  p("Non fa niente.", "Ce n'est rien / Pas grave.", ["salutations"], 2),
  p("In realtà...", "En réalité...", ["connecteurs"], 2),
  p("A dire la verità...", "À vrai dire...", ["connecteurs"], 2),
  p("Per esempio...", "Par exemple...", ["connecteurs"], 2),
  p("Cioè...", "C'est-à-dire...", ["connecteurs"], 2),
  p("Comunque...", "De toute façon / Bref...", ["connecteurs"], 2),
  p("Hai ragione.", "Tu as raison.", ["opinion"], 2),
  p("Hai torto.", "Tu as tort.", ["opinion"], 2),
  p("Dipende.", "Ça dépend.", ["opinion"], 2),

  // Niveau 1 — santé et urgences
  p("Chiamate un medico!", "Appelez un médecin !", ["urgence"]),
  p("Ho bisogno di aiuto.", "J'ai besoin d'aide.", ["urgence"]),
  p("Mi sono fatto male.", "Je me suis fait mal.", ["urgence"]),
  p("Dov'è la farmacia più vicina?", "Où est la pharmacie la plus proche ?", ["urgence"]),
  p("Ho la febbre.", "J'ai de la fièvre.", ["urgence"]),
  p("Mi fa male la testa.", "J'ai mal à la tête.", ["urgence"]),
  p("Chiamate la polizia!", "Appelez la police !", ["urgence"]),
  p("C'è stato un incidente.", "Il y a eu un accident.", ["urgence"]),

  // Niveau 1 — transport
  p("Un biglietto per Roma, per favore.", "Un billet pour Rome, s'il vous plaît.", ["transport"]),
  p("A che binario parte il treno?", "Sur quel quai part le train ?", ["transport"]),
  p("Dov'è la fermata dell'autobus?", "Où est l'arrêt de bus ?", ["transport"]),
  p("Quanto tempo ci vuole?", "Combien de temps ça prend ?", ["transport"]),
  p("Posso avere un taxi?", "Puis-je avoir un taxi ?", ["transport"]),
  p("Dov'è il parcheggio?", "Où est le parking ?", ["transport"]),

  // Niveau 1 — achats
  p("Posso provarlo?", "Puis-je l'essayer ?", ["achats"]),
  p("Avete taglie più grandi?", "Avez-vous des tailles plus grandes ?", ["achats"]),
  p("Accettate carte di credito?", "Acceptez-vous les cartes de crédit ?", ["achats"]),
  p("Vorrei restituire questo.", "Je voudrais rendre ceci.", ["achats"]),
  p("È in saldo?", "C'est en solde ?", ["achats"]),
  p("Posso avere una busta?", "Puis-je avoir un sac ?", ["achats"]),

  // Niveau 1 — hôtel
  p("Ho una prenotazione.", "J'ai une réservation.", ["hotel"]),
  p("A che ora è il check-in?", "À quelle heure est l'enregistrement ?", ["hotel"]),
  p("C'è il wifi?", "Y a-t-il le wifi ?", ["hotel"]),
  p("Il mio bagaglio è perso.", "Mes bagages sont perdus.", ["hotel"]),

  // Niveau 1 — interactions courantes
  p("Come si dice questo in italiano?", "Comment on dit ça en italien ?", ["survie"]),
  p("Puoi scrivermelo?", "Peux-tu me l'écrire ?", ["survie"]),
  p("Non importa.", "Ce n'est pas grave.", ["salutations"]),
  p("Nessun problema.", "Pas de problème.", ["salutations"]),
  p("Con piacere.", "Avec plaisir.", ["salutations"]),
  p("Dopo di te.", "Après toi.", ["salutations"]),
  p("Attento!", "Attention !", ["urgence"]),

  // Niveau 1 — quotidien
  p("Buon fine settimana!", "Bon week-end !", ["salutations"]),
  p("Buone vacanze!", "Bonnes vacances !", ["salutations"]),
  p("Che bella giornata!", "Quelle belle journée !", ["temps"]),
  p("Fa molto caldo oggi.", "Il fait très chaud aujourd'hui.", ["temps"]),
  p("Fa freddo oggi.", "Il fait froid aujourd'hui.", ["temps"]),
  p("Sta piovendo.", "Il pleut.", ["temps"]),
  p("Ti presento mio fratello.", "Je te présente mon frère.", ["salutations"]),
  p("Abito qui vicino.", "J'habite près d'ici.", ["conversation"]),
  p("Sono qui in vacanza.", "Je suis ici en vacances.", ["conversation"]),
  p("Sono qui per lavoro.", "Je suis ici pour le travail.", ["conversation"]),

  // Niveau 1 — restaurant
  p("È delizioso!", "C'est délicieux !", ["restaurant"]),
  p("Sono vegetariano.", "Je suis végétarien.", ["restaurant"]),
  p("Sono allergico alle noci.", "Je suis allergique aux noix.", ["restaurant"]),
  p("Posso avere il menu?", "Puis-je avoir le menu ?", ["restaurant"]),
  p("Cosa mi consiglia?", "Que me conseillez-vous ?", ["restaurant"]),

  // Niveau 2 — connecteurs supplémentaires
  p("D'altra parte...", "D'un autre côté...", ["connecteurs"], 2),
  p("Per fortuna...", "Heureusement...", ["connecteurs"], 2),
  p("Purtroppo...", "Malheureusement...", ["connecteurs"], 2),
  p("In ogni caso...", "Dans tous les cas...", ["connecteurs"], 2),
  p("A proposito...", "À propos...", ["connecteurs"], 2),
  p("Tra l'altro...", "D'ailleurs...", ["connecteurs"], 2),
  p("Insomma...", "Bref...", ["connecteurs"], 2),

  // Niveau 2 — opinion approfondie
  p("Sono del tuo stesso parere.", "Je suis du même avis que toi.", ["opinion"], 2),
  p("Non ne ho idea.", "Je n'en ai aucune idée.", ["opinion"], 2),
  p("Dipende dai punti di vista.", "Ça dépend des points de vue.", ["opinion"], 2),
  p("Mi sembra giusto.", "Ça me semble juste.", ["opinion"], 2),
  p("Non sono sicuro.", "Je ne suis pas sûr.", ["opinion"], 2),
  p("Ci devo pensare.", "Je dois y réfléchir.", ["opinion"], 2),
  p("Mi piacerebbe...", "J'aimerais...", ["opinion"], 2),
  p("A mio avviso...", "À mon avis...", ["opinion"], 2),

  // Niveau 2 — récit
  p("Mi è successa una cosa strana.", "Il m'est arrivé une chose étrange.", ["conversation"], 2),
  p("Non ci crederai mai.", "Tu ne le croiras jamais.", ["conversation"], 2),
  p("A un certo punto...", "À un moment donné...", ["conversation"], 2),
  p("Alla fine...", "Finalement...", ["conversation"], 2),
  p("Per farla breve...", "Pour faire court...", ["conversation"], 2),
  p("Prima o poi...", "Tôt ou tard...", ["conversation"], 2),
  p("Nel frattempo...", "Entre-temps...", ["conversation"], 2),
  p("A quanto pare...", "Apparemment...", ["conversation"], 2),

  // Niveau 2 — expressions idiomatiques
  p("In bocca al lupo!", "Bonne chance ! (littéralement : dans la gueule du loup)", ["idiomes"], 2),
  p("Non vedo l'ora!", "J'ai hâte !", ["idiomes"], 2),
  p("Meglio tardi che mai.", "Mieux vaut tard que jamais.", ["idiomes"], 2),
  p("Tutto è bene quel che finisce bene.", "Tout est bien qui finit bien.", ["idiomes"], 2),

  // Niveau 2 — travail et école
  p("Ho una riunione alle dieci.", "J'ai une réunion à dix heures.", ["travail"], 2),
  p("Sono in ritardo per il lavoro.", "Je suis en retard pour le travail.", ["travail"], 2),
  p("Qual è il tuo orario di lavoro?", "Quels sont tes horaires de travail ?", ["travail"], 2),
  p("Lavoro da casa.", "Je travaille depuis chez moi.", ["travail"], 2),
  p("Sono in vacanza.", "Je suis en vacances.", ["travail"], 2),
];
