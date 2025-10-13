"use client"

import { ArrowRightCircle } from "lucide-react"
import { AnimatedButton } from "./ui/animated-button"

export function AnimatedRegisterButton() {
  return (
    <div className="w-[50vw] md:w-[30vw] max-w-xl md:max-w-sm md:-mt-6 lg:-mt-10 md:mb-2 lg:mb-4 aspect-[40/10]">
      <AnimatedButton
        href="https://luma.com/j9czqpyv"
        target="_blank"
        rel="noopener noreferrer"
        fullWidth
        className="h-full text-[clamp(1rem,3vw,2rem)]"
        ariaLabel="Register for Tech Day 2025"
      >
        <span className="flex items-center justify-center whitespace-nowrap">
          Register Now <ArrowRightCircle className="ml-2 md:ml-3 h-5 w-5 md:h-6 md:w-6 flex-shrink-0" />
        </span>
      </AnimatedButton>
    </div>
  )
}
