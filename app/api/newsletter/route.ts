import { NextResponse } from "next/server"

// DEMO MODE: Firebase, BotID imports removed.
// In production, this route:
//   1. Verifies bot protection via BotID
//   2. Validates email and checks for duplicates in Firestore
//   3. Saves newsletter subscription to Firestore
//   4. Handles resubscription for previously unsubscribed users

export async function POST(request: Request) {
  try {
    const data = await request.json()

    if (!data.email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // DEMO: Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 600))

    console.log(`[DEMO] Newsletter subscription simulated: ${data.email}`)

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed to the newsletter! (demo mode)",
    })
  } catch (error) {
    console.error("Newsletter subscription error:", error)
    return NextResponse.json(
      { error: "An error occurred while subscribing to the newsletter" },
      { status: 500 }
    )
  }
}
