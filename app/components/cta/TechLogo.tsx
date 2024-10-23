import { Container } from '~/components/ui/Container';
import { FadeIn } from '~/components/ui/FadeIn';

export function TechLogo() {
    return (
       <>
       <div className="mt-24 sm:mt-32 lg:mt-40">
        <Container className="">
        <FadeIn>
            <div className="text-center">
                <h2 className="font-mono text-xs/5 font-semibold uppercase tracking-widest text-neutral-500">
                    Tech Day 2024 | Nov 15th | Tech Port
                </h2>
                <h3 className="mx-auto mt-2 max-w-3xl text-pretty text-4xl font-medium tracking-tighter text-neutral-950 sm:text-6xl">
                    Building a Stronger Tech Ecosystem Together
                </h3>
            </div>
            <div className="mt-16">
                <img
                    src="https://res.cloudinary.com/jessebubble/image/upload/v1729696697/techday-tracks_oeqts8.svg"
                    className="h-full w-full object-contain"
                    alt="Tech Day Logo"
                />
            </div>
        </FadeIn>
        </Container>
        </div>
         </>
    )
}