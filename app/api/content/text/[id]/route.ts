import { NextResponse } from "next/server"
import { adminDb, isFirebaseConfigured } from "@/lib/firebase/admin"
import { COLLECTIONS } from "@/lib/firebase/collections"

export const dynamic = "force-dynamic"

// Public API to fetch text content by ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  
  if (!isFirebaseConfigured()) {
    return NextResponse.json({ content: null, message: "Firebase not configured" })
  }

  try {
    // Decode the ID (it may contain dots like "hero.title")
    const textId = decodeURIComponent(id)
    const doc = await adminDb.collection(COLLECTIONS.SITE_TEXT).doc(textId).get()
    
    if (!doc.exists) {
      return NextResponse.json({ content: null })
    }
    
    const data = doc.data()
    return NextResponse.json({ 
      content: data?.content || null,
      updatedAt: data?.updatedAt?.toDate?.()?.toISOString() || null,
    })
  } catch (error) {
    console.error("Text content fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch text content" }, { status: 500 })
  }
}
