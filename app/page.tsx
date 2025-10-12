import { AnniversaryPopup } from "@/components/anniversary-popup"
import { ConferenceHero } from "../components/conference-hero"
import { NewsletterPopup } from "../components/newsletter-popup"

export default function Home() {
  return (
    <main className="min-h-screen">

      <ConferenceHero />
      <AnniversaryPopup />
      <NewsletterPopup />
    </main>
  )
}
