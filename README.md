# Project Deployment Guide

This project is configured to run on **Dokploy** (or any container environment) using a streamlined Docker setup.

## Deployment Details

- **Base Docker Image:** `shinsenter/php:8.4-fpm-nginx`
  - Runs PHP 8.4-FPM and Nginx side-by-side.
  - Default web root is `/var/www/html`.
- **Exposed Port:** `80` (handled by Dokploy/Traefik).

## SMTP Configuration

The base image has `msmtp` pre-installed. To configure the system to send emails (for PHP's `mail()` function), define the following environment variables in your Dokploy application settings:

| Environment Variable | Description |
| :--- | :--- |
| `SMTP_HOST` | Hostname of the SMTP server (e.g. `smtp.mailgun.org`, `smtp.gmail.com`). |
| `SMTP_PORT` | SMTP server port (usually `587` for TLS or `465` for SSL; defaults to `587`). |
| `SMTP_FROM` | The sender address (e.g. `noreply@yourdomain.com`). |
| `SMTP_USER` | SMTP authentication username. |
| `SMTP_PASS` | SMTP authentication password. |
| `SMTP_TLS` | Enable TLS (set to `on` or `off`; default is `on`). |
| `SMTP_AUTH` | Enable SMTP authentication (set to `on` or `off`; default is `on`). |

These variables will be parsed automatically at container start to configure msmtp.

## Local Development with DDEV

This project is configured to use **DDEV** for local environment orchestration.

### Environment Variable Configuration (`SITE_URL`)
The project dynamically resolves the canonical SEO URL during compilation based on the `SITE_URL` environment variable:
- It is set locally in `.ddev/.env` (e.g., `SITE_URL="https://prws.ddev.site"`).
- It is exposed to the container environment via `.ddev/config.yaml` under the `web_environment` setting.

### Compiling Assets inside DDEV
Since Astro requires Node.js `>=22.12.0`, you should build assets inside DDEV where Node v22 is configured:

1. **Build inside the container**:
   ```bash
   ddev npm run build
   ```
   This automatically injects the container's `SITE_URL` and outputs pre-rendered canonical tags matching `https://prws.ddev.site/`.

2. **Build on host (with manual override)**:
   If building on your host machine outside the container, pass the variable inline:
   ```bash
   SITE_URL=https://prws.ddev.site npm run build
   ```
   *(Note: If no `SITE_URL` environment variable is provided, the build defaults to `http://localhost`).*