# Configuration Prisma avec SQLite

## Vue d'ensemble

Cette application NestJS utilise Prisma comme ORM avec SQLite comme base de données.

## Configuration

### 1. Dépendances installées

```bash
pnpm add prisma @prisma/client @nestjs/config
```

### 2. Initialisation de Prisma

```bash
npx prisma init --datasource-provider sqlite
```

### 3. Configuration de la base de données

Le fichier `.env` contient :

```.env
DATABASE_URL="file:./dev.db"
```

### 4. Schéma Prisma

Le fichier `prisma/schema.prisma` contient :

```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../generated/prisma"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Utilisation

### 1. Générer le client Prisma

```bash
npx prisma generate
```

### 2. Synchroniser la base de données

```bash
npx prisma db push
```

### 3. Tester la connexion

```bash
node test-db.js
```

## Structure de l'application

### Services

- `src/prisma/prisma.service.ts` - Service Prisma principal
- `src/prisma/prisma.module.ts` - Module Prisma global
- `src/users/users.service.ts` - Service pour gérer les utilisateurs

### Contrôleurs

- `src/users/users.controller.ts` - API REST pour les utilisateurs

### Endpoints disponibles

- `GET /users` - Récupérer tous les utilisateurs
- `GET /users/:id` - Récupérer un utilisateur par ID
- `POST /users` - Créer un nouvel utilisateur
- `PUT /users/:id` - Mettre à jour un utilisateur
- `DELETE /users/:id` - Supprimer un utilisateur

## Exemple d'utilisation

### Créer un utilisateur

```bash
curl -X POST http://localhost:3001/users \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","name":"Test User"}'
```

### Récupérer tous les utilisateurs

```bash
curl http://localhost:3001/users
```

## Base de données

La base de données SQLite est stockée dans le fichier `dev.db` à la racine du projet.

Pour visualiser la base de données avec Prisma Studio :

```bash
npx prisma studio
```

## Développement

Pour démarrer l'application en mode développement :

```bash
pnpm run start:dev
```

L'application sera disponible sur `http://localhost:3001`
