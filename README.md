# 🍳 MoodMeal

> **La recette parfaite, générée selon ton humeur et ce qu'il y a dans ton frigo.**

MoodMeal est une application web open-source alimentée par l'IA de Claude (Anthropic). Tu lui dis comment tu te sens, ce que tu as sous la main, combien de temps tu as — elle génère une recette sur-mesure, instantanément.

---

## ✨ Fonctionnalités

### 👥 Modes de cuisine
- **Solo** — une recette juste pour toi
- **Duo** — pour cuisiner en couple, chaque partenaire choisit son humeur
- **Famille** — de 1 à 10 membres, chacun exprime son humeur, l'IA concilie tout

### 😄 5 humeurs disponibles
| Humeur | Ambiance |
|--------|----------|
| 😴 Fatigué(e) | Rapide & sans prise de tête |
| 😄 Joyeux(se) | Festif & haut en couleur |
| 😤 Stressé(e) | Réconfortant & doudou |
| 🥰 Romantique | Raffiné & savoureux |
| 🤩 Aventurier(e) | Original & surprenant |

### 🧊 Ingrédients
- Sélection par catégories : Légumes, Fruits, Viandes, Mer, Féculents, Laitiers, Épicerie (150+ ingrédients)
- Ou colle directement ta **liste de courses** en texte libre

### ⚙️ Paramètres de la recette
- ⏱ **Temps disponible** — de 10 min à 1h+
- 🌍 **Type de cuisine** — française, italienne, asiatique, japonaise, marocaine, mexicaine, indienne, méditerranéenne, américaine, ou au choix
- 💶 **Budget** — économique, normal ou gastronomique
- 🥗 **Préférences alimentaires** — végétarien, vegan, sans gluten, sans lactose, épicé, léger, comfort food...

### 🍽️ La recette générée inclut
- Nom créatif + emoji + tagline poétique
- Correspondance avec l'humeur du moment
- Temps de prépa & cuisson, difficulté, portions exactes
- Calories et coût estimé par personne
- Liste d'ingrédients dosés pour le bon nombre de personnes
- Étapes détaillées avec astuces pas-à-pas
- Conseil du chef personnalisé
- Accord mets-vins ou boisson suggérée

### 🎁 Extras
| Fonctionnalité | Description |
|---|---|
| 🎲 Mode Surprise | Génère tout aléatoirement et lance la recette directement |
| 📋 Copier la recette | Exporte la recette complète en texte dans le presse-papier |
| 📜 Historique de session | Retrouve jusqu'à 10 recettes générées dans la même session |
| 🔄 Autre recette | Relance une nouvelle génération avec les mêmes paramètres |

### 🎨 3 thèmes persistants
| Thème | Ambiance |
|---|---|
| ☀️ Clair | Tons chauds crème & bois |
| 🌙 Sombre | Noir charbon & orangé |
| 🌌 Nuit | Bleu profond & violet |

Le thème choisi est **sauvegardé automatiquement** — il est conservé même après un rechargement de la page.

---

## 🚀 Démo rapide

```
1. Choisis Solo, Duo ou Famille
2. Sélectionne ton humeur (et celle des autres membres)
3. Coche les ingrédients disponibles ou colle ta liste de courses
4. Règle le temps, la cuisine et le budget
5. Génère ta recette 🍳
```

---

## 🛠️ Stack technique

- **React** (hooks : `useState`, `useCallback`)
- **Claude API** — modèle `claude-sonnet-4-20250514` via `api.anthropic.com/v1/messages`
- **CSS-in-JS** — zéro dépendance de style externe
- **localStorage** — pour la persistance du thème
- Aucune base de données, aucun backend, aucune donnée utilisateur stockée

---

## 📦 Installation & utilisation

### Prérequis
- Node.js 18+
- Une clé API Anthropic ([obtenir ici](https://console.anthropic.com))

### Lancer en local

```bash
# Cloner le repo
git clone https://github.com/TON_USERNAME/moodmeal.git
cd moodmeal

# Installer les dépendances
npm install

# Lancer
npm run dev
```

### Utiliser dans Claude.ai

MoodMeal est conçu pour fonctionner directement en tant qu'**Artifact React sur Claude.ai** — colle le contenu de `MoodMeal.jsx` dans un artifact et c'est prêt, aucune configuration nécessaire.

---

## 🔒 Sécurité & confidentialité

- Aucune donnée personnelle collectée
- Aucun compte requis
- Tout tourne côté client (navigateur)
- Les ingrédients et humeurs ne quittent pas ta session
- Inputs limités en longueur pour éviter les abus

---

## 🗺️ Roadmap (idées futures)

- [ ] Sauvegarde des recettes favorites (IndexedDB)
- [ ] Mode hors-ligne avec recettes pré-générées
- [ ] Partage de recette par lien
- [ ] Génération d'image du plat (vision AI)
- [ ] Planificateur de repas sur la semaine
- [ ] Version mobile native (React Native)
- [ ] Support multilingue (EN, ES, DE...)

---

## 🤝 Contribuer

Les contributions sont les bienvenues !

```bash
# Fork le repo, crée ta branche
git checkout -b feature/ma-fonctionnalite

# Fais tes modifs, puis
git commit -m "feat: ma nouvelle fonctionnalité"
git push origin feature/ma-fonctionnalite

# Ouvre une Pull Request 🎉
```

---

## 📄 Licence

MIT — libre d'utilisation, modification et distribution.

---

<div align="center">
  Fait avec ❤️ et beaucoup de 🍝 — <strong>MoodMeal</strong>
</div>
