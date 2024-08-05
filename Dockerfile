# Step 1: Build the Vue.js application
FROM node:19.5.0 as build-stage

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the source code
COPY . .

# Build the application
RUN npm run build

# Step 2: Serve the application with Nginx
FROM nginx:alpine as production-stage

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built files from the build stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose port 7075
EXPOSE 8090

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
