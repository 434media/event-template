import { NextResponse } from "next/server"
import { DEMO_REGISTRATIONS, DEMO_NEWSLETTER, DEMO_PITCHES } from "@/lib/demo-data"

export const dynamic = "force-dynamic"

// DEMO MODE: Returns counts from mock data.
// In production, fetches counts from Firestore in parallel for performance.
export async function GET() {
  return NextResponse.json({
    registrations: DEMO_REGISTRATIONS.length,
    newsletter: DEMO_NEWSLETTER.filter((s) => s.status === "active").length,
    pitches: DEMO_PITCHES.length,
  })
}
