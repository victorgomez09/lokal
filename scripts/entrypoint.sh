#!/bin/sh

# Run Prisma migrations if the environment variable is set
if [ "$RUN_MIGRATIONS" = "true" ]; then
  echo "Waiting 5s before running prisma migrate..."
  sleep 5s && npx prisma migrate deploy
  echo "Migrate script done"
  echo "Build next.js application"
  npm run build
else
  echo "Skipping Prisma migrations & build"
fi

# Start the application
exec "$@"
