FROM node:20-alpine AS builder

WORKDIR /api

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine

WORKDIR /api

ENV NODE_ENV production

COPY package*.json ./

RUN npm install --omit=dev

COPY --from=builder /api/dist ./dist

EXPOSE 3000

CMD ["npm", "run", "start"]
