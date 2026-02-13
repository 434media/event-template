import { NextResponse } from "next/server"
import crypto from "crypto"

// DEMO MODE: Firebase, Resend, and BotID imports removed.
// In production, this route:
//   1. Verifies bot protection via BotID (checkBotId)
//   2. Checks Firebase availability (isFirebaseConfigured)
//   3. Validates input and checks for duplicate emails in Firestore
//   4. Saves registration document to Firestore
//   5. Sends branded confirmation email via Resend
//   6. Returns ticket ID

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validate required fields
    const requiredFields = ["firstName", "lastName", "email", "category"]
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // DEMO: Generate unique ticket ID (in production, saved to Firestore)
    const ticketId = `TD26-${crypto.randomBytes(3).toString("hex").toUpperCase()}`

    // DEMO: Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    // DEMO: In production, this would:
    //   1. Check for duplicate email in Firestore
    //   2. Save registration document to Firestore
    //   3. Send branded confirmation email via Resend
    console.log(`[DEMO] Registration simulated: ${ticketId} - ${data.firstName} ${data.lastName}`)

    return NextResponse.json({
      success: true,
      ticketId,
      message: "Registration successful (demo mode)",
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "Failed to process registration" },
      { status: 500 }
    )
  }
}

// GET endpoint to check registration status (demo returns sample data)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const ticketId = searchParams.get("ticketId")

  // DEMO: Return sample registration data
  return NextResponse.json({
    ticketId: ticketId || "TD26-DEMO01",
    firstName: "Demo",
    lastName: "User",
    category: "attendee",
    events: ["techday"],
    status: "confirmed",
  })
}
