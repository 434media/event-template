import { NextResponse } from "next/server"
import { DEMO_REGISTRATIONS } from "@/lib/demo-data"

export const dynamic = "force-dynamic"

// DEMO MODE: Returns mock registration data.
// In production, queries Firestore with filtering, search, and pagination.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get("search")?.toLowerCase()

  let registrations = [...DEMO_REGISTRATIONS].map((r) => ({
    ...r,
    createdAt: r.createdAt instanceof Date ? r.createdAt.toISOString() : r.createdAt,
    updatedAt: r.updatedAt instanceof Date ? r.updatedAt.toISOString() : r.updatedAt,
  }))

  if (search) {
    registrations = registrations.filter(
      (r) =>
        r.firstName?.toLowerCase().includes(search) ||
        r.lastName?.toLowerCase().includes(search) ||
        r.email?.toLowerCase().includes(search) ||
        r.company?.toLowerCase().includes(search) ||
        r.ticketId?.toLowerCase().includes(search)
    )
  }

  return NextResponse.json({
    registrations,
    total: registrations.length,
  })
}

// DEMO: Delete simulates success
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  if (!id) {
    return NextResponse.json({ error: "Registration ID is required" }, { status: 400 })
  }

  console.log(`[DEMO] Registration delete simulated: ${id}`)
  return NextResponse.json({ success: true, message: `Deleted ${id === "all" ? "all registrations" : id} (demo)` })
}
