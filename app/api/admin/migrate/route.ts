import { NextResponse } from "next/server"

// DEMO MODE: Migration endpoint disabled.
// In production, migrates data between Firestore databases.

export async function POST() {
  return NextResponse.json({
    success: true,
    message: "Demo mode - migration not applicable. All demo data is pre-loaded.",
  })
}

export async function GET() {
  return NextResponse.json({
    message: "Demo mode - migration not applicable",
    comparison: {
      content: { demo: "pre-loaded" },
      registrations: { demo: "pre-loaded" },
      newsletter: { demo: "pre-loaded" },
      pitches: { demo: "pre-loaded" },
    },
  })
}
