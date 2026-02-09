import { NextResponse } from "next/server"
import { adminDb, isFirebaseConfigured } from "@/lib/firebase/admin"
import { COLLECTIONS } from "@/lib/firebase/collections"
import { verifyAdminSession, sessionHasPermission } from "@/lib/admin/session"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  const session = await verifyAdminSession()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  if (!(await sessionHasPermission("sponsors", session))) {
    return NextResponse.json({ error: "Permission denied" }, { status: 403 })
  }

  if (!isFirebaseConfigured()) {
    return NextResponse.json({
      contacts: [],
      total: 0,
      message: "Firebase not configured",
    })
  }

  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const limit = parseInt(searchParams.get("limit") || "100")

    let query = adminDb
      .collection(COLLECTIONS.SPONSOR_CONTACTS)
      .orderBy("submittedAt", "desc")
      .limit(limit)

    if (status) {
      query = query.where("status", "==", status) as typeof query
    }

    const snapshot = await query.get()

    const contacts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      submittedAt: doc.data().submittedAt?.toDate?.()?.toISOString() || null,
    }))

    return NextResponse.json({
      contacts,
      total: contacts.length,
    })
  } catch (error) {
    console.error("Sponsor contacts fetch error:", error)
    return NextResponse.json(
      { error: "Failed to fetch sponsor contacts" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  const session = await verifyAdminSession()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  if (!(await sessionHasPermission("sponsors", session))) {
    return NextResponse.json({ error: "Permission denied" }, { status: 403 })
  }

  if (!isFirebaseConfigured()) {
    return NextResponse.json({ error: "Firebase not configured" }, { status: 503 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { error: "Contact ID is required" },
        { status: 400 }
      )
    }

    if (id === "all") {
      // Bulk delete all sponsor contacts
      const snapshot = await adminDb
        .collection(COLLECTIONS.SPONSOR_CONTACTS)
        .get()

      if (snapshot.empty) {
        return NextResponse.json({ success: true, deleted: 0 })
      }

      const batch = adminDb.batch()
      let count = 0

      for (const doc of snapshot.docs) {
        batch.delete(doc.ref)
        count++

        // Firestore batch limit is 500
        if (count % 500 === 0) {
          await batch.commit()
        }
      }

      await batch.commit()

      return NextResponse.json({ success: true, deleted: count })
    }

    // Delete individual contact
    await adminDb
      .collection(COLLECTIONS.SPONSOR_CONTACTS)
      .doc(id)
      .delete()

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Sponsor contact delete error:", error)
    return NextResponse.json(
      { error: "Failed to delete sponsor contact" },
      { status: 500 }
    )
  }
}
