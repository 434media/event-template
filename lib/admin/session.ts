import { cookies } from "next/headers"
import { adminAuth, adminDb } from "@/lib/firebase/admin"
import { COLLECTIONS, ROLE_PERMISSIONS, type AdminDocument, type AdminPermission } from "@/lib/firebase/collections"

export interface SessionUser {
  email: string
  name: string
  role: AdminDocument["role"]
  permissions: AdminPermission[]
  uid: string
}

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

// Verify admin session from Firebase session cookie
export async function verifyAdminSession(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("admin_session")?.value
    
    if (!sessionCookie) return null
    
    // Verify the session cookie with Firebase
    let decodedClaims
    try {
      decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true)
    } catch {
      return null
    }
    
    const email = decodedClaims.email
    if (!email) return null
    
    // Get admin from Firestore
    const admin = await getAdminByEmail(email)
    if (!admin) return null
    
    return {
      email: admin.email,
      name: admin.name,
      role: admin.role,
      permissions: admin.permissions || ROLE_PERMISSIONS[admin.role],
      uid: decodedClaims.uid,
    }
  } catch (error) {
    console.error("[Session] Error:", error)
    return null
  }
}

// Check if session has specific permission
export async function sessionHasPermission(permission: AdminPermission): Promise<boolean>
export async function sessionHasPermission(permission: AdminPermission, session: SessionUser | null): Promise<boolean>
export async function sessionHasPermission(permission: AdminPermission, session?: SessionUser | null): Promise<boolean> {
  const currentSession = session !== undefined ? session : await verifyAdminSession()
  if (!currentSession) return false
  if (currentSession.role === "superadmin") return true
  return currentSession.permissions.includes(permission)
}

// Check if session has role or higher
export async function sessionHasRole(requiredRole: AdminDocument["role"]): Promise<boolean> {
  const session = await verifyAdminSession()
  if (!session) return false
  
  const roleHierarchy = ["viewer", "editor", "admin", "superadmin"]
  const userRoleIndex = roleHierarchy.indexOf(session.role)
  const requiredRoleIndex = roleHierarchy.indexOf(requiredRole)
  
  return userRoleIndex >= requiredRoleIndex
}
