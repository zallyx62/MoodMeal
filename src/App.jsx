import { useState, useCallback, useRef } from "react";

// ─── THEMES ────────────────────────────────────────────────────────────────
const THEMES = {
  light: {
    name: "Clair", icon: "☀️",
    bg: "#fdf8f3", surface: "#f5ede0", card: "#ffffff",
    border: "#e8d8c4", text: "#2d1f0e", subtext: "#8a7060",
    primary: "#e85d2f", primaryBg: "#fff1ec", primaryLight: "#fde8e0",
    chip: "#f5ede0", chipBorder: "#ddd0bc",
    shadow: "0 4px 20px rgba(100,50,20,0.12)",
    inputBg: "#fff",
    gradient: "linear-gradient(135deg, #fff1ec 0%, #fdf8f3 100%)",
    stepDone: "#e85d2f", stepActive: "#fff1ec", stepInactive: "#e8d8c4",
  },
  dark: {
    name: "Sombre", icon: "🌙",
    bg: "#0f0d0b", surface: "#1a1612", card: "#221e19",
    border: "#3a3028", text: "#f0e8dc", subtext: "#8a7a6a",
    primary: "#f0845a", primaryBg: "#2a1a10", primaryLight: "#3a2218",
    chip: "#1a1612", chipBorder: "#3a3028",
    shadow: "0 4px 20px rgba(0,0,0,0.5)",
    inputBg: "#1a1612",
    gradient: "linear-gradient(135deg, #2a1a10 0%, #0f0d0b 100%)",
    stepDone: "#f0845a", stepActive: "#2a1a10", stepInactive: "#3a3028",
  },
  night: {
    name: "Nuit", icon: "🌌",
    bg: "#04060f", surface: "#090d1e", card: "#0d1226",
    border: "#1c2644", text: "#dde6f8", subtext: "#6a82b0",
    primary: "#7fa7ff", primaryBg: "#0d1530", primaryLight: "#131d40",
    chip: "#090d1e", chipBorder: "#1c2644",
    shadow: "0 4px 20px rgba(0,0,100,0.3)",
    inputBg: "#090d1e",
    gradient: "linear-gradient(135deg, #0d1530 0%, #04060f 100%)",
    stepDone: "#7fa7ff", stepActive: "#0d1530", stepInactive: "#1c2644",
  },
};

// ─── DATA ──────────────────────────────────────────────────────────────────
const MOODS = [
  { id: "tired", emoji: "😴", label: "Fatigué(e)", desc: "Rapide & sans prise de tête", color: "#9b8fce" },
  { id: "happy", emoji: "😄", label: "Joyeux(se)", desc: "Festif & haut en couleur", color: "#f4a535" },
  { id: "stressed", emoji: "😤", label: "Stressé(e)", desc: "Réconfortant & doudou", color: "#e05a5a" },
  { id: "romantic", emoji: "🥰", label: "Romantique", desc: "Raffiné & savoureux", color: "#e06090" },
  { id: "adventurous", emoji: "🤩", label: "Aventurier(e)", desc: "Original & surprenant", color: "#3dba8a" },
];

const CATEGORIES = [
  { id: "legumes", label: "🥦 Légumes", items: ["Tomates","Carottes","Courgettes","Poivrons","Oignons","Ail","Épinards","Brocoli","Champignons","Aubergines","Haricots verts","Poireaux","Pommes de terre","Concombre","Betteraves","Asperges","Petits pois","Fenouil","Radis","Céleri"] },
  { id: "fruits", label: "🍎 Fruits", items: ["Citron","Orange","Pomme","Banane","Avocat","Ananas","Mangue","Fraises","Framboises","Raisins","Poires","Pêches","Tomates cerises","Kiwi","Grenade"] },
  { id: "viandes", label: "🥩 Viandes", items: ["Poulet","Bœuf haché","Lardons","Jambon","Dinde","Porc","Agneau","Saucisses","Chorizo","Bacon","Escalope de veau","Canard"] },
  { id: "mer", label: "🐟 Mer", items: ["Saumon","Thon (boîte)","Crevettes","Cabillaud","Sardines","Moules","Calamars","Truite","Maquereau","Coquilles St-Jacques"] },
  { id: "feculents", label: "🍝 Féculents", items: ["Pâtes","Riz","Quinoa","Lentilles","Pois chiches","Pain","Couscous","Gnocchis","Spaghettis","Tagliatelles","Polenta","Orge","Boulgour"] },
  { id: "laitiers", label: "🧀 Laitiers", items: ["Œufs","Fromage râpé","Crème fraîche","Beurre","Lait","Yaourt","Mozzarella","Parmesan","Feta","Ricotta","Gruyère","Mascarpone"] },
  { id: "epicerie", label: "🫙 Épicerie", items: ["Huile d'olive","Sauce tomate","Bouillon cube","Moutarde","Sauce soja","Curry","Cumin","Paprika","Herbes de Provence","Thym","Basilic","Sel & Poivre","Vinaigre balsamique","Miel","Lait de coco","Tahini"] },
];

const TIMES = [
  { id: "10", label: "⚡ 10 min", sub: "Ultra rapide" },
  { id: "20", label: "🕐 20 min", sub: "Express" },
  { id: "30", label: "🕑 30 min", sub: "Standard" },
  { id: "45", label: "🕓 45 min", sub: "Tranquille" },
  { id: "60+", label: "🍽️ 1h+", sub: "On prend son temps" },
];

const PREFS = [
  { id: "vegetarian", label: "🌿 Végétarien" },
  { id: "vegan", label: "🌱 Vegan" },
  { id: "glutenfree", label: "🌾 Sans gluten" },
  { id: "lactosefree", label: "🥛 Sans lactose" },
  { id: "spicy", label: "🌶️ Épicé" },
  { id: "light", label: "🥗 Léger" },
  { id: "comfort", label: "🫶 Comfort food" },
  { id: "quick", label: "⚡ Très rapide" },
];

function getMemberLabel(mode, index) {
  if (mode === "solo") return "Vous";
  if (mode === "duo") return index === 0 ? "Vous" : "Votre partenaire";
  const names = ["Membre 1","Membre 2","Membre 3","Membre 4","Membre 5","Membre 6","Membre 7","Membre 8","Membre 9","Membre 10"];
  return names[index] || `Membre ${index + 1}`;
}

// ─── API CALL HELPER ───────────────────────────────────────────────────────
async function callClaude(messages, maxTokens = 1500) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: maxTokens,
      messages,
    }),
  });
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData?.error?.message || `HTTP ${res.status}`);
  }
  const data = await res.json();
  return (data.content || []).map(c => c.text || "").join("");
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────
export default function MoodMeal() {
  const [theme, setTheme] = useState("light");
  const [step, setStep] = useState(0);
  const [mode, setMode] = useState(null);
  const [memberCount, setMemberCount] = useState(4);
  const [memberMoods, setMemberMoods] = useState({});
  const [currentMember, setCurrentMember] = useState(0);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [activeCategory, setActiveCategory] = useState("legumes");
  const [useShoppingList, setUseShoppingList] = useState(false);
  const [shoppingListText, setShoppingListText] = useState("");
  const [selectedTime, setSelectedTime] = useState("30");
  const [preferences, setPreferences] = useState([]);
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Photo states
  const [photoMode, setPhotoMode] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [analyzingPhoto, setAnalyzingPhoto] = useState(false);
  const [photoIngredients, setPhotoIngredients] = useState([]);
  const fileInputRef = useRef(null);

  const t = THEMES[theme];
  const totalMembers = mode === "solo" ? 1 : mode === "duo" ? 2 : memberCount;
  const stepLabels = ["Mode", "Humeur", "Ingrédients", "Temps", "Recette"];

  // ── Style helpers ──────────────────────────────────────────────────────
  const appStyle = {
    background: t.bg,
    minHeight: "100vh",
    color: t.text,
    fontFamily: "'Georgia', 'Times New Roman', serif",
    transition: "background 0.3s, color 0.3s",
  };

  const cardSty = (extra = {}) => ({
    background: t.card,
    border: `1px solid ${t.border}`,
    borderRadius: "18px",
    boxShadow: t.shadow,
    transition: "background 0.3s, border 0.3s",
    ...extra,
  });

  const chipSty = (selected, extra = {}) => ({
    background: selected ? t.primary : t.chip,
    color: selected ? "#fff" : t.text,
    border: `1px solid ${selected ? t.primary : t.chipBorder}`,
    borderRadius: "30px",
    padding: "6px 15px",
    fontSize: "13px",
    cursor: "pointer",
    transition: "all 0.15s ease",
    whiteSpace: "nowrap",
    outline: "none",
    fontFamily: "inherit",
    ...extra,
  });

  const primarySty = (disabled = false, extra = {}) => ({
    background: disabled ? t.chipBorder : t.primary,
    color: "#fff",
    border: "none",
    borderRadius: "14px",
    padding: "15px 26px",
    fontSize: "15px",
    fontWeight: "700",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    transition: "all 0.15s ease",
    fontFamily: "inherit",
    outline: "none",
    ...extra,
  });

  const secondarySty = (extra = {}) => ({
    background: t.chip,
    color: t.text,
    border: `1px solid ${t.border}`,
    borderRadius: "14px",
    padding: "15px 22px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.15s ease",
    fontFamily: "inherit",
    outline: "none",
    ...extra,
  });

  // ── Photo analysis ─────────────────────────────────────────────────────
  const handlePhotoCapture = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = ev.target.result.split(",")[1];
      const mediaType = file.type || "image/jpeg";
      setCapturedPhoto({ base64, mediaType, preview: ev.target.result });
      setPhotoMode(true);
    };
    reader.readAsDataURL(file);
  };

  const analyzePhoto = async () => {
    if (!capturedPhoto) return;
    setAnalyzingPhoto(true);
    try {
      const text = await callClaude([
        {
          role: "user",
          content: [
            {
              type: "image",
              source: { type: "base64", media_type: capturedPhoto.mediaType, data: capturedPhoto.base64 },
            },
            {
              type: "text",
              text: `Analyse cette photo de frigo ou d'ingrédients alimentaires. Liste tous les ingrédients alimentaires visibles, même partiellement. Réponds UNIQUEMENT avec un tableau JSON brut (pas de markdown, pas de backticks), comme: ["tomates","œufs","fromage","lait","carottes"]. Si ce n'est pas un frigo ou des aliments, réponds avec un tableau vide []. Sois exhaustif et précis.`,
            },
          ],
        },
      ], 500);

      const cleaned = text.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();
      const start = cleaned.indexOf("[");
      const end = cleaned.lastIndexOf("]");
      if (start === -1 || end === -1) throw new Error("Pas d'ingrédients détectés");
      const parsed = JSON.parse(cleaned.slice(start, end + 1));
      setPhotoIngredients(parsed);
    } catch (err) {
      setPhotoIngredients([]);
    } finally {
      setAnalyzingPhoto(false);
    }
  };

  const confirmPhotoIngredients = () => {
    const newIngredients = [...new Set([...selectedIngredients, ...photoIngredients])];
    setSelectedIngredients(newIngredients);
    setPhotoMode(false);
    setCapturedPhoto(null);
    setPhotoIngredients([]);
  };

  // ── Generate recipe ────────────────────────────────────────────────────
  const generateRecipe = useCallback(async () => {
    if (!selectedTime || loading) return;
    setLoading(true);
    setError(null);

    const moodsDesc = Array.from({ length: totalMembers }, (_, i) => {
      const mood = MOODS.find(m => m.id === memberMoods[i]);
      return `${getMemberLabel(mode, i)}: ${mood?.label || "neutre"} (${mood?.desc || ""})`;
    }).join(" | ");

    const ingredientsDesc = useShoppingList
      ? (shoppingListText.trim() || "ingrédients de base du placard")
      : (selectedIngredients.length > 0 ? selectedIngredients.join(", ") : "ingrédients de base du placard");

    const prefsDesc = preferences
      .map(p => PREFS.find(pr => pr.id === p)?.label || p)
      .join(", ") || "aucune restriction particulière";

    const prompt = `Tu es un chef cuisinier passionné et créatif. Génère une recette parfaitement adaptée à ces paramètres :

Mode : ${mode === "solo" ? "Solo (1 personne)" : mode === "duo" ? "Duo (2 personnes)" : `Famille (${totalMembers} personnes)`}
Humeurs : ${moodsDesc}
Ingrédients disponibles : ${ingredientsDesc}
Temps disponible : ${selectedTime} minutes
Préférences alimentaires : ${prefsDesc}

RÈGLES IMPORTANTES :
- Respecte ABSOLUMENT les préférences alimentaires
- Adapte les quantités exactement pour ${totalMembers} personne(s)
- Si le temps est court, propose une recette vraiment rapide
- Utilise en priorité les ingrédients listés
- Sois créatif et inspirant dans le nom et la description

Réponds UNIQUEMENT avec un objet JSON brut valide (pas de markdown, pas de backticks, juste le JSON) :
{
  "name": "Nom créatif et appétissant",
  "emoji": "un emoji parfait",
  "tagline": "phrase d'accroche courte et poétique",
  "moodMatch": "pourquoi cette recette correspond aux humeurs (20 mots max)",
  "difficulty": "Facile",
  "prepTime": "X min",
  "cookTime": "X min",
  "servings": ${totalMembers},
  "calories": "~XXX kcal/pers",
  "ingredients": [{"amount": "200g", "name": "nom de l'ingrédient"}],
  "steps": [{"num": 1, "title": "Titre court", "detail": "Instruction précise et détaillée", "tip": null}],
  "chefTip": "conseil du chef personnalisé et pratique",
  "moodColor": "#e85d2f"
}`;

    try {
      const rawText = await callClaude([{ role: "user", content: prompt }], 2000);
      const cleaned = rawText.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();
      const start = cleaned.indexOf("{");
      const end = cleaned.lastIndexOf("}");
      if (start === -1 || end === -1) throw new Error("Réponse JSON invalide");
      const parsed = JSON.parse(cleaned.slice(start, end + 1));
      setRecipe(parsed);
      setStep(4);
    } catch (err) {
      setError(`Une erreur est survenue : ${err.message}. Veuillez réessayer.`);
    } finally {
      setLoading(false);
    }
  }, [selectedTime, loading, totalMembers, memberMoods, mode, useShoppingList, shoppingListText, selectedIngredients, preferences]);

  // ── Reset ──────────────────────────────────────────────────────────────
  const fullReset = () => {
    setStep(0); setMode(null); setMemberMoods({}); setCurrentMember(0);
    setSelectedIngredients([]); setActiveCategory("legumes");
    setUseShoppingList(false); setShoppingListText("");
    setSelectedTime("30"); setPreferences([]);
    setRecipe(null); setError(null); setLoading(false);
    setPhotoMode(false); setCapturedPhoto(null); setPhotoIngredients([]);
  };

  // ── Inner components ────────────────────────────────────────────────────
  const ThemeBar = () => (
    <div style={{
      background: t.surface, borderBottom: `1px solid ${t.border}`,
      padding: "14px 24px", display: "flex", justifyContent: "space-between",
      alignItems: "center", position: "sticky", top: 0, zIndex: 100, backdropFilter: "blur(12px)",
    }}>
      <div onClick={step > 0 ? fullReset : undefined}
        style={{ fontWeight: "900", fontSize: "22px", cursor: step > 0 ? "pointer" : "default", letterSpacing: "-0.5px" }}>
        🍳 <span style={{ color: t.primary }}>Mood</span>Meal
      </div>
      <div style={{ display: "flex", gap: "6px" }}>
        {Object.entries(THEMES).map(([key, val]) => (
          <button key={key} onClick={() => setTheme(key)}
            style={{ ...chipSty(theme === key), borderRadius: "10px", padding: "6px 12px", fontSize: "12px" }}>
            {val.icon} {val.name}
          </button>
        ))}
      </div>
    </div>
  );

  const StepBar = () => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0", marginBottom: "32px" }}>
      {stepLabels.map((label, i) => {
        const done = i < step; const active = i === step;
        return (
          <div key={i} style={{ display: "flex", alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
              <div style={{
                width: active ? "36px" : "24px", height: "8px", borderRadius: "4px",
                background: done ? t.stepDone : active ? t.primary : t.stepInactive,
                transition: "all 0.3s ease",
              }} />
              {active && <div style={{ fontSize: "10px", color: t.primary, fontWeight: "700", letterSpacing: "0.5px" }}>{label.toUpperCase()}</div>}
            </div>
            {i < stepLabels.length - 1 && (
              <div style={{ width: "20px", height: "2px", background: done ? t.stepDone : t.stepInactive, margin: "0 4px", marginBottom: active ? "14px" : "0" }} />
            )}
          </div>
        );
      })}
    </div>
  );

  const wrap = { maxWidth: "600px", margin: "0 auto", padding: "32px 20px 60px" };

  // ─── PHOTO MODAL ──────────────────────────────────────────────────────
  if (photoMode) {
    return (
      <div style={appStyle}>
        <ThemeBar />
        <div style={wrap}>
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <div style={{ fontSize: "48px", marginBottom: "10px" }}>📸</div>
            <h2 style={{ fontSize: "24px", fontWeight: "900", margin: "0 0 8px", letterSpacing: "-0.5px" }}>
              Analyse de <span style={{ color: t.primary }}>ton frigo</span>
            </h2>
            <p style={{ color: t.subtext, fontSize: "14px", fontStyle: "italic", margin: 0 }}>
              L'IA détecte automatiquement tes ingrédients
            </p>
          </div>

          {capturedPhoto && (
            <div style={{ ...cardSty(), overflow: "hidden", marginBottom: "18px" }}>
              <img src={capturedPhoto.preview} alt="Frigo"
                style={{ width: "100%", maxHeight: "280px", objectFit: "cover", display: "block" }} />
            </div>
          )}

          {!analyzingPhoto && photoIngredients.length === 0 && capturedPhoto && (
            <button onClick={analyzePhoto} style={{ ...primarySty(false), width: "100%", marginBottom: "12px", fontSize: "16px" }}>
              🔍 Analyser les ingrédients
            </button>
          )}

          {analyzingPhoto && (
            <div style={{ ...cardSty({ background: t.primaryBg, borderColor: t.primary + "50" }), padding: "24px", textAlign: "center", marginBottom: "18px" }}>
              <div style={{ fontSize: "36px", marginBottom: "10px", display: "inline-block", animation: "spin 1.5s linear infinite" }}>🔍</div>
              <p style={{ color: t.primary, fontWeight: "700", margin: 0 }}>Analyse en cours...</p>
              <p style={{ color: t.subtext, fontSize: "13px", marginTop: "6px", fontStyle: "italic" }}>L'IA identifie tes ingrédients</p>
            </div>
          )}

          {photoIngredients.length > 0 && (
            <div style={{ ...cardSty(), padding: "20px", marginBottom: "18px" }}>
              <div style={{ fontWeight: "800", fontSize: "15px", marginBottom: "12px", color: t.primary }}>
                ✅ {photoIngredients.length} ingrédient{photoIngredients.length > 1 ? "s" : ""} détecté{photoIngredients.length > 1 ? "s" : ""}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
                {photoIngredients.map((ing, i) => (
                  <span key={i} style={{
                    ...chipSty(true),
                    display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "13px",
                  }}>
                    {ing}
                    <span onClick={() => setPhotoIngredients(prev => prev.filter((_, j) => j !== i))}
                      style={{ cursor: "pointer", opacity: 0.8, fontWeight: "900" }}>×</span>
                  </span>
                ))}
              </div>
              <button onClick={confirmPhotoIngredients} style={{ ...primarySty(false), width: "100%" }}>
                ✅ Ajouter ces ingrédients →
              </button>
            </div>
          )}

          {photoIngredients.length === 0 && !analyzingPhoto && capturedPhoto && (
            <div style={{ marginBottom: "12px" }}>
              <label style={{
                display: "block", textAlign: "center",
                ...secondarySty({ width: "100%", boxSizing: "border-box", cursor: "pointer" }),
              }}>
                📷 Reprendre une photo
                <input type="file" accept="image/*" capture="environment"
                  onChange={handlePhotoCapture} style={{ display: "none" }} />
              </label>
            </div>
          )}

          <button onClick={() => { setPhotoMode(false); setCapturedPhoto(null); setPhotoIngredients([]); }}
            style={secondarySty({ width: "100%" })}>
            ← Retour
          </button>
        </div>
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // ─── STEP 0: LANDING ──────────────────────────────────────────────────
  if (step === 0) return (
    <div style={appStyle}>
      <ThemeBar />
      <div style={{ ...wrap, maxWidth: "580px" }}>
        <div style={{ textAlign: "center", padding: "40px 0 36px" }}>
          <div style={{ fontSize: "80px", marginBottom: "16px", filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.15))" }}>🍽️</div>
          <h1 style={{ fontSize: "38px", fontWeight: "900", margin: "0 0 14px", lineHeight: "1.15", letterSpacing: "-1px" }}>
            Quoi manger <span style={{ color: t.primary }}>ce soir ?</span>
          </h1>
          <p style={{ color: t.subtext, fontSize: "17px", lineHeight: "1.7", margin: 0, fontStyle: "italic" }}>
            Dis-nous comment tu te sens et ce qu'il y a dans ton frigo.<br />
            On génère la recette parfaite. 🧑‍🍳
          </p>
        </div>

        <h2 style={{ fontSize: "18px", fontWeight: "800", marginBottom: "16px", letterSpacing: "-0.3px" }}>
          On cuisine pour qui ce soir ?
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px", marginBottom: "20px" }}>
          {[
            { id: "solo", emoji: "🧑‍🍳", label: "Solo", sub: "Juste pour moi" },
            { id: "duo", emoji: "👫", label: "Duo", sub: "En couple" },
            { id: "family", emoji: "👨‍👩‍👧", label: "Famille", sub: "À plusieurs" },
          ].map(m => (
            <button key={m.id} onClick={() => { setMode(m.id); setMemberMoods({}); setCurrentMember(0); }}
              style={{
                background: mode === m.id ? t.primaryBg : t.card,
                border: `2px solid ${mode === m.id ? t.primary : t.border}`,
                borderRadius: "18px", padding: "22px 8px", cursor: "pointer",
                textAlign: "center", color: t.text, transition: "all 0.2s ease",
                fontFamily: "inherit", outline: "none",
                transform: mode === m.id ? "scale(1.02)" : "scale(1)",
                boxShadow: mode === m.id ? `0 0 0 4px ${t.primaryBg}` : "none",
              }}>
              <div style={{ fontSize: "36px", marginBottom: "8px" }}>{m.emoji}</div>
              <div style={{ fontWeight: "800", fontSize: "16px" }}>{m.label}</div>
              <div style={{ color: t.subtext, fontSize: "12px", marginTop: "3px" }}>{m.sub}</div>
            </button>
          ))}
        </div>

        {mode === "family" && (
          <div style={{ ...cardSty(), padding: "22px", marginBottom: "20px" }}>
            <p style={{ margin: "0 0 14px", fontWeight: "700", fontSize: "15px" }}>Combien de personnes à table ? 🍴</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {Array.from({ length: 10 }, (_, i) => i + 1).map(n => (
                <button key={n} onClick={() => setMemberCount(n)}
                  style={{ ...chipSty(memberCount === n), padding: "8px 16px", fontSize: "14px" }}>
                  {n} {n === 1 ? "personne" : "personnes"}
                </button>
              ))}
            </div>
          </div>
        )}

        <button onClick={() => mode && setStep(1)} style={{ ...primarySty(!mode), width: "100%", padding: "18px", fontSize: "17px" }}>
          C'est parti ! 🚀
        </button>
        {!mode && (
          <p style={{ textAlign: "center", color: t.subtext, fontSize: "13px", marginTop: "12px" }}>
            Sélectionne un mode pour commencer
          </p>
        )}
      </div>
    </div>
  );

  // ─── STEP 1: MOOD ─────────────────────────────────────────────────────
  if (step === 1) {
    const curMood = memberMoods[currentMember];
    return (
      <div style={appStyle}>
        <ThemeBar />
        <div style={wrap}>
          <StepBar />
          {totalMembers > 1 && (
            <div style={{ display: "flex", gap: "10px", marginBottom: "28px", justifyContent: "center", flexWrap: "wrap" }}>
              {Array.from({ length: totalMembers }, (_, i) => (
                <div key={i} onClick={() => setCurrentMember(i)} title={getMemberLabel(mode, i)}
                  style={{
                    width: "40px", height: "40px", borderRadius: "50%",
                    background: memberMoods[i] ? (MOODS.find(m => m.id === memberMoods[i])?.color || t.primary) : (i === currentMember ? t.primaryBg : t.chip),
                    border: `2px solid ${i === currentMember ? t.primary : (memberMoods[i] ? "transparent" : t.border)}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "13px", fontWeight: "800",
                    color: memberMoods[i] ? "#fff" : t.subtext,
                    cursor: "pointer", transition: "all 0.2s ease",
                    boxShadow: i === currentMember ? `0 0 0 3px ${t.primaryBg}` : "none",
                  }}>
                  {memberMoods[i] ? MOODS.find(m => m.id === memberMoods[i])?.emoji : i + 1}
                </div>
              ))}
            </div>
          )}

          <h2 style={{ fontSize: "24px", fontWeight: "900", marginBottom: "6px", letterSpacing: "-0.5px" }}>
            {getMemberLabel(mode, currentMember)},<br />
            <span style={{ color: t.primary }}>comment tu te sens ?</span>
          </h2>
          <p style={{ color: t.subtext, marginBottom: "22px", fontSize: "15px", fontStyle: "italic" }}>
            On adapte la recette à ton humeur du moment.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
            {MOODS.map(mood => (
              <button key={mood.id}
                onClick={() => setMemberMoods(prev => ({ ...prev, [currentMember]: mood.id }))}
                style={{
                  background: curMood === mood.id ? mood.color + "20" : t.card,
                  border: `2px solid ${curMood === mood.id ? mood.color : t.border}`,
                  borderRadius: "16px", padding: "16px 20px", cursor: "pointer",
                  textAlign: "left", display: "flex", alignItems: "center", gap: "16px",
                  color: t.text, transition: "all 0.15s ease", fontFamily: "inherit", outline: "none",
                  transform: curMood === mood.id ? "translateX(4px)" : "translateX(0)",
                }}>
                <span style={{ fontSize: "38px", flexShrink: 0 }}>{mood.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: "800", fontSize: "16px" }}>{mood.label}</div>
                  <div style={{ color: t.subtext, fontSize: "13px", marginTop: "2px", fontStyle: "italic" }}>{mood.desc}</div>
                </div>
                {curMood === mood.id && (
                  <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: mood.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "14px", fontWeight: "900", flexShrink: 0 }}>✓</div>
                )}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={() => { if (currentMember > 0) setCurrentMember(p => p - 1); else setStep(0); }}
              style={secondarySty({ flex: "0 0 auto" })}>← Retour</button>
            <button
              onClick={() => { if (currentMember < totalMembers - 1) setCurrentMember(p => p + 1); else { setStep(2); setCurrentMember(0); } }}
              style={primarySty(!curMood, { flex: 1 })}>
              {currentMember < totalMembers - 1 ? "Membre suivant →" : "Choisir les ingrédients →"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── STEP 2: INGREDIENTS ─────────────────────────────────────────────
  if (step === 2) {
    const canContinue = useShoppingList ? shoppingListText.trim().length > 0 : true;
    return (
      <div style={appStyle}>
        <ThemeBar />
        <div style={wrap}>
          <StepBar />

          <h2 style={{ fontSize: "24px", fontWeight: "900", marginBottom: "6px", letterSpacing: "-0.5px" }}>
            Qu'est-ce qu'il y a<br />
            <span style={{ color: t.primary }}>dans ton frigo ?</span>
          </h2>
          <p style={{ color: t.subtext, marginBottom: "22px", fontSize: "15px", fontStyle: "italic" }}>
            Sélectionne tes ingrédients, colle ta liste, ou prends une photo !
          </p>

          {/* 3-way toggle */}
          <div style={{ display: "flex", background: t.chip, borderRadius: "14px", padding: "4px", marginBottom: "22px" }}>
            {[
              { id: "fridge", label: "🧊 Mon frigo", isPhoto: false, isList: false },
              { id: "list", label: "🛒 Ma liste", isPhoto: false, isList: true },
              { id: "photo", label: "📸 Photo", isPhoto: true, isList: false },
            ].map(opt => {
              const isActive = opt.isPhoto ? false : (useShoppingList === opt.isList);
              return (
                <button key={opt.id}
                  onClick={() => {
                    if (opt.isPhoto) {
                      fileInputRef.current?.click();
                    } else {
                      setUseShoppingList(opt.isList);
                    }
                  }}
                  style={{
                    flex: 1,
                    background: isActive ? t.card : "transparent",
                    border: `1px solid ${isActive ? t.border : "transparent"}`,
                    borderRadius: "11px", padding: "10px", cursor: "pointer",
                    color: t.text, fontWeight: "700", fontSize: "13px",
                    transition: "all 0.2s ease", fontFamily: "inherit", outline: "none",
                    boxShadow: isActive ? t.shadow : "none",
                  }}>{opt.label}</button>
              );
            })}
          </div>

          {/* Hidden file input for photo */}
          <input ref={fileInputRef} type="file" accept="image/*" capture="environment"
            onChange={handlePhotoCapture} style={{ display: "none" }} />

          {/* Photo ingredients added banner */}
          {selectedIngredients.length > 0 && selectedIngredients.some(i => !CATEGORIES.flatMap(c => c.items).includes(i)) && (
            <div style={{ ...cardSty({ background: "#3dba8a18", borderColor: "#3dba8a60" }), padding: "12px 16px", marginBottom: "14px", display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "20px" }}>📸</span>
              <span style={{ fontSize: "13px", color: t.text }}>
                Des ingrédients ont été ajoutés via photo !
              </span>
            </div>
          )}

          {!useShoppingList ? (
            <>
              <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "10px", marginBottom: "16px", scrollbarWidth: "none" }}>
                {CATEGORIES.map(cat => (
                  <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                    style={{ ...chipSty(activeCategory === cat.id), flexShrink: 0, borderRadius: "12px", padding: "8px 14px" }}>
                    {cat.label}
                  </button>
                ))}
              </div>

              <div style={{ ...cardSty(), padding: "18px", marginBottom: "16px" }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {CATEGORIES.find(c => c.id === activeCategory)?.items.map(item => (
                    <button key={item}
                      onClick={() => setSelectedIngredients(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item])}
                      style={chipSty(selectedIngredients.includes(item))}>
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {selectedIngredients.length > 0 && (
                <div style={{ ...cardSty({ background: t.primaryBg, borderColor: t.primary + "60" }), padding: "14px 18px", marginBottom: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                    <span style={{ fontWeight: "700", fontSize: "14px", color: t.primary }}>
                      ✅ {selectedIngredients.length} ingrédient{selectedIngredients.length > 1 ? "s" : ""}
                    </span>
                    <button onClick={() => setSelectedIngredients([])}
                      style={{ background: "none", border: "none", color: t.subtext, cursor: "pointer", fontSize: "12px", fontFamily: "inherit", padding: "2px 6px" }}>
                      Tout effacer
                    </button>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {selectedIngredients.map(item => (
                      <span key={item} style={{ ...chipSty(true), fontSize: "12px", padding: "4px 10px", display: "inline-flex", alignItems: "center", gap: "5px" }}>
                        {item}
                        <span onClick={() => setSelectedIngredients(prev => prev.filter(i => i !== item))}
                          style={{ cursor: "pointer", opacity: 0.8, fontWeight: "900", lineHeight: 1 }}>×</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedIngredients.length === 0 && (
                <p style={{ color: t.subtext, fontSize: "13px", textAlign: "center", marginBottom: "16px", fontStyle: "italic" }}>
                  Aucun ingrédient ? On improvise avec les basiques ! 👨‍🍳
                </p>
              )}
            </>
          ) : (
            <div style={{ marginBottom: "16px" }}>
              <p style={{ color: t.subtext, fontSize: "14px", marginBottom: "10px", fontStyle: "italic" }}>
                Tape ou colle ta liste (séparés par virgule ou à la ligne)
              </p>
              <textarea
                value={shoppingListText}
                onChange={e => setShoppingListText(e.target.value.slice(0, 2000))}
                placeholder="Ex: tomates, pâtes, œufs, fromage, oignons, basilic..."
                style={{
                  width: "100%", height: "160px",
                  background: t.inputBg, border: `1px solid ${t.border}`,
                  borderRadius: "14px", padding: "16px", color: t.text,
                  fontSize: "15px", resize: "vertical", boxSizing: "border-box",
                  fontFamily: "inherit", outline: "none", lineHeight: "1.6",
                }}
              />
              <p style={{ color: t.subtext, fontSize: "12px", marginTop: "6px", textAlign: "right" }}>
                {shoppingListText.length}/2000
              </p>
            </div>
          )}

          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={() => setStep(1)} style={secondarySty({ flex: "0 0 auto" })}>← Retour</button>
            <button onClick={() => setStep(3)} style={primarySty(!canContinue, { flex: 1 })}>
              Choisir le temps →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── STEP 3: TIME & PREFERENCES ──────────────────────────────────────
  if (step === 3) {
    return (
      <div style={appStyle}>
        <ThemeBar />
        <div style={wrap}>
          <StepBar />

          <h2 style={{ fontSize: "24px", fontWeight: "900", marginBottom: "6px", letterSpacing: "-0.5px" }}>
            Combien de temps<br /><span style={{ color: t.primary }}>tu as devant toi ?</span>
          </h2>
          <p style={{ color: t.subtext, marginBottom: "22px", fontSize: "15px", fontStyle: "italic" }}>
            On adapte la complexité de la recette à ton planning.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "30px" }}>
            {TIMES.map(time => (
              <button key={time.id} onClick={() => setSelectedTime(time.id)}
                style={{
                  background: selectedTime === time.id ? t.primaryBg : t.card,
                  border: `2px solid ${selectedTime === time.id ? t.primary : t.border}`,
                  borderRadius: "16px", padding: "18px 14px", cursor: "pointer",
                  textAlign: "center", color: t.text, transition: "all 0.15s ease",
                  fontFamily: "inherit", outline: "none",
                  transform: selectedTime === time.id ? "scale(1.02)" : "scale(1)",
                }}>
                <div style={{ fontWeight: "800", fontSize: "20px", marginBottom: "4px" }}>{time.label}</div>
                <div style={{ color: t.subtext, fontSize: "13px", fontStyle: "italic" }}>{time.sub}</div>
              </button>
            ))}
          </div>

          <h3 style={{ fontSize: "17px", fontWeight: "800", marginBottom: "14px" }}>Préférences alimentaires</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "32px" }}>
            {PREFS.map(pref => (
              <button key={pref.id}
                onClick={() => setPreferences(prev => prev.includes(pref.id) ? prev.filter(p => p !== pref.id) : [...prev, pref.id])}
                style={chipSty(preferences.includes(pref.id), { padding: "8px 16px", fontSize: "14px" })}>
                {pref.label}
              </button>
            ))}
          </div>

          {error && (
            <div style={{ background: "#fee2e2", border: "1px solid #ef4444", borderRadius: "12px", padding: "14px 18px", marginBottom: "18px", color: "#dc2626", fontSize: "14px", lineHeight: "1.5" }}>
              ⚠️ {error}
            </div>
          )}

          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={() => setStep(2)} style={secondarySty({ flex: "0 0 auto" })}>← Retour</button>
            <button onClick={generateRecipe} disabled={loading}
              style={primarySty(loading || !selectedTime, { flex: 1, position: "relative" })}>
              {loading ? (
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                  <span style={{ display: "inline-block", animation: "spin 1s linear infinite", fontSize: "18px" }}>⏳</span>
                  Génération en cours...
                </span>
              ) : "🍳 Générer ma recette !"}
            </button>
          </div>

          {loading && (
            <p style={{ textAlign: "center", color: t.subtext, fontSize: "13px", marginTop: "14px", fontStyle: "italic" }}>
              Notre chef IA cuisine ta recette personnalisée... 🧑‍🍳
            </p>
          )}
        </div>
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // ─── STEP 4: RECIPE ──────────────────────────────────────────────────
  if (step === 4 && recipe) {
    const accentColor = recipe.moodColor || t.primary;
    const diffColors = { "Facile": "#3dba8a", "Moyen": "#f4a535", "Avancé": "#e05a5a" };
    const diffColor = diffColors[recipe.difficulty] || t.primary;

    return (
      <div style={appStyle}>
        <ThemeBar />
        <div style={{ ...wrap, maxWidth: "660px" }}>

          <div style={{ ...cardSty({ background: accentColor + "18", borderColor: accentColor + "40" }), padding: "32px 28px", marginBottom: "20px", textAlign: "center" }}>
            <div style={{ fontSize: "72px", marginBottom: "14px", filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.15))" }}>
              {recipe.emoji || "🍽️"}
            </div>
            <h1 style={{ fontSize: "30px", fontWeight: "900", margin: "0 0 10px", letterSpacing: "-0.5px", lineHeight: "1.2", color: t.text }}>
              {recipe.name}
            </h1>
            <p style={{ color: t.subtext, fontSize: "16px", margin: "0 0 18px", fontStyle: "italic" }}>{recipe.tagline}</p>
            <div style={{ display: "inline-block", background: accentColor + "25", border: `1px solid ${accentColor + "60"}`, borderRadius: "30px", padding: "8px 18px" }}>
              <span style={{ color: accentColor, fontSize: "14px", fontWeight: "700" }}>💡 {recipe.moodMatch}</span>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", marginBottom: "20px" }}>
            {[
              { label: "Prépa", value: recipe.prepTime, icon: "🔪" },
              { label: "Cuisson", value: recipe.cookTime, icon: "🔥" },
              { label: "Difficulté", value: recipe.difficulty, icon: "⭐", color: diffColor },
              { label: "Portions", value: `${recipe.servings || totalMembers} pers.`, icon: "🍽️" },
            ].map(stat => (
              <div key={stat.label} style={{ ...cardSty(), padding: "14px 8px", textAlign: "center" }}>
                <div style={{ fontSize: "22px", marginBottom: "5px" }}>{stat.icon}</div>
                <div style={{ fontWeight: "800", fontSize: "13px", color: stat.color || t.text, lineHeight: "1.2" }}>{stat.value}</div>
                <div style={{ color: t.subtext, fontSize: "10px", marginTop: "3px", textTransform: "uppercase", letterSpacing: "0.5px" }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {recipe.calories && (
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <span style={{ ...chipSty(false), fontSize: "13px" }}>🔥 {recipe.calories} par personne</span>
            </div>
          )}

          <div style={{ ...cardSty(), padding: "22px", marginBottom: "16px" }}>
            <h2 style={{ fontSize: "19px", fontWeight: "900", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
              🛒 Ingrédients
              <span style={{ fontSize: "13px", fontWeight: "600", color: t.subtext, background: t.chip, borderRadius: "20px", padding: "2px 10px" }}>
                Pour {recipe.servings || totalMembers} pers.
              </span>
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {(recipe.ingredients || []).map((ing, idx) => (
                <div key={idx} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "10px 14px",
                  background: idx % 2 === 0 ? t.chip : "transparent", borderRadius: "10px",
                }}>
                  <span style={{ fontWeight: "500", fontSize: "15px" }}>{ing.name}</span>
                  <span style={{ color: t.primary, fontWeight: "800", fontSize: "14px", background: t.primaryBg, padding: "3px 10px", borderRadius: "20px" }}>
                    {ing.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ ...cardSty(), padding: "22px", marginBottom: "16px" }}>
            <h2 style={{ fontSize: "19px", fontWeight: "900", marginBottom: "18px" }}>📋 Étapes de préparation</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {(recipe.steps || []).map((recipeStep, idx) => (
                <div key={idx} style={{ display: "flex", gap: "16px" }}>
                  <div style={{
                    width: "34px", height: "34px", borderRadius: "50%",
                    background: t.primary, color: "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: "900", fontSize: "14px", flexShrink: 0,
                    boxShadow: `0 2px 8px ${t.primary}50`,
                  }}>{recipeStep.num || idx + 1}</div>
                  <div style={{ flex: 1, paddingTop: "5px" }}>
                    <div style={{ fontWeight: "800", fontSize: "15px", marginBottom: "5px" }}>{recipeStep.title}</div>
                    <div style={{ color: t.subtext, fontSize: "14px", lineHeight: "1.7" }}>{recipeStep.detail}</div>
                    {recipeStep.tip && (
                      <div style={{ marginTop: "8px", padding: "8px 12px", background: t.primaryBg, borderRadius: "8px", fontSize: "13px", color: t.primary, fontStyle: "italic" }}>
                        💡 {recipeStep.tip}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {recipe.chefTip && (
            <div style={{ ...cardSty({ background: t.primaryBg, borderColor: t.primary + "50" }), padding: "18px 22px", marginBottom: "24px" }}>
              <div style={{ fontWeight: "800", color: t.primary, marginBottom: "6px", fontSize: "15px" }}>👨‍🍳 Conseil du chef</div>
              <p style={{ margin: 0, color: t.text, fontSize: "14px", lineHeight: "1.7" }}>{recipe.chefTip}</p>
            </div>
          )}

          <div style={{ ...cardSty(), padding: "16px 22px", marginBottom: "24px" }}>
            <div style={{ fontWeight: "700", fontSize: "14px", marginBottom: "10px", color: t.subtext }}>Recette générée pour :</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {Array.from({ length: totalMembers }, (_, i) => {
                const mood = MOODS.find(m => m.id === memberMoods[i]);
                return (
                  <span key={i} style={{ ...chipSty(false), background: mood?.color + "20", borderColor: mood?.color + "50", color: t.text, fontSize: "13px" }}>
                    {mood?.emoji} {getMemberLabel(mode, i)} — {mood?.label}
                  </span>
                );
              })}
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={() => { setRecipe(null); setError(null); generateRecipe(); }}
              style={secondarySty({ flex: 1 })}>🔄 Autre recette</button>
            <button onClick={fullReset} style={primarySty(false, { flex: 1 })}>🏠 Recommencer</button>
          </div>
        </div>

        <style>{`
          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
          ::-webkit-scrollbar { display: none; }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ ...appStyle, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" }}>
      🍳 Chargement...
    </div>
  );
    }
