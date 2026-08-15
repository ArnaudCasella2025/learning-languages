import { useCallback, useEffect, useRef, useState } from "react";
import { store } from "../lib/storage";
import { subscribeProgress, pushProgress } from "../lib/sync";
import type {
  ConversationLog,
  GeneratedPodcast,
  JournalEntry,
  Level,
  ListeningLog,
  SRSDeckState,
  SyncableProgress,
} from "../types";

function readLocal(): SyncableProgress {
  return {
    vocabDeck: store.getVocabDeck(),
    phraseDeck: store.getPhraseDeck(),
    listeningLog: store.getListeningLog(),
    conversationLog: store.getConversationLog(),
    journal: store.getJournal(),
    podcasts: store.getPodcasts(),
    currentLevel: store.getCurrentLevel(),
    language: store.getLanguage(),
  };
}

function writeLocal(data: SyncableProgress): void {
  store.setVocabDeck(data.vocabDeck);
  store.setPhraseDeck(data.phraseDeck);
  store.setListeningLog(data.listeningLog);
  store.setConversationLog(data.conversationLog);
  store.setJournal(data.journal);
  store.setPodcasts(data.podcasts);
  store.setCurrentLevel(data.currentLevel);
  store.setLanguage(data.language);
}

const PUSH_DEBOUNCE_MS = 800;

/**
 * Combine tous les champs de progression synchronisables en un seul état,
 * persisté en local à chaque changement et, si un code de synchronisation
 * est actif, poussé vers Firestore (avec un debounce) et mis à jour en
 * temps réel quand un autre appareil pousse un changement.
 */
export function useSyncedProgress(syncCode: string) {
  const [data, setData] = useState<SyncableProgress>(readLocal);
  const dataRef = useRef(data);
  dataRef.current = data;
  const pushTimer = useRef<number | null>(null);

  useEffect(() => {
    if (!syncCode) return;
    const unsubscribe = subscribeProgress(syncCode, (remote) => {
      if (!remote) {
        // Rien côté serveur pour ce code (tout juste généré, ou jamais
        // poussé) : on l'amorce avec l'état local actuel.
        pushProgress(syncCode, dataRef.current);
        return;
      }
      setData((current) => {
        const merged = { ...current, ...remote };
        if (JSON.stringify(merged) === JSON.stringify(current)) return current;
        writeLocal(merged);
        return merged;
      });
    });
    return unsubscribe;
  }, [syncCode]);

  const pushNow = useCallback(() => {
    pushProgress(syncCode, dataRef.current);
  }, [syncCode]);

  const update = useCallback(
    (patch: Partial<SyncableProgress>) => {
      setData((current) => {
        const next = { ...current, ...patch };
        writeLocal(next);
        return next;
      });
      if (pushTimer.current) window.clearTimeout(pushTimer.current);
      pushTimer.current = window.setTimeout(pushNow, PUSH_DEBOUNCE_MS);
    },
    [pushNow],
  );

  useEffect(
    () => () => {
      if (pushTimer.current) window.clearTimeout(pushTimer.current);
    },
    [],
  );

  return {
    ...data,
    setVocabDeck: (v: SRSDeckState) => update({ vocabDeck: v }),
    setPhraseDeck: (v: SRSDeckState) => update({ phraseDeck: v }),
    setListeningLog: (v: ListeningLog) => update({ listeningLog: v }),
    setConversationLog: (v: ConversationLog) => update({ conversationLog: v }),
    setJournal: (v: JournalEntry[]) => update({ journal: v }),
    setPodcasts: (v: GeneratedPodcast[]) => update({ podcasts: v }),
    setCurrentLevel: (v: Level) => update({ currentLevel: v }),
    setLanguage: (v: string) => update({ language: v }),
  };
}
