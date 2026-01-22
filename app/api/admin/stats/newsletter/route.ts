import { NextResponse } from "next/server"
import { adminDb, isFirebaseConfigured } from "@/lib/firebase/admin"
import { COLLECTIONS } from "@/lib/firebase/collections"
import { verifyAdminSession } from "@/lib/admin/session"

export const dynamic = "force-dynamic"

export async function GET() {
  const session = await verifyAdminSession()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  if (!isFirebaseConfigured()) {
    return NextResponse.json({ count: 0, message: "Firebase not configured" })
  }

  try {
    const snapshot = await adminDb
      .collection(COLLECTIONS.NEWSLETTER)
      .where("status", "==", "active")
      .count()
      .get()

    return NextResponse.json({ count: snapshot.data().count })
  } catch (error) {
    console.error("Newsletter count error:", error)
    return NextResponse.json({ count: 0 })
  }
}
