#!/bin/bash

# Check if the registry is already running
if ! docker ps -q --filter "name=registry" > /dev/null; then
  echo "Registry is not running. Starting..."
  docker run -d -p 5000:5000 --restart=always --name registry registry:2
  echo "Registry started."
else
  echo "Registry is already running."
fi

# (Optional) Configure Docker to use the local registry
# docker config create registry-1.docker.io "http://localhost:5000"

# Build and tag images with the local registry
docker-compose build --no-cache

# Tag images correctly using docker-compose image names
for service in tm-auth-service tm-metrics-api tm-notifications-api tm-tasks-api tm-settings-api tm-core-app kong; do
  # docker tag task-manager_${service}:latest localhost:5000/${service}:latest
  docker push localhost:5000/${service}:latest
done

# Create the 'kong' namespace if it doesn't exist
# kubectl create namespace kong || true

# Apply the Kubernetes configuration
kubectl apply -f compose.k8s.yaml

echo "Deployment complete!"
