import { NextResponse } from "next/server"
import { adminDb } from "@/lib/firebase/admin"
import { COLLECTIONS, ROLE_PERMISSIONS, type AdminDocument, type AdminRole } from "@/lib/firebase/collections"

export const dynamic = "force-dynamic"

// POST - Seed admin users to Firestore
// This is a one-time setup endpoint. In production, you should remove or protect this.
export async function POST(request: Request) {
  try {
    // Check for setup secret (basic protection)
    const { secret, admins } = await request.json()
    
    const setupSecret = process.env.ADMIN_SETUP_SECRET || process.env.ADMIN_SESSION_SECRET
    if (!setupSecret || secret !== setupSecret) {
      return NextResponse.json(
        { error: "Invalid setup secret" },
        { status: 401 }
      )
    }

    if (!admins || !Array.isArray(admins) || admins.length === 0) {
      return NextResponse.json(
        { error: "Admins array is required" },
        { status: 400 }
      )
    }

    const results: { email: string; status: string }[] = []
    const batch = adminDb.batch()

    for (const admin of admins) {
      const { email, name, role } = admin
      
      if (!email || !name || !role) {
        results.push({ email: email || "unknown", status: "skipped - missing required fields" })
        continue
      }

      const normalizedEmail = email.toLowerCase().trim()
      const validRole = ["superadmin", "admin", "editor", "viewer"].includes(role) 
        ? role as AdminRole 
        : "viewer"

      const docRef = adminDb.collection(COLLECTIONS.ADMINS).doc(normalizedEmail)
      const existing = await docRef.get()

      const adminDoc: AdminDocument = {
        email: normalizedEmail,
        name: name.trim(),
        role: validRole,
        permissions: ROLE_PERMISSIONS[validRole],
        createdAt: existing.exists ? (existing.data()?.createdAt || new Date()) : new Date(),
        updatedAt: new Date(),
      }

      batch.set(docRef, adminDoc, { merge: true })
      results.push({ 
        email: normalizedEmail, 
        status: existing.exists ? "updated" : "created" 
      })
    }

    await batch.commit()

    return NextResponse.json({
      success: true,
      message: `Processed ${results.length} admin(s)`,
      results,
    })
  } catch (error) {
    console.error("Admin seed error:", error)
    return NextResponse.json(
      { error: "Failed to seed admins" },
      { status: 500 }
    )
  }
}

// GET - List all admins (for debugging)
export async function GET(request: Request) {
  try {
    // Check for setup secret
    const url = new URL(request.url)
    const secret = url.searchParams.get("secret")
    
    const setupSecret = process.env.ADMIN_SETUP_SECRET || process.env.ADMIN_SESSION_SECRET
    if (!setupSecret || secret !== setupSecret) {
      return NextResponse.json(
        { error: "Invalid setup secret" },
        { status: 401 }
      )
    }

    const snapshot = await adminDb.collection(COLLECTIONS.ADMINS).get()
    const admins = snapshot.docs.map(doc => ({
      email: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt,
      updatedAt: doc.data().updatedAt?.toDate?.() || doc.data().updatedAt,
      lastLoginAt: doc.data().lastLoginAt?.toDate?.() || doc.data().lastLoginAt,
    }))

    return NextResponse.json({
      success: true,
      count: admins.length,
      admins,
    })
  } catch (error) {
    console.error("Admin list error:", error)
    return NextResponse.json(
      { error: "Failed to list admins" },
      { status: 500 }
    )
  }
}
