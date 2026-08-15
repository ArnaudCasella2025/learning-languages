# Lingo Levels

Appli web pour apprendre une langue en suivant une méthode en 3 niveaux
(aujourd'hui : italien, le sélecteur en haut de l'appli est prêt à
accueillir d'autres langues — voir « Ajouter une langue » plus bas).
Aucune installation : une page ouverte dans un navigateur suffit. Toutes
les données (progression, journal, podcasts générés, clé API) restent
**dans le navigateur** (localStorage) — rien n'est envoyé à un serveur
autre que l'API Claude quand tu utilises les fonctionnalités IA.

## La méthode

**Niveau 1 — Survie**
- 1000 mots fréquents (flashcards à répétition espacée, algorithme SM-2)
- Phrases de base de l'usage courant (flashcards)
- Prononciation (écoute + reconnaissance vocale)
- Écoute quotidienne (objectif 30 min/jour, podcasts débutants + podcasts générés par l'IA)

**Niveau 2 — Conversation**
- Suite du deck de mots et phrases
- Parler avec l'IA (3 scénarios guidés, objectif 3x/semaine)
- Contenus audio de niveau intermédiaire + podcasts générés par l'IA
- Journal quotidien de 5 phrases, corrigé par l'IA

**Niveau 3 — Immersion**
- Contenus audio 100% natifs + podcasts générés par l'IA
- Conversations longues et techniques avec l'IA (débat, entretien, libre)
- Correction systématique (même module journal, sans filet)

## Flashcards

Les fiches de vocabulaire et de phrases sont mélangées (ordre aléatoire,
figé pour la session), interrogent au hasard dans les deux sens
(français → langue ou langue → français), et demandent de **taper la
réponse** plutôt que de simplement retourner la carte : une correction
s'affiche avant de noter la carte (Encore / Difficile / Facile), qui pilote
la répétition espacée. Une carte notée « Encore » ne réapparaît pas
immédiatement : elle revient un peu plus tard dans la session (10 min).

## Podcasts générés par IA

En plus des podcasts externes curatés, l'appli peut générer elle-même un
script de podcast (~2500 mots) via l'API Claude, lu par la synthèse
vocale du navigateur (pas de fichier mp3 téléchargeable — voir
« Reconnaissance vocale et synthèse vocale » plus bas) :

- **Par palier de vocabulaire** : un podcast utilisant (quasi)
  exclusivement les mots déjà appris (50, 100, 150 premiers mots...),
  débloqué au fur et à mesure de ta progression.
- **Sur un thème libre** : indique un sujet, l'appli génère un script au
  niveau de la page où tu te trouves.

Les scripts générés sont mis en cache dans le navigateur (pas
régénérés à chaque écoute).

## Fonctionnalités IA et clé API

La conversation avec l'IA et la correction du journal appellent directement
l'API Claude **depuis ton navigateur**, avec ta propre clé API :

1. Crée une clé sur [console.anthropic.com](https://console.anthropic.com/settings/keys).
2. Renseigne-la dans l'onglet **Réglages** de l'appli.
3. Elle est stockée uniquement dans le `localStorage` de ton navigateur,
   jamais commitée ni envoyée ailleurs qu'à `api.anthropic.com`.

Les autres modules (vocabulaire, phrases, prononciation, écoute)
fonctionnent sans clé API.

⚠️ Une clé API exposée côté navigateur peut en théorie être lue par
quelqu'un inspectant le trafic de ton propre appareil. C'est acceptable
pour un usage personnel comme celui-ci (pas de serveur à héberger), mais
ne partage jamais cette clé et ne l'utilise pas sur un appareil partagé.

### Reconnaissance vocale et synthèse vocale

Le module de prononciation utilise la Web Speech API du navigateur
(`SpeechRecognition` / `speechSynthesis`). Le support est meilleur sous
Chrome/Edge ; Firefox et Safari ne supportent pas toujours la
reconnaissance vocale.

## Étendre le contenu

Les decks de vocabulaire et de phrases (`src/data/it/vocab.ts`,
`src/data/it/phrases.ts`) sont un socle de départ organisé par catégories
et par palier (`tier: 1` = niveau survie, `tier: 2` = continuation), pas
encore une liste de fréquence de 1000 mots vérifiée. Pour l'enrichir,
ajoute simplement des entrées dans ces fichiers avec la même forme :

```ts
w("parola", "traduction", "categorie", 1); // tier 1 ou 2
```

Les ressources d'écoute (`src/data/it/listening.ts`) et les scénarios de
conversation IA (`src/data/it/scenarios.ts`) se complètent de la même
façon. Les paliers proposés pour les podcasts générés (`MILESTONES` dans
`src/lib/podcastPrompt.ts`) s'ajustent automatiquement à la taille du
deck de vocabulaire.

## Ajouter une langue

L'appli est structurée pour accueillir plusieurs langues :

1. Crée un dossier `src/data/<code>/` (ex. `src/data/en/`) avec
   `vocab.ts`, `phrases.ts`, `listening.ts` et `scenarios.ts`, sur le
   modèle de `src/data/it/`.
2. Ajoute une entrée dans le registre `src/data/languages.ts` (code,
   libellé, drapeau, locale BCP 47 pour la voix — ex. `en-US`).

Le sélecteur de langue dans l'en-tête de l'appli affichera automatiquement
la nouvelle langue.

## Développement

```bash
npm install
npm run dev      # serveur de développement
npm run build    # build de production dans dist/
npm run lint
```

## Déploiement

Le workflow `.github/workflows/deploy.yml` build et publie automatiquement
`dist/` sur GitHub Pages à chaque push sur `main`.

**Étape unique à faire manuellement** dans les paramètres du dépôt GitHub :
`Settings → Pages → Build and deployment → Source: GitHub Actions`.

Une fois activé, l'app est accessible à l'URL
`https://<utilisateur>.github.io/learning-languages/`.
