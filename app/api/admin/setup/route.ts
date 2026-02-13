import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

// DEMO MODE: Setup endpoint disabled.
// In production, creates the first admin user when no admins exist in Firestore.

export async function POST() {
  return NextResponse.json({
    success: true,
    message: "Demo mode - setup not required. Demo admin is pre-configured.",
  })
}

export async function GET() {
  return NextResponse.json({
    setupComplete: true,
    adminCount: 1,
  })
}
