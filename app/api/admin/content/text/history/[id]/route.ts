import { NextResponse } from "next/server"
import { adminDb, isFirebaseConfigured } from "@/lib/firebase/admin"
import { COLLECTIONS, type TextBlockVersion } from "@/lib/firebase/collections"
import { verifyAdminSession } from "@/lib/admin/session"

export const dynamic = "force-dynamic"

// Get version history for a text block
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await verifyAdminSession()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  if (!isFirebaseConfigured()) {
    return NextResponse.json({ versions: [], message: "Firebase not configured" })
  }

  try {
    const { id } = await params
    const textBlockId = decodeURIComponent(id)
    
    const snapshot = await adminDb
      .collection(COLLECTIONS.SITE_TEXT_HISTORY)
      .where("textBlockId", "==", textBlockId)
      .orderBy("version", "desc")
      .limit(20)
      .get()
    
    const versions: TextBlockVersion[] = []
    
    snapshot.forEach((doc) => {
      const data = doc.data()
      versions.push({
        id: doc.id,
        textBlockId: data.textBlockId,
        content: data.content,
        version: data.version,
        createdAt: data.createdAt?.toDate?.() || new Date(),
        createdBy: data.createdBy || "",
        changeType: data.changeType || "update",
      })
    })

    return NextResponse.json({ versions })
  } catch (error) {
    console.error("Version history fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch version history" }, { status: 500 })
  }
}
