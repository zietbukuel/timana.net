#!/bin/sh
set -e

# Create msmtp config from environment variables if SMTP_HOST is set
if [ -n "${SMTP_HOST}" ]; then
  cat > /etc/msmtprc <<EOF
defaults
auth           on
tls            on
tls_trust_file /etc/ssl/certs/ca-certificates.crt
logfile        /var/log/msmtp.log

account default
host ${SMTP_HOST}
port ${SMTP_PORT:-587}
from ${SMTP_FROM}
user ${SMTP_USER}
passwordeval echo "${SMTP_PASS}"
EOF

  chmod 600 /etc/msmtprc
  touch /var/log/msmtp.log
  chown root:root /etc/msmtprc
  chown www-data:www-data /var/log/msmtp.log || true
  echo "msmtp configuration written to /etc/msmtprc"
else
  echo "SMTP_HOST not set; skipping msmtp configuration. PHP mail() will not be able to send mail."
fi

# Ensure nginx has a log directory
mkdir -p /var/log/nginx

# Exec the CMD
exec "$@"
