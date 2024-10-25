FROM node:18-alpine3.20 AS build-stage
WORKDIR /app

COPY pnpm-lock.yaml ./
COPY package.json ./

COPY frontend ./frontend
COPY shared ./shared

RUN npm install -g pnpm

RUN pnpm install --config.confirmModulesPurge=false --filter frontend...

RUN pnpm --filter frontend build

FROM nginx:alpine

COPY --from=build-stage /app/frontend/dist /usr/share/nginx/html

# docker build -t mood-tracker-frontend-dev-image -f frontend/dev.Dockerfile .