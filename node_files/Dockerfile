FROM node:18.14.0-bullseye-slim

WORKDIR /node

COPY package.json package.json 
COPY package-lock.json package-lock.json
RUN npm install

COPY . .

