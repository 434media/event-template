"use client"

import { RichEditableText } from "./rich-editable-text"
import { useEditMode } from "./admin/edit-mode-provider"

// Props matching RichEditableText but without isAdmin/isEditMode (provided by context)
interface RichEditableProps {
  /** Unique identifier for this text block */
  id: string
  /** Fallback content if not stored in database (can include HTML) */
  defaultContent: string
  /** CSS classes to apply */
  className?: string
  /** Page identifier for organization */
  page?: string
  /** Section identifier for organization */
  section?: string
}

/**
 * RichEditable component - Wrapper for RichEditableText that integrates with EditModeProvider
 * Use this for text blocks that need rich text formatting (bold, italic, links)
 */
export function RichEditable({
  id,
  defaultContent,
  className = "",
  page = "",
  section = "",
}: RichEditableProps) {
  const { isEditMode, isAdmin, showToast } = useEditMode()

  return (
    <RichEditableText
      id={id}
      defaultContent={defaultContent}
      className={className}
      page={page}
      section={section}
      isAdmin={isAdmin}
      isEditMode={isEditMode}
      onSave={() => showToast("Rich text saved successfully!", "success")}
      onError={(error) => showToast(error, "error")}
    />
  )
}
