import { NextResponse } from "next/server"
import crypto from "crypto"

// DEMO MODE: Firebase, Resend, and BotID imports removed.
// In production, this route:
//   1. Verifies bot protection via BotID
//   2. Validates all pitch fields
//   3. Checks for duplicate submissions in Firestore
//   4. Saves pitch document to Firestore
//   5. Sends branded confirmation email via Resend

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validate required fields
    const requiredFields = [
      "companyName",
      "founderName",
      "email",
      "stage",
      "industry",
      "pitch",
      "problem",
      "solution",
    ]

    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    if (data.pitch.length < 50) {
      return NextResponse.json(
        { error: "Pitch description is too short. Please provide at least 50 characters." },
        { status: 400 }
      )
    }

    // DEMO: Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    const submissionId = `PITCH-${crypto.randomBytes(4).toString("hex").toUpperCase()}`
    console.log(`[DEMO] Pitch submission simulated: ${submissionId} - ${data.companyName}`)

    return NextResponse.json({
      success: true,
      submissionId,
      message: "Pitch application submitted successfully (demo mode)",
    })
  } catch (error) {
    console.error("Pitch submission error:", error)
    return NextResponse.json(
      { error: "Failed to submit pitch application" },
      { status: 500 }
    )
  }
}

// GET endpoint for admin to retrieve pitch submissions
export async function GET() {
  try {
    const { DEMO_PITCHES } = await import("@/lib/demo-data")

    return NextResponse.json({
      success: true,
      count: DEMO_PITCHES.length,
      submissions: DEMO_PITCHES,
    })
  } catch (error) {
    console.error("Pitch submissions fetch error:", error)
    return NextResponse.json(
      { error: "Failed to fetch pitch submissions" },
      { status: 500 }
    )
  }
}
