# Stage 1: Build the assets
FROM node:22-alpine AS builder
ARG SITE_URL
ENV SITE_URL=$SITE_URL
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN echo "BUILD_ARG SITE_URL is: $SITE_URL"
RUN npm run build

# Stage 2: Serve the application with PHP & Nginx
FROM shinsenter/php:8.4-fpm-nginx
COPY --from=builder --chown=www-data:www-data /app/dist /var/www/html
EXPOSE 80