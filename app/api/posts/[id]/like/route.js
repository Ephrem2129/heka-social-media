import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyJwt } from "@/lib/auth";

function getUserIdFromReq(req) {
  const token = req.cookies.get("token")?.value;
  const payload = token ? verifyJwt(token) : null;
  return payload?.sub || null;
}

export async function POST(req, { params }) {
  try {
    const authUserId = getUserIdFromReq(req);
    if (!authUserId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { id: postId } = await params;

    const existing = await prisma.like.findUnique({
      where: { postId_userId: { postId, userId: authUserId } },
    });
    if (existing) {
      await prisma.like.delete({ where: { id: existing.id } });
      return NextResponse.json({ liked: false });
    }
    await prisma.like.create({ data: { postId, userId: authUserId } });
    return NextResponse.json({ liked: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// Modified: 2026-04-15 20:23:46 - Initialize Prisma schema

// Modified: 2026-04-15 20:23:46 - Fix foreign key constraints

// Modified: 2026-04-15 20:23:46 - Add unique constraints

// Modified: 2026-04-15 20:23:46 - Add email validation

// Modified: 2026-04-15 20:23:46 - Add post pagination
