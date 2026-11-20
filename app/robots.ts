import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  // This deployment's own production host (Vercel sets the variable at build).
  const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://event-template-dzyj.vercel.app"

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/private/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
