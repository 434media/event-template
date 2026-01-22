"use client"

import { useState, useEffect, useCallback } from "react"
import { History, X, RotateCcw, Clock, User, Loader2 } from "lucide-react"
import type { TextBlockVersion } from "@/lib/firebase/collections"

interface VersionHistoryModalProps {
  isOpen: boolean
  onClose: () => void
  textBlockId: string
  currentContent: string
  onRestore: (version: TextBlockVersion) => void
}

export function VersionHistoryModal({
  isOpen,
  onClose,
  textBlockId,
  currentContent,
  onRestore,
}: VersionHistoryModalProps) {
  const [versions, setVersions] = useState<TextBlockVersion[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedVersion, setSelectedVersion] = useState<TextBlockVersion | null>(null)
  const [isRestoring, setIsRestoring] = useState(false)

  const fetchVersions = useCallback(async () => {
    if (!textBlockId) return
    
    setIsLoading(true)
    try {
      const res = await fetch(`/api/admin/content/text/history/${encodeURIComponent(textBlockId)}`, {
        credentials: "include",
      })
      if (res.ok) {
        const data = await res.json()
        setVersions(data.versions || [])
      }
    } catch (error) {
      console.error("Failed to fetch versions:", error)
    } finally {
      setIsLoading(false)
    }
  }, [textBlockId])

  useEffect(() => {
    if (isOpen) {
      fetchVersions()
    }
  }, [isOpen, fetchVersions])

  const handleRestore = async () => {
    if (!selectedVersion) return
    
    setIsRestoring(true)
    try {
      onRestore(selectedVersion)
      onClose()
    } finally {
      setIsRestoring(false)
    }
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(date))
  }

  const getChangeTypeLabel = (type: TextBlockVersion["changeType"]) => {
    switch (type) {
      case "create":
        return "Created"
      case "update":
        return "Updated"
      case "restore":
        return "Restored"
      default:
        return "Changed"
    }
  }

  const getChangeTypeColor = (type: TextBlockVersion["changeType"]) => {
    switch (type) {
      case "create":
        return "bg-green-100 text-green-700"
      case "update":
        return "bg-blue-100 text-blue-700"
      case "restore":
        return "bg-purple-100 text-purple-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden m-4">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <History className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-gray-900">Version History</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex divide-x divide-gray-200" style={{ height: "calc(80vh - 140px)" }}>
          {/* Version list */}
          <div className="w-1/2 overflow-y-auto p-4">
            <div className="space-y-2">
              {/* Current version */}
              <button
                onClick={() => setSelectedVersion(null)}
                className={`w-full text-left p-3 rounded-lg border transition-all ${
                  selectedVersion === null
                    ? "border-primary bg-primary/5"
                    : "border-transparent hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900">Current</span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                    Live
                  </span>
                </div>
                <p className="text-xs text-gray-500 truncate">
                  {currentContent.substring(0, 80)}...
                </p>
              </button>

              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
              ) : versions.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-8">
                  No version history yet
                </p>
              ) : (
                versions.map((version) => (
                  <button
                    key={version.id}
                    onClick={() => setSelectedVersion(version)}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      selectedVersion?.id === version.id
                        ? "border-primary bg-primary/5"
                        : "border-transparent hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900">
                        Version {version.version}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getChangeTypeColor(version.changeType)}`}>
                        {getChangeTypeLabel(version.changeType)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                      <Clock className="w-3 h-3" />
                      <span>{formatDate(version.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <User className="w-3 h-3" />
                      <span>{version.createdBy}</span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Preview */}
          <div className="w-1/2 overflow-y-auto p-4 bg-gray-50">
            <div className="mb-3">
              <h3 className="text-sm font-medium text-gray-700">Preview</h3>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-900 whitespace-pre-wrap">
                {selectedVersion ? selectedVersion.content : currentContent}
              </p>
            </div>
            
            {selectedVersion && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-xs text-yellow-800">
                  Restoring will replace the current content with this version.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
          <p className="text-xs text-gray-500">
            Text block: <code className="bg-gray-200 px-1.5 py-0.5 rounded">{textBlockId}</code>
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleRestore}
              disabled={!selectedVersion || isRestoring}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRestoring ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <RotateCcw className="w-4 h-4" />
              )}
              Restore Version
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
