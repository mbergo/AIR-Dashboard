# Dockerfile (place in project root)

# Use an official Node.js runtime as a parent image (Choose LTS or a version matching your needs)
# Using Alpine for a smaller image size
FROM node:20-alpine AS development

# Install pnpm globally
RUN npm install -g pnpm

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and pnpm-lock.yaml first to leverage Docker layer caching
# Only re-run pnpm install if these files change
COPY package.json pnpm-lock.yaml ./

# Install project dependencies using pnpm
# Using --shamefully-hoist might be needed depending on project setup, but start without it.
# RUN pnpm install --shamefully-hoist
RUN pnpm install

# Copy the rest of your application code into the working directory
# Use .dockerignore to exclude node_modules, .next, .git etc.
COPY . .

# Expose the port the app will run on (as specified in package.json and requested: 10000)
EXPOSE 10000

# Command to run the Next.js development server using the 'dev' script from package.json
# The arguments (-H 0.0.0.0 -p 10000) are now part of the script itself.
CMD ["pnpm", "run", "dev"]
