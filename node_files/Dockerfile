FROM node:18.14.0-bullseye-slim

# copied from https://www.digitalocean.com/community/tutorials/how-to-build-a-node-js-application-with-docker
# RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

# WORKDIR /home/node/app
WORKDIR /app


COPY package*.json ./

# USER node

RUN npm install
COPY . .

