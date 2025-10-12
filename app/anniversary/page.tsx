import { Navbar } from "@/components/navbar"
import { AnniversaryHero } from "../../components/anniversary-hero"

export default function AnniversaryPage() {
  return (
    <>
      <Navbar />
      <main className="h-screen overflow-hidden pt-20 pb-16">
        <AnniversaryHero />
      </main>
    </>
  )
}
