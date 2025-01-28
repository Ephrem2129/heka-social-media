import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { verifyJwt } from '@/lib/auth'

export async function GET(req) {
  try {
    const token = req.cookies.get('token')?.value
    const payload = token ? verifyJwt(token) : null
    if (!payload?.sub) return NextResponse.json({ user: null }, { status: 200 })
    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: { id: true, username: true, name: true, email: true, bio: true, avatar: true, createdAt: true },
    })
    return NextResponse.json({ user })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}



// Modified: 2026-04-15 20:23:46 - Add JWT token verification

// Modified: 2026-04-15 20:23:46 - Add authentication middleware

// Modified: 2026-04-15 20:23:46 - Update schema with new fields

// Modified: 2026-04-15 20:23:46 - Add bio field to user model

// Modified: 2026-04-15 20:23:46 - Fix post image rendering
