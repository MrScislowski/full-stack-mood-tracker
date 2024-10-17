FROM node:18-alpine3.20
WORKDIR /app

COPY . .

RUN npm install
# this next line doesn't really do anything; it's just for documentation
EXPOSE 3000
# ditto: the 'bind mounts' in docker-compose-*.yml files takes precedence
VOLUME [ "/app" ]

CMD [ "npm", "run", "dev", "--", "--host" ]

# docker build -t mood-tracker-backend-dev-image -f dev.Dockerfile .

# NB: this next command never did allow POST requests to go through... I guess it works with entire directories...
# docker run -p "3001:3001" -v "$(pwd):/app" --name mood-tracker-backend-dev mood-tracker-backend-dev-image
