FROM node:alpine
WORKDIR /usr/src/clean-node-api
COPY package.json .
RUN npm install --only=prod
