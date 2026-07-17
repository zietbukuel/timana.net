# Stage 1: Build the assets
FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve the application with PHP & Nginx
FROM shinsenter/php:8.4-fpm-nginx
COPY --from=builder --chown=www-data:www-data /app/dist /var/www/html
EXPOSE 80