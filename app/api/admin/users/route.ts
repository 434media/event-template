import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

// DEMO MODE: Returns demo admin user.
// In production, manages admin users via Firebase Auth + Firestore users collection.

export async function GET() {
  return NextResponse.json({
    success: true,
    users: [
      {
        uid: "demo-uid-001",
        email: "demo@techday.sa",
        displayName: "Demo Admin",
        role: "admin",
        permissions: ["speakers", "schedule", "sponsors", "registrations", "pitches", "newsletter", "users"],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
  })
}

export async function POST(request: Request) {
  const data = await request.json()
  if (!data.email || !data.role) {
    return NextResponse.json({ error: "Email and role are required" }, { status: 400 })
  }
  console.log(`[DEMO] User create simulated: ${data.email}`)
  return NextResponse.json({ success: true, message: "User created (demo)", uid: `demo-${Date.now()}` })
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const uid = searchParams.get("uid")
  if (!uid) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 })
  }
  console.log(`[DEMO] User delete simulated: ${uid}`)
  return NextResponse.json({ success: true, message: "User admin access removed (demo)" })
}
