import type { ChatMessage } from "../types";

const API_URL = "https://api.anthropic.com/v1/messages";
const MODEL = "claude-sonnet-5";

export class ClaudeApiError extends Error {}

/**
 * Appelle directement l'API Claude depuis le navigateur avec la clé de
 * l'utilisateur (stockée uniquement en localStorage, jamais envoyée ailleurs
 * qu'à api.anthropic.com). Nécessite le header dédié aux appels navigateur.
 */
export async function sendMessage(
  apiKey: string,
  systemPrompt: string,
  messages: ChatMessage[],
): Promise<string> {
  if (!apiKey) {
    throw new ClaudeApiError(
      "Aucune clé API configurée. Renseigne ta clé Anthropic dans Réglages.",
    );
  }

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    if (res.status === 401) {
      throw new ClaudeApiError("Clé API invalide ou expirée.");
    }
    throw new ClaudeApiError(`Erreur API Claude (${res.status}) : ${body}`);
  }

  const data = await res.json();
  const text = data.content
    ?.filter((block: { type: string }) => block.type === "text")
    .map((block: { text: string }) => block.text)
    .join("\n");

  if (!text) {
    throw new ClaudeApiError("Réponse vide de l'API Claude.");
  }
  return text;
}
