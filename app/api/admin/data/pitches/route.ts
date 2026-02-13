import { NextResponse } from "next/server"
import { DEMO_PITCHES } from "@/lib/demo-data"

export const dynamic = "force-dynamic"

// DEMO MODE: Returns mock pitch submission data.
export async function GET() {
  const pitches = DEMO_PITCHES.map((p) => ({
    ...p,
    submittedAt: p.submittedAt instanceof Date ? p.submittedAt.toISOString() : p.submittedAt,
  }))

  return NextResponse.json({
    pitches,
    total: pitches.length,
  })
}

export async function PATCH(request: Request) {
  const data = await request.json()
  const { id, status } = data

  if (!id || !status) {
    return NextResponse.json({ error: "ID and status are required" }, { status: 400 })
  }

  console.log(`[DEMO] Pitch status update simulated: ${id} → ${status}`)
  return NextResponse.json({ success: true })
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  if (!id) {
    return NextResponse.json({ error: "Pitch ID is required" }, { status: 400 })
  }

  console.log(`[DEMO] Pitch delete simulated: ${id}`)
  return NextResponse.json({ success: true })
}
