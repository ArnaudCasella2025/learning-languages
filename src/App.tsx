import { useState } from "react";
import "./App.css";
import type { Level, ModuleId } from "./types";
import { store } from "./lib/storage";
import { vocab } from "./data/vocab";
import { phrases } from "./data/phrases";
import { listeningResources } from "./data/listening";
import { scenarios } from "./data/scenarios";
import { usePersisted } from "./hooks/usePersisted";
import { Dashboard } from "./components/Dashboard";
import { LevelPage } from "./components/LevelPage";
import { Flashcards } from "./components/Flashcards";
import { Pronunciation } from "./components/Pronunciation";
import { Listening } from "./components/Listening";
import { Conversation } from "./components/Conversation";
import { Journal } from "./components/Journal";
import { Settings } from "./components/Settings";

type Tab = "dashboard" | Level | "settings";

export default function App() {
  const [tab, setTab] = useState<Tab>("dashboard");
  const [activeModule, setActiveModule] = useState<ModuleId | null>(null);

  const [currentLevel, setCurrentLevel] = usePersisted<Level>(
    store.getCurrentLevel,
    store.setCurrentLevel,
  );
  const [vocabDeck, setVocabDeck] = usePersisted(store.getVocabDeck, store.setVocabDeck);
  const [phraseDeck, setPhraseDeck] = usePersisted(store.getPhraseDeck, store.setPhraseDeck);
  const [listeningLog, setListeningLog] = usePersisted(
    store.getListeningLog,
    store.setListeningLog,
  );
  const [conversationLog, setConversationLog] = usePersisted(
    store.getConversationLog,
    store.setConversationLog,
  );
  const [journal, setJournal] = usePersisted(store.getJournal, store.setJournal);
  const [apiKey, setApiKey] = usePersisted(store.getApiKey, store.setApiKey);

  function goLevel(level: Level) {
    setCurrentLevel(level);
    setTab(level);
    setActiveModule(null);
  }

  function goTab(next: Tab) {
    setTab(next);
    setActiveModule(null);
  }

  function renderModule(level: Level) {
    const tierCap = level === 1 ? 1 : 2;
    const back = () => setActiveModule(null);

    switch (activeModule) {
      case "vocab":
        return (
          <Flashcards
            title="Vocabulaire"
            items={vocab
              .filter((v) => v.tier <= tierCap)
              .map((v) => ({ id: v.id, front: v.it, back: v.fr }))}
            deck={vocabDeck}
            onDeckChange={setVocabDeck}
            onBack={back}
          />
        );
      case "phrases":
        return (
          <Flashcards
            title="Phrases"
            items={phrases
              .filter((p) => p.tier <= tierCap)
              .map((p) => ({ id: p.id, front: p.it, back: p.fr }))}
            deck={phraseDeck}
            onDeckChange={setPhraseDeck}
            onBack={back}
          />
        );
      case "pronunciation":
        return (
          <Pronunciation
            items={vocab
              .filter((v) => v.tier <= tierCap)
              .map((v) => ({ id: v.id, text: v.it, translation: v.fr }))}
            onBack={back}
          />
        );
      case "listening":
        return (
          <Listening
            level={level}
            resources={listeningResources}
            log={listeningLog}
            onLogChange={setListeningLog}
            onBack={back}
          />
        );
      case "conversation":
        return (
          <Conversation
            level={level}
            scenarios={scenarios}
            apiKey={apiKey}
            log={conversationLog}
            onLogChange={setConversationLog}
            onBack={back}
            onOpenSettings={() => goTab("settings")}
          />
        );
      case "journal":
        return (
          <Journal
            apiKey={apiKey}
            entries={journal}
            onEntriesChange={setJournal}
            onBack={back}
            onOpenSettings={() => goTab("settings")}
          />
        );
      default:
        return <LevelPage level={level} onSelectModule={setActiveModule} />;
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Lingo Levels — Italiano</h1>
        <nav className="tab-nav">
          <button className={tab === "dashboard" ? "active" : ""} onClick={() => goTab("dashboard")}>
            Tableau de bord
          </button>
          <button className={tab === 1 ? "active" : ""} onClick={() => goLevel(1)}>
            Niveau 1
          </button>
          <button className={tab === 2 ? "active" : ""} onClick={() => goLevel(2)}>
            Niveau 2
          </button>
          <button className={tab === 3 ? "active" : ""} onClick={() => goLevel(3)}>
            Niveau 3
          </button>
          <button className={tab === "settings" ? "active" : ""} onClick={() => goTab("settings")}>
            Réglages
          </button>
        </nav>
      </header>

      <main className="app-main">
        {tab === "dashboard" && (
          <Dashboard
            currentLevel={currentLevel}
            onLevelChange={goLevel}
            vocab={vocab}
            phrases={phrases}
            vocabDeck={vocabDeck}
            phraseDeck={phraseDeck}
            listeningLog={listeningLog}
            conversationLog={conversationLog}
            journal={journal}
          />
        )}
        {tab === "settings" && (
          <Settings apiKey={apiKey} onApiKeyChange={setApiKey} onBack={() => goTab("dashboard")} />
        )}
        {(tab === 1 || tab === 2 || tab === 3) && renderModule(tab)}
      </main>
    </div>
  );
}
