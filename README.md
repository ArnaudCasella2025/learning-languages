# Lingo Levels — Italiano

Appli web pour apprendre l'italien en suivant une méthode en 3 niveaux.
Aucune installation : une page ouverte dans un navigateur suffit. Toutes
les données (progression, journal, clé API) restent **dans le navigateur**
(localStorage) — rien n'est envoyé à un serveur autre que l'API Claude
quand tu utilises les fonctionnalités IA.

## La méthode

**Niveau 1 — Survie**
- 1000 mots fréquents (flashcards à répétition espacée, algorithme SM-2)
- Phrases de base de l'usage courant (flashcards)
- Prononciation (écoute + reconnaissance vocale)
- Écoute quotidienne (objectif 30 min/jour, podcasts débutants)

**Niveau 2 — Conversation**
- Suite du deck de mots et phrases
- Parler avec l'IA (3 scénarios guidés, objectif 3x/semaine)
- Contenus audio de niveau intermédiaire
- Journal quotidien de 5 phrases, corrigé par l'IA

**Niveau 3 — Immersion**
- Contenus audio 100% natifs
- Conversations longues et techniques avec l'IA (débat, entretien, libre)
- Correction systématique (même module journal, sans filet)

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

Les decks de vocabulaire et de phrases (`src/data/vocab.ts`,
`src/data/phrases.ts`) sont un socle de départ organisé par catégories et
par palier (`tier: 1` = niveau survie, `tier: 2` = continuation), pas
encore une liste de fréquence de 1000 mots vérifiée. Pour l'enrichir,
ajoute simplement des entrées dans ces fichiers avec la même forme :

```ts
w("parola", "traduction", "categorie", 1); // tier 1 ou 2
```

Les ressources d'écoute (`src/data/listening.ts`) et les scénarios de
conversation IA (`src/data/scenarios.ts`) se complètent de la même façon.

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
