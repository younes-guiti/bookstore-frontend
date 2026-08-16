# 📚 Book Store — Frontend

Application web de bibliothèque/librairie en ligne, avec gestion des rôles (utilisateur / administrateur), catalogue de livres, panier, commandes, et tableau de bord différencié.

🔗 **Démo en ligne** : [bookstore-frontend-git-main-younes-abdelmoutaleb.vercel.app](https://bookstore-frontend-git-main-younes-abdelmoutaleb.vercel.app/)

🔗 **Backend / API** : [bookstore-backend](https://github.com/younes-guiti/bookstore-backend)

## Aperçu

- Catalogue de livres avec recherche et filtres
- Panier d'achat et système de commandes
- Authentification JWT avec réinitialisation de mot de passe par email
- Deux expériences distinctes selon le rôle :
  - **Utilisateur** : parcours du catalogue, panier, suivi de ses commandes
  - **Administrateur** : tableau de bord avec statistiques et graphiques, gestion des utilisateurs, gestion des livres, traitement des commandes, notifications en temps réel

## Stack technique

- **React** (Vite)
- **React Router** pour la navigation
- **Framer Motion** pour les animations
- **Recharts** pour les graphiques du dashboard admin
- **Axios** pour les appels API
- **Lucide React** pour les icônes

## Fonctionnalités principales

- 🔐 Authentification (inscription, connexion, mot de passe oublié)
- 📖 CRUD complet des livres (côté admin)
- 🛒 Panier persistant et création de commandes
- 📊 Dashboard admin avec statistiques, graphiques (commandes par statut, inscriptions récentes) et activité en temps réel
- 🔔 Système de notifications admin (nouvelles commandes, nouveaux utilisateurs, nouveaux livres)
- 👥 Gestion des utilisateurs et des rôles (admin uniquement)
- ⚙️ Page de paramètres (profil, mot de passe, préférences)

## Installation locale

\`\`\`bash
git clone https://github.com/younes-guiti/bookstore-frontend.git
cd bookstore-frontend
npm install
\`\`\`

Crée un fichier \`.env\` à la racine avec :

\`\`\`
VITE_API_URL=http://localhost:5000/api
\`\`\`

Puis lance le serveur de développement :

\`\`\`bash
npm run dev
\`\`\`

## Déploiement

Ce frontend est déployé sur **Vercel**, connecté au backend hébergé sur **Railway** (avec base de données MySQL).

## 🐳 Développement avec Docker

Ce projet peut aussi être lancé avec Docker, en même temps que le backend et une base MySQL, via `docker-compose.yml` (à la racine du dossier parent contenant les deux repos) :

​```bash
docker compose up --build
​```

Le site sera alors disponible sur `http://localhost:5173`.

## Auteur

**Younes abdelmoutaleb Guiti** — Étudiant en Master 1 Ingénierie Logicielle (Software Engineering), USTHB
