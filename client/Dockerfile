FROM node:18.12-alpine3.17 AS build

WORKDIR /app
COPY . .
ENV VITE_API_URL=https://timetracker.pausegarra.es/api
RUN yarn
RUN yarn build

FROM nginx:1.17.8-alpine

COPY --from=build /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]