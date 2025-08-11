# Stage 1: Build
FROM node:20-alpine AS builder

# Installer pnpm
RUN npm install -g pnpm@9.0.0

WORKDIR /app

# Copier les fichiers de configuration du monorepo
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/ ./packages/

# Copier les fichiers de l'API
COPY apps/documentation-back/package.json ./apps/documentation-back/
COPY apps/documentation-back/tsconfig.json ./apps/documentation-back/
COPY apps/documentation-back/tsconfig.build.json ./apps/documentation-back/
COPY apps/documentation-back/nest-cli.json ./apps/documentation-back/

# Installer les dépendances
RUN pnpm install --frozen-lockfile

# Copier le code source de l'API
COPY apps/documentation-back/src/ ./apps/documentation-back/src/
COPY apps/documentation-back/.env.prod ./apps/documentation-back/.env

# Build l'application
RUN pnpm --filter documentation-back build

# Stage 2: Production
FROM node:18-alpine AS production

WORKDIR /app

# Copier les fichiers de configuration du monorepo
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copier le package.json de l'API
COPY apps/documentation-back/package.json ./apps/documentation-back/

# Copier les node_modules depuis le stage builder (avec toutes les dépendances)
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/documentation-back/node_modules ./apps/documentation-back/node_modules

# Copier les fichiers buildés depuis le stage builder
COPY --from=builder /app/apps/documentation-back/dist ./apps/documentation-back/dist

# Copier le fichier .env
COPY --from=builder /app/apps/documentation-back/.env ./apps/documentation-back/.env

# Créer un utilisateur non-root pour la sécurité
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001

# Changer les permissions du répertoire de travail
RUN chown -R nestjs:nodejs /app

USER nestjs

# Exposer le port
EXPOSE 5067

# Variables d'environnement par défaut
ENV NODE_ENV=production
ENV PORT=5067

WORKDIR /app/apps/documentation-back

# Commande de démarrage
CMD ["node", "/app/apps/documentation-back/dist/main"]
