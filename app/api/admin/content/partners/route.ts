import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

// DEMO MODE: Partners content management. CRUD simulates success.
// In production, persists to Firestore with session verification.

export async function GET() {
  return NextResponse.json({
    partners: [],
    updatedAt: new Date().toISOString(),
    updatedBy: "demo@techday.sa",
  })
}

export async function POST(request: Request) {
  const partner = await request.json()
  if (!partner.name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 })
  }
  if (!partner.id) partner.id = `partner-${Date.now()}`
  console.log(`[DEMO] Partner create simulated: ${partner.name}`)
  return NextResponse.json({ success: true, partner })
}

export async function PUT(request: Request) {
  const partner = await request.json()
  if (!partner.id) {
    return NextResponse.json({ error: "Partner ID is required" }, { status: 400 })
  }
  console.log(`[DEMO] Partner update simulated: ${partner.id}`)
  return NextResponse.json({ success: true, partner })
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  if (!id) {
    return NextResponse.json({ error: "Partner ID is required" }, { status: 400 })
  }
  console.log(`[DEMO] Partner delete simulated: ${id}`)
  return NextResponse.json({ success: true })
}
