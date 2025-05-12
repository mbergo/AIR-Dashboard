#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# --- Configuration ---
# IMPORTANT: Use the SAME image name as in your start.sh script!
IMAGE_NAME="my-nextjs-app-dev"
IMAGE_TAG="latest" # You can use 'latest', 'dev', or a specific version

# --- Script Logic ---

echo "--- Building Development Docker Image ---"

echo "Building image: ${IMAGE_NAME}:${IMAGE_TAG}"

# Build the Docker image using the Dockerfile in the current directory (.)
# The '-t' flag tags the image with the specified name and tag.
docker build -t "${IMAGE_NAME}:${IMAGE_TAG}" .

echo "--- Docker image build complete: ${IMAGE_NAME}:${IMAGE_TAG} ---"