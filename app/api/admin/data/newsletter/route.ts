import { NextResponse } from "next/server"
import { DEMO_NEWSLETTER } from "@/lib/demo-data"

export const dynamic = "force-dynamic"

// DEMO MODE: Returns mock newsletter subscriber data.
export async function GET() {
  const subscribers = DEMO_NEWSLETTER.map((s) => ({
    ...s,
    subscribedAt: s.subscribedAt instanceof Date ? s.subscribedAt.toISOString() : s.subscribedAt,
  }))

  return NextResponse.json({
    subscribers,
    total: subscribers.length,
  })
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  if (!id) {
    return NextResponse.json({ error: "Subscriber ID is required" }, { status: 400 })
  }

  console.log(`[DEMO] Newsletter delete simulated: ${id}`)
  return NextResponse.json({ success: true })
}
