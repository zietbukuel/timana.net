FROM shinsenter/php:8.4-fpm-nginx

# Copy site into document root with correct ownership
COPY --chown=www-data:www-data . /var/www/html

EXPOSE 80