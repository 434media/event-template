import { NextResponse } from "next/server"
import { DEMO_SPONSORS } from "@/lib/demo-data"
import type { SponsorContent } from "@/lib/firebase/collections"

export const dynamic = "force-dynamic"

type SponsorTier = "platinum" | "gold" | "silver" | "bronze" | "community"

// DEMO MODE: Returns mock sponsor data. CRUD operations simulate success.
// In production, all operations persist to Firestore with tiered sponsor structure.

export async function GET() {
  return NextResponse.json({
    sponsors: DEMO_SPONSORS,
    updatedAt: new Date().toISOString(),
    updatedBy: "demo@techday.sa",
  })
}

export async function POST(request: Request) {
  const { sponsor, tier }: { sponsor: SponsorContent; tier: SponsorTier } = await request.json()
  if (!sponsor.name || !tier) {
    return NextResponse.json({ error: "Name and tier are required" }, { status: 400 })
  }
  if (!sponsor.id) sponsor.id = `sponsor-${Date.now()}`
  sponsor.tier = tier
  console.log(`[DEMO] Sponsor create simulated: ${sponsor.name} (${tier})`)
  return NextResponse.json({ success: true, sponsor })
}

export async function PUT(request: Request) {
  const { sponsor, tier }: { sponsor: SponsorContent; tier: SponsorTier } = await request.json()
  if (!sponsor.id) {
    return NextResponse.json({ error: "Sponsor ID is required" }, { status: 400 })
  }
  sponsor.tier = tier
  console.log(`[DEMO] Sponsor update simulated: ${sponsor.id}`)
  return NextResponse.json({ success: true, sponsor })
}

export async function PATCH(request: Request) {
  const { tier, sponsors } = await request.json()
  if (!tier || !sponsors) {
    return NextResponse.json({ error: "Tier and sponsors array are required" }, { status: 400 })
  }
  console.log(`[DEMO] Sponsor reorder simulated: ${tier}`)
  return NextResponse.json({ success: true })
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  if (!id) {
    return NextResponse.json({ error: "Sponsor ID is required" }, { status: 400 })
  }
  console.log(`[DEMO] Sponsor delete simulated: ${id}`)
  return NextResponse.json({ success: true })
}
