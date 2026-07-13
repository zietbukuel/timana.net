FROM shinsenter/php:8.4-fpm-nginx

# Copy site into document root with correct ownership
COPY --chown=www-data:www-data . /var/www/html

# Configure PHP's sendmail path to use msmtp with the system config at /etc/msmtprc
RUN echo 'sendmail_path = "/usr/bin/msmtp -C /etc/msmtprc --logfile /var/log/msmtp.log -a default -t"' > /usr/local/etc/php/conf.d/msmtp.ini

EXPOSE 80

