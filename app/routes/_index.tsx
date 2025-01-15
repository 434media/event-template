import type { MetaFunction } from "@remix-run/node";
import ImageGallery from "../components/cta/image-gallery";
import { Footer, Navbar } from "~/components/ui/Footer";

export const meta: MetaFunction = () => {
  return [
     {
        title: 'Tech Day 2024 | Building a Stronger Tech Ecosystem Together',
     },
     {
        property: 'og:url',
        content: 'https://sanantoniotechday.com',
     },
     {
        property: 'og:type',
        content: 'website',
     },
     {
        property: 'og:title',
        content: 'Tech Day 2024',
     },
     {
        name: 'description',
        content:
           'Experience Tech Day 2024! A day filled with tech innovation, networking, and excitement! Witness the Tech Fuel 2024 startup pitch competition, explore cutting-edge tech demos, and connect with the vibrant San Antonio tech community. Join us for Tech Day 2024 and be part of the future of tech in San Antonio!',
     },
     {
        property: 'og:image',
        content:
           'https://res.cloudinary.com/jessebubble/image/upload/v1729709464/flyers-4-techday_dlaxvx.png',
     },
  ];
};

export default function Index() {
  return (
    <>
    <Navbar />
    <main className="container mx-auto min-h-screen py-8">
      <h1 className="mb-8 text-center text-3xl font-bold">Event Photos</h1>
      <ImageGallery />
    </main>
    <Footer />
    </>
  )
}

