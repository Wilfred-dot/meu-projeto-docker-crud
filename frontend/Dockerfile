# Etapa 1: Build
FROM node:23 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: Produção
FROM node:23

WORKDIR /app

COPY --from=builder /app ./
RUN npm install --omit=dev

EXPOSE 3000

CMD ["npm", "start"]
