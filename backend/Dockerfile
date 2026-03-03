FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY prisma ./prisma
COPY prisma.config.ts ./

RUN npx prisma generate

COPY . .
COPY .env .env

RUN npm run build

EXPOSE 3333

CMD ["npm", "run", "start"]