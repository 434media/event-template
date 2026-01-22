"use client"

import { motion } from "motion/react"
import { useInView } from "motion/react"
import { useRef } from "react"
import { EasterEggArrow } from "@/components/easter-eggs"
import { Editable } from "@/components/editable"

const tracks = [
  {
    id: "emerging",
    title: "Emerging Industries",
    description: "Explore cutting-edge technologies shaping the future of San Antonio's economy.",
    icon: "⚡",
  },
  {
    id: "founders",
    title: "Founders & Investors",
    description: "Connect with the people building and funding the next generation of startups.",
    icon: "🚀",
  },
]

const stats = [
  { id: "attendees", value: "500+", label: "Attendees" },
  { id: "speakers", value: "30+", label: "Speakers" },
  { id: "tracks", value: "2", label: "Tracks" },
  { id: "days", value: "1", label: "Epic Day" },
]

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="relative py-24 bg-muted">
      {/* Easter Egg Arrow - Top Right - Links to Anniversary */}
      <div className="absolute top-6 right-4 md:right-8 lg:right-12 z-20">
        <EasterEggArrow type="anniversary" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Editable 
            id="about.label" 
            as="p" 
            className="font-mono text-sm text-primary mb-4 tracking-wider font-semibold"
            page="home"
            section="about"
          >
            ABOUT THE EVENT
          </Editable>
          <Editable 
            id="about.title" 
            as="h2" 
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight"
            page="home"
            section="about"
          >
            Two Tracks. One Mission.
          </Editable>
          <Editable 
            id="about.description" 
            as="p" 
            className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            page="home"
            section="about"
          >
            Tech Day 2026 brings together San Antonio's brightest minds to celebrate our city's rich history of innovation and chart the course for our tech-driven future.
          </Editable>
        </motion.div>

        {/* Track Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {tracks.map((track, index) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="relative p-8 bg-white border border-border rounded-lg group hover:border-primary/50 transition-colors shadow-sm"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-primary to-primary/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg" />
              <span className="text-4xl mb-4 block">{track.icon}</span>
              <Editable 
                id={`about.track.${track.id}.title`}
                as="h3" 
                className="text-2xl font-bold text-foreground mb-3 leading-snug"
                page="home"
                section="about"
              >
                {track.title}
              </Editable>
              <Editable 
                id={`about.track.${track.id}.description`}
                as="p" 
                className="text-muted-foreground leading-relaxed"
                page="home"
                section="about"
              >
                {track.description}
              </Editable>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 p-8 bg-white border border-border rounded-lg shadow-sm"
        >
          {stats.map((stat, index) => (
            <div key={stat.id} className="text-center">
              <motion.div
                initial={{ scale: 0.5 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="text-4xl md:text-5xl font-bold text-primary mb-2"
              >
                <Editable 
                  id={`about.stat.${stat.id}.value`}
                  as="span" 
                  className=""
                  page="home"
                  section="about"
                >
                  {stat.value}
                </Editable>
              </motion.div>
              <Editable 
                id={`about.stat.${stat.id}.label`}
                as="p" 
                className="text-sm text-muted-foreground font-mono uppercase tracking-wider font-medium"
                page="home"
                section="about"
              >
                {stat.label}
              </Editable>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
