# Documentation Platform

Une plateforme moderne de création et de visualisation de documentation, construite avec NestJS et NextJS.

## 🚀 Fonctionnalités

- **Création de documentation** : Éditeur riche basé sur PlateJS pour créer du contenu structuré
- **Visualisation** : Interface moderne et responsive pour consulter la documentation
- **Import/Export** : Support de multiples formats (Markdown, HTML)
- **Intelligence Artificielle** : Intégration d'API IA pour des fonctionnalités avancées
- **Gestion des utilisateurs** : Système d'authentification et de gestion des comptes
- **Base de données** : Stockage persistant avec SQLite

## 🏗️ Architecture

Ce projet utilise une architecture monorepo avec Turborepo, comprenant :

### Applications

- **`documentation-back`** : API backend construite avec [NestJS](https://nestjs.com/)
  - Base de données SQLite
  - Gestion des articles et utilisateurs
  - Middleware d'authentification
  - API RESTful

- **`documentation-front`** : Interface utilisateur construite avec [Next.js](https://nextjs.org/)
  - Éditeur riche basé sur [PlateJS](https://platejs.org/)
  - Interface moderne et responsive
  - Gestion des articles et de l'authentification
  - Intégration IA

### Packages partagés

- **`@repo/ui`** : Composants UI réutilisables
- **`@repo/eslint-config`** : Configuration ESLint partagée
- **`@repo/typescript-config`** : Configuration TypeScript partagée

## 🛠️ Technologies utilisées

- **Backend** : NestJS, SQLite, TypeScript
- **Frontend** : Next.js, React, PlateJS, Tailwind CSS
- **Monorepo** : Turborepo, pnpm
- **Base de données** : SQLite avec TypeORM
- **Authentification** : JWT, Guards NestJS

## 🚀 Démarrage rapide

### Prérequis

- Node.js 18+
- pnpm

### Installation

```bash
# Cloner le repository
git clone https://github.com/PolySim/Create-Documentation.git
cd documentation

# Installer les dépendances
pnpm install

# Démarrer le développement
pnpm dev
```

### Commandes utiles

```bash
# Construire tous les projets
pnpm build

# Démarrer le développement
pnpm dev

# Lancer les tests
pnpm test

# Construire un projet spécifique
pnpm build --filter=documentation-back
pnpm build --filter=documentation-front
```

## 🔧 Configuration

### Variables d'environnement

Créez un fichier `.env` dans le dossier `documentation-back` :

```env
# Base de données
DATABASE_URL=./database/dev.db
# Clerk
CLERK_SECRET_KEY=
```

Créez un autre fichier `.env` dans le dossier `documentation-front` :

```env
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/auth/signIn
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/
```

### Base de données

La base de données SQLite est automatiquement créée lors du premier lancement.

## 📚 Utilisation

### Création d'un article

1. Connectez-vous à l'application
2. Cliquez sur "Créer un article"
3. Utilisez l'éditeur riche pour rédiger votre contenu
4. Sauvegardez votre article

### Éditeur PlateJS

L'éditeur offre de nombreuses fonctionnalités :

- Formatage de texte (gras, italique, etc.)
- Titres et sous-titres
- Listes et tableaux
- Images et médias
- Blocs de code
- Et bien plus...

### Export/Import

- **Export** : Markdown, HTML
- **Import** : Markdown, HTML

### Fonctionnalités IA

Avec une clé API configurée, vous pouvez accéder à :

- Suggestions de contenu
- Correction automatique
- Génération de résumés
- Assistance à la rédaction

## 🧪 Tests

```bash
# Tests unitaires
pnpm test

# Tests e2e
pnpm test:e2e

# Couverture de code
pnpm test:cov
```

## 📦 Déploiement

### 🌐 Site en production

L'application est accessible en production sur : **https://docs.simondesdevises.com**

### Backend (Docker + GitHub Actions)

Le backend est déployé automatiquement via GitHub Actions qui :

1. Build l'image Docker de l'application NestJS
2. Push l'image sur le serveur de production
3. Déploie le conteneur avec la base de données SQLite

Le processus se déclenche automatiquement à chaque push sur la branche principale.

### Frontend (Vercel)

Le frontend est hébergé sur [Vercel](https://vercel.com/) et se déploie automatiquement :

- Déploiement automatique à chaque push sur la branche principale
- Prévisualisation automatique pour les Pull Requests
- Optimisations de performance et CDN global

### Variables d'environnement de production

Assurez-vous de configurer les variables d'environnement nécessaires dans :

- **GitHub Actions** : Pour le build et déploiement du backend
- **Vercel** : Pour le déploiement du frontend

## 🤝 Contribution

1. Fork le projet
2. Créez une branche pour votre fonctionnalité
3. Committez vos changements
4. Poussez vers la branche
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🔗 Liens utiles

- [NestJS Documentation](https://docs.nestjs.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [PlateJS Documentation](https://platejs.org/)
- [Turborepo Documentation](https://turborepo.com/docs)
