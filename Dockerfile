# Stage 1: Base stage with Node.js Alpine image
FROM node:20-alpine AS builder

# Install Node.js in the Nginx container to run the app
RUN apk add --no-cache nodejs npm

# Set the working directory for subsequent instructions
WORKDIR /builder

# Copy dependencies files first
COPY package.json package-lock.json ./ 

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Runner stage starts from the nginx:alpine image
FROM nginx:alpine AS runner

# Set the working directory in the container
WORKDIR /usr/share/nginx/html

# Remove the default Nginx static assets
RUN rm -rf ./*

ENV NODE_ENV production

# Copy built artifacts from the builder stage
COPY --from=builder /builder/.next /usr/share/nginx/html/.next
COPY --from=builder /builder/public /usr/share/nginx/html/public
# COPY --from=builder /builder/package.json /usr/share/nginx/html/package.json
# COPY --from=builder /builder/package-lock.json /usr/share/nginx/html/package-lock.json
# COPY --from=builder /builder/.next/static /usr/share/nginx/html/.next/static

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose ports
EXPOSE 80 3000

# Start both Nginx and the Next.js app
CMD ["/bin/sh", "-c", "npm start --prefix /usr/share/nginx/html & nginx -g 'daemon off;'"]

# Define the command to run the app
# ENTRYPOINT ["nginx", "-g", "daemon off;"]
# Build stage


# LOCAL
# FROM node:18.17.0-alpine AS builder
# WORKDIR /app
# COPY package*.json ./
# RUN npm install

# COPY . .

# RUN npm run build

# # Production stage
# FROM node:18.17.0-alpine
# WORKDIR /app


# COPY --from=builder /app/next.config.mjs ./next.config.mjs
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package.json ./package.json

# CMD ["npm", "start"]