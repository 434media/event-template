"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"
import { useAdminAuth } from "./auth-provider"
import { Pencil, Eye, X, Keyboard, Settings, LogOut, CheckCircle } from "lucide-react"
import Link from "next/link"

interface EditModeContextType {
  /** Whether edit mode is currently active */
  isEditMode: boolean
  /** Toggle edit mode on/off */
  toggleEditMode: () => void
  /** Enable edit mode */
  enableEditMode: () => void
  /** Disable edit mode */
  disableEditMode: () => void
  /** Whether the current user is an authenticated admin */
  isAdmin: boolean
  /** Show a toast notification */
  showToast: (message: string, type?: "success" | "error" | "info") => void
}

const EditModeContext = createContext<EditModeContextType | null>(null)

interface EditModeProviderProps {
  children: ReactNode
}

// Toast notification component
function Toast({ 
  message, 
  type = "success", 
  onClose 
}: { 
  message: string
  type: "success" | "error" | "info"
  onClose: () => void 
}) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  const bgColor = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-sky-500",
  }[type]

  const Icon = type === "success" ? CheckCircle : type === "error" ? X : Eye

  return (
    <div className={`${bgColor} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-in slide-in-from-right-5`}>
      <Icon className="w-5 h-5 shrink-0" />
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-70">
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

export function EditModeProvider({ children }: EditModeProviderProps) {
  const { isAuthenticated, user, logout } = useAdminAuth()
  const [isEditMode, setIsEditMode] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [toasts, setToasts] = useState<Array<{ id: number; message: string; type: "success" | "error" | "info" }>>([])

  const toggleEditMode = useCallback(() => {
    setIsEditMode((prev) => !prev)
  }, [])

  const enableEditMode = useCallback(() => {
    setIsEditMode(true)
  }, [])

  const disableEditMode = useCallback(() => {
    setIsEditMode(false)
  }, [])

  const showToast = useCallback((message: string, type: "success" | "error" | "info" = "success") => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
  }, [])

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  // Keyboard shortcut: Cmd/Ctrl + E to toggle edit mode
  useEffect(() => {
    if (!isAuthenticated) return

    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + E to toggle edit mode
      if ((e.metaKey || e.ctrlKey) && e.key === "e") {
        e.preventDefault()
        toggleEditMode()
      }
      // Escape to exit edit mode
      if (e.key === "Escape" && isEditMode) {
        setIsEditMode(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isAuthenticated, isEditMode, toggleEditMode])

  // Only allow edit mode for authenticated admins
  const effectiveEditMode = isAuthenticated && isEditMode

  return (
    <EditModeContext.Provider
      value={{
        isEditMode: effectiveEditMode,
        toggleEditMode,
        enableEditMode,
        disableEditMode,
        isAdmin: isAuthenticated,
        showToast,
      }}
    >
      {children}

      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-100 flex flex-col gap-2">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>

      {/* Floating Admin Toolbar - Only visible for authenticated admins */}
      {isAuthenticated && (
        <div className="fixed bottom-4 right-4 z-100 flex flex-col items-end gap-3">
          {/* Edit mode active banner */}
          {effectiveEditMode && (
            <div className="bg-linear-to-r from-sky-600 to-sky-500 text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-3 animate-in slide-in-from-bottom-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <div className="flex flex-col">
                <span className="font-semibold text-sm">Edit Mode Active</span>
                <span className="text-blue-100 text-xs">Click any highlighted text to edit • Press Esc to exit</span>
              </div>
            </div>
          )}

          {/* Menu dropdown */}
          {showMenu && !effectiveEditMode && (
            <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden animate-in slide-in-from-bottom-2 fade-in min-w-50">
              {/* User info */}
              <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                <p className="text-sm font-semibold text-gray-900">{user?.name || "Admin"}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              
              {/* Menu items */}
              <div className="py-2">
                <button
                  onClick={() => {
                    setShowMenu(false)
                    toggleEditMode()
                  }}
                  className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 flex items-center gap-3 transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                  <span>Enter Edit Mode</span>
                  <span className="ml-auto text-xs text-gray-400 font-mono">⌘E</span>
                </button>
                
                <Link
                  href="/admin"
                  onClick={() => setShowMenu(false)}
                  className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  <span>Admin Dashboard</span>
                </Link>
                
                <div className="border-t border-gray-100 my-2" />
                
                <div className="px-4 py-2 text-xs text-gray-500 flex items-center gap-2">
                  <Keyboard className="w-3 h-3" />
                  <span>Shortcuts</span>
                </div>
                <div className="px-4 pb-2 text-xs text-gray-400 space-y-1">
                  <div className="flex justify-between">
                    <span>Toggle Edit Mode</span>
                    <span className="font-mono">⌘E</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Save Changes</span>
                    <span className="font-mono">⌘↵</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cancel Edit</span>
                    <span className="font-mono">Esc</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 my-2" />
                
                <button
                  onClick={() => {
                    setShowMenu(false)
                    logout()
                  }}
                  className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}

          {/* Main toggle button */}
          <button
            onClick={() => {
              if (effectiveEditMode) {
                setIsEditMode(false)
              } else {
                setShowMenu(!showMenu)
              }
            }}
            className={`
              flex items-center gap-2 px-5 py-3 rounded-full shadow-lg font-medium
              transition-all duration-200 transform hover:scale-105 active:scale-95
              ${
                effectiveEditMode
                  ? "bg-blue-500 hover:bg-blue-600 text-white ring-4 ring-blue-200"
                  : showMenu
                    ? "bg-gray-900 text-white"
                    : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200"
              }
            `}
            title={effectiveEditMode ? "Exit Edit Mode (Esc)" : "Admin Menu"}
          >
            {effectiveEditMode ? (
              <>
                <X className="w-5 h-5" />
                <span>Exit Edit Mode</span>
              </>
            ) : (
              <>
                <div className="w-8 h-8 rounded-full bg-linear-to-br from-sky-500 to-sky-600 flex items-center justify-center text-white text-sm font-bold">
                  {user?.name?.charAt(0) || user?.email?.charAt(0) || "A"}
                </div>
                <span className="hidden sm:inline">Admin</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Click outside to close menu */}
      {showMenu && (
        <div 
          className="fixed inset-0 z-50" 
          onClick={() => setShowMenu(false)}
        />
      )}
    </EditModeContext.Provider>
  )
}

export function useEditMode() {
  const context = useContext(EditModeContext)
  
  // Return a default non-edit mode context if not within provider
  // This allows components to work even if EditModeProvider is not present
  if (!context) {
    return {
      isEditMode: false,
      toggleEditMode: () => {},
      enableEditMode: () => {},
      disableEditMode: () => {},
      isAdmin: false,
      showToast: () => {},
    }
  }
  
  return context
}

// HOC to wrap components with edit mode awareness
export function withEditMode<P extends object>(
  WrappedComponent: React.ComponentType<P & { isEditMode: boolean; isAdmin: boolean }>
) {
  return function WithEditModeComponent(props: P) {
    const { isEditMode, isAdmin } = useEditMode()
    return <WrappedComponent {...props} isEditMode={isEditMode} isAdmin={isAdmin} />
  }
}
