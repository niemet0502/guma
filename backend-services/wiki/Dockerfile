FROM node:16-alpine AS base

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

FROM base AS dev
# Install dependencies
RUN npm install 

# Copy source code
COPY . .

# Expose port 3000
EXPOSE 3000

# Start app
CMD ["npm", "run", "start:dev"]

FROM base as prod 
ENV NODE_ENV production 

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

# Start the server using the production build
CMD [ "node", "dist/main.js" ]