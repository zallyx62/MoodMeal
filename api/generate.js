// api/generate.js — ES Module (compatible "type":"module" dans package.json)

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST")   return res.status(405).json({ error: "Method not allowed" });

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "GROQ_API_KEY manquante sur Vercel" });

  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch (_) { body = {}; }
  }

  const { prompt } = body || {};
  if (!prompt || typeof prompt !== "string" || prompt.length > 8000) {
    return res.status(400).json({ error: "Prompt invalide" });
  }

  try {
    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + apiKey,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 2000,
        temperature: 0.8,
        messages: [
          {
            role: "system",
            content: "Tu es un chef cuisinier expert. Reponds TOUJOURS uniquement avec du JSON brut valide, sans markdown, sans backticks, sans texte avant ou apres le JSON.",
          },
          { role: "user", content: prompt },
        ],
      }),
    });

    const raw = await groqRes.text();

    if (!groqRes.ok) {
      let msg = "Groq error " + groqRes.status;
      try { msg = JSON.parse(raw)?.error?.message || msg; } catch (_) {}
      return res.status(groqRes.status).json({ error: msg });
    }

    const data = JSON.parse(raw);
    const text = data?.choices?.[0]?.message?.content || "";
    return res.status(200).json({ content: [{ type: "text", text }] });

  } catch (err) {
    return res.status(500).json({ error: "Erreur serveur : " + (err.message || "inconnue") });
  }
}

