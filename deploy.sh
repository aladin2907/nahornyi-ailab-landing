#!/bin/bash

# DigitalOcean deployment script for Nahornyi AILab
# Usage: ./deploy.sh

set -e

echo "🚀 Starting deployment to DigitalOcean..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="nahornyi-ailab"
DOCKER_IMAGE="nahornyi-ailab:latest"

echo -e "${YELLOW}📦 Building Docker image...${NC}"
docker build -t $DOCKER_IMAGE .

echo -e "${YELLOW}🔄 Stopping existing container...${NC}"
docker stop $APP_NAME 2>/dev/null || echo "No existing container to stop"
docker rm $APP_NAME 2>/dev/null || echo "No existing container to remove"

echo -e "${YELLOW}🎯 Starting new container...${NC}"
docker run -d \
  --name $APP_NAME \
  --restart unless-stopped \
  -p 3000:3000 \
  $DOCKER_IMAGE

echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
echo -e "${GREEN}🌐 Application is running on http://localhost:3000${NC}"

# Check if container is running
if docker ps | grep -q $APP_NAME; then
    echo -e "${GREEN}✅ Container is running properly${NC}"
else
    echo -e "${RED}❌ Container failed to start${NC}"
    echo "📋 Container logs:"
    docker logs $APP_NAME
    exit 1
fi

echo -e "${YELLOW}🧹 Cleaning up old images...${NC}"
docker image prune -f

echo -e "${GREEN}🎉 Deployment complete! 🎉${NC}"
