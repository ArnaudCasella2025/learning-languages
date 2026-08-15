import { initializeApp } from "firebase/app";
import { initializeFirestore, persistentLocalCache } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

/**
 * La synchronisation multi-appareils est optionnelle : sans config Firebase
 * (variables VITE_FIREBASE_* absentes), l'appli reste 100% fonctionnelle en
 * local uniquement — voir isFirebaseConfigured() dans lib/sync.ts.
 */
export const firebaseConfigured = Boolean(firebaseConfig.projectId && firebaseConfig.apiKey);

// Offline-first : les lectures/écritures passent d'abord par le cache local
// et se synchronisent avec Firestore en arrière-plan, donc l'appli reste
// utilisable (depuis le dernier état synchronisé) même hors ligne.
export const db = firebaseConfigured
  ? initializeFirestore(initializeApp(firebaseConfig), {
      localCache: persistentLocalCache(),
    })
  : null;
