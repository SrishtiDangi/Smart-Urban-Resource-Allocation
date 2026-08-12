# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# Serve stage using Nginx
FROM nginx:alpine

# Copy built static files to Nginx web root
COPY --from=build /app/dist /usr/share/nginx/html

# Expose standard port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
