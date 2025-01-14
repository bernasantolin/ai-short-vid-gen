# Stage 1: Build Stage
FROM node:20-alpine AS builder

WORKDIR /builder

# Copy package files and install dependencies
COPY package.json package-lock.json ./

RUN npm install

# Copy source code
COPY . .

# Build the Next.js app
RUN npm run build

# Stage 2: Nginx + Next.js Reverse Proxy
FROM nginx:alpine AS runner

# Set working directory to Nginx root folder
WORKDIR /usr/share/nginx/html

# Remove default Nginx static files
RUN rm -rf ./*

# Copy Nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the build output to Nginx static folder (for static content only)
COPY --from=builder /builder/.next /usr/share/nginx/html/.next
COPY --from=builder /builder/public /usr/share/nginx/html/public

# Expose port 80
EXPOSE 80

# Run Nginx as the entrypoint
ENTRYPOINT ["nginx", "-g", "daemon off;"]