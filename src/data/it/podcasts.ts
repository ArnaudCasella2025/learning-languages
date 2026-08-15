import type { GeneratedPodcast } from "../../types";

/**
 * Épisodes écrits à l'avance (pas générés par l'IA), un par palier de
 * vocabulaire. Chaque script utilise, de bonne foi, quasi exclusivement le
 * vocabulaire introduit jusqu'à ce palier (voir l'ordre dans vocab.ts) plus
 * la "glue" grammaticale indispensable (articles, prépositions simples,
 * conjonctions, pronoms compléments, et quelques mots de politesse comme
 * "ciao"/"grazie" utilisés dès le premier épisode, bien qu'ils
 * apparaissent plus tard dans le deck de flashcards).
 *
 * La longueur augmente avec la taille du vocabulaire disponible : à 50 ou
 * 100 mots connus (essentiellement des pronoms et des verbes à
 * l'infinitif), un texte fluide et long n'est pas vraiment possible sans
 * tricher sur le vocabulaire — mieux vaut un épisode court et honnête que
 * padder avec des mots pas encore appris. Objectif ~2500 mots quand le
 * vocabulaire le permettra (paliers plus élevés, à ajouter au fur et à
 * mesure — voir README).
 */
export const milestonePodcasts: Omit<GeneratedPodcast, "id" | "createdAt">[] = [
  {
    title: "Episodio 1 — I verbi modali",
    level: 1,
    kind: "milestone",
    milestone: 50,
    script: `Ciao! Io sono qui per aiutare voi a parlare italiano.

Io voglio parlare. Tu vuoi ascoltare. Lui vuole studiare. Lei vuole giocare. Noi vogliamo imparare insieme. Voi volete capire. Loro vogliono lavorare.

Io posso parlare piano piano. Tu puoi ascoltare bene. Lui può guardare e pensare. Lei può camminare o correre. Noi possiamo lavorare insieme. Voi potete trovare le parole giuste. Loro possono aiutare.

Io devo studiare ogni giorno. Tu devi ascoltare con attenzione. Lui deve capire. Lei deve parlare. Noi dobbiamo imparare. Voi dovete pensare bene. Loro devono lavorare molto.

Non è sempre facile, ma non dovete avere paura di sbagliare. Se non capite, potete sempre ascoltare di nuovo.

Io ho un dubbio. Tu hai una domanda. Noi abbiamo tempo per imparare. Voi avete tempo. Loro hanno tempo.

Andiamo avanti insieme: io vado, tu vai, lui va, lei va, noi andiamo, voi andate, loro vanno. Io vengo, tu vieni, noi veniamo.

Grazie per ascoltare questo primo episodio! Non dovete mai finire di imparare l'italiano.`,
  },
  {
    title: "Episodio 2 — I numeri e i giorni",
    level: 1,
    kind: "milestone",
    milestone: 100,
    script: `Bentornati! Oggi impariamo i numeri e i giorni.

Zero, uno, due, tre, quattro, cinque, sei, sette, otto, nove, dieci. Poi undici, dodici, tredici, quattordici, quindici, sedici, diciassette, diciotto, diciannove, venti. E ancora: trenta, quaranta, cinquanta, sessanta, settanta, ottanta, novanta, cento, mille.

Io ho un numero: cinque. Tu hai un numero: dieci. Che numero hai tu? Lui pensa a un numero, e lei deve trovare quale numero è.

I giorni sono: lunedì, martedì, mercoledì, giovedì, venerdì, sabato, domenica. Sette giorni, sette nomi da imparare.

Adesso, nuovi verbi: portare, mettere, prendere, lasciare, chiamare, chiedere, rispondere, spiegare, ricordare, dimenticare, credere, piacere.

Io prendo, tu prendi, lui prende, noi prendiamo, voi prendete, loro prendono. Io porto, tu porti. Io lascio, tu lasci, e lei lascia.

Chi chiami tu? Io chiamo, e tu rispondi. Io chiedo, e lui risponde. Io spiego, e voi capite bene, spero.

Io ricordo tutto, ma lui dimentica spesso. Tu credi in questo? Io credo di sì.

Mi piace ascoltare. Ti piace parlare? A lui piace studiare, e a lei piace giocare. A noi piace imparare insieme, e a voi?

Domani è lunedì o martedì? Pensa un numero, e domani prova a ricordarlo.

Grazie ancora, e a presto per il terzo episodio!`,
  },
  {
    title: "Episodio 3 — La famiglia e la giornata",
    level: 1,
    kind: "milestone",
    milestone: 150,
    script: `Ciao a tutti, bentornati al terzo episodio! Oggi parliamo della famiglia e della giornata.

Prima, i mesi: gennaio, febbraio, marzo, aprile, maggio, giugno, luglio, agosto, settembre, ottobre, novembre, dicembre. Dodici mesi in un anno.

Nella giornata abbiamo: la mattina, il pomeriggio, la sera e la notte. Oggi, domani, ieri, adesso, dopo, prima. Io faccio sempre le stesse cose, ma tu? Spesso io studio la mattina, e a volte studio la sera.

Adesso, la famiglia: la madre e il padre, il figlio e la figlia, il fratello e la sorella. Il marito e la moglie. Il nonno e la nonna. L'amico e l'amica. E poi, il bambino.

Io ho una famiglia. Tu hai un fratello o una sorella? Lui ha un amico, e lei ha un'amica.

Le domande: chi, cosa, quando, dove, perché, come, quale, quanto. Chi sei tu? Cosa fai? Quando arrivi? Dove vai? Perché studi? Come stai? Quale giorno preferisci? Quanto tempo hai?

E le parole di ogni giorno: ciao, buongiorno, buonasera, buonanotte, arrivederci. Per favore, grazie, prego. Scusa, scusi. Sì e no. Piacere di conoscerti! Benvenuto.

Una piccola storia: la mattina, io mi sveglio e dico buongiorno alla mia famiglia. Il pomeriggio, lavoro o studio. La sera, parlo con mio fratello o mia sorella. Prima di dormire, dico buonanotte.

Mio nonno dice sempre: "Non dimenticare mai la tua famiglia." E ha ragione.

Grazie per aver ascoltato. Prima di finire: quando è il tuo compleanno? In quale mese? Pensaci, e a presto per il quarto episodio!`,
  },
  {
    title: "Episodio 4 — Il cibo e i luoghi",
    level: 2,
    kind: "milestone",
    milestone: 200,
    script: `Bentornati al quarto episodio! Oggi il tema è il cibo e i luoghi della città.

Prima il cibo: l'acqua, il pane, il latte, il caffè, il tè, il vino, la birra, la carne, il pesce, la frutta, la verdura, il formaggio, l'uovo, lo zucchero, il sale. E poi i pasti: la colazione, il pranzo, la cena.

Al ristorante, chiedo il conto quando ho finito di mangiare. Mi piace il caffè la mattina, e mi piace il vino la sera. E a te, cosa piace? Preferisci la carne o il pesce? Io preferisco la frutta e la verdura.

Adesso i luoghi: la casa, la città, la strada, la stazione, l'aeroporto, l'albergo, il negozio, il mercato, la scuola, l'ospedale, la banca, la chiesa, l'ufficio, il bagno, la camera.

Vado a scuola la mattina, e dopo vado in ufficio per lavorare. Il fine settimana, vado al mercato o al negozio. A volte prendo il treno alla stazione.

E ancora nuove parole: il tempo, la cosa, la persona, l'uomo, la donna, il ragazzo, la ragazza, il nome, il numero, il prezzo, i soldi, il lavoro, la macchina, il treno, l'autobus, il biglietto, il telefono, il libro, la chiave, la porta, la finestra, il tavolo.

Una piccola storia: un uomo e una donna arrivano alla stazione. L'uomo compra un biglietto per il treno. La donna chiede: "Quanto costa?" L'uomo risponde con il prezzo. Poi salgono sul treno insieme.

A casa, sul tavolo, c'è il pane, il formaggio e l'acqua. La chiave è vicino alla porta. La finestra è aperta, e si vede la strada.

Un ragazzo e una ragazza lavorano in un negozio in città. La mattina aprono il negozio, e la sera lo chiudono. Il loro telefono suona spesso: sono clienti che chiedono i prezzi.

Ricorda: per comprare qualcosa, devi sapere il prezzo e avere i soldi. E se non trovi quello che cerchi, puoi sempre chiedere aiuto.

Grazie per aver ascoltato questo quarto episodio! Alla prossima, per parlare di come sono le persone e le cose.`,
  },
  {
    title: "Episodio 5 — Descrivere le persone e le cose",
    level: 2,
    kind: "milestone",
    milestone: 250,
    script: `Bentornati al quinto episodio! Oggi impariamo a descrivere le persone e le cose.

Ecco gli aggettivi: buono e cattivo, grande e piccolo, bello e brutto, nuovo e vecchio, giovane, caldo e freddo, facile e difficile, felice e triste, stanco, occupato e libero, veloce e lento, importante.

La mia casa è grande, ma la tua è piccola. Il caffè è caldo, e l'acqua è fredda. Questo lavoro è facile, ma quello è difficile. Oggi sono felice, ma ieri ero un po' triste. La sera sono sempre stanca.

E ancora: stesso, primo e ultimo, pieno e vuoto, aperto e chiuso. Il negozio è aperto la mattina, ma è chiuso la sera. Il bicchiere è pieno, poi diventa vuoto.

Gli avverbi: molto, poco, troppo, anche, ancora, già, solo, forse, insieme, qui, lì.

Sono molto stanco oggi, ma non troppo. Ho ancora tempo per studiare. Ho già finito il lavoro. Voglio stare solo un momento, ma anche parlare con te. Forse domani studiamo insieme. Sei qui o sei lì?

Una piccola storia: un uomo giovane e una donna anziana si incontrano in un negozio piccolo ma bello. L'uomo cerca qualcosa di nuovo, non qualcosa di vecchio. La donna dice: "Questo è buono, e non è troppo caro." L'uomo è felice di trovare la cosa giusta.

In un'altra storia: una ragazza stanca torna a casa la sera. La sua camera è piccola ma è la sua camera preferita. Il letto è comodo, la finestra è chiusa, e fuori fa freddo. Lei pensa: "Sono stanca, ma sono anche felice: oggi ho imparato molte cose nuove."

Ricorda: le persone e le cose non sono mai solo buone o cattive, grandi o piccole. Il mondo è pieno di sfumature, e anche la lingua italiana lo è.

Grazie per aver ascoltato questi primi cinque episodi! Continua ad ascoltare, a parlare e a non avere paura di sbagliare: è così che si impara una lingua.`,
  },
];
