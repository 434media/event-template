"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import {
  ChevronUp,
  ChevronDown,
  Shield,
  Database,
  Mail,
  Bot,
  BarChart3,
  CreditCard,
  PenLine,
  LayoutDashboard,
  Users,
  CalendarDays,
  Megaphone,
  Ticket,
  FileText,
  Sparkles,
  type LucideIcon,
} from "lucide-react"
import Link from "next/link"

type PanelView = null | "integrations" | "features"

export function DemoBanner() {
  const [isMinimized, setIsMinimized] = useState(false)
  const [activePanel, setActivePanel] = useState<PanelView>(null)
  const bannerRef = useRef<HTMLDivElement>(null)

  // Set CSS variable so the Navbar can offset itself below the banner
  const updateCssVar = useCallback(() => {
    if (isMinimized) {
      document.documentElement.style.setProperty("--demo-banner-h", "0px")
    } else if (bannerRef.current) {
      const h = bannerRef.current.offsetHeight
      document.documentElement.style.setProperty("--demo-banner-h", `${h}px`)
    }
  }, [isMinimized])

  useEffect(() => {
    updateCssVar()
    window.addEventListener("resize", updateCssVar)
    return () => window.removeEventListener("resize", updateCssVar)
  }, [updateCssVar, activePanel])

  const togglePanel = (panel: "integrations" | "features") => {
    setActivePanel((prev) => (prev === panel ? null : panel))
  }

  // Minimized: floating pill that can re-open the banner
  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed top-3 left-3 z-100 inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-black px-3 py-1.5 rounded-full text-xs font-bold shadow-lg transition-all hover:scale-105"
      >
        <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
        Demo Mode
        <ChevronDown className="w-3 h-3" />
      </button>
    )
  }

  return (
    <div
      ref={bannerRef}
      className="fixed top-0 left-0 right-0 z-100 bg-linear-to-r from-amber-500 via-amber-400 to-yellow-400 text-black shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <span className="shrink-0 inline-flex items-center gap-1.5 bg-black/10 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
              Demo Mode
            </span>
            <p className="text-sm font-medium truncate hidden sm:block">
                Everything you need to run your event
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => togglePanel("features")}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                activePanel === "features"
                  ? "bg-black text-amber-400"
                  : "bg-black/10 hover:bg-black/20"
              }`}
            >
              {activePanel === "features" ? "Hide" : "View"} Features
            </button>
            <button
              onClick={() => togglePanel("integrations")}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                activePanel === "integrations"
                  ? "bg-black text-amber-400"
                  : "bg-black/10 hover:bg-black/20"
              }`}
            >
              {activePanel === "integrations" ? "Hide" : "View"} Integrations
            </button>
            <Link
              href="/admin"
              className="text-xs font-semibold bg-black text-amber-400 hover:bg-black/80 px-3 py-1.5 rounded-full transition-colors hidden sm:inline-flex"
            >
              Try Admin →
            </Link>
            <button
              onClick={() => setIsMinimized(true)}
              className="p-1 hover:bg-black/10 rounded-full transition-colors"
              aria-label="Minimize banner"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Features panel — sales-oriented */}
        {activePanel === "features" && (
          <div className="mt-3 pb-2">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">
                Custom event platform
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              <FeatureCard
                Icon={PenLine}
                title="Inline Content Editing"
                description="Click any text on the live site to edit it. No CMS backend to learn — your team edits directly on the page."
              />
              <FeatureCard
                Icon={LayoutDashboard}
                title="Admin Dashboard"
                description="Manage speakers, schedule, sponsors, and registrations from a role-based admin panel with real-time stats."
              />
              <FeatureCard
                Icon={Users}
                title="Registration & Ticketing"
                description="Built-in registration forms with automatic ticket ID generation, confirmation emails, and attendee management."
              />
              <FeatureCard
                Icon={CalendarDays}
                title="Schedule Builder"
                description="Multi-track schedule with rooms, time slots, speaker assignments, and session types — all editable from the admin."
              />
              <FeatureCard
                Icon={Megaphone}
                title="Speaker Management"
                description="Speaker profiles with photos, bios, social links, and automatic schedule cross-referencing."
              />
              <FeatureCard
                Icon={Ticket}
                title="Sponsor Tiers"
                description="Platinum, Gold, Silver, Bronze, and Community tiers with logo placement, ordering, and sponsor inquiry forms."
              />
              <FeatureCard
                Icon={FileText}
                title="Pitch Submissions"
                description="Accept and review startup pitches with status tracking, admin notes, and structured evaluation workflows."
              />
              <FeatureCard
                Icon={Mail}
                title="Newsletter & Outreach"
                description="Collect subscribers, manage lists, and send branded transactional emails triggered by user actions."
              />
            </div>
            <p className="mt-2 text-[11px] opacity-70 text-center">
              Custom-built on Next.js — fully owned by your organization. No monthly platform fees. No vendor lock-in.
            </p>
          </div>
        )}

        {/* Integrations panel — technical showcase */}
        {activePanel === "integrations" && (
          <div className="mt-3 pb-2">
            <div className="flex items-center gap-2 mb-2">
              <Database className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">
                Production-grade integrations
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              <IntegrationCard
                icon={<Database className="w-4 h-4" />}
                title="Google Firestore"
                description="Named database with server-side Admin SDK. All reads/writes go through API routes with full CRUD operations."
              />
              <IntegrationCard
                icon={<Shield className="w-4 h-4" />}
                title="Firebase Auth"
                description="Google SSO + Email/Password with domain restriction, 7-day httpOnly session cookies, and role-based access control."
              />
              <IntegrationCard
                icon={<Mail className="w-4 h-4" />}
                title="Resend Email"
                description="Branded transactional emails for registration confirmations, pitch acknowledgments, and sponsor inquiry notifications."
              />
              <IntegrationCard
                icon={<Bot className="w-4 h-4" />}
                title="BotID Protection"
                description="Client + server bot detection on all public form submissions — blocks automated spam before it hits your database."
              />
              <IntegrationCard
                icon={<CreditCard className="w-4 h-4" />}
                title="Stripe Payments"
                description="Ticket sales, tiered pricing, promo codes, and sponsor invoicing — ready to wire up for paid events."
              />
              <IntegrationCard
                icon={<BarChart3 className="w-4 h-4" />}
                title="Vercel Platform"
                description="Web Analytics, Blob storage for image/file uploads, Edge Functions, and zero-downtime preview deployments."
              />
            </div>
            <p className="mt-2 text-[11px] opacity-70 text-center">
              All integrations are modular — swap providers without rewriting your application.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

function FeatureCard({
  Icon,
  title,
  description,
}: {
  Icon: LucideIcon
  title: string
  description: string
}) {
  return (
    <div className="bg-white/20 backdrop-blur-xs rounded-lg px-3 py-2.5">
      <div className="flex items-center gap-2 mb-1">
        <Icon className="w-4 h-4 shrink-0" />
        <span className="text-xs font-bold">{title}</span>
      </div>
      <p className="text-[11px] leading-snug opacity-80">{description}</p>
    </div>
  )
}

function IntegrationCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="bg-black/10 rounded-lg px-3 py-2.5">
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <span className="text-xs font-bold">{title}</span>
      </div>
      <p className="text-[11px] leading-snug opacity-80">{description}</p>
    </div>
  )
}
