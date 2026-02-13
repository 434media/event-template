import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

// DEMO MODE: Returns null content so EditableText components fall back to their children.
// In production, fetches custom text overrides from Firestore SITE_TEXT collection.
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await params // consume the params
  return NextResponse.json({ content: null })
}
