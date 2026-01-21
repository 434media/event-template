import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { adminAuth, adminDb } from "@/lib/firebase/admin"
import { COLLECTIONS, ROLE_PERMISSIONS, type AdminDocument, type AdminPermission } from "@/lib/firebase/collections"

export const dynamic = "force-dynamic"

// Firebase Token-based authentication
// Verifies Firebase ID tokens and checks against Firestore admins collection

const SESSION_COOKIE_NAME = "admin_session"
const SESSION_DURATION = 60 * 60 * 24 * 7 // 7 days in seconds

// Get admin from Firestore by email
async function getAdminByEmail(email: string): Promise<AdminDocument | null> {
  try {
    const normalizedEmail = email.toLowerCase().trim()
    const docRef = adminDb.collection(COLLECTIONS.ADMINS).doc(normalizedEmail)
    const doc = await docRef.get()
    
    if (!doc.exists) return null
    
    return doc.data() as AdminDocument
  } catch (error) {
    console.error("Error fetching admin:", error)
    return null
  }
}

// Update admin's last login and UID
async function updateAdminLogin(email: string, uid: string): Promise<void> {
  try {
    const normalizedEmail = email.toLowerCase().trim()
    const docRef = adminDb.collection(COLLECTIONS.ADMINS).doc(normalizedEmail)
    await docRef.update({
      uid,
      lastLoginAt: new Date(),
      updatedAt: new Date(),
    })
  } catch (error) {
    console.error("Error updating admin login:", error)
  }
}

// POST - Verify Firebase ID token and create session
export async function POST(request: Request) {
  try {
    // Get the Authorization header
    const authHeader = request.headers.get("Authorization")
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Missing or invalid authorization header" },
        { status: 401 }
      )
    }

    const idToken = authHeader.substring(7) // Remove "Bearer "

    // Verify the Firebase ID token
    let decodedToken
    try {
      decodedToken = await adminAuth.verifyIdToken(idToken)
    } catch (error) {
      console.error("Token verification failed:", error)
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      )
    }

    const email = decodedToken.email
    if (!email) {
      return NextResponse.json(
        { error: "Email not found in token" },
        { status: 401 }
      )
    }

    // Check if this email is an approved admin
    const admin = await getAdminByEmail(email)
    if (!admin) {
      return NextResponse.json(
        { error: "Not authorized as admin" },
        { status: 403 }
      )
    }

    // Update last login and UID
    await updateAdminLogin(email, decodedToken.uid)

    // Create a session cookie for subsequent requests
    const expiresIn = SESSION_DURATION * 1000 // Convert to milliseconds
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn })

    // Set session cookie
    const cookieStore = await cookies()
    cookieStore.set(SESSION_COOKIE_NAME, sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SESSION_DURATION,
      path: "/",
    })

    // Return public admin info
    return NextResponse.json({
      success: true,
      user: {
        email: admin.email,
        name: admin.name,
        role: admin.role,
        permissions: admin.permissions || ROLE_PERMISSIONS[admin.role],
      },
    })
  } catch (error) {
    console.error("Auth error:", error)
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    )
  }
}

// GET - Check current session
export async function GET() {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value

    if (!sessionCookie) {
      return NextResponse.json({ authenticated: false })
    }

    // Verify the session cookie
    let decodedClaims
    try {
      decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true)
    } catch {
      return NextResponse.json({ authenticated: false })
    }

    const email = decodedClaims.email
    if (!email) {
      return NextResponse.json({ authenticated: false })
    }

    // Get admin from Firestore
    const admin = await getAdminByEmail(email)
    if (!admin) {
      return NextResponse.json({ authenticated: false })
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        email: admin.email,
        name: admin.name,
        role: admin.role,
        permissions: admin.permissions || ROLE_PERMISSIONS[admin.role],
      },
    })
  } catch (error) {
    console.error("Session check error:", error)
    return NextResponse.json({ authenticated: false })
  }
}

// DELETE - Logout / Revoke session
export async function DELETE() {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value

    if (sessionCookie) {
      // Optionally revoke refresh tokens for extra security
      try {
        const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie)
        await adminAuth.revokeRefreshTokens(decodedClaims.sub)
      } catch {
        // Ignore verification errors during logout
      }
    }

    // Clear the session cookie
    cookieStore.delete(SESSION_COOKIE_NAME)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json(
      { error: "Logout failed" },
      { status: 500 }
    )
  }
}
