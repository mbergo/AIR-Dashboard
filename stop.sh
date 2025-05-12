#!/bin/bash

# --- Configuration ---
# IMPORTANT: Use the SAME container name as in your start.sh script!
CONTAINER_NAME="my-nextjs-app-dev-container"

# --- Script Logic ---

echo "--- Stopping Development Environment ---"

# Check if a container with the specified name exists (running or stopped)
if [ "$(docker ps -aq -f name=^/${CONTAINER_NAME}$)" ]; then
    echo "Found container: ${CONTAINER_NAME}. Attempting to stop..."
    # Attempt to stop the container gracefully (Docker sends SIGTERM, then SIGKILL after timeout)
    docker stop "${CONTAINER_NAME}" > /dev/null 2>&1 || echo "Container was likely already stopped."

    # Optional: Force removal if stop fails or if you want immediate removal
    # If you used '--rm' in start.sh, this might not be strictly necessary unless start.sh was interrupted,
    # but it provides a definite cleanup step.
    echo "Attempting to remove container: ${CONTAINER_NAME}..."
    docker rm "${CONTAINER_NAME}" > /dev/null 2>&1 || echo "Container was likely already removed."

    echo "Container ${CONTAINER_NAME} stopped and removed."
else
    echo "Container ${CONTAINER_NAME} not found."
fi

echo "--- Stop script finished. ---"
