"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { AdminPermission } from "@/lib/firebase/collections"
import { DEMO_ADMIN } from "@/lib/demo-data"

// DEMO MODE: This replaces the Firebase-based auth provider.
// ┌─────────────────────────────────────────────────────────┐
// │  PRODUCTION SECURITY LAYERS:                            │
// │  1. Firebase Client SDK (Google SSO + Email/Password)   │
// │  2. Firebase ID token sent to POST /api/admin/auth      │
// │  3. Server verifies token with Firebase Admin SDK        │
// │  4. Domain restriction (e.g., only @434media.com)       │
// │  5. httpOnly session cookie via createSessionCookie()   │
// │  6. Session verified with verifySessionCookie() on      │
// │     every subsequent API request                        │
// │  7. 7-day session expiry with refresh token revocation  │
// └─────────────────────────────────────────────────────────┘

// Public admin info sent to client
export interface AdminUser {
  email: string
  name: string
  role: "admin"
  permissions: AdminPermission[]
  photoURL?: string
}

interface AuthContextType {
  user: AdminUser | null
  firebaseUser: null
  isLoading: boolean
  isAuthenticated: boolean
  signInWithGoogle: () => Promise<{ success: boolean; error?: string }>
  signInWithEmail: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  hasPermission: (permission: AdminPermission) => boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Auto-restore session from sessionStorage in demo mode
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const demoLoggedIn = sessionStorage.getItem("demo_admin_logged_in")
        if (demoLoggedIn === "true") {
          setUser({
            email: DEMO_ADMIN.email,
            name: DEMO_ADMIN.name,
            role: DEMO_ADMIN.role,
            permissions: [...DEMO_ADMIN.permissions],
          })
        }
      } catch {
        // sessionStorage not available (SSR)
      }
      setIsLoading(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  const handleSignIn = async () => {
    setIsLoading(true)
    // Simulate auth delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const demoUser: AdminUser = {
      email: DEMO_ADMIN.email,
      name: DEMO_ADMIN.name,
      role: DEMO_ADMIN.role,
      permissions: [...DEMO_ADMIN.permissions],
    }

    setUser(demoUser)
    try { sessionStorage.setItem("demo_admin_logged_in", "true") } catch {}
    setIsLoading(false)
    return { success: true }
  }

  const logout = async () => {
    setUser(null)
    try { sessionStorage.removeItem("demo_admin_logged_in") } catch {}
  }

  const hasPermission = (permission: AdminPermission): boolean => {
    if (!user) return false
    return user.permissions.includes(permission)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        firebaseUser: null,
        isLoading,
        isAuthenticated: !!user,
        signInWithGoogle: handleSignIn,
        signInWithEmail: handleSignIn,
        logout,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAdminAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider")
  }
  return context
}
