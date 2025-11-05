# Frontend Dockerfile (multi-stage: build + nginx)

# 1) Build stage
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

# Copier le code nécessaire au build
COPY . .

# Construire l'application
RUN npm run build

# 2) Runtime nginx
FROM nginx:1.27-alpine AS runtime

# Nginx conf (SPA + proxy /api -> backend)
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Copier les assets construits
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
