FROM node:18-alpine3.20
WORKDIR /app

# Copy pnpm lockfile and workspace package.json from the root directory
COPY pnpm-lock.yaml ./
COPY package.json ./

COPY backend ./backend
COPY shared ./shared

# Install pnpm globally
RUN npm install -g pnpm

# Install only the dependencies for the backend and its dependencies (including shared)
RUN pnpm install --config.confirmModulesPurge=false --filter backend...

# Expose the necessary port
EXPOSE 3000

# Mount the working directory as a volume (for dev)
VOLUME [ "/app" ]

# Start the backend service in dev mode
CMD [ "pnpm", "--filter", "backend", "run", "dev", "--", "--host" ]

# run from monorepo root
# docker build -t mood-tracker-backend-dev-image -f backend/dev.Dockerfile .

# docker run -p "3000:3000" -v "$(pwd):/app" --name mood-tracker-backend-dev mood-tracker-backend-dev-image
