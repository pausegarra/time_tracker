FROM node:18.12-alpine3.17 AS backend

WORKDIR /app
COPY . .
RUN yarn
RUN yarn build
RUN rm -rf ./src

EXPOSE 5000
CMD ["node", "dist/main.js"]