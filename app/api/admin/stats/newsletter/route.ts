import { NextResponse } from "next/server"
import { DEMO_NEWSLETTER } from "@/lib/demo-data"

export const dynamic = "force-dynamic"

export async function GET() {
  return NextResponse.json({ count: DEMO_NEWSLETTER.filter((s) => s.status === "active").length })
}
