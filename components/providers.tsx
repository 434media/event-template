"use client"

import { type ReactNode } from "react"
import { AdminAuthProvider } from "@/components/admin/auth-provider"
import { EditModeProvider } from "@/components/admin/edit-mode-provider"

interface ProvidersProps {
  children: ReactNode
}

/**
 * Client-side providers wrapper for the application.
 * Includes admin authentication and edit mode context.
 */
export function Providers({ children }: ProvidersProps) {
  return (
    <AdminAuthProvider>
      <EditModeProvider>
        {children}
      </EditModeProvider>
    </AdminAuthProvider>
  )
}
