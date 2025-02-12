import { PrismaClient } from '@prisma/client'

// Reuse Prisma client across hot reloads in dev
const globalForPrisma = globalThis

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export default prisma



// Modified: 2026-04-15 20:23:46 - Implement post deletion

// Modified: 2026-04-15 20:23:47 - Add follower count display
