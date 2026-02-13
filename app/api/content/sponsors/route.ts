import { NextResponse } from "next/server"
import { DEMO_SPONSORS } from "@/lib/demo-data"

export const dynamic = "force-dynamic"
export const revalidate = 60

// DEMO MODE: Returns mock sponsor data.
// In production, fetches from Firestore content collection with tiered sponsor structure.
export async function GET() {
  return NextResponse.json({ sponsors: DEMO_SPONSORS })
}
