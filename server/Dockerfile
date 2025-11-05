# Backend Dockerfile
FROM node:20-alpine
WORKDIR /app

# Outils de build pour bcrypt (node-gyp)
RUN apk add --no-cache --virtual .gyp python3 make g++

# Install deps (prod uniquement)
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev --no-audit --no-fund || npm install --only=production --no-audit --no-fund

# Copy sources
COPY src ./src
COPY .env* ./

# Nettoyage des outils de build pour réduire l'image
RUN apk del .gyp || true

ENV NODE_ENV=production
EXPOSE 4000

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:4000/health || exit 1

CMD ["node", "src/index.js"]
