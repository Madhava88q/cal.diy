FROM node:22-alpine

WORKDIR /app

COPY package.json package.json
COPY . .

RUN npm install

USER root

CMD ["npm", "start"]
