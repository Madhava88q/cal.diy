FROM node:22-alpine

WORKDIR /app

COPY package.json package.json
COPY .env .env
COPY .env.production .env.production
COPY . .

RUN npm install

CMD ["npm", "start"]
