module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "Cle GROQ_API_KEY manquante dans Vercel > Settings > Environment Variables" });

  const { prompt } = req.body || {};
  if (!prompt || typeof prompt !== "string") return res.status(400).json({ error: "Prompt invalide" });

  try {
    const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": "Bearer " + apiKey },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 2000,
        temperature: 0.8,
        messages: [
          { role: "system", content: "Tu es un chef cuisinier. Reponds UNIQUEMENT en JSON brut valide, sans markdown ni backticks." },
          { role: "user", content: prompt }
        ]
      }),
    });
    const raw = await r.text();
    if (!r.ok) { let m = "Groq " + r.status; try { m = JSON.parse(raw).error?.message || m; } catch (_) {} return res.status(r.status).json({ error: m }); }
    const text = JSON.parse(raw)?.choices?.[0]?.message?.content || "";
    return res.status(200).json({ content: [{ type: "text", text }] });
  } catch (e) {
    return res.status(500).json({ error: e.message || "Erreur serveur" });
  }
};
