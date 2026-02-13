import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

// DEMO MODE: Returns empty version history.
// In production, fetches version history from Firestore SITE_TEXT_HISTORY collection.
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await params
  return NextResponse.json({ versions: [] })
}
