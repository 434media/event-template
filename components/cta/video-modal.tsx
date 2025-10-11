"use client"

import { useEffect, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import { XMarkIcon } from "@heroicons/react/24/solid"

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  videoUrl: string
}

export function VideoModal({ isOpen, onClose, videoUrl }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            className="relative w-full max-w-4xl p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute -right-2 -top-2 z-50 rounded-full bg-gray-900 p-2 text-gray-100 shadow-lg transition-colors hover:bg-gray-800"
              aria-label="Close video"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
            <div className="relative overflow-hidden rounded-lg pt-[56.25%]">
              <video
                ref={videoRef}
                className="absolute inset-0 h-full w-full"
                controls
                autoPlay
                src={videoUrl}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

