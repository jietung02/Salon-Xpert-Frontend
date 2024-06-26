
# build environment
FROM node:20.11-alpine as build
WORKDIR /app
COPY package*.json .
COPY yarn*.lock .
RUN yarn install
COPY . .
RUN yarn build

# production environment
FROM nginx:1.24-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]