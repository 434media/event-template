import { NextResponse } from "next/server"
import { DEMO_SPONSOR_CONTACTS } from "@/lib/demo-data"

export const dynamic = "force-dynamic"

// DEMO MODE: Returns mock sponsor contact data.
export async function GET() {
  const contacts = DEMO_SPONSOR_CONTACTS.map((c) => ({
    ...c,
    submittedAt: c.submittedAt instanceof Date ? c.submittedAt.toISOString() : c.submittedAt,
  }))

  return NextResponse.json({
    contacts,
    total: contacts.length,
  })
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  if (!id) {
    return NextResponse.json({ error: "Contact ID is required" }, { status: 400 })
  }

  console.log(`[DEMO] Sponsor contact delete simulated: ${id}`)
  return NextResponse.json({ success: true })
}
