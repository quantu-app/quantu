FROM node:19.9-alpine3.17 as base

RUN apk update --no-cache && apk add --no-cache python3 g++ make zlib-dev
RUN npm install -g npm@9.6

WORKDIR /app

FROM base as builder

COPY package*.json ./
RUN npm install

ARG DATABASE_URL=postgresql://prisma:prisma@localhost:5432/quantu-app
ENV DATABASE_URL=$DATABASE_URL

RUN echo "DATABASE_URL=$DATABASE_URL" >> .env

COPY . .

RUN npm run prisma generate
RUN NODE_ENV=production npm run build

FROM base

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.env ./
COPY --from=builder /app/prisma .

RUN NODE_ENV=production npm install

COPY --from=builder /app/build .

EXPOSE 3000

CMD [ "node", "index.js" ]