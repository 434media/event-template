"use client"

import { EditableText } from "@/components/editable-text"
import { useEditMode } from "@/components/admin/edit-mode-provider"

// Props for the editable text wrapper
interface EditableProps {
  /** Unique identifier for this text block (e.g., "hero.title", "about.description") */
  id: string
  /** Fallback content if not stored in database */
  children: string
  /** HTML element to render */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "li" | "label"
  /** CSS classes to apply */
  className?: string
  /** Page identifier for organization */
  page?: string
  /** Section identifier for organization */
  section?: string
}

/**
 * Editable - A wrapper component that connects EditableText with the EditModeProvider.
 * 
 * Use this component to make any text on the site editable by admins.
 * 
 * @example
 * ```tsx
 * <Editable id="hero.title" as="h1" className="text-4xl font-bold">
 *   Welcome to Tech Day 2026
 * </Editable>
 * 
 * <Editable id="about.description" as="p" page="home" section="about">
 *   Tech Day brings together the brightest minds...
 * </Editable>
 * ```
 */
export function Editable({
  id,
  children,
  as = "p",
  className = "",
  page = "",
  section = "",
}: EditableProps) {
  const { isEditMode, isAdmin, showToast } = useEditMode()

  return (
    <EditableText
      id={id}
      defaultContent={children}
      as={as}
      className={className}
      page={page}
      section={section}
      isAdmin={isAdmin}
      isEditMode={isEditMode}
      onSave={() => showToast("Changes saved successfully!")}
      onError={(error) => showToast(error, "error")}
    />
  )
}

/**
 * Static text component for when you want the same API but no editing capability.
 * Useful for gradual migration or conditional rendering.
 */
export function StaticText({
  children,
  as: Element = "p",
  className = "",
}: {
  children: string
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "li" | "label"
  className?: string
}) {
  const props = { className: className || undefined }
  
  switch (Element) {
    case "h1": return <h1 {...props}>{children}</h1>
    case "h2": return <h2 {...props}>{children}</h2>
    case "h3": return <h3 {...props}>{children}</h3>
    case "h4": return <h4 {...props}>{children}</h4>
    case "h5": return <h5 {...props}>{children}</h5>
    case "h6": return <h6 {...props}>{children}</h6>
    case "span": return <span {...props}>{children}</span>
    case "li": return <li {...props}>{children}</li>
    case "label": return <label {...props}>{children}</label>
    default: return <p {...props}>{children}</p>
  }
}
