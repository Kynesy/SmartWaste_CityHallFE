FROM node:latest as node

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=node /app/dist/city-hall-fe /usr/share/nginx/html