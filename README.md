# Lokal

## Overview
Simple self-host file sharing application for building your own Dropbox/Google Drive/ICloud Drive.
Point to the files you already have, where they already are located, Lokal stores additional information in its own postgres db.
This works great for e.g. exposing an entire user share from unraid.


## Prerequisites
- Docker
- Docker Compose

## Running this project

### Locally for development purposes

```
docker-compose -f docker-compose.dev.yml up --build -d
```

### Production use
```
docker-compose up --build -d
```

## Building

Build:

```
docker build -t your-dockerhub-username/lokal:latest -f Dockerfile .
```

Push to Docker Hub:

```
docker push your-dockerhub-username/lokal:latest
```

