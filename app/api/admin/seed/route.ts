import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

// DEMO MODE: Seed endpoint disabled.
// In production, seeds initial admin users to Firestore.
export async function POST() {
  return NextResponse.json({
    success: true,
    message: "Demo mode - seeding not required. All demo data is pre-loaded.",
  })
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Demo mode - admin data is pre-loaded",
    count: 1,
    admins: [{ email: "demo@techday.sa", name: "Demo Admin", role: "admin" }],
  })
}
