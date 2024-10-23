#!/bin/sh

# Run Prisma migrations if the environment variable is set
if [ "$RUN_MIGRATIONS" = "true" ]; then
  echo "### 1. Waiting 5s before running prisma migrate ###"
  sleep 5s && npx prisma migrate deploy
  echo "### 2. Migrate script done ###"
  echo "### 3. Generate prisma client ###"
  npx prisma generate
  echo "### 4. All prisma jobs complete ###"
  echo "### 5. Build next.js application ###"
  npm run build
else
  echo "### Skipping Prisma migrations & build ###"
fi

# Start the application
exec "$@"
