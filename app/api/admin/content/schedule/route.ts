import { NextResponse } from "next/server"
import { DEMO_SESSIONS } from "@/lib/demo-data"
import type { SessionContent } from "@/lib/firebase/collections"

export const dynamic = "force-dynamic"

// DEMO MODE: Returns mock schedule data. CRUD operations simulate success.
// In production, all operations persist to Firestore with session verification.

export async function GET() {
  return NextResponse.json({
    sessions: DEMO_SESSIONS,
    updatedAt: new Date().toISOString(),
    updatedBy: "demo@techday.sa",
  })
}

export async function POST(request: Request) {
  const sessionData: SessionContent = await request.json()
  if (!sessionData.title || !sessionData.time) {
    return NextResponse.json({ error: "Title and time are required" }, { status: 400 })
  }
  if (!sessionData.id) sessionData.id = `session-${Date.now()}`
  console.log(`[DEMO] Session create simulated: ${sessionData.title}`)
  return NextResponse.json({ success: true, session: sessionData })
}

export async function PUT(request: Request) {
  const sessionData: SessionContent = await request.json()
  if (!sessionData.id) {
    return NextResponse.json({ error: "Session ID is required" }, { status: 400 })
  }
  console.log(`[DEMO] Session update simulated: ${sessionData.id}`)
  return NextResponse.json({ success: true, session: sessionData })
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  if (!id) {
    return NextResponse.json({ error: "Session ID is required" }, { status: 400 })
  }
  console.log(`[DEMO] Session delete simulated: ${id}`)
  return NextResponse.json({ success: true })
}
