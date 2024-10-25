FROM node:18-alpine3.20
WORKDIR /app

COPY pnpm-lock.yaml ./
COPY package.json ./

COPY frontend ./frontend
COPY shared ./shared

# Install pnpm globally
RUN npm install -g pnpm

RUN pnpm install --config.confirmModulesPurge=false --filter frontend...

# Expose the necessary port
EXPOSE 5173

# Mount the working directory as a volume (for dev)
VOLUME [ "/app" ]

# Start the backend service in dev mode
CMD [ "pnpm", "--filter", "frontend", "run", "dev" ]

# docker build -t mood-tracker-frontend-dev-image -f frontend/dev.Dockerfile .