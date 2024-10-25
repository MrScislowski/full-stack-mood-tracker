FROM node:18-alpine3.20
WORKDIR /app/data

RUN npm install -g json-server

# this next line doesn't really do anything; it's just for documentation
EXPOSE 3001
# ditto: the 'bind mounts' in docker-compose-*.yml files takes precedence
VOLUME [ "/app/data" ]
CMD [ "npx", "json-server", "/app/data/db.json", "--host", "0.0.0.0", "--port", "3001"]

# docker build -t json-server-dev-image -f db.dev.Dockerfile .

# NB: this next command never did allow POST requests to go through... I guess it works with entire directories...
# docker run -p "3001:3001" -v "$(pwd)/data/:/app/data" --name json-server-dev json-server-dev-image