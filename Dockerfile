# Multi-stage Dockerfile for a NestJS application
# - Builder stage compiles the TypeScript app
# - Final stage contains only production dependencies + compiled dist

FROM node:20-alpine AS builder

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Install build deps
WORKDIR /app

# Install system deps required by some npm packages (kept minimal)
RUN apk add --no-cache --virtual .gyp python3 make g++

# Copy only package manifests to leverage Docker layer caching
COPY package*.json ./

# Use npm ci for reproducible installs (will install dev deps for build)
RUN npm ci --silent

# Copy source and compile
COPY . .
RUN npm run build --silent

# Remove build-only toolchain to keep the builder small
RUN apk del .gyp || true


FROM node:20-alpine AS runner

WORKDIR /app

# Create a non-root user and group
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy only production package manifests and install production deps
COPY package*.json ./
RUN npm ci --omit=dev --production --silent || npm ci --only=production --silent

# Copy compiled output from builder
COPY --from=builder /app/dist ./dist

# Copy any other runtime assets (e.g., public, prisma, etc.) if present
# COPY --from=builder /app/public ./public

ENV NODE_ENV=production
ARG PORT=3000
ENV PORT=${PORT}

# Use non-root user
USER appuser

# Expose port and start the app
EXPOSE ${PORT}

# Default command assumes NestJS build output entrypoint is dist/main
CMD ["node", "dist/main"]
