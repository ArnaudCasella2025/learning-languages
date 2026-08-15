const supported = typeof window !== "undefined" && "speechSynthesis" in window;

let voicesPromise: Promise<SpeechSynthesisVoice[]> | null = null;

function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  if (!supported) return Promise.resolve([]);
  const existing = window.speechSynthesis.getVoices();
  if (existing.length > 0) return Promise.resolve(existing);
  if (voicesPromise) return voicesPromise;

  voicesPromise = new Promise((resolve) => {
    const handle = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        window.speechSynthesis.removeEventListener("voiceschanged", handle);
        resolve(voices);
      }
    };
    window.speechSynthesis.addEventListener("voiceschanged", handle);
    // Filet de sécurité : certains navigateurs ne déclenchent jamais
    // "voiceschanged" si aucune voix n'est réellement installée.
    setTimeout(() => resolve(window.speechSynthesis.getVoices()), 1000);
  });
  return voicesPromise;
}

/** Cherche une voix installée correspondant à la locale (ex. "it-IT"), sinon au préfixe de langue ("it"). */
export async function findVoice(locale: string): Promise<SpeechSynthesisVoice | undefined> {
  const voices = await loadVoices();
  const lang = locale.toLowerCase();
  const prefix = lang.split("-")[0];
  return (
    voices.find((v) => v.lang.toLowerCase() === lang) ??
    voices.find((v) => v.lang.toLowerCase().startsWith(prefix))
  );
}
