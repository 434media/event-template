import { NextResponse } from "next/server"
import { DEMO_SESSIONS } from "@/lib/demo-data"

export const dynamic = "force-dynamic"
export const revalidate = 60

// DEMO MODE: Returns mock schedule data.
// In production, fetches from Firestore content collection.
export async function GET() {
  return NextResponse.json({ sessions: DEMO_SESSIONS })
}
