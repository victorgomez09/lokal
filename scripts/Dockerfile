# Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

COPY scripts/entrypoint.sh /app/scripts/entrypoint.sh
RUN chmod +x /app/scripts/entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["/app/scripts/entrypoint.sh"]
CMD ["npm", "start"]
