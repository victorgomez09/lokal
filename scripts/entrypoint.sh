#!/bin/sh

# Run Prisma migrations
echo "Waiting 5s before running prisma migrate..."

sleep 5s && npx prisma migrate deploy

echo "Migrate script done"

# Start the application
exec "$@"
