FROM node:18-alpine3.20 AS build-stage
WORKDIR /app

COPY pnpm-lock.yaml ./
COPY package.json ./

COPY backend ./backend
COPY shared ./shared

RUN npm install -g pnpm

RUN pnpm install --config.confirmModulesPurge=false --filter backend...
RUN pnpm --filter shared run build
RUN pnpm --filter backend run build

###

FROM node:18-alpine3.20

WORKDIR /app

COPY --from=build-stage /app/backend/dist ./backend/dist
COPY --from=build-stage /app/backend/package.json ./backend/
COPY --from=build-stage /app/backend/node_modules ./backend/node_modules
COPY --from=build-stage /app/shared/dist ./shared/dist
COPY --from=build-stage /app/shared/package.json ./shared/
COPY --from=build-stage /app/shared/node_modules ./shared/node_modules

EXPOSE 3000

CMD [ "node", "./backend/dist/index.js" ]

# run from monorepo root
# docker build -t mood-tracker-backend-image -f backend/Dockerfile .
