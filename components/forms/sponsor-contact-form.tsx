"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"

interface SponsorContactData {
  firstName: string
  lastName: string
  company: string
  workEmail: string
  phone: string
  message: string
}

export function SponsorContactForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState<SponsorContactData>({
    firstName: "",
    lastName: "",
    company: "",
    workEmail: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch("/api/sponsor-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to submit")
      }

      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    if (submitted) {
      setSubmitted(false)
      setFormData({
        firstName: "",
        lastName: "",
        company: "",
        workEmail: "",
        phone: "",
        message: "",
      })
    }
  }

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors text-lg tracking-wide"
      >
        Contact Us
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </button>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={handleClose}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] mt-24 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-neutral-100">
                <div>
                  <h2 className="text-2xl font-bold text-black font-mono leading-tight">
                    Sponsor Inquiry
                  </h2>
                  <p className="text-sm text-black/50 mt-1 font-medium">
                    Tell us about your company
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                >
                  <svg
                    className="w-5 h-5 text-black/40"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Body */}
              <div className="p-6">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-black mb-2">
                      Thank you!
                    </h3>
                    <p className="text-black/60 leading-relaxed">
                      We&apos;ve received your inquiry and will be in touch
                      soon.
                    </p>
                    <button
                      onClick={handleClose}
                      className="mt-6 px-6 py-3 bg-black text-white font-semibold rounded-xl hover:bg-black/90 transition-colors"
                    >
                      Close
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* First + Last Name */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="firstName"
                          className="block text-sm font-semibold text-black/70 mb-1.5 tracking-wide"
                        >
                          First Name *
                        </label>
                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-shadow leading-normal"
                          placeholder="Jane"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="lastName"
                          className="block text-sm font-semibold text-black/70 mb-1.5 tracking-wide"
                        >
                          Last Name *
                        </label>
                        <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-shadow leading-normal"
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    {/* Company */}
                    <div>
                      <label
                        htmlFor="company"
                        className="block text-sm font-semibold text-black/70 mb-1.5 tracking-wide"
                      >
                        Company *
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        required
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-shadow leading-normal"
                        placeholder="Acme Corp"
                      />
                    </div>

                    {/* Work Email */}
                    <div>
                      <label
                        htmlFor="workEmail"
                        className="block text-sm font-semibold text-black/70 mb-1.5 tracking-wide"
                      >
                        Work Email *
                      </label>
                      <input
                        id="workEmail"
                        name="workEmail"
                        type="email"
                        required
                        value={formData.workEmail}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-shadow leading-normal"
                        placeholder="jane@acmecorp.com"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-semibold text-black/70 mb-1.5 tracking-wide"
                      >
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-shadow leading-normal"
                        placeholder="(210) 555-0100"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-semibold text-black/70 mb-1.5 tracking-wide"
                      >
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-shadow resize-none leading-relaxed"
                        placeholder="Tell us about your sponsorship interests..."
                      />
                    </div>

                    {error && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium">
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-lg tracking-wide leading-tight"
                    >
                      {isSubmitting ? "Sending..." : "Send Inquiry"}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
