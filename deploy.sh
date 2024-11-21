#!/bin/bash

# Define variables
CONTAINER_NAME="idr-frontend"

# Pull the latest code
git pull origin master

# Build the new Docker image
docker compose build idr-frontend

# Stop the running container
docker stop $CONTAINER_NAME

# Remove the old container
docker rm $CONTAINER_NAME

# Start the new container
docker compose up -d idr-frontend

echo "Container updated successfully!"
