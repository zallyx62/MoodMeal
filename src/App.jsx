// AVANT (dangereux — clé exposée)
const res = await fetch("https://api.anthropic.com/v1/messages", {
  headers: { "anthropic-dangerous-direct-browser-access": "true" },
  ...

// APRÈS (sécurisé — proxy serveur)
const res = await fetch("/api/generate", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ messages, max_tokens: maxTokens }),
});
const data = await res.json();
return data.text ?? "";
