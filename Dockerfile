FROM php:8.2-fpm-alpine

# Install nginx and msmtp (lightweight SMTP client) and ca-certificates
RUN apk add --no-cache nginx msmtp ca-certificates

# Copy site into document root
COPY . /var/www/html/

# Copy our nginx config into place
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Copy entrypoint script and php msmtp ini (will set sendmail_path)
COPY docker/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
COPY docker/msmtp.ini /usr/local/etc/php/conf.d/msmtp.ini
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Create run dir and set permissions for the web root
RUN mkdir -p /run/nginx \
	&& chown -R www-data:www-data /var/www/html \
	&& find /var/www/html -type d -exec chmod 755 {} \; \
	&& find /var/www/html -type f -exec chmod 644 {} \;

# NOTE: PHP's mail() will use msmtp configured at container start. The entrypoint
# script writes /etc/msmtprc from environment variables (SMTP_HOST, SMTP_PORT,
# SMTP_USER, SMTP_PASS, SMTP_FROM). If not provided, PHP mail() will likely fail to deliver.

EXPOSE 80

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
# Start php-fpm (daemonize) then run nginx in foreground so container stays up
CMD ["sh", "-c", "php-fpm -D && nginx -g 'daemon off;'"]
