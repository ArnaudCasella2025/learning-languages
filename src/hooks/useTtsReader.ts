import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { splitIntoChunks } from "../lib/ttsReader";
import { findVoice } from "../lib/voices";

const supported = typeof window !== "undefined" && "speechSynthesis" in window;

export function useTtsReader(text: string, locale: string, rate: number, pauseMs: number) {
  const chunks = useMemo(() => splitIntoChunks(text), [text]);
  const indexRef = useRef(0);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const stoppedRef = useRef(false);
  const gapTimer = useRef<number | null>(null);

  const [voice, setVoice] = useState<SpeechSynthesisVoice | undefined>();
  const [voiceChecked, setVoiceChecked] = useState(false);
  useEffect(() => {
    let cancelled = false;
    setVoiceChecked(false);
    findVoice(locale).then((v) => {
      if (!cancelled) {
        setVoice(v);
        setVoiceChecked(true);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [locale]);

  const speakFrom = useCallback(
    (start: number) => {
      if (!supported) return;
      stoppedRef.current = false;
      setPlaying(true);

      const speakNext = (i: number) => {
        if (stoppedRef.current || i >= chunks.length) {
          setPlaying(false);
          if (i >= chunks.length) {
            indexRef.current = 0;
            setIndex(0);
          }
          return;
        }
        const utterance = new SpeechSynthesisUtterance(chunks[i]);
        utterance.lang = locale;
        if (voice) utterance.voice = voice;
        utterance.rate = rate;
        utterance.onend = () => {
          if (stoppedRef.current) return;
          indexRef.current = i + 1;
          setIndex(i + 1);
          if (pauseMs > 0) {
            gapTimer.current = window.setTimeout(() => speakNext(i + 1), pauseMs);
          } else {
            speakNext(i + 1);
          }
        };
        utterance.onerror = () => setPlaying(false);
        window.speechSynthesis.speak(utterance);
      };
      speakNext(start);
    },
    [chunks, locale, voice, rate, pauseMs],
  );

  const play = useCallback(() => {
    window.speechSynthesis.cancel();
    speakFrom(indexRef.current);
  }, [speakFrom]);

  const pause = useCallback(() => {
    stoppedRef.current = true;
    if (gapTimer.current) window.clearTimeout(gapTimer.current);
    window.speechSynthesis.cancel();
    setPlaying(false);
  }, []);

  const stop = useCallback(() => {
    stoppedRef.current = true;
    if (gapTimer.current) window.clearTimeout(gapTimer.current);
    window.speechSynthesis.cancel();
    setPlaying(false);
    indexRef.current = 0;
    setIndex(0);
  }, []);

  useEffect(
    () => () => {
      stoppedRef.current = true;
      if (gapTimer.current) window.clearTimeout(gapTimer.current);
      window.speechSynthesis.cancel();
    },
    [],
  );

  const progressPct = chunks.length ? Math.round((index / chunks.length) * 100) : 0;

  return {
    playing,
    progressPct,
    play,
    pause,
    stop,
    supported,
    totalChunks: chunks.length,
    voiceAvailable: voice !== undefined,
    voiceChecked,
  };
}
