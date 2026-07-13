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