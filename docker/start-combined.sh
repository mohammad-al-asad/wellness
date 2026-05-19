#!/bin/sh
set -eu

cd /app/backend
uvicorn app.main:app --host 0.0.0.0 --port 8000 &
uvicorn_pid=$!

nginx -g 'daemon off;' &
nginx_pid=$!

cleanup() {
    kill -TERM "$nginx_pid" "$uvicorn_pid" 2>/dev/null || true
    wait "$nginx_pid" 2>/dev/null || true
    wait "$uvicorn_pid" 2>/dev/null || true
}

trap cleanup INT TERM

wait "$nginx_pid"
cleanup
