# Base image for both stages
FROM node:18 AS base

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code to the working directory
COPY . .

# Development stage
FROM base AS dev

# Expose port 5173 for Vite's development server
EXPOSE 5173

# Start the Vite development server
CMD ["npm", "run", "dev", "--", "host"]

# Production stage
FROM base AS build

# Build the app
RUN npm run build

# Production image, using Nginx to serve static files
FROM nginx:alpine AS prod

# Copy the built app from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 81
EXPOSE 81

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
