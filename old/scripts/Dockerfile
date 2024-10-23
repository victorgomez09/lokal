# Dockerfile
FROM node:20-alpine

WORKDIR /lokal

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

COPY scripts/entrypoint.sh /lokal/scripts/entrypoint.sh
RUN chmod +x /lokal/scripts/entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["/lokal/scripts/entrypoint.sh"]
CMD ["npm", "start"]
