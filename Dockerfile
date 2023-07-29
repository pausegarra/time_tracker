FROM node:18.12-alpine3.17 AS client

WORKDIR /app
COPY ./client .
ENV VITE_APP_API_URL=/api
RUN yarn
RUN yarn build

FROM node:18.12-alpine3.17 AS backend

WORKDIR /app
COPY ./server .
RUN npm i
RUN npm run build

FROM node:18.12-alpine3.17 AS server

WORKDIR /app
COPY --from=backend /app/ ./server
COPY --from=client /app/dist ./server/client
RUN rm -rf ./server/src
EXPOSE 5000
CMD ["node", "server/dist/main.js"]