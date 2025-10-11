import ImageGallery from "../components/cta/image-gallery";
import { Footer } from "../components/ui/Footer";
import { Navbar } from "../components/ui/Navbar";

export default function Home() {
  return (
		<>
			<Navbar />
				<main className="container mx-auto min-h-screen py-8">
					<ImageGallery />
				</main>
			<Footer />
		</>
  )
}
