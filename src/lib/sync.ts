import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db, firebaseConfigured } from "../firebase";
import type { SyncableProgress } from "../types";

export const isFirebaseConfigured = firebaseConfigured;

const CODE_CHARS = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"; // sans 0/O/1/I/L, ambigus à recopier

/** Code court à recopier d'un appareil à l'autre pour lier la progression. */
export function generateSyncCode(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(8));
  return Array.from(bytes, (b) => CODE_CHARS[b % CODE_CHARS.length]).join("");
}

function progressRef(code: string) {
  if (!db) return null;
  return doc(db, "syncs", code);
}

/**
 * Écoute la progression distante pour ce code. `onChange` est appelé à
 * chaque snapshot confirmé par le serveur (les écritures locales en
 * attente sont ignorées pour éviter de re-traiter notre propre écho), avec
 * `undefined` si aucun document n'existe encore pour ce code (code tout
 * juste généré, ou jamais poussé). Ne fait rien si Firebase n'est pas
 * configuré ou si le code est vide.
 */
export function subscribeProgress(
  code: string,
  onChange: (data: SyncableProgress | undefined) => void,
): () => void {
  const ref = code ? progressRef(code) : null;
  if (!ref) return () => {};

  return onSnapshot(ref, (snap) => {
    if (snap.metadata.hasPendingWrites) return;
    onChange(snap.exists() ? (snap.data() as SyncableProgress) : undefined);
  });
}

export async function pushProgress(code: string, data: SyncableProgress): Promise<void> {
  const ref = progressRef(code);
  if (!ref) return;
  try {
    await setDoc(ref, { ...data, updatedAt: Date.now() }, { merge: true });
  } catch (err) {
    // Hors ligne ou projet Firebase mal configuré : la progression reste
    // sûre en local (déjà écrite avant l'appel), on retentera au prochain
    // changement plutôt que de faire planter l'appli.
    console.warn("Échec de la synchronisation Firestore :", err);
  }
}
