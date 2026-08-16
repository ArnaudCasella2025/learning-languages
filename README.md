# Lingo Levels

Appli web pour apprendre une langue en suivant une méthode en 3 niveaux
(aujourd'hui : italien, le sélecteur en haut de l'appli est prêt à
accueillir d'autres langues — voir « Ajouter une langue » plus bas).
Aucune installation : une page ouverte dans un navigateur suffit. Toutes
les données (progression, journal, podcasts générés, clé API) restent
**dans le navigateur** (localStorage) par défaut — rien n'est envoyé à un
serveur autre que l'API Claude quand tu utilises les fonctionnalités IA.
Une synchronisation optionnelle entre appareils (Firebase) peut être
activée — voir « Synchronisation multi-appareils » plus bas.

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
réponse** plutôt que de simplement retourner la carte (un bouton
« Je ne sais pas » permet de passer directement à la correction). Une
réponse fausse est automatiquement notée « Encore » (pas besoin de choisir),
une réponse juste laisse choisir Difficile/Facile pour affiner l'intervalle
de répétition espacée. Une carte notée « Encore » ne réapparaît pas
immédiatement : elle revient un peu plus tard dans la session (10 min).

Les traductions à plusieurs formulations valables (« ils / elles »,
« temps (durée / météo) »...) acceptent n'importe laquelle des variantes
séparées par « / », y compris entre parenthèses.

## Podcasts

En plus des podcasts externes curatés, l'appli propose des scripts lus
par la synthèse vocale du navigateur (pas de fichier mp3 téléchargeable —
voir « Reconnaissance vocale et synthèse vocale » plus bas), à trouver
dans le module **Podcasts générés** de chaque niveau :

- **Par palier de vocabulaire** : des épisodes écrits à l'avance
  (`src/data/it/podcasts.ts`), pas générés à la demande, donc utilisables
  **sans clé API**. Chacun utilise (quasi) exclusivement les mots déjà
  introduits jusqu'à ce palier (50, 100, 150 premiers mots...) ; un
  épisode se débloque avec un bouton « ▶ Écouter » dès que tu connais
  assez de mots. La longueur augmente avec la taille du vocabulaire
  disponible (un texte de ~2500 mots n'est pas réaliste avec seulement 50
  mots appris sans tricher sur le vocabulaire) — objectif ~2500 mots par
  épisode une fois le deck de vocabulaire bien étoffé.
- **Sur un thème libre** : indique un sujet, un script est généré à la
  volée via l'API Claude, au niveau de la page où tu te trouves. C'est la
  seule partie de ce module qui nécessite une clé API — le reste
  fonctionne sans.

Les scripts générés sur un thème sont mis en cache dans le navigateur
(pas régénérés à chaque écoute).

Le lecteur propose deux réglages (vitesse de lecture, pause entre les
phrases), mémorisés localement sur l'appareil. Un changement s'applique à
partir de la phrase suivante, pas en cours d'utterance.

## Fonctionnalités IA et clé API

La conversation avec l'IA et la correction du journal appellent directement
l'API Claude **depuis ton navigateur**, avec ta propre clé API :

1. Crée une clé sur [console.anthropic.com](https://console.anthropic.com/settings/keys).
2. Renseigne-la dans l'onglet **Réglages** de l'appli.
3. Elle est stockée uniquement dans le `localStorage` de ton navigateur,
   jamais commitée ni envoyée ailleurs qu'à `api.anthropic.com`.

Les autres modules (vocabulaire, phrases, prononciation, écoute, podcasts
par palier de vocabulaire) fonctionnent sans clé API. Seule la génération
d'un podcast sur un thème libre en a besoin.

⚠️ Une clé API exposée côté navigateur peut en théorie être lue par
quelqu'un inspectant le trafic de ton propre appareil. C'est acceptable
pour un usage personnel comme celui-ci (pas de serveur à héberger), mais
ne partage jamais cette clé et ne l'utilise pas sur un appareil partagé.

### Reconnaissance vocale et synthèse vocale

Le module de prononciation et les podcasts utilisent la Web Speech API du
navigateur (`SpeechRecognition` / `speechSynthesis`). Le support est
meilleur sous Chrome/Edge ; Firefox et Safari ne supportent pas toujours
la reconnaissance vocale.

La synthèse vocale utilise les **voix installées sur ton système
d'exploitation**, pas une voix fournie par l'appli. Si aucune voix
italienne n'est installée, le navigateur lit le texte avec sa voix par
défaut (souvent une voix française) — l'appli affiche un avertissement
dans ce cas. Pour installer une voix italienne :

- **Windows** : Paramètres → Heure et langue → Voix → Ajouter des voix →
  Italien.
- **macOS** : Réglages Système → Accessibilité → Contenu énoncé → Voix du
  système → Gérer les voix → coche une voix italienne.
- **Android** : Paramètres → Système → Langues → Synthèse vocale →
  moteur préféré → installer les données vocales italiennes.
- **iOS** : Réglages → Accessibilité → Contenu énoncé → Voix → Italien →
  télécharger une voix.

Après l'installation, recharge la page de l'appli.

## Synchronisation multi-appareils (Firebase)

Par défaut, la progression (vocabulaire, phrases, journal, podcasts
écoutés, niveau, langue) est locale à un seul navigateur/appareil. Pour la
retrouver sur plusieurs appareils, l'appli peut se synchroniser via
Firestore, avec un modèle volontairement simple — pas de compte, pas de
mot de passe :

1. Dans l'onglet **Réglages**, clique sur **Générer un code de
   synchronisation** sur un premier appareil.
2. Sur un autre appareil, va dans ses Réglages et colle ce code dans
   **Lier un code existant**. Sa progression locale est alors remplacée
   par celle associée au code, et les deux appareils restent synchronisés
   en temps réel ensuite (chaque changement sur l'un se répercute sur
   l'autre en quelques secondes).

Le code fait office de secret : n'importe qui le connaissant peut lire et
modifier la progression associée. Garde-le pour toi, comme un mot de
passe.

⚠️ **La clé API Anthropic n'est jamais synchronisée**, volontairement —
elle reste dans le localStorage de chaque appareil et doit être renseignée
séparément sur chacun. C'est un choix de sécurité délibéré : contrairement
à une progression d'apprentissage, une clé API a une valeur financière
réelle (facturation à l'usage), donc pas question de la faire transiter
par un document Firestore aux règles ouvertes (voir plus bas).

### Mettre en place le projet Firebase (une fois)

1. Crée un projet sur [console.firebase.google.com](https://console.firebase.google.com)
   (gratuit à ce niveau d'usage).
2. Active **Firestore Database** (mode production ou test, peu importe —
   les règles ci-dessous s'appliquent dans les deux cas).
3. Dans **Règles** de Firestore, colle :
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /syncs/{code} {
         allow read, write: if true;
       }
     }
   }
   ```
   ⚠️ Ces règles sont volontairement ouvertes : quiconque connaît un code
   de synchronisation (chaîne aléatoire de 8 caractères, ~1 chance sur
   32^8) peut lire/écrire le document associé. C'est le même modèle de
   sécurité qu'un lien secret non listé — suffisant pour un usage
   personnel, mais à garder en tête.
4. Ajoute une application web au projet (icône `</>`) pour obtenir les
   valeurs de config (`apiKey`, `authDomain`, `projectId`,
   `storageBucket`, `messagingSenderId`, `appId`).
5. Renseigne ces valeurs comme **secrets du dépôt GitHub**
   (`Settings → Secrets and variables → Actions → New repository secret`),
   un secret par variable listée dans `.env.example`
   (`VITE_FIREBASE_API_KEY`, etc.) — le workflow de déploiement les
   injecte au moment du build.

Sans cette configuration, l'onglet Réglages indique simplement que la
synchronisation n'est pas disponible, et le reste de l'appli fonctionne
normalement en local.

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
façon. Pour ajouter un nouveau palier de podcast (par exemple 500 ou
1000 mots une fois le deck de vocabulaire assez étoffé), ajoute un
épisode dans `src/data/it/podcasts.ts` avec le `milestone` correspondant
— il apparaîtra automatiquement dans la liste, verrouillé jusqu'à ce que
le nombre de mots connus atteigne ce seuil.

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
cp .env.example .env.local   # optionnel : renseigner les valeurs Firebase (voir ci-dessus)
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
