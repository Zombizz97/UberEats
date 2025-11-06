# Stage 1: Build frontend
FROM node:20-alpine AS frontend-builder

WORKDIR /app/client

# Copier package.json et package-lock.json pour cache
COPY client/package*.json ./

RUN npm ci

COPY client/ ./

RUN npm run build

# Stage 2: Build backend with dependencies
FROM node:20-alpine AS backend-builder

WORKDIR /app/server

COPY server/package*.json ./

RUN npm ci --omit=dev

COPY server/ ./

# Stage 3: Final lightweight image
FROM node:20-alpine AS final

# Créer un utilisateur non-root pour la sécurité
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copier backend et frontend build
COPY --from=backend-builder /app/server ./server
COPY --from=frontend-builder /app/client/dist ./server/public

USER appuser

# Exposer le port sur lequel l'API écoute
EXPOSE 3000

WORKDIR /app/server

CMD ["node", "src/index.js"]
