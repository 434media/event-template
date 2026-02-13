import { NextResponse } from "next/server"
import { DEMO_REGISTRATIONS } from "@/lib/demo-data"

export const dynamic = "force-dynamic"

export async function GET() {
  return NextResponse.json({ count: DEMO_REGISTRATIONS.length })
}
