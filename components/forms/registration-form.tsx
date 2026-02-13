"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { CreditCard, Lock, Shield, CheckCircle } from "lucide-react"

interface RegistrationData {
  firstName: string
  lastName: string
  email: string
  category: string
  company: string
  title: string
  events: string[]
  dietaryRestrictions: string
  agreeToTerms: boolean
}

const categories = [
  { value: "founder", label: "Founder / Entrepreneur" },
  { value: "investor", label: "Investor / VC" },
  { value: "attendee", label: "General Attendee" },
  { value: "student", label: "Student" },
  { value: "government", label: "Government / Public Sector" },
]

const events = [
  { id: "techfuel", label: "Tech Fuel Pitch Competition", date: "April 20", price: "Free", amount: 0 },
  { id: "techday", label: "Tech Day Conference", date: "April 21", price: "$49", amount: 49 },
  { id: "2day", label: "2-Day All Access Pass", date: "April 20-21", price: "$79", amount: 79, badge: "Best Value" },
]

function getOrderTotal(selectedEvents: string[]): number {
  return events
    .filter((e) => selectedEvents.includes(e.id))
    .reduce((sum, e) => sum + e.amount, 0)
}

export function RegistrationForm() {
  const [formData, setFormData] = useState<RegistrationData>({
    firstName: "",
    lastName: "",
    email: "",
    category: "",
    company: "",
    title: "",
    events: ["techday"],
    dietaryRestrictions: "none",
    agreeToTerms: false,
  })
  const [step, setStep] = useState<"info" | "payment">("info")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [ticketId, setTicketId] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleEventToggle = (eventId: string) => {
    setFormData((prev) => ({
      ...prev,
      events: prev.events.includes(eventId) ? prev.events.filter((e) => e !== eventId) : [...prev.events, eventId],
    }))
  }

  const [error, setError] = useState<string | null>(null)

  const orderTotal = getOrderTotal(formData.events)
  const needsPayment = orderTotal > 0

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (needsPayment) {
      setStep("payment")
    } else {
      handleFinalSubmit()
    }
  }

  const handleFinalSubmit = async () => {
    setIsSubmitting(true)
    setError(null)

    try {
      // Simulate Stripe payment processing if needed
      if (needsPayment) {
        setIsProcessingPayment(true)
        await new Promise((resolve) => setTimeout(resolve, 2000))
        setIsProcessingPayment(false)
      }

      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to register")
      }

      setTicketId(data.ticketId)
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-8 sm:p-12 bg-card border border-primary/30 rounded-lg"
      >
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center">
          <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-3">You&apos;re Registered!</h3>
        <p className="text-muted-foreground mb-2">Check your email for confirmation and your digital ticket.</p>
        {needsPayment && (
          <p className="text-sm text-green-600 font-medium mb-6">
            Payment of ${orderTotal.toFixed(2)} processed successfully via Stripe.
          </p>
        )}

        {/* E-Ticket Preview */}
        <div className="max-w-sm mx-auto p-6 bg-background border border-border rounded-lg">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-dashed border-border">
            <div>
              <p className="font-mono text-xs text-primary">TECH DAY 2026</p>
              <p className="font-bold text-foreground">E-Ticket</p>
            </div>
            <div className="text-right">
              <p className="font-mono text-xs text-muted-foreground">TICKET ID</p>
              <p className="font-mono text-lg text-primary">{ticketId}</p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Name</span>
              <span className="text-foreground">
                {formData.firstName} {formData.lastName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Category</span>
              <span className="text-foreground capitalize">{formData.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date</span>
              <span className="text-foreground">April 20–21, 2026</span>
            </div>
            {needsPayment && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount Paid</span>
                <span className="text-foreground font-medium">${orderTotal.toFixed(2)}</span>
              </div>
            )}
          </div>
          <div className="mt-4 pt-4 border-t border-dashed border-border">
            <p className="text-xs text-muted-foreground text-center">Present this ticket at check-in</p>
          </div>
        </div>

        {/* Demo Mode Notice */}
        <div className="mt-6 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-xs text-amber-700">
            <strong>Demo Mode:</strong> No real payment was charged. In production, Stripe processes the payment and sends a receipt to the registrant&apos;s email.
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Step Indicator */}
      {needsPayment && (
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className={`flex items-center gap-2 ${step === "info" ? "text-primary" : "text-muted-foreground"}`}>
            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step === "info" ? "bg-primary text-primary-foreground" : "bg-primary/20 text-primary"}`}>
              {step === "payment" ? <CheckCircle className="w-4 h-4" /> : "1"}
            </span>
            <span className="text-sm font-medium hidden sm:inline">Details</span>
          </div>
          <div className={`w-12 h-px ${step === "payment" ? "bg-primary" : "bg-border"}`} />
          <div className={`flex items-center gap-2 ${step === "payment" ? "text-primary" : "text-muted-foreground"}`}>
            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step === "payment" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
              2
            </span>
            <span className="text-sm font-medium hidden sm:inline">Payment</span>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-sm">
          {error}
        </div>
      )}

      <AnimatePresence mode="wait">
        {step === "info" ? (
          <motion.form
            key="info"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onSubmit={handleInfoSubmit}
            className="space-y-8"
          >

      {/* Personal Information */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">Personal Information</h3>
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-background border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="John"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-background border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Doe"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-background border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="john@company.com"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-foreground mb-2">
            I am a... *
          </label>
          <select
            id="category"
            name="category"
            required
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
              Company / Organization
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-background border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Acme Corp"
            />
          </div>
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
              Job Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-background border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Software Engineer"
            />
          </div>
        </div>
      </div>

      {/* Event Selection */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">Select Events</h3>
        <div className="space-y-4">
          {events.map((event) => (
            <label
              key={event.id}
              className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-colors relative ${
                formData.events.includes(event.id)
                  ? "border-primary bg-primary/5"
                  : "border-border bg-background hover:border-muted-foreground"
              }`}
            >
              {"badge" in event && event.badge && (
                <span className="absolute -top-2.5 right-3 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                  {event.badge}
                </span>
              )}
              <input
                type="checkbox"
                checked={formData.events.includes(event.id)}
                onChange={() => handleEventToggle(event.id)}
                className="w-5 h-5 rounded border-border text-primary focus:ring-primary"
              />
              <div className="flex-1">
                <p className="font-medium text-foreground">{event.label}</p>
                <p className="text-sm text-muted-foreground">{event.date}</p>
              </div>
              <span className={`font-mono text-sm font-semibold ${event.amount > 0 ? "text-foreground" : "text-primary"}`}>
                {event.price}
              </span>
            </label>
          ))}
        </div>

        {/* Order Summary */}
        {formData.events.length > 0 && (
          <div className="p-4 bg-muted/30 border border-border rounded-lg">
            <div className="space-y-2">
              {events
                .filter((e) => formData.events.includes(e.id))
                .map((e) => (
                  <div key={e.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{e.label}</span>
                    <span className="text-foreground font-medium">{e.price}</span>
                  </div>
                ))}
              <div className="flex justify-between text-base font-bold pt-2 border-t border-border">
                <span className="text-foreground">Total</span>
                <span className="text-foreground">{orderTotal === 0 ? "Free" : `$${orderTotal.toFixed(2)}`}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Additional Info */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">Additional Information</h3>
        <div>
          <label htmlFor="dietaryRestrictions" className="block text-sm font-medium text-foreground mb-2">
            Dietary Restrictions
          </label>
          <select
            id="dietaryRestrictions"
            name="dietaryRestrictions"
            value={formData.dietaryRestrictions}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="none">None</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
          </select>
        </div>
      </div>

      {/* Agreement */}
      <div className="p-6 bg-muted/30 border border-border rounded-lg">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            required
            className="mt-1 w-5 h-5 rounded border-border text-primary focus:ring-primary"
          />
          <span className="text-sm text-muted-foreground">
            I agree to receive communications about Tech Day 2026 and related events. I understand that my registration
            information may be shared with event sponsors.
          </span>
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || !formData.agreeToTerms || formData.events.length === 0}
        className="w-full py-4 bg-primary text-primary-foreground font-semibold text-lg rounded-md hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed glow-primary"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Registering...
          </span>
        ) : needsPayment ? (
          <span className="flex items-center justify-center gap-2">
            <CreditCard className="w-5 h-5" />
            Continue to Payment — ${orderTotal.toFixed(2)}
          </span>
        ) : (
          "Complete Registration — Free"
        )}
      </button>

      <p className="text-center text-sm text-muted-foreground">
        {needsPayment ? "Secure checkout powered by Stripe" : "Free admission • Limited capacity • Register early"}
      </p>
          </motion.form>
        ) : (
          /* ========== PAYMENT STEP ========== */
          <motion.div
            key="payment"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            {/* Order Review */}
            <div className="p-5 bg-muted/30 border border-border rounded-lg">
              <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">Order Summary</h3>
              <div className="space-y-2">
                {events
                  .filter((e) => formData.events.includes(e.id))
                  .map((e) => (
                    <div key={e.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{e.label}</span>
                      <span className="text-foreground font-medium">{e.price}</span>
                    </div>
                  ))}
                <div className="flex justify-between text-lg font-bold pt-3 border-t border-border mt-3">
                  <span className="text-foreground">Total</span>
                  <span className="text-foreground">${orderTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Demo Stripe Payment Form */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-foreground">Payment Details</h3>
                <div className="flex items-center gap-1 ml-auto">
                  <Lock className="w-3.5 h-3.5 text-green-600" />
                  <span className="text-xs text-green-600 font-medium">Encrypted</span>
                </div>
              </div>
              
              {/* Stripe-style card input */}
              <div className="border border-border rounded-lg overflow-hidden">
                <div className="p-4 space-y-4">
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-foreground mb-2">
                      Card number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="cardNumber"
                        defaultValue="4242 4242 4242 4242"
                        placeholder="1234 1234 1234 1234"
                        className="w-full px-4 py-3 bg-background border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent pr-20 font-mono"
                        readOnly
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                        <svg className="h-6 w-auto" viewBox="0 0 36 24" fill="none">
                          <rect width="36" height="24" rx="4" fill="#1A1F71" />
                          <text x="18" y="16" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="system-ui">VISA</text>
                        </svg>
                        <svg className="h-6 w-auto" viewBox="0 0 36 24" fill="none">
                          <rect width="36" height="24" rx="4" fill="#252525" />
                          <circle cx="14" cy="12" r="7" fill="#EB001B" opacity="0.8" />
                          <circle cx="22" cy="12" r="7" fill="#F79E1B" opacity="0.8" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiry" className="block text-sm font-medium text-foreground mb-2">
                        Expiration
                      </label>
                      <input
                        type="text"
                        id="expiry"
                        defaultValue="12/28"
                        placeholder="MM / YY"
                        className="w-full px-4 py-3 bg-background border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-mono"
                        readOnly
                      />
                    </div>
                    <div>
                      <label htmlFor="cvc" className="block text-sm font-medium text-foreground mb-2">
                        CVC
                      </label>
                      <input
                        type="text"
                        id="cvc"
                        defaultValue="123"
                        placeholder="CVC"
                        className="w-full px-4 py-3 bg-background border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-mono"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Demo notice */}
              <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <Shield className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-700">
                  <strong>Demo Mode:</strong> This is a simulated Stripe checkout. No real payment will be processed. In production, Stripe Elements handles card input securely — card data never touches your server.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={handleFinalSubmit}
                disabled={isSubmitting}
                className="w-full py-4 bg-primary text-primary-foreground font-semibold text-lg rounded-md hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed glow-primary"
              >
                {isProcessingPayment ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Processing payment...
                  </span>
                ) : isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Confirming registration...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Lock className="w-5 h-5" />
                    Pay ${orderTotal.toFixed(2)}
                  </span>
                )}
              </button>
              <button
                type="button"
                onClick={() => setStep("info")}
                disabled={isSubmitting}
                className="w-full py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
              >
                ← Back to registration details
              </button>
            </div>

            <div className="flex items-center justify-center gap-4 pt-2">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Powered by</span>
              <svg className="h-5 w-auto" viewBox="0 0 60 25" fill="none">
                <rect width="60" height="25" rx="4" fill="#635BFF" />
                <text x="30" y="17" textAnchor="middle" fill="white" fontSize="12" fontWeight="700" fontFamily="system-ui">stripe</text>
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
