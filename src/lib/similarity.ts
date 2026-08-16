/** Normalise pour comparer prononciation attendue et transcription reconnue. */
function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/œ/g, "oe")
    .replace(/æ/g, "ae")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    // Diacritiques arabes (tashkeel, U+064B-U+065F et U+0670) : ignorés
    // pour la comparaison, comme les accents latins ci-dessus.
    .replace(/[ً-ٰٟ]/g, "")
    // Variantes de lettres arabes fréquemment interchangées à l'écrit
    // (hamza sur alef, alef maksura, ta marbuta) : on les uniformise pour
    // éviter de pénaliser une orthographe par ailleurs correcte.
    .replace(/[آأإ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/[^a-z0-9؀-ۿ\s]/g, "")
    .trim()
    .replace(/\s+/g, " ");
}

function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    new Array(n + 1).fill(0),
  );
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost,
      );
    }
  }
  return dp[m][n];
}

/** Score de 0 à 100 entre le texte attendu et ce qui a été reconnu. */
export function pronunciationScore(expected: string, heard: string): number {
  const a = normalize(expected);
  const b = normalize(heard);
  if (!a || !b) return 0;
  const dist = levenshtein(a, b);
  const maxLen = Math.max(a.length, b.length);
  return Math.round((1 - dist / maxLen) * 100);
}

/**
 * Certaines traductions stockent plusieurs formulations acceptables,
 * ex. "ils / elles", "temps (durée / météo)", "je t'en prie / de rien".
 * Découpe ces variantes pour qu'une seule d'entre elles suffise à valider
 * la réponse, plutôt que d'exiger le texte complet mot pour mot.
 */
export function answerCandidates(raw: string): string[] {
  const stripEllipsis = (s: string) => s.replace(/(\.\.\.|…)\s*$/, "").trim();
  const withoutParens = raw.replace(/\([^)]*\)/g, " ");
  const parenContents = [...raw.matchAll(/\(([^)]*)\)/g)].map((m) => m[1]);

  const candidates = [withoutParens, ...parenContents]
    .flatMap((part) => part.split("/"))
    .map((part) => stripEllipsis(part))
    .filter(Boolean);

  return candidates.length ? candidates : [stripEllipsis(raw)];
}

/** Meilleur score parmi toutes les formulations acceptables de `expected`. */
export function bestAnswerScore(expected: string, given: string): number {
  const candidates = answerCandidates(expected);
  return Math.max(...candidates.map((c) => pronunciationScore(c, given)));
}
