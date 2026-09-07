# Rukn Al Harir API — production image
FROM node:20-alpine AS base
WORKDIR /app

# better-sqlite3 needs to compile a native addon
RUN apk add --no-cache python3 make g++

COPY package*.json ./
RUN npm ci --omit=dev

COPY src ./src

# Persisted at runtime via the volumes in docker-compose.yml
RUN mkdir -p data uploads/gallery

ENV NODE_ENV=production
EXPOSE 5000

CMD ["node", "src/index.js"]
