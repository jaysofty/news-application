# ==========================================
# 1. Dependencies
# ==========================================
FROM node:22-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --ignore-scripts --no-audit --no-fund


# ==========================================
# 2. Migration
# ==========================================
FROM deps AS migrate

WORKDIR /app

# Prisma schema
COPY prisma ./prisma

# Prisma config
COPY prisma.config.ts ./

# Seed file if referenced by prisma.config.ts
COPY prisma/seed.ts ./prisma/seed.ts

# Make sure DATABASE_URL is supplied at runtime
CMD ["npx", "prisma", "migrate", "deploy", "--schema=/app/prisma/schema.prisma"]


# ==========================================
# 3. Builder
# ==========================================
FROM deps AS builder

WORKDIR /app

COPY . .

# Prisma Client generation
RUN npx prisma generate

# Next.js production build
RUN npm run build


# ==========================================
# 4. Production
# ==========================================
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# ==========================================
# Non-root user
# ==========================================

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs


# ==========================================
# Next.js standalone
# ==========================================

COPY --from=builder --chown=nextjs:nodejs \
    /app/public ./public

COPY --from=builder --chown=nextjs:nodejs \
    /app/.next/standalone ./

COPY --from=builder --chown=nextjs:nodejs \
    /app/.next/static ./.next/static


# ==========================================
# Prisma generated client
# ==========================================

COPY --from=builder --chown=nextjs:nodejs \
    /app/src/generated/prisma ./src/generated/prisma


# ==========================================
# Runtime
# ==========================================

USER nextjs

EXPOSE 3000


# ==========================================
# Healthcheck
# ==========================================

HEALTHCHECK \
    --interval=30s \
    --timeout=5s \
    --start-period=20s \
    --retries=3 \
    CMD wget --spider -q http://127.0.0.1:3000 || exit 1


# ==========================================
# Start Next.js
# ==========================================

CMD ["node", "server.js"]