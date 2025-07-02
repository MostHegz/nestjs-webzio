FROM node:24-alpine

WORKDIR /app

COPY package.json package-lock.json ./
COPY nest-cli.json tsconfig.json ./
RUN npm install
COPY . .
RUN npm run build nestjs-webzio
EXPOSE 3000

CMD ["node", "dist/apps/nestjs-webzio/main"]