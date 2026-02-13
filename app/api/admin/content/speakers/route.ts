import { NextResponse } from "next/server"
import { DEMO_SPEAKERS } from "@/lib/demo-data"
import type { SpeakerContent } from "@/lib/firebase/collections"

export const dynamic = "force-dynamic"

// DEMO MODE: Returns mock speaker data. CRUD operations simulate success.
// In production, all operations persist to Firestore with session verification.

export async function GET() {
  return NextResponse.json({
    speakers: DEMO_SPEAKERS,
    updatedAt: new Date().toISOString(),
    updatedBy: "demo@techday.sa",
  })
}

export async function POST(request: Request) {
  const speaker: SpeakerContent = await request.json()
  if (!speaker.name || !speaker.title) {
    return NextResponse.json({ error: "Name and title are required" }, { status: 400 })
  }
  if (!speaker.id) speaker.id = `speaker-${Date.now()}`
  console.log(`[DEMO] Speaker create simulated: ${speaker.name}`)
  return NextResponse.json({ success: true, speaker })
}

export async function PUT(request: Request) {
  const speaker: SpeakerContent = await request.json()
  if (!speaker.id) {
    return NextResponse.json({ error: "Speaker ID is required" }, { status: 400 })
  }
  console.log(`[DEMO] Speaker update simulated: ${speaker.id}`)
  return NextResponse.json({ success: true, speaker })
}

export async function PATCH(request: Request) {
  const { speakers } = await request.json()
  if (!speakers || !Array.isArray(speakers)) {
    return NextResponse.json({ error: "Speakers array is required" }, { status: 400 })
  }
  console.log(`[DEMO] Speaker reorder simulated: ${speakers.length} speakers`)
  return NextResponse.json({ success: true })
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  if (!id) {
    return NextResponse.json({ error: "Speaker ID is required" }, { status: 400 })
  }
  console.log(`[DEMO] Speaker delete simulated: ${id}`)
  return NextResponse.json({ success: true })
}
