import type { Metadata } from "next"
import { Editable } from "@/components/editable"

export const metadata: Metadata = {
  title: "Become a Sponsor | Tech Bloc",
  description:
    "Partner with Tech Bloc to support San Antonio's tech community. Sponsorship opportunities for Tech Day and Tech Fuel 2025.",
  openGraph: {
    title: "Become a Sponsor | Tech Bloc",
    description:
      "Partner with Tech Bloc to support San Antonio's tech community. Sponsorship opportunities for Tech Day and Tech Fuel 2025.",
  },
}

export default function SponsorPage() {
  return (
    <main className="relative bg-white min-h-screen" role="main" aria-label="Become a Sponsor">
      <div className="pt-24 md:pt-32 px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-black mb-6 font-mono">
              Become a <span className="text-red-600">Sponsor</span>
            </h1>
            <Editable 
              id="sponsor.hero.description" 
              as="p" 
              className="text-lg md:text-xl text-black/60 max-w-3xl mx-auto"
              page="sponsor"
              section="hero"
            >
              Partner with Tech Bloc to support San Antonio's thriving tech community and gain visibility among hundreds of local technologists.
            </Editable>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="p-8 bg-black text-white rounded-2xl">
              <Editable id="sponsor.tier.gold.title" as="h3" className="text-2xl font-bold mb-2" page="sponsor" section="tiers">
                Gold
              </Editable>
              <Editable id="sponsor.tier.gold.subtitle" as="p" className="text-white/70 mb-4" page="sponsor" section="tiers">
                Premium visibility and engagement
              </Editable>
              <ul className="space-y-2 text-white/80">
                <li>• Logo on all materials</li>
                <li>• Speaking opportunity</li>
                <li>• VIP booth location</li>
                <li>• Social media features</li>
              </ul>
            </div>
            <div className="p-8 border-2 border-black rounded-2xl">
              <Editable id="sponsor.tier.silver.title" as="h3" className="text-2xl font-bold text-black mb-2" page="sponsor" section="tiers">
                Silver
              </Editable>
              <Editable id="sponsor.tier.silver.subtitle" as="p" className="text-black/60 mb-4" page="sponsor" section="tiers">
                Great exposure for your brand
              </Editable>
              <ul className="space-y-2 text-black/70">
                <li>• Logo on event materials</li>
                <li>• Booth at event</li>
                <li>• Social media mention</li>
              </ul>
            </div>
            <div className="p-8 bg-black/5 rounded-2xl">
              <Editable id="sponsor.tier.bronze.title" as="h3" className="text-2xl font-bold text-black mb-2" page="sponsor" section="tiers">
                Bronze
              </Editable>
              <Editable id="sponsor.tier.bronze.subtitle" as="p" className="text-black/60 mb-4" page="sponsor" section="tiers">
                Support the community
              </Editable>
              <ul className="space-y-2 text-black/70">
                <li>• Logo on website</li>
                <li>• Event tickets</li>
                <li>• Thank you mention</li>
              </ul>
            </div>
          </div>

          <div className="text-center py-16 border-t border-black/10">
            <Editable id="sponsor.cta.text" as="p" className="text-black/60 text-lg mb-6" page="sponsor" section="cta">
              Interested in sponsoring?
            </Editable>
            <a
              href="mailto:sponsors@techbloc.org"
              className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors"
            >
              Contact Us
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
