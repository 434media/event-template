"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Pencil, Check, X, Loader2, History } from "lucide-react"
import { VersionHistoryModal } from "./version-history-modal"
import type { TextBlockVersion } from "@/lib/firebase/collections"

// Props for the editable text component
interface EditableTextProps {
  /** Unique identifier for this text block (e.g., "hero.title", "about.description") */
  id: string
  /** Fallback content if not stored in database */
  defaultContent: string
  /** HTML element to render */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "li" | "label"
  /** CSS classes to apply */
  className?: string
  /** Page identifier for organization */
  page?: string
  /** Section identifier for organization */
  section?: string
  /** Whether admin is authenticated (passed from parent) */
  isAdmin?: boolean
  /** Whether edit mode is active (passed from parent) */
  isEditMode?: boolean
  /** Callback when content is saved successfully */
  onSave?: () => void
  /** Callback when an error occurs */
  onError?: (error: string) => void
}

// Type for the dynamic element
type TextElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "li" | "label"

export function EditableText({
  id,
  defaultContent,
  as: Element = "p",
  className = "",
  page = "",
  section = "",
  isAdmin = false,
  isEditMode = false,
  onSave,
  onError,
}: EditableTextProps) {
  const [content, setContent] = useState(defaultContent)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const inputRef = useRef<HTMLDivElement>(null)
  const originalContent = useRef(content)

  // Fetch content from DB on mount
  useEffect(() => {
    let isMounted = true
    
    async function fetchContent() {
      try {
        const res = await fetch(`/api/content/text/${encodeURIComponent(id)}`)
        if (res.ok && isMounted) {
          const data = await res.json()
          if (data.content) {
            setContent(data.content)
            originalContent.current = data.content
          }
        }
      } catch {
        // Use default content on error
      } finally {
        if (isMounted) {
          setHasLoaded(true)
        }
      }
    }
    
    fetchContent()
    
    return () => {
      isMounted = false
    }
  }, [id])

  // Handle save
  const handleSave = useCallback(async () => {
    if (!inputRef.current) return
    
    const newContent = inputRef.current.innerText.trim()
    
    // Don't save if content hasn't changed
    if (newContent === originalContent.current) {
      setIsEditing(false)
      return
    }

    setIsSaving(true)

    try {
      const res = await fetch("/api/admin/content/text", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          id,
          content: newContent,
          element: Element,
          page,
          section,
        }),
      })

      if (res.ok) {
        setContent(newContent)
        originalContent.current = newContent
        setIsEditing(false)
        onSave?.()
      } else {
        const data = await res.json()
        console.error("Failed to save:", data.error)
        onError?.(data.error || "Failed to save changes")
        // Revert to original content
        if (inputRef.current) {
          inputRef.current.innerText = originalContent.current
        }
      }
    } catch (error) {
      console.error("Failed to save:", error)
      onError?.("Failed to save changes. Please try again.")
      // Revert to original content
      if (inputRef.current) {
        inputRef.current.innerText = originalContent.current
      }
    } finally {
      setIsSaving(false)
    }
  }, [id, Element, page, section, onSave, onError])

  // Handle cancel
  const handleCancel = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.innerText = originalContent.current
    }
    setContent(originalContent.current)
    setIsEditing(false)
  }, [])

  // Handle restore from version history
  const handleRestore = useCallback(async (version: TextBlockVersion) => {
    setIsSaving(true)
    try {
      const res = await fetch("/api/admin/content/text", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          id,
          content: version.content,
          element: Element,
          page,
          section,
          restoreVersion: version.version,
        }),
      })

      if (res.ok) {
        setContent(version.content)
        originalContent.current = version.content
        onSave?.()
      } else {
        const data = await res.json()
        onError?.(data.error || "Failed to restore version")
      }
    } catch (error) {
      console.error("Failed to restore:", error)
      onError?.("Failed to restore version. Please try again.")
    } finally {
      setIsSaving(false)
      setShowHistory(false)
    }
  }, [id, Element, page, section, onSave, onError])

  // Handle keyboard shortcuts
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCancel()
      } else if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        handleSave()
      }
    },
    [handleCancel, handleSave]
  )

  // Focus the editable element when entering edit mode
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      // Place cursor at the end
      const range = document.createRange()
      const selection = window.getSelection()
      range.selectNodeContents(inputRef.current)
      range.collapse(false)
      selection?.removeAllRanges()
      selection?.addRange(range)
    }
  }, [isEditing])

  // Check if we can edit (admin + edit mode)
  const canEdit = isAdmin && isEditMode

  // Render the appropriate element based on the 'as' prop
  const renderElement = (text: string, extraClassName: string = "", extraProps: Record<string, unknown> = {}) => {
    const combinedClassName = `${className} ${extraClassName}`.trim()
    const props = { className: combinedClassName || undefined, ...extraProps }
    
    switch (Element) {
      case "h1": return <h1 {...props}>{text}</h1>
      case "h2": return <h2 {...props}>{text}</h2>
      case "h3": return <h3 {...props}>{text}</h3>
      case "h4": return <h4 {...props}>{text}</h4>
      case "h5": return <h5 {...props}>{text}</h5>
      case "h6": return <h6 {...props}>{text}</h6>
      case "span": return <span {...props}>{text}</span>
      case "li": return <li {...props}>{text}</li>
      case "label": return <label {...props}>{text}</label>
      default: return <p {...props}>{text}</p>
    }
  }

  // If not in admin edit mode, just render the text normally
  if (!canEdit) {
    return renderElement(content)
  }

  // Admin edit mode view with editing capability
  return (
    <span
      className="relative inline"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isEditing ? (
        <span className="relative inline">
          {/* Editable content */}
          <span
            ref={inputRef}
            contentEditable
            suppressContentEditableWarning
            onKeyDown={handleKeyDown}
            className={`${className} outline-none ring-2 ring-blue-500 ring-offset-2 rounded-sm px-1 bg-blue-50/50`}
            style={{ minWidth: "1em", display: "inline-block" }}
          >
            {content}
          </span>
          
          {/* Save/Cancel/History buttons */}
          <span className="inline-flex items-center gap-1 ml-2 align-middle">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center justify-center p-1.5 bg-green-500 hover:bg-green-600 text-white rounded shadow-sm transition-colors disabled:opacity-50"
              title="Save (Cmd/Ctrl + Enter)"
            >
              {isSaving ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                <Check className="w-3 h-3" />
              )}
            </button>
            <button
              onClick={handleCancel}
              disabled={isSaving}
              className="inline-flex items-center justify-center p-1.5 bg-red-500 hover:bg-red-600 text-white rounded shadow-sm transition-colors disabled:opacity-50"
              title="Cancel (Esc)"
            >
              <X className="w-3 h-3" />
            </button>
            <button
              onClick={() => setShowHistory(true)}
              disabled={isSaving}
              className="inline-flex items-center justify-center p-1.5 bg-purple-500 hover:bg-purple-600 text-white rounded shadow-sm transition-colors disabled:opacity-50"
              title="Version History"
            >
              <History className="w-3 h-3" />
            </button>
          </span>
        </span>
      ) : (
        <span className="relative inline group">
          {/* Regular content with hover indicator */}
          {renderElement(
            content,
            `${isHovered ? "ring-2 ring-blue-300 ring-offset-1 rounded-sm bg-blue-50/30" : ""} transition-all cursor-pointer`,
            { onClick: () => setIsEditing(true), title: "Click to edit" }
          )}
          
          {/* Edit indicator on hover */}
          {isHovered && !isEditing && (
            <span
              className="absolute -top-2 -right-6 p-1 bg-blue-500 text-white rounded shadow-sm opacity-90 hover:opacity-100 cursor-pointer z-10"
              onClick={() => setIsEditing(true)}
            >
              <Pencil className="w-3 h-3" />
            </span>
          )}
        </span>
      )}
      
      {/* Version History Modal */}
      <VersionHistoryModal
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        textBlockId={id}
        currentContent={content}
        onRestore={handleRestore}
      />
    </span>
  )
}

// Hook to check if content has been customized (useful for showing defaults vs custom)
export function useTextContent(id: string, defaultContent: string) {
  const [content, setContent] = useState(defaultContent)
  const [isLoading, setIsLoading] = useState(true)
  const [isCustomized, setIsCustomized] = useState(false)

  useEffect(() => {
    async function fetchContent() {
      try {
        const res = await fetch(`/api/content/text/${encodeURIComponent(id)}`)
        if (res.ok) {
          const data = await res.json()
          if (data.content) {
            setContent(data.content)
            setIsCustomized(true)
          }
        }
      } catch {
        // Use default
      } finally {
        setIsLoading(false)
      }
    }
    fetchContent()
  }, [id])

  return { content, isLoading, isCustomized }
}
