import { NextResponse } from "next/server"
import type { AdminPermission } from "@/lib/firebase/collections"

export const dynamic = "force-dynamic"

// DEMO MODE: Firebase Authentication removed.
// In production, this route:
//   - POST: Verifies Firebase ID tokens, enforces @434media.com domain for Google SSO,
//     creates httpOnly session cookies with 7-day expiry
//   - GET: Verifies session cookie, returns current user info
//   - DELETE: Revokes refresh tokens and clears session cookies

const DEFAULT_PERMISSIONS: AdminPermission[] = [
  "registrations",
  "newsletter",
  "pitches",
  "speakers",
  "schedule",
  "sponsors",
  "users"
]

// POST - Demo sign-in (no real token verification)
export async function POST() {
  return NextResponse.json({
    success: true,
    user: {
      email: "demo@techday.sa",
      name: "Demo Admin",
      role: "admin" as const,
      permissions: DEFAULT_PERMISSIONS,
    },
  })
}

// GET - Always return authenticated in demo
export async function GET() {
  return NextResponse.json({
    authenticated: true,
    user: {
      email: "demo@techday.sa",
      name: "Demo Admin",
      role: "admin" as const,
      permissions: DEFAULT_PERMISSIONS,
    },
  })
}

// DELETE - Demo logout
export async function DELETE() {
  return NextResponse.json({ success: true })
}
