import { NextResponse, type NextRequest } from "next/server"

// The admin in this template is a demo: lib/admin/session.ts has no real
// sign-in, and the /api/admin routes check nothing. Outside local development
// both are closed with a 404, so the deployment never serves an admin that
// would fail open the moment a real database or Blob store is connected.
// Restore real Firebase session verification before opening them.
export function proxy(request: NextRequest) {
  if (process.env.NODE_ENV === "development") return NextResponse.next()
  return new NextResponse("Not found", { status: 404, headers: { "Cache-Control": "no-store" } })
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/api/admin", "/api/admin/:path*"],
}
