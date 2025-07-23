FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/ ./

RUN npm install --only=production

EXPOSE 3000

CMD ["npm", "run", "start"]
