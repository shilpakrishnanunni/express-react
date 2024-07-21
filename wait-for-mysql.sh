#!/bin/sh

set -e

echo "Waiting for MySQL to be ready..."

while ! mysqladmin ping -h"$DB_HOST" --silent; do
    echo "Still waiting."
    sleep 1
done

echo "MySQL is up and running"
exec "$@"
