import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

// DEMO MODE: Text block CMS. In production, stores editable text with version history in Firestore.

export async function GET() {
  return NextResponse.json({ textBlocks: [] })
}

export async function PUT(request: Request) {
  const body = await request.json()
  const { id, content } = body

  if (!id || typeof content !== "string") {
    return NextResponse.json({ error: "ID and content are required" }, { status: 400 })
  }

  console.log(`[DEMO] Text block update simulated: ${id}`)
  return NextResponse.json({
    success: true,
    textBlock: { id, content, element: body.element || "p", updatedAt: new Date(), updatedBy: "demo@techday.sa", version: 1 },
    version: 1,
  })
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 })
  }
  console.log(`[DEMO] Text block delete simulated: ${id}`)
  return NextResponse.json({ success: true })
}
