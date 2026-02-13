import { NextResponse } from "next/server"
import { DEMO_PITCHES } from "@/lib/demo-data"

export const dynamic = "force-dynamic"

export async function GET() {
  return NextResponse.json({ count: DEMO_PITCHES.length })
}
