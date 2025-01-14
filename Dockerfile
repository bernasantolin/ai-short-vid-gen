# Stage 1: Base stage with Node.js Alpine image
FROM node:20-alpine AS builder

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

# Copy built artifacts from the builder stage
COPY --from=builder /builder/.next /usr/share/nginx/html/.next
COPY --from=builder /builder/public /usr/share/nginx/html/public
COPY --from=builder /builder/package.json /usr/share/nginx/html/package.json
COPY --from=builder /builder/package-lock.json /usr/share/nginx/html/package-lock.json

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Inform Docker that the container is listening on port 80 at runtime
EXPOSE 80

# Define the command to run the app
ENTRYPOINT ["nginx", "-g", "daemon off;"]