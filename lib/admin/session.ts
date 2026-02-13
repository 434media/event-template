// DEMO MODE: Firebase session cookie verification removed.
// In production, this module verifies Firebase session cookies using httpOnly cookies
// and enforces domain restrictions (e.g., only @434media.com Google accounts).

import type { AdminPermission } from "@/lib/firebase/collections"

// Default permissions for the demo admin
const DEFAULT_PERMISSIONS: AdminPermission[] = [
  "registrations",
  "newsletter",
  "pitches",
  "speakers",
  "schedule",
  "sponsors",
  "users"
]

export interface SessionUser {
  email: string
  name: string
  role: "admin"
  permissions: AdminPermission[]
  uid: string
}

// DEMO: Always returns a valid admin session
// In production, this verifies Firebase session cookies set via httpOnly cookies
export async function verifyAdminSession(): Promise<SessionUser | null> {
  return {
    email: "demo@techday.sa",
    name: "Demo Admin",
    role: "admin",
    permissions: DEFAULT_PERMISSIONS,
    uid: "demo-uid-001",
  }
}

// Check if session has specific permission
export async function sessionHasPermission(permission: AdminPermission): Promise<boolean>
export async function sessionHasPermission(permission: AdminPermission, session: SessionUser | null): Promise<boolean>
export async function sessionHasPermission(permission: AdminPermission, session?: SessionUser | null): Promise<boolean> {
  const currentSession = session !== undefined ? session : await verifyAdminSession()
  if (!currentSession) return false
  return currentSession.permissions.includes(permission)
}
export async function sessionHasRole(requiredRole: "admin" | "viewer" | "editor" | "superadmin"): Promise<boolean> {
  const session = await verifyAdminSession()
  if (!session) return false
  
  // All authenticated users are admins, which is equal to or higher than most roles
  const roleHierarchy = ["viewer", "editor", "admin", "superadmin"]
  const userRoleIndex = roleHierarchy.indexOf(session.role)
  const requiredRoleIndex = roleHierarchy.indexOf(requiredRole)
  
  return userRoleIndex >= requiredRoleIndex
}
