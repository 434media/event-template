import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

// DEMO MODE: Returns simulated diagnostic info.
// In production, tests Firebase connectivity and environment variables.
export async function GET() {
  return NextResponse.json({
    timestamp: new Date().toISOString(),
    environment: "demo",
    mode: "demo - no Firebase configured",
    envVars: {
      FIREBASE_PROJECT_ID: "NOT SET (demo mode)",
      FIREBASE_CLIENT_EMAIL: "NOT SET (demo mode)",
      FIREBASE_PRIVATE_KEY: "NOT SET (demo mode)",
    },
    isFirebaseConfigured: false,
    status: "DEMO MODE - All integrations simulated",
  })
}
