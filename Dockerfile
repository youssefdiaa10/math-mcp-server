#* =========================
#* Stage 1: Build
#* =========================
FROM node:22-bookworm-slim AS builder

WORKDIR /app

#* Copy dependency files first
#* This lets Docker cache npm install when source code changes.
COPY package*.json ./

#* Install all dependencies, including devDependencies
RUN npm ci

#* Copy source/configuration
COPY tsconfig.json ./
COPY src ./src

#* Compile TypeScript
RUN npm run build


#* =========================
#* Stage 2: Production
#* =========================
FROM node:22-bookworm-slim AS production

WORKDIR /app

#* Tell Node we're running in production
ENV NODE_ENV=production

#* Copy dependency files
COPY package*.json ./

#* Install only production dependencies
RUN npm ci --omit=dev && npm cache clean --force

#* Copy compiled application from builder
COPY --from=builder /app/dist ./dist

#* Document the application port
EXPOSE 3000

#* Start the HTTP MCP server
CMD ["npm", "run", "start:http"]