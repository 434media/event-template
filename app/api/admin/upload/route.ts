import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

// DEMO MODE: Simulates file upload success.
// In production, uploads to Vercel Blob Storage with admin session verification.
export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type. Allowed: JPEG, PNG, WebP, GIF, SVG" }, { status: 400 })
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large. Maximum size: 5MB" }, { status: 400 })
    }

    // DEMO: Return a placeholder URL
    console.log(`[DEMO] Upload simulated: ${file.name} (${file.size} bytes)`)
    return NextResponse.json({
      success: true,
      url: "https://ampd-asset.s3.us-east-2.amazonaws.com/techday/placeholder-logo.svg",
      filename: `uploads/${Date.now()}-${file.name}`,
    })
  } catch (error) {
    console.error("[Upload] Error:", error)
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}
