#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# --- Configuration ---
IMAGE_NAME="my-nextjs-app-dev" # Choose a name for your Docker image
CONTAINER_NAME="my-nextjs-app-dev-container" # Choose a name for your running container
HOST_PORT="10000" # Port on your local machine
CONTAINER_PORT="10000" # Port the app runs on inside the container (must match EXPOSE/CMD in Dockerfile)

# --- Script Logic ---

echo "--- Starting Development Environment ---"

# Check if a container with the same name is running or stopped, and remove it
if [ "$(docker ps -q -f name=^/${CONTAINER_NAME}$)" ]; then
    echo "Stopping existing container: ${CONTAINER_NAME}..."
    docker stop "${CONTAINER_NAME}"
fi
if [ "$(docker ps -aq -f status=exited -f name=^/${CONTAINER_NAME}$)" ]; then
    echo "Removing existing container: ${CONTAINER_NAME}..."
    docker rm "${CONTAINER_NAME}"
fi
# Note: If using --rm on docker run, manual removal is less critical,
# but this handles cases where --rm wasn't used or the container wasn't cleaned up properly.


echo "Building Docker image: ${IMAGE_NAME}:latest ..."
# Build the image using the Dockerfile in the current directory (.)
# The tag is set to 'latest' here, you could use 'dev' or another tag if preferred.
docker build -t "${IMAGE_NAME}:latest" .

echo "Running Docker container ${CONTAINER_NAME} from image ${IMAGE_NAME}:latest ..."
echo "Access the application at: http://localhost:${HOST_PORT}"

# Run the container:
# -it: Interactive TTY - shows logs directly and allows Ctrl+C to stop.
# --rm: Automatically remove the container when it exits.
# -p: Map host port to container port.
# -v "$(pwd)":/app: Mount current directory (project root) to /app in the container.
# -v /app/node_modules: Use a container volume for node_modules (prevents host node_modules from overwriting container's).
# -v /app/.next: Use a container volume for the .next build cache.
# --name: Assign a name to the container.
# "${IMAGE_NAME}:latest": The image to run.
docker run \
  -it \
  --rm \
  -p "${HOST_PORT}:${CONTAINER_PORT}" \
  -v "$(pwd)":/app \
  -v /app/node_modules \
  -v /app/.next \
  --name "${CONTAINER_NAME}" \
  "${IMAGE_NAME}:latest"

# Note: If you prefer to run in the background (detached mode), replace '-it' with '-d'.
# If using '-d', you'll need to use 'docker logs -f ${CONTAINER_NAME}' to see output
# and 'docker stop ${CONTAINER_NAME}' to stop it.

echo "--- Container stopped. ---"