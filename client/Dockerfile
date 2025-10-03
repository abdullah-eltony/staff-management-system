FROM node:20-alpine AS build
WORKDIR /app

# انسخ package.json و package-lock.json
COPY ./client/package*.json ./
RUN npm install

# انسخ باقي ملفات client
COPY ./client/. .
RUN npm run build

# Stage 2: Nginx
FROM nginx:alpine
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
