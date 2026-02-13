import { NextResponse } from "next/server"

// DEMO MODE: Firebase, Resend, and BotID imports removed.
// In production, this route:
//   1. Verifies bot protection via BotID
//   2. Validates contact form fields
//   3. Saves sponsor inquiry to Firestore
//   4. Sends branded confirmation email via Resend

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validate required fields
    const requiredFields = ["firstName", "lastName", "company", "workEmail", "message"]
    for (const field of requiredFields) {
      if (!data[field]?.trim()) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.workEmail)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // DEMO: Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 600))

    console.log(`[DEMO] Sponsor inquiry simulated: ${data.company}`)

    return NextResponse.json({
      success: true,
      message: "Inquiry submitted successfully (demo mode)",
    })
  } catch (error) {
    console.error("Sponsor contact error:", error)
    return NextResponse.json(
      { error: "Failed to submit inquiry" },
      { status: 500 }
    )
  }
}
