"use client"

import { useState } from "react"
import { useAdminAuth } from "./auth-provider"
import { Shield, Lock, Globe, Key, Server, Eye } from "lucide-react"

export function AdminLogin() {
  const { signInWithGoogle } = useAdminAuth()
  const [isLoading, setIsLoading] = useState(false)

  const handleDemoSignIn = async () => {
    setIsLoading(true)
    await signInWithGoogle()
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full text-xs font-semibold mb-4">
            <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
            Demo Mode
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-black mb-2">
            Tech Day Admin
          </h1>
          <p className="text-sm text-neutral-500 font-normal leading-relaxed">
            Explore the full admin dashboard with mock data
          </p>
        </div>

        {/* Demo Sign In Button */}
        <button
          onClick={handleDemoSignIn}
          disabled={isLoading}
          className="w-full py-4 px-4 bg-black text-white text-sm font-semibold uppercase tracking-wider hover:bg-neutral-800 disabled:bg-neutral-300 disabled:cursor-not-allowed transition-colors mb-8"
        >
          {isLoading ? "Signing in..." : "Enter Demo Dashboard →"}
        </button>

        {/* Production Security Features */}
        <div className="border border-neutral-200 rounded-lg overflow-hidden">
          <div className="px-4 py-3 bg-neutral-50 border-b border-neutral-200">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 flex items-center gap-2">
              <Shield className="w-3.5 h-3.5" />
              Production Security Layers
            </h2>
          </div>
          <div className="p-4 space-y-3">
            <SecurityFeature
              icon={<Globe className="w-4 h-4 text-blue-600" />}
              title="Google Workspace SSO"
              description="Domain-restricted sign-in (e.g., only @yourcompany.com accounts)"
            />
            <SecurityFeature
              icon={<Key className="w-4 h-4 text-green-600" />}
              title="Firebase Authentication"
              description="Email/Password + Google providers with ID token verification"
            />
            <SecurityFeature
              icon={<Lock className="w-4 h-4 text-purple-600" />}
              title="httpOnly Session Cookies"
              description="7-day secure cookies via Firebase createSessionCookie()"
            />
            <SecurityFeature
              icon={<Server className="w-4 h-4 text-orange-600" />}
              title="Server-Side Verification"
              description="Every API request verified with verifySessionCookie()"
            />
            <SecurityFeature
              icon={<Eye className="w-4 h-4 text-red-600" />}
              title="Role-Based Permissions"
              description="Granular permissions per admin user for content and data access"
            />
          </div>
        </div>

        {/* Production Auth Methods (disabled) */}
        <div className="mt-6 space-y-3 opacity-50 pointer-events-none">
          <p className="text-[10px] font-medium uppercase tracking-widest text-neutral-400 text-center">
            Production auth methods (disabled in demo)
          </p>
          <button
            disabled
            className="w-full py-3 px-4 bg-white border border-neutral-200 text-black text-sm font-medium flex items-center justify-center gap-3 cursor-not-allowed"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Sign in with Google Workspace
          </button>
          <button
            disabled
            className="w-full py-3 px-4 border border-neutral-200 text-neutral-400 text-sm font-medium cursor-not-allowed"
          >
            Sign in with Email / Password
          </button>
        </div>

        <p className="mt-8 text-center text-xs text-neutral-400 leading-relaxed">
          In production, only approved administrators with verified credentials can access this area.
        </p>
      </div>
    </div>
  )
}

function SecurityFeature({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 shrink-0">{icon}</div>
      <div>
        <p className="text-sm font-medium text-black">{title}</p>
        <p className="text-xs text-neutral-500">{description}</p>
      </div>
    </div>
  )
}
