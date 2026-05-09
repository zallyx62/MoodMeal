import { useState, useCallback } from "react";

const THEMES = {
  light: { name:"Clair",icon:"☀️",bg:"#fdf8f3",surface:"#f5ede0",card:"#ffffff",border:"#e8d8c4",text:"#2d1f0e",subtext:"#8a7060",primary:"#e85d2f",primaryBg:"#fff1ec",chip:"#f5ede0",chipBorder:"#ddd0bc",shadow:"0 4px 20px rgba(100,50,20,0.12)",inputBg:"#fff",stepDone:"#e85d2f",stepInactive:"#e8d8c4",success:"#3dba8a",successBg:"#e8faf4" },
  dark:  { name:"Sombre",icon:"🌙",bg:"#0f0d0b",surface:"#1a1612",card:"#221e19",border:"#3a3028",text:"#f0e8dc",subtext:"#8a7a6a",primary:"#f0845a",primaryBg:"#2a1a10",chip:"#1a1612",chipBorder:"#3a3028",shadow:"0 4px 20px rgba(0,0,0,0.5)",inputBg:"#1a1612",stepDone:"#f0845a",stepInactive:"#3a3028",success:"#3dba8a",successBg:"#0d2a1e" },
  night: { name:"Nuit",icon:"🌌",bg:"#04060f",surface:"#090d1e",card:"#0d1226",border:"#1c2644",text:"#dde6f8",subtext:"#6a82b0",primary:"#7fa7ff",primaryBg:"#0d1530",chip:"#090d1e",chipBorder:"#1c2644",shadow:"0 4px 20px rgba(0,0,100,0.3)",inputBg:"#090d1e",stepDone:"#7fa7ff",stepInactive:"#1c2644",success:"#5ddba8",successBg:"#061a14" },
};

const MOODS = [
  { id:"tired",      emoji:"😴",label:"Fatigué(e)",   desc:"Rapide & sans prise de tête",color:"#9b8fce" },
  { id:"happy",      emoji:"😄",label:"Joyeux(se)",   desc:"Festif & haut en couleur",   color:"#f4a535" },
  { id:"stressed",   emoji:"😤",label:"Stressé(e)",   desc:"Réconfortant & doudou",       color:"#e05a5a" },
  { id:"romantic",   emoji:"🥰",label:"Romantique",   desc:"Raffiné & savoureux",         color:"#e06090" },
  { id:"adventurous",emoji:"🤩",label:"Aventurier(e)",desc:"Original & surprenant",       color:"#3dba8a" },
];

const CATEGORIES = [
  { id:"legumes",  label:"🥦 Légumes",  items:["Tomates","Carottes","Courgettes","Poivrons","Oignons","Ail","Épinards","Brocoli","Champignons","Aubergines","Haricots verts","Poireaux","Pommes de terre","Concombre","Betteraves","Asperges","Petits pois","Fenouil","Radis","Céleri"] },
  { id:"fruits",   label:"🍎 Fruits",   items:["Citron","Orange","Pomme","Banane","Avocat","Ananas","Mangue","Fraises","Framboises","Raisins","Poires","Pêches","Tomates cerises","Kiwi","Grenade"] },
  { id:"viandes",  label:"🥩 Viandes",  items:["Poulet","Bœuf haché","Lardons","Jambon","Dinde","Porc","Agneau","Saucisses","Chorizo","Bacon","Escalope de veau","Canard"] },
  { id:"mer",      label:"🐟 Mer",      items:["Saumon","Thon (boîte)","Crevettes","Cabillaud","Sardines","Moules","Calamars","Truite","Maquereau","Coquilles St-Jacques"] },
  { id:"feculents",label:"🍝 Féculents",items:["Pâtes","Riz","Quinoa","Lentilles","Pois chiches","Pain","Couscous","Gnocchis","Spaghettis","Tagliatelles","Polenta","Orge","Boulgour"] },
  { id:"laitiers", label:"🧀 Laitiers", items:["Œufs","Fromage râpé","Crème fraîche","Beurre","Lait","Yaourt","Mozzarella","Parmesan","Feta","Ricotta","Gruyère","Mascarpone"] },
  { id:"epicerie", label:"🫙 Épicerie", items:["Huile d'olive","Sauce tomate","Bouillon cube","Moutarde","Sauce soja","Curry","Cumin","Paprika","Herbes de Provence","Thym","Basilic","Sel & Poivre","Vinaigre balsamique","Miel","Lait de coco","Tahini"] },
];

const TIMES = [
  { id:"10", label:"⚡ 10 min",sub:"Ultra rapide" },
  { id:"20", label:"🕐 20 min",sub:"Express" },
  { id:"30", label:"🕑 30 min",sub:"Standard" },
  { id:"45", label:"🕓 45 min",sub:"Tranquille" },
  { id:"60+",label:"🍽️ 1h+",  sub:"On prend son temps" },
];

const PREFS = [
  { id:"vegetarian",label:"🌿 Végétarien" },
  { id:"vegan",     label:"🌱 Vegan" },
  { id:"glutenfree",label:"🌾 Sans gluten" },
  { id:"lactosefree",label:"🥛 Sans lactose" },
  { id:"spicy",     label:"🌶️ Épicé" },
  { id:"light",     label:"🥗 Léger" },
  { id:"comfort",   label:"🫶 Comfort food" },
  { id:"quick",     label:"⚡ Très rapide" },
];

const CUISINES = [
  { id:"any",          label:"🌍 Au choix",       desc:"L'IA décide" },
  { id:"french",       label:"🥐 Française",      desc:"Bistrot & terroir" },
  { id:"italian",      label:"🍕 Italienne",      desc:"Pasta & pizza" },
  { id:"asian",        label:"🍜 Asiatique",      desc:"Wok & épices" },
  { id:"mexican",      label:"🌮 Mexicaine",      desc:"Tacos & guac" },
  { id:"mediterranean",label:"🫒 Méditerranéenne",desc:"Huile & fraîcheur" },
  { id:"indian",       label:"🍛 Indienne",       desc:"Curry & saveurs" },
  { id:"japanese",     label:"🍣 Japonaise",      desc:"Umami & précision" },
  { id:"american",     label:"🍔 Américaine",     desc:"Généreux & gourmand" },
  { id:"moroccan",     label:"🫕 Marocaine",      desc:"Tajine & épices" },
];

const BUDGETS = [
  { id:"eco",   label:"💰 Économique",  desc:"< 5 €/pers",  color:"#3dba8a" },
  { id:"normal",label:"💶 Normal",      desc:"5–12 €/pers", color:"#f4a535" },
  { id:"gastro",label:"💎 Gastronomique",desc:"> 12 €/pers",color:"#e06090" },
];

function getMemberLabel(mode, i) {
  if (mode === "solo") return "Vous";
  if (mode === "duo") return i === 0 ? "Vous" : "Votre partenaire";
  return `Membre ${i + 1}`;
}
function randomChoice(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

export default function MoodMeal() {
  const [theme, setTheme]   = useState("light");
  const [step, setStep]     = useState(0);
  const [mode, setMode]     = useState(null);
  const [memberCount, setMemberCount] = useState(4);
  const [memberMoods, setMemberMoods] = useState({});
  const [currentMember, setCurrentMember] = useState(0);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [activeCategory, setActiveCategory] = useState("legumes");
  const [useShoppingList, setUseShoppingList] = useState(false);
  const [shoppingListText, setShoppingListText] = useState("");
  const [selectedTime, setSelectedTime] = useState("30");
  const [preferences, setPreferences] = useState([]);
  const [cuisine, setCuisine] = useState("any");
  const [budget, setBudget]   = useState("normal");
  const [recipe, setRecipe]   = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);
  const [copied, setCopied]   = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const t = THEMES[theme];
  const totalMembers = mode === "solo" ? 1 : mode === "duo" ? 2 : memberCount;
  const stepLabels = ["Mode","Humeur","Ingrédients","Options","Recette"];

  const app  = { background:t.bg,minHeight:"100vh",color:t.text,fontFamily:"'Georgia','Times New Roman',serif",transition:"background 0.3s,color 0.3s" };
  const card = (x={}) => ({ background:t.card,border:`1px solid ${t.border}`,borderRadius:"18px",boxShadow:t.shadow,transition:"background 0.3s,border 0.3s",...x });
  const chip = (sel,x={}) => ({ background:sel?t.primary:t.chip,color:sel?"#fff":t.text,border:`1px solid ${sel?t.primary:t.chipBorder}`,borderRadius:"30px",padding:"6px 15px",fontSize:"13px",cursor:"pointer",transition:"all 0.15s",whiteSpace:"nowrap",outline:"none",fontFamily:"inherit",...x });
  const btn  = (dis=false,x={}) => ({ background:dis?t.chipBorder:t.primary,color:"#fff",border:"none",borderRadius:"14px",padding:"15px 26px",fontSize:"15px",fontWeight:"700",cursor:dis?"not-allowed":"pointer",opacity:dis?0.5:1,transition:"all 0.15s",fontFamily:"inherit",outline:"none",...x });
  const sec  = (x={}) => ({ background:t.chip,color:t.text,border:`1px solid ${t.border}`,borderRadius:"14px",padding:"15px 22px",fontSize:"15px",fontWeight:"600",cursor:"pointer",transition:"all 0.15s",fontFamily:"inherit",outline:"none",...x });
  const wrap = { maxWidth:"620px",margin:"0 auto",padding:"32px 20px 80px" };

  const fullReset = () => {
    setStep(0);setMode(null);setMemberMoods({});setCurrentMember(0);
    setSelectedIngredients([]);setActiveCategory("legumes");
    setUseShoppingList(false);setShoppingListText("");
    setSelectedTime("30");setPreferences([]);setCuisine("any");setBudget("normal");
    setRecipe(null);setError(null);setLoading(false);setCopied(false);setShowHistory(false);
  };

  const copyRecipe = useCallback(() => {
    if (!recipe) return;
    const text = [
      `🍳 ${recipe.name} ${recipe.emoji||""}`,
      recipe.tagline||"","",
      `⏱ Prépa: ${recipe.prepTime}  🔥 Cuisson: ${recipe.cookTime}  ⭐ ${recipe.difficulty}  🍽️ ${recipe.servings} pers.`,
      recipe.calories?`🔥 ${recipe.calories}/pers`:"",
      recipe.estimatedCost?`💶 ${recipe.estimatedCost}/pers`:"",
      "","📋 INGRÉDIENTS",
      ...(recipe.ingredients||[]).map(i=>`  • ${i.amount}  ${i.name}`),
      "","👨‍🍳 ÉTAPES",
      ...(recipe.steps||[]).map(s=>`${s.num||""}. ${s.title}\n   ${s.detail}${s.tip?`\n   💡 ${s.tip}`:""}`),
      "",recipe.chefTip?`🎯 ${recipe.chefTip}`:"",
      recipe.winePairing?`🍷 ${recipe.winePairing}`:"",
      "","— Généré par MoodMeal 🍽️",
    ].filter(Boolean).join("\n");
    navigator.clipboard.writeText(text).then(()=>{ setCopied(true); setTimeout(()=>setCopied(false),2500); });
  },[recipe]);

  const generateRecipe = useCallback(async (overIngredients, overMoods) => {
    if (loading) return;
    setLoading(true); setError(null);
    const usedMoods = overMoods || memberMoods;
    const moodsDesc = Array.from({length:totalMembers},(_,i)=>{
      const m = MOODS.find(m=>m.id===usedMoods[i]);
      return `${getMemberLabel(mode,i)}: ${m?.label||"neutre"}`;
    }).join(" | ");
    const ingDesc = useShoppingList
      ? (shoppingListText.trim()||"ingrédients de base")
      : ((overIngredients||selectedIngredients).length>0 ? (overIngredients||selectedIngredients).join(", ") : "ingrédients de base du placard");
    const prefsDesc  = preferences.map(p=>PREFS.find(pr=>pr.id===p)?.label||p).join(", ")||"aucune";
    const cuisineObj = CUISINES.find(c=>c.id===cuisine);
    const budgetObj  = BUDGETS.find(b=>b.id===budget);
    const modeDesc   = mode==="solo"?"Solo":mode==="duo"?"Duo":"Famille ("+totalMembers+" personnes)";

    const prompt = `Tu es un chef cuisinier passionné. Génère une recette adaptée:
Mode: ${modeDesc}
Humeurs: ${moodsDesc}
Ingrédients: ${ingDesc}
Temps: ${selectedTime} minutes
Préférences: ${prefsDesc}
Cuisine: ${cuisineObj?.label} (${cuisineObj?.desc})
Budget: ${budgetObj?.label} (${budgetObj?.desc})

Réponds UNIQUEMENT avec du JSON brut valide (sans markdown):
{"name":"Nom créatif","emoji":"emoji","tagline":"phrase courte poétique","moodMatch":"pourquoi correspond aux humeurs (15 mots max)","cuisineType":"cuisine réelle","difficulty":"Facile ou Moyen ou Avancé","prepTime":"X min","cookTime":"X min","servings":${totalMembers},"calories":"~XXX kcal/pers","estimatedCost":"~X€/pers","ingredients":[{"amount":"200g","name":"ingrédient"}],"steps":[{"num":1,"title":"Titre","detail":"Instruction","tip":"astuce ou null"}],"chefTip":"conseil","winePairing":"accord ou boisson","moodColor":"#hex"}`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ model:"claude-sonnet-4-20250514",max_tokens:2000,messages:[{role:"user",content:prompt}] }),
      });
      if (!res.ok) { const e=await res.json().catch(()=>{}); throw new Error(e?.error?.message||`HTTP ${res.status}`); }
      const data = await res.json();
      const raw  = (data.content||[]).map(c=>c.text||"").join("");
      const clean= raw.replace(/```json\s*/gi,"").replace(/```\s*/g,"").trim();
      const s=clean.indexOf("{"), e2=clean.lastIndexOf("}");
      if(s===-1||e2===-1) throw new Error("Réponse invalide.");
      const parsed = JSON.parse(clean.slice(s,e2+1));
      setRecipe(parsed);
      setHistory(prev=>[{...parsed,_time:new Date().toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"})},...prev].slice(0,10));
      setStep(4);
    } catch(err) {
      setError("Erreur lors de la génération. Vérifiez votre connexion et réessayez.");
    } finally { setLoading(false); }
  },[loading,totalMembers,memberMoods,mode,useShoppingList,shoppingListText,selectedIngredients,preferences,cuisine,budget,selectedTime]);

  const surpriseMode = () => {
    const m = randomChoice(["solo","duo","family"]);
    const cnt = m==="family"?Math.floor(Math.random()*6)+3:m==="duo"?2:1;
    const tot = m==="solo"?1:m==="duo"?2:cnt;
    const moods={}; for(let i=0;i<tot;i++) moods[i]=randomChoice(MOODS).id;
    const ings = CATEGORIES.flatMap(c=>c.items).sort(()=>Math.random()-0.5).slice(0,Math.floor(Math.random()*6)+4);
    setMode(m); setMemberCount(cnt); setMemberMoods(moods);
    setSelectedIngredients(ings); setSelectedTime(randomChoice(TIMES).id);
    setCuisine(randomChoice(CUISINES.filter(c=>c.id!=="any")).id);
    setBudget(randomChoice(BUDGETS).id); setPreferences([]); setUseShoppingList(false); setShoppingListText("");
    setTimeout(()=>generateRecipe(ings,moods),50);
    setStep(4);
  };

  // ── Sub-components ────────────────────────────────────────────────────
  const TopBar = () => (
    <div style={{background:t.surface,borderBottom:`1px solid ${t.border}`,padding:"14px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:100,backdropFilter:"blur(12px)"}}>
      <div onClick={step>0?fullReset:undefined} style={{fontWeight:"900",fontSize:"20px",cursor:step>0?"pointer":"default",letterSpacing:"-0.5px",userSelect:"none"}}>
        🍳 <span style={{color:t.primary}}>Mood</span>Meal
      </div>
      <div style={{display:"flex",gap:"6px",alignItems:"center",flexWrap:"wrap"}}>
        {history.length>0&&(
          <button onClick={()=>setShowHistory(v=>!v)} style={{...chip(showHistory),borderRadius:"10px",padding:"6px 12px",fontSize:"12px"}}>
            📜 {history.length}
          </button>
        )}
        {Object.entries(THEMES).map(([k,v])=>(
          <button key={k} onClick={()=>setTheme(k)} style={{...chip(theme===k),borderRadius:"10px",padding:"6px 12px",fontSize:"12px"}}>
            {v.icon} {v.name}
          </button>
        ))}
      </div>
    </div>
  );

  const StepBar = () => (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"32px"}}>
      {stepLabels.map((label,i)=>{
        const done=i<step, active=i===step;
        return (
          <div key={i} style={{display:"flex",alignItems:"center"}}>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"4px"}}>
              <div style={{width:active?"36px":"24px",height:"8px",borderRadius:"4px",background:done?t.stepDone:active?t.primary:t.stepInactive,transition:"all 0.3s"}}/>
              {active&&<div style={{fontSize:"10px",color:t.primary,fontWeight:"700",letterSpacing:"0.5px"}}>{label.toUpperCase()}</div>}
            </div>
            {i<stepLabels.length-1&&<div style={{width:"20px",height:"2px",background:done?t.stepDone:t.stepInactive,margin:"0 4px",marginBottom:active?"14px":"0"}}/>}
          </div>
        );
      })}
    </div>
  );

  const HistoryPanel = () => (
    <div style={{...card({margin:"0 20px 16px",maxWidth:"580px",marginLeft:"auto",marginRight:"auto"}),padding:"18px"}}>
      <div style={{fontWeight:"800",fontSize:"15px",marginBottom:"12px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        📜 Recettes générées cette session
        <button onClick={()=>setShowHistory(false)} style={{background:"none",border:"none",cursor:"pointer",color:t.subtext,fontSize:"18px",padding:"0 4px",fontFamily:"inherit"}}>×</button>
      </div>
      {history.map((r,i)=>(
        <div key={i} onClick={()=>{setRecipe(r);setStep(4);setShowHistory(false);}}
          style={{display:"flex",alignItems:"center",gap:"12px",padding:"10px 12px",background:t.chip,borderRadius:"12px",cursor:"pointer",border:`1px solid ${t.border}`,marginBottom:"8px"}}>
          <span style={{fontSize:"26px"}}>{r.emoji||"🍽️"}</span>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontWeight:"700",fontSize:"14px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.name}</div>
            <div style={{color:t.subtext,fontSize:"12px",marginTop:"2px"}}>{r.cuisineType||""} · {r.prepTime} · {r._time}</div>
          </div>
          <span style={{color:t.primary,fontSize:"12px",fontWeight:"700",flexShrink:0}}>Voir →</span>
        </div>
      ))}
    </div>
  );

  // ─── STEP 0 ──────────────────────────────────────────────────────────
  if (step===0) return (
    <div style={app}>
      <TopBar/>
      {showHistory&&history.length>0&&<HistoryPanel/>}
      <div style={{...wrap,maxWidth:"580px"}}>
        <div style={{textAlign:"center",padding:"40px 0 36px"}}>
          <div style={{fontSize:"80px",marginBottom:"16px",filter:"drop-shadow(0 4px 12px rgba(0,0,0,0.15))"}}>🍽️</div>
          <h1 style={{fontSize:"38px",fontWeight:"900",margin:"0 0 14px",lineHeight:"1.15",letterSpacing:"-1px"}}>
            Quoi manger <span style={{color:t.primary}}>ce soir ?</span>
          </h1>
          <p style={{color:t.subtext,fontSize:"17px",lineHeight:"1.7",margin:0,fontStyle:"italic"}}>
            Dis-nous comment tu te sens et ce qu'il y a dans ton frigo.<br/>On génère la recette parfaite. 🧑‍🍳
          </p>
        </div>

        <h2 style={{fontSize:"18px",fontWeight:"800",marginBottom:"16px"}}>On cuisine pour qui ?</h2>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"14px",marginBottom:"20px"}}>
          {[{id:"solo",emoji:"🧑‍🍳",label:"Solo",sub:"Juste pour moi"},{id:"duo",emoji:"👫",label:"Duo",sub:"En couple"},{id:"family",emoji:"👨‍👩‍👧",label:"Famille",sub:"À plusieurs"}].map(m=>(
            <button key={m.id} onClick={()=>{setMode(m.id);setMemberMoods({});setCurrentMember(0);}}
              style={{background:mode===m.id?t.primaryBg:t.card,border:`2px solid ${mode===m.id?t.primary:t.border}`,borderRadius:"18px",padding:"22px 8px",cursor:"pointer",textAlign:"center",color:t.text,transition:"all 0.2s",fontFamily:"inherit",outline:"none",transform:mode===m.id?"scale(1.02)":"scale(1)"}}>
              <div style={{fontSize:"36px",marginBottom:"8px"}}>{m.emoji}</div>
              <div style={{fontWeight:"800",fontSize:"16px"}}>{m.label}</div>
              <div style={{color:t.subtext,fontSize:"12px",marginTop:"3px"}}>{m.sub}</div>
            </button>
          ))}
        </div>

        {mode==="family"&&(
          <div style={{...card(),padding:"22px",marginBottom:"20px"}}>
            <p style={{margin:"0 0 14px",fontWeight:"700",fontSize:"15px"}}>Combien de personnes ? 🍴</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:"8px"}}>
              {Array.from({length:10},(_,i)=>i+1).map(n=>(
                <button key={n} onClick={()=>setMemberCount(n)} style={{...chip(memberCount===n),padding:"8px 16px",fontSize:"14px"}}>
                  {n} {n===1?"personne":"personnes"}
                </button>
              ))}
            </div>
          </div>
        )}

        <div style={{display:"flex",gap:"10px"}}>
          <button onClick={surpriseMode} style={{...sec({flex:"0 0 auto",background:t.primaryBg,borderColor:t.primary+"60",color:t.primary,fontWeight:"800",padding:"15px 20px"})}}>
            🎲 Surprise !
          </button>
          <button onClick={()=>mode&&setStep(1)} style={btn(!mode,{flex:1,padding:"15px"})}>
            C'est parti ! 🚀
          </button>
        </div>
        {!mode&&<p style={{textAlign:"center",color:t.subtext,fontSize:"13px",marginTop:"12px"}}>Sélectionne un mode ou appuie sur 🎲 Surprise !</p>}
      </div>
    </div>
  );

  // ─── STEP 1 ──────────────────────────────────────────────────────────
  if (step===1) {
    const cur = memberMoods[currentMember];
    return (
      <div style={app}>
        <TopBar/>
        {showHistory&&history.length>0&&<HistoryPanel/>}
        <div style={wrap}>
          <StepBar/>
          {totalMembers>1&&(
            <div style={{display:"flex",gap:"10px",marginBottom:"28px",justifyContent:"center",flexWrap:"wrap"}}>
              {Array.from({length:totalMembers},(_,i)=>{
                const mo=MOODS.find(m=>m.id===memberMoods[i]);
                return (
                  <div key={i} onClick={()=>setCurrentMember(i)} title={getMemberLabel(mode,i)}
                    style={{width:"40px",height:"40px",borderRadius:"50%",background:mo?mo.color:i===currentMember?t.primaryBg:t.chip,border:`2px solid ${i===currentMember?t.primary:mo?"transparent":t.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"13px",fontWeight:"800",color:mo?"#fff":t.subtext,cursor:"pointer",transition:"all 0.2s",boxShadow:i===currentMember?`0 0 0 3px ${t.primaryBg}`:"none"}}>
                    {mo?mo.emoji:i+1}
                  </div>
                );
              })}
            </div>
          )}
          <h2 style={{fontSize:"24px",fontWeight:"900",marginBottom:"6px",letterSpacing:"-0.5px"}}>
            {getMemberLabel(mode,currentMember)},<br/><span style={{color:t.primary}}>comment tu te sens ?</span>
          </h2>
          <p style={{color:t.subtext,marginBottom:"22px",fontSize:"15px",fontStyle:"italic"}}>On adapte la recette à ton humeur.</p>
          <div style={{display:"flex",flexDirection:"column",gap:"10px",marginBottom:"28px"}}>
            {MOODS.map(mood=>(
              <button key={mood.id} onClick={()=>setMemberMoods(prev=>({...prev,[currentMember]:mood.id}))}
                style={{background:cur===mood.id?mood.color+"20":t.card,border:`2px solid ${cur===mood.id?mood.color:t.border}`,borderRadius:"16px",padding:"16px 20px",cursor:"pointer",textAlign:"left",display:"flex",alignItems:"center",gap:"16px",color:t.text,transition:"all 0.15s",fontFamily:"inherit",outline:"none",transform:cur===mood.id?"translateX(4px)":"translateX(0)"}}>
                <span style={{fontSize:"38px",flexShrink:0}}>{mood.emoji}</span>
                <div style={{flex:1}}>
                  <div style={{fontWeight:"800",fontSize:"16px"}}>{mood.label}</div>
                  <div style={{color:t.subtext,fontSize:"13px",marginTop:"2px",fontStyle:"italic"}}>{mood.desc}</div>
                </div>
                {cur===mood.id&&<div style={{width:"28px",height:"28px",borderRadius:"50%",background:mood.color,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:"14px",fontWeight:"900",flexShrink:0}}>✓</div>}
              </button>
            ))}
          </div>
          <div style={{display:"flex",gap:"10px"}}>
            <button onClick={()=>currentMember>0?setCurrentMember(p=>p-1):setStep(0)} style={sec({flex:"0 0 auto"})}>← Retour</button>
            <button onClick={()=>currentMember<totalMembers-1?setCurrentMember(p=>p+1):setStep(2)} style={btn(!cur,{flex:1})}>
              {currentMember<totalMembers-1?"Membre suivant →":"Choisir les ingrédients →"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── STEP 2 ──────────────────────────────────────────────────────────
  if (step===2) {
    const canContinue = useShoppingList?shoppingListText.trim().length>0:true;
    return (
      <div style={app}>
        <TopBar/>
        {showHistory&&history.length>0&&<HistoryPanel/>}
        <div style={wrap}>
          <StepBar/>
          <h2 style={{fontSize:"24px",fontWeight:"900",marginBottom:"6px",letterSpacing:"-0.5px"}}>
            Qu'est-ce qu'il y a<br/><span style={{color:t.primary}}>dans ton frigo ?</span>
          </h2>
          <p style={{color:t.subtext,marginBottom:"22px",fontSize:"15px",fontStyle:"italic"}}>
            Sélectionne tes ingrédients ou colle ta liste de courses.
          </p>
          <div style={{display:"flex",background:t.chip,borderRadius:"14px",padding:"4px",marginBottom:"22px"}}>
            {[{id:false,label:"🧊 Mon frigo"},{id:true,label:"🛒 Liste de courses"}].map(opt=>(
              <button key={String(opt.id)} onClick={()=>setUseShoppingList(opt.id)}
                style={{flex:1,background:useShoppingList===opt.id?t.card:"transparent",border:`1px solid ${useShoppingList===opt.id?t.border:"transparent"}`,borderRadius:"11px",padding:"10px",cursor:"pointer",color:t.text,fontWeight:"700",fontSize:"14px",transition:"all 0.2s",fontFamily:"inherit",outline:"none",boxShadow:useShoppingList===opt.id?t.shadow:"none"}}>
                {opt.label}
              </button>
            ))}
          </div>

          {!useShoppingList?(
            <>
              <div style={{display:"flex",gap:"8px",overflowX:"auto",paddingBottom:"10px",marginBottom:"16px",scrollbarWidth:"none"}}>
                {CATEGORIES.map(cat=>(
                  <button key={cat.id} onClick={()=>setActiveCategory(cat.id)}
                    style={{...chip(activeCategory===cat.id),flexShrink:0,borderRadius:"12px",padding:"8px 14px"}}>
                    {cat.label}
                  </button>
                ))}
              </div>
              <div style={{...card(),padding:"18px",marginBottom:"16px"}}>
                <div style={{display:"flex",flexWrap:"wrap",gap:"8px"}}>
                  {CATEGORIES.find(c=>c.id===activeCategory)?.items.map(item=>(
                    <button key={item} onClick={()=>setSelectedIngredients(prev=>prev.includes(item)?prev.filter(i=>i!==item):[...prev,item])}
                      style={chip(selectedIngredients.includes(item))}>{item}</button>
                  ))}
                </div>
              </div>
              {selectedIngredients.length>0?(
                <div style={{...card({background:t.primaryBg,borderColor:t.primary+"60"}),padding:"14px 18px",marginBottom:"16px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"10px"}}>
                    <span style={{fontWeight:"700",fontSize:"14px",color:t.primary}}>✅ {selectedIngredients.length} ingrédient{selectedIngredients.length>1?"s":""}</span>
                    <button onClick={()=>setSelectedIngredients([])} style={{background:"none",border:"none",color:t.subtext,cursor:"pointer",fontSize:"12px",fontFamily:"inherit",padding:"2px 6px"}}>Tout effacer</button>
                  </div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:"6px"}}>
                    {selectedIngredients.map(item=>(
                      <span key={item} style={{...chip(true,{fontSize:"12px",padding:"4px 10px",display:"inline-flex",alignItems:"center",gap:"5px"})}}>
                        {item}<span onClick={()=>setSelectedIngredients(prev=>prev.filter(i=>i!==item))} style={{cursor:"pointer",fontWeight:"900"}}>×</span>
                      </span>
                    ))}
                  </div>
                </div>
              ):(
                <p style={{color:t.subtext,fontSize:"13px",textAlign:"center",marginBottom:"16px",fontStyle:"italic"}}>Aucun ingrédient ? On improvise avec les basiques ! 👨‍🍳</p>
              )}
            </>
          ):(
            <div style={{marginBottom:"16px"}}>
              <p style={{color:t.subtext,fontSize:"14px",marginBottom:"10px",fontStyle:"italic"}}>Colle ta liste (virgule ou à la ligne)</p>
              <textarea value={shoppingListText} onChange={e=>setShoppingListText(e.target.value.slice(0,2000))}
                placeholder="Ex: tomates, pâtes, œufs, fromage, oignons..."
                style={{width:"100%",height:"160px",background:t.inputBg,border:`1px solid ${t.border}`,borderRadius:"14px",padding:"16px",color:t.text,fontSize:"15px",resize:"vertical",boxSizing:"border-box",fontFamily:"inherit",outline:"none",lineHeight:"1.6"}}/>
              <p style={{color:t.subtext,fontSize:"12px",marginTop:"4px",textAlign:"right"}}>{shoppingListText.length}/2000</p>
            </div>
          )}

          <div style={{display:"flex",gap:"10px"}}>
            <button onClick={()=>setStep(1)} style={sec({flex:"0 0 auto"})}>← Retour</button>
            <button onClick={()=>setStep(3)} style={btn(!canContinue,{flex:1})}>Options de la recette →</button>
          </div>
        </div>
      </div>
    );
  }

  // ─── STEP 3 ──────────────────────────────────────────────────────────
  if (step===3) return (
    <div style={app}>
      <TopBar/>
      {showHistory&&history.length>0&&<HistoryPanel/>}
      <div style={wrap}>
        <StepBar/>
        <h2 style={{fontSize:"24px",fontWeight:"900",marginBottom:"6px",letterSpacing:"-0.5px"}}>
          Tes préférences<br/><span style={{color:t.primary}}>pour ce soir</span>
        </h2>
        <p style={{color:t.subtext,marginBottom:"22px",fontSize:"15px",fontStyle:"italic"}}>Temps, cuisine, budget, régimes. On s'occupe du reste.</p>

        <h3 style={{fontSize:"16px",fontWeight:"800",marginBottom:"12px"}}>⏱ Temps disponible</h3>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px",marginBottom:"28px"}}>
          {TIMES.map(time=>(
            <button key={time.id} onClick={()=>setSelectedTime(time.id)}
              style={{background:selectedTime===time.id?t.primaryBg:t.card,border:`2px solid ${selectedTime===time.id?t.primary:t.border}`,borderRadius:"16px",padding:"16px 14px",cursor:"pointer",textAlign:"center",color:t.text,transition:"all 0.15s",fontFamily:"inherit",outline:"none",transform:selectedTime===time.id?"scale(1.02)":"scale(1)"}}>
              <div style={{fontWeight:"800",fontSize:"18px",marginBottom:"4px"}}>{time.label}</div>
              <div style={{color:t.subtext,fontSize:"12px",fontStyle:"italic"}}>{time.sub}</div>
            </button>
          ))}
        </div>

        <h3 style={{fontSize:"16px",fontWeight:"800",marginBottom:"12px"}}>🌍 Type de cuisine</h3>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",marginBottom:"28px"}}>
          {CUISINES.map(c=>(
            <button key={c.id} onClick={()=>setCuisine(c.id)}
              style={{background:cuisine===c.id?t.primaryBg:t.card,border:`2px solid ${cuisine===c.id?t.primary:t.border}`,borderRadius:"14px",padding:"12px 14px",cursor:"pointer",textAlign:"left",color:t.text,transition:"all 0.15s",fontFamily:"inherit",outline:"none"}}>
              <div style={{fontWeight:"700",fontSize:"14px"}}>{c.label}</div>
              <div style={{color:t.subtext,fontSize:"12px",marginTop:"2px",fontStyle:"italic"}}>{c.desc}</div>
            </button>
          ))}
        </div>

        <h3 style={{fontSize:"16px",fontWeight:"800",marginBottom:"12px"}}>💶 Budget par personne</h3>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"10px",marginBottom:"28px"}}>
          {BUDGETS.map(b=>(
            <button key={b.id} onClick={()=>setBudget(b.id)}
              style={{background:budget===b.id?b.color+"20":t.card,border:`2px solid ${budget===b.id?b.color:t.border}`,borderRadius:"14px",padding:"14px 10px",cursor:"pointer",textAlign:"center",color:t.text,transition:"all 0.15s",fontFamily:"inherit",outline:"none",transform:budget===b.id?"scale(1.02)":"scale(1)"}}>
              <div style={{fontWeight:"800",fontSize:"13px"}}>{b.label}</div>
              <div style={{color:t.subtext,fontSize:"11px",marginTop:"4px",fontStyle:"italic"}}>{b.desc}</div>
            </button>
          ))}
        </div>

        <h3 style={{fontSize:"16px",fontWeight:"800",marginBottom:"12px"}}>🥗 Préférences alimentaires</h3>
        <div style={{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"32px"}}>
          {PREFS.map(p=>(
            <button key={p.id} onClick={()=>setPreferences(prev=>prev.includes(p.id)?prev.filter(x=>x!==p.id):[...prev,p.id])}
              style={chip(preferences.includes(p.id),{padding:"8px 16px",fontSize:"14px"})}>
              {p.label}
            </button>
          ))}
        </div>

        {error&&<div style={{background:"#fee2e2",border:"1px solid #ef4444",borderRadius:"12px",padding:"14px 18px",marginBottom:"18px",color:"#dc2626",fontSize:"14px",lineHeight:"1.5"}}>⚠️ {error}</div>}

        <div style={{display:"flex",gap:"10px"}}>
          <button onClick={()=>setStep(2)} style={sec({flex:"0 0 auto"})}>← Retour</button>
          <button onClick={()=>generateRecipe()} disabled={loading} style={btn(loading||!selectedTime,{flex:1})}>
            {loading
              ?<span style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"8px"}}><span style={{display:"inline-block",animation:"spin 1s linear infinite"}}>⏳</span>Génération...</span>
              :"🍳 Générer ma recette !"}
          </button>
        </div>
        {loading&&<p style={{textAlign:"center",color:t.subtext,fontSize:"13px",marginTop:"14px",fontStyle:"italic"}}>Notre chef IA cuisine ta recette... 🧑‍🍳</p>}
      </div>
    </div>
  );

  // ─── STEP 4 ──────────────────────────────────────────────────────────
  if (step===4) {
    if (loading) return (
      <div style={{...app,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
        <TopBar/>
        <div style={{textAlign:"center",padding:"80px 20px"}}>
          <div style={{fontSize:"64px",animation:"bounce 1s ease-in-out infinite",marginBottom:"20px"}}>🍳</div>
          <h2 style={{fontSize:"24px",fontWeight:"800",marginBottom:"12px"}}>On cuisine pour vous...</h2>
          <p style={{color:t.subtext,fontSize:"15px",fontStyle:"italic"}}>Le chef IA est à l'œuvre 🧑‍🍳</p>
        </div>
        <style>{`@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}`}</style>
      </div>
    );

    if (error&&!recipe) return (
      <div style={app}>
        <TopBar/>
        <div style={{...wrap,textAlign:"center",paddingTop:"80px"}}>
          <div style={{fontSize:"64px",marginBottom:"20px"}}>😕</div>
          <h2 style={{fontSize:"22px",fontWeight:"800",marginBottom:"12px"}}>Oups !</h2>
          <p style={{color:t.subtext,marginBottom:"28px"}}>{error}</p>
          <div style={{display:"flex",gap:"10px",justifyContent:"center"}}>
            <button onClick={()=>generateRecipe()} style={btn(false,{padding:"14px 28px"})}>🔄 Réessayer</button>
            <button onClick={()=>setStep(3)} style={sec()}>← Options</button>
          </div>
        </div>
      </div>
    );

    if (!recipe) return null;

    const accent = recipe.moodColor||t.primary;
    const diffC  = {Facile:"#3dba8a",Moyen:"#f4a535","Avancé":"#e05a5a"}[recipe.difficulty]||t.primary;

    return (
      <div style={app}>
        <TopBar/>
        {showHistory&&history.length>0&&<HistoryPanel/>}
        <div style={{...wrap,maxWidth:"660px"}}>

          <div style={{...card({background:accent+"18",borderColor:accent+"40"}),padding:"32px 28px",marginBottom:"20px",textAlign:"center"}}>
            <div style={{fontSize:"72px",marginBottom:"14px",filter:"drop-shadow(0 4px 16px rgba(0,0,0,0.15))"}}>{recipe.emoji||"🍽️"}</div>
            <h1 style={{fontSize:"30px",fontWeight:"900",margin:"0 0 10px",letterSpacing:"-0.5px",lineHeight:"1.2",color:t.text}}>{recipe.name}</h1>
            {recipe.cuisineType&&<div style={{...chip(false,{marginBottom:"12px",display:"inline-block",fontSize:"12px"})}}>{recipe.cuisineType}</div>}
            <p style={{color:t.subtext,fontSize:"16px",margin:"0 0 18px",fontStyle:"italic"}}>{recipe.tagline}</p>
            <div style={{display:"inline-block",background:accent+"25",border:`1px solid ${accent+"60"}`,borderRadius:"30px",padding:"8px 18px"}}>
              <span style={{color:accent,fontSize:"14px",fontWeight:"700"}}>💡 {recipe.moodMatch}</span>
            </div>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"10px",marginBottom:"16px"}}>
            {[{label:"Prépa",value:recipe.prepTime,icon:"🔪"},{label:"Cuisson",value:recipe.cookTime,icon:"🔥"},{label:"Difficulté",value:recipe.difficulty,icon:"⭐",color:diffC},{label:"Portions",value:`${recipe.servings||totalMembers} pers.`,icon:"🍽️"}].map(s=>(
              <div key={s.label} style={{...card(),padding:"14px 8px",textAlign:"center"}}>
                <div style={{fontSize:"22px",marginBottom:"5px"}}>{s.icon}</div>
                <div style={{fontWeight:"800",fontSize:"12px",color:s.color||t.text,lineHeight:"1.2"}}>{s.value}</div>
                <div style={{color:t.subtext,fontSize:"10px",marginTop:"3px",textTransform:"uppercase",letterSpacing:"0.5px"}}>{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{display:"flex",gap:"8px",flexWrap:"wrap",justifyContent:"center",marginBottom:"20px"}}>
            {recipe.calories      &&<span style={chip(false,{fontSize:"13px"})}>🔥 {recipe.calories}/pers.</span>}
            {recipe.estimatedCost &&<span style={chip(false,{fontSize:"13px"})}>💶 {recipe.estimatedCost}/pers.</span>}
            {recipe.winePairing   &&<span style={chip(false,{fontSize:"13px"})}>🍷 {recipe.winePairing}</span>}
          </div>

          <div style={{...card(),padding:"22px",marginBottom:"16px"}}>
            <h2 style={{fontSize:"19px",fontWeight:"900",marginBottom:"16px",display:"flex",alignItems:"center",gap:"8px"}}>
              🛒 Ingrédients
              <span style={{fontSize:"13px",fontWeight:"600",color:t.subtext,background:t.chip,borderRadius:"20px",padding:"2px 10px"}}>{recipe.servings||totalMembers} pers.</span>
            </h2>
            {(recipe.ingredients||[]).map((ing,i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px",background:i%2===0?t.chip:"transparent",borderRadius:"10px"}}>
                <span style={{fontWeight:"500",fontSize:"15px"}}>{ing.name}</span>
                <span style={{color:t.primary,fontWeight:"800",fontSize:"14px",background:t.primaryBg,padding:"3px 10px",borderRadius:"20px"}}>{ing.amount}</span>
              </div>
            ))}
          </div>

          <div style={{...card(),padding:"22px",marginBottom:"16px"}}>
            <h2 style={{fontSize:"19px",fontWeight:"900",marginBottom:"18px"}}>📋 Étapes</h2>
            <div style={{display:"flex",flexDirection:"column",gap:"20px"}}>
              {(recipe.steps||[]).map((s,i)=>(
                <div key={i} style={{display:"flex",gap:"16px"}}>
                  <div style={{width:"34px",height:"34px",borderRadius:"50%",background:t.primary,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"900",fontSize:"14px",flexShrink:0,boxShadow:`0 2px 8px ${t.primary}50`}}>
                    {s.num||i+1}
                  </div>
                  <div style={{flex:1,paddingTop:"5px"}}>
                    <div style={{fontWeight:"800",fontSize:"15px",marginBottom:"5px"}}>{s.title}</div>
                    <div style={{color:t.subtext,fontSize:"14px",lineHeight:"1.7"}}>{s.detail}</div>
                    {s.tip&&<div style={{marginTop:"8px",padding:"8px 12px",background:t.primaryBg,borderRadius:"8px",fontSize:"13px",color:t.primary,fontStyle:"italic"}}>💡 {s.tip}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {recipe.chefTip&&(
            <div style={{...card({background:t.primaryBg,borderColor:t.primary+"50"}),padding:"18px 22px",marginBottom:"16px"}}>
              <div style={{fontWeight:"800",color:t.primary,marginBottom:"6px",fontSize:"15px"}}>👨‍🍳 Conseil du chef</div>
              <p style={{margin:0,color:t.text,fontSize:"14px",lineHeight:"1.7"}}>{recipe.chefTip}</p>
            </div>
          )}

          <div style={{...card(),padding:"16px 22px",marginBottom:"24px"}}>
            <div style={{fontWeight:"700",fontSize:"14px",marginBottom:"10px",color:t.subtext}}>Recette générée pour :</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:"8px"}}>
              {Array.from({length:totalMembers},(_,i)=>{
                const mo=MOODS.find(m=>m.id===memberMoods[i]);
                return <span key={i} style={{...chip(false,{background:mo?.color+"20",borderColor:mo?.color+"50",fontSize:"13px"})}}>
                  {mo?.emoji} {getMemberLabel(mode,i)} — {mo?.label}
                </span>;
              })}
            </div>
          </div>

          <div style={{display:"flex",gap:"10px",flexWrap:"wrap"}}>
            <button onClick={copyRecipe}
              style={{...sec({flex:"1 1 140px",background:copied?t.successBg:t.chip,borderColor:copied?t.success:t.border,color:copied?t.success:t.text,fontWeight:"700"})}}>
              {copied?"✅ Copié !":"📋 Copier"}
            </button>
            <button onClick={()=>{setRecipe(null);setError(null);generateRecipe();}} style={sec({flex:"1 1 120px"})}>🔄 Autre recette</button>
            <button onClick={fullReset} style={btn(false,{flex:"1 1 120px"})}>🏠 Accueil</button>
          </div>
        </div>
        <style>{`@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}::-webkit-scrollbar{display:none}`}</style>
      </div>
    );
  }

  return null;
}
