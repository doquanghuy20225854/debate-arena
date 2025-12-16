#!/bin/sh
set -e

echo "[backend] Waiting for MySQL at mysql:3306..."
until nc -z mysql 3306; do
  sleep 1
done
echo "[backend] MySQL is reachable."

# Không auto migrate để tránh restart loop.
# Bạn chạy migrate thủ công 1 lần bằng docker compose exec.
echo "[backend] Starting server..."
exec "$@"
