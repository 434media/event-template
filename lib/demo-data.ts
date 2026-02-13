// Demo Data for the Event Application Template
// This file provides all mock data for the demo site.
// In production, this data would come from Google Firestore.

import type {
  RegistrationDocument,
  NewsletterDocument,
  PitchSubmissionDocument,
  SponsorContactDocument,
  SpeakerContent,
  SessionContent,
  SponsorContent,
} from "./firebase/collections"

// ============================================================
// SPEAKERS
// ============================================================
export const DEMO_SPEAKERS: SpeakerContent[] = [
  {
    id: "spk-1",
    name: "Maria Rodriguez",
    title: "CTO",
    company: "CloudScale AI",
    bio: "Maria is a visionary technologist leading CloudScale AI's push into enterprise machine learning. With 15 years at the intersection of cloud infrastructure and artificial intelligence, she's helped Fortune 500 companies modernize their tech stacks.",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
    socialLinks: { linkedin: "#", twitter: "#" },
  },
  {
    id: "spk-2",
    name: "James Chen",
    title: "Founder & CEO",
    company: "NexGen Ventures",
    bio: "Serial entrepreneur and investor who has founded three successful startups in the fintech space. James is passionate about mentoring the next generation of founders in San Antonio.",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    socialLinks: { linkedin: "#", website: "#" },
  },
  {
    id: "spk-3",
    name: "Dr. Aisha Patel",
    title: "Director of AI Research",
    company: "UTSA",
    bio: "Dr. Patel leads the AI & Machine Learning research lab at UTSA, focusing on ethical AI systems and their applications in healthcare and smart city infrastructure.",
    imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
    socialLinks: { linkedin: "#" },
  },
  {
    id: "spk-4",
    name: "David Kim",
    title: "VP of Engineering",
    company: "CyberShield Corp",
    bio: "David oversees engineering at CyberShield, one of San Antonio's fastest-growing cybersecurity companies. He specializes in zero-trust architecture and threat detection systems.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    socialLinks: { linkedin: "#", twitter: "#" },
  },
  {
    id: "spk-5",
    name: "Sarah Mitchell",
    title: "General Partner",
    company: "Lone Star Capital",
    bio: "Sarah invests in early-stage startups across Texas. Her portfolio includes 30+ companies with a combined valuation exceeding $2B. She's a champion of the San Antonio tech ecosystem.",
    imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    socialLinks: { linkedin: "#" },
  },
  {
    id: "spk-6",
    name: "Marcus Johnson",
    title: "Head of Product",
    company: "TechPort Innovation",
    bio: "Marcus leads product strategy at TechPort Innovation, driving digital transformation for government and defense clients. He's a veteran product leader with a decade at major tech companies.",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    socialLinks: { twitter: "#" },
  },
  {
    id: "spk-7",
    name: "Elena Vasquez",
    title: "Founder",
    company: "GreenTech Solutions",
    bio: "Elena founded GreenTech Solutions to bring sustainable technology to underserved communities. Her company has deployed solar-powered IoT networks across South Texas.",
    imageUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face",
    socialLinks: { linkedin: "#", website: "#" },
  },
  {
    id: "spk-8",
    name: "Robert Taylor",
    title: "Chief Data Officer",
    company: "MedInsights",
    bio: "Robert transforms healthcare through data. At MedInsights, he leads a team building predictive analytics platforms used by hospitals across the Southwest.",
    imageUrl: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=face",
    socialLinks: { linkedin: "#" },
  },
]

// ============================================================
// SCHEDULE
// ============================================================
export const DEMO_SESSIONS: SessionContent[] = [
  {
    id: "sess-1",
    title: "Opening Keynote: The Future is Invented Here",
    description: "Welcome address and a look at where San Antonio's tech ecosystem is heading in 2026 and beyond.",
    time: "09:00",
    duration: 60,
    room: "Main Hall",
    type: "keynote",
    speakerIds: ["spk-1"],
  },
  {
    id: "sess-2",
    title: "Building AI Products That Scale",
    description: "Lessons learned from deploying machine learning models at enterprise scale — architecture, data pipelines, and team dynamics.",
    time: "10:30",
    duration: 45,
    room: "Room A",
    type: "talk",
    track: "emerging",
    speakerIds: ["spk-3"],
  },
  {
    id: "sess-3",
    title: "From Idea to Series A in San Antonio",
    description: "A candid conversation about raising capital, building teams, and navigating the investor landscape from right here in SA.",
    time: "10:30",
    duration: 45,
    room: "Room B",
    type: "talk",
    track: "founders",
    speakerIds: ["spk-2", "spk-5"],
  },
  {
    id: "sess-4",
    title: "Networking Lunch",
    description: "Connect with fellow attendees, speakers, and sponsors over a catered lunch.",
    time: "12:00",
    duration: 60,
    room: "Atrium",
    type: "break",
  },
  {
    id: "sess-5",
    title: "Zero Trust Architecture in Practice",
    description: "Deep dive into implementing zero-trust security models for modern cloud-native applications.",
    time: "13:00",
    duration: 45,
    room: "Room A",
    type: "talk",
    track: "emerging",
    speakerIds: ["spk-4"],
  },
  {
    id: "sess-6",
    title: "Panel: The State of SA Venture Capital",
    description: "Local VCs and angels discuss deal flow, what they look for, and how SA compares to Austin and other Texas markets.",
    time: "13:00",
    duration: 60,
    room: "Room B",
    type: "panel",
    track: "founders",
    speakerIds: ["spk-5", "spk-2"],
  },
  {
    id: "sess-7",
    title: "Sustainable Tech for Smart Cities",
    description: "How IoT, renewable energy, and data analytics are converging to build smarter, greener cities in South Texas.",
    time: "14:30",
    duration: 45,
    room: "Room A",
    type: "talk",
    track: "ai",
    speakerIds: ["spk-7"],
  },
  {
    id: "sess-8",
    title: "Product-Led Growth Workshop",
    description: "Hands-on workshop on building products that sell themselves. Real frameworks and metrics that matter.",
    time: "14:30",
    duration: 90,
    room: "Workshop Room",
    type: "workshop",
    track: "founders",
    speakerIds: ["spk-6"],
  },
  {
    id: "sess-9",
    title: "Healthcare Data: The Next Frontier",
    description: "Exploring how predictive analytics and responsible data practices are transforming patient outcomes.",
    time: "16:00",
    duration: 45,
    room: "Room A",
    type: "talk",
    track: "ai",
    speakerIds: ["spk-8"],
  },
  {
    id: "sess-10",
    title: "Closing Keynote & Networking Happy Hour",
    description: "Wrap-up of the day's highlights, awards, and an open networking session with drinks and appetizers.",
    time: "17:00",
    duration: 90,
    room: "Main Hall",
    type: "networking",
  },
]

// ============================================================
// SPONSORS
// ============================================================

// Inline SVG data URIs for crisp, stylish sponsor logos that match the app aesthetic
function svgLogo(text: string, opts: { fg?: string; accent?: string; bold?: boolean; icon?: string } = {}): string {
  const { fg = "#0a0a0a", accent = "#dc2626", bold = true, icon = "" } = opts
  const weight = bold ? "700" : "600"
  const charWidth = 11.5
  const iconWidth = icon ? 24 : 0
  const textWidth = text.length * charWidth
  const padding = 8
  const totalWidth = Math.ceil(padding + iconWidth + textWidth + padding)
  const iconSvg = icon
    ? `<text x="${padding}" y="30" font-family="system-ui,sans-serif" font-size="18" fill="${accent}">${icon}</text>`
    : ""
  const textX = padding + iconWidth
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="40" viewBox="0 0 ${totalWidth} 40">${iconSvg}<text x="${textX}" y="28" font-family="system-ui,-apple-system,sans-serif" font-size="18" font-weight="${weight}" letter-spacing="0.5" fill="${fg}">${text}</text><rect x="0" y="36" width="${totalWidth}" height="4" rx="2" fill="${accent}"/></svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

export const DEMO_SPONSORS: Record<string, SponsorContent[]> = {
  platinum: [
    { id: "sp-1", name: "CloudScale AI", logoUrl: svgLogo("AGENTIC", { accent: "#6366f1", icon: "◈" }), website: "#", tier: "platinum" },
    { id: "sp-2", name: "CyberShield Corp", logoUrl: svgLogo("AI SA", { accent: "#10b981", icon: "◆" }), website: "#", tier: "platinum" },
  ],
  gold: [
    { id: "sp-3", name: "NexGen Ventures", logoUrl: svgLogo("CYBER VENTURES", { accent: "#f59e0b", icon: "▲" }), website: "#", tier: "gold" },
    { id: "sp-4", name: "Lone Star Capital", logoUrl: svgLogo("LONE STAR CAPITAL", { accent: "#f59e0b", icon: "★" }), website: "#", tier: "gold" },
    { id: "sp-5", name: "TechPort Innovation", logoUrl: svgLogo("PORT AI", { accent: "#f59e0b", icon: "⬡" }), website: "#", tier: "gold" },
  ],
  silver: [
    { id: "sp-6", name: "MedInsights", logoUrl: svgLogo("ALAMO INSIGHTS", { accent: "#94a3b8", icon: "✚" }), website: "#", tier: "silver" },
    { id: "sp-7", name: "GreenTech Solutions", logoUrl: svgLogo("AEROTECH", { accent: "#22c55e", icon: "●" }), website: "#", tier: "silver" },
  ],
  bronze: [
    { id: "sp-8", name: "SA Dev Community", logoUrl: svgLogo("COSA AI", { accent: "#d97706", icon: "⟨⟩" }), website: "#", tier: "bronze" },
  ],
  community: [
    { id: "sp-9", name: "Code SA", logoUrl: svgLogo("CODE SA", { accent: "#38bdf8", icon: "⌘" }), website: "#", tier: "community" },
    { id: "sp-10", name: "Geekdom", logoUrl: svgLogo("ART SA", { accent: "#a78bfa", icon: "◎" }), website: "#", tier: "community" },
  ],
}

// ============================================================
// REGISTRATIONS (sample data for admin dashboard)
// ============================================================
export const DEMO_REGISTRATIONS: (RegistrationDocument & { id: string })[] = [
  {
    id: "reg-001",
    firstName: "Alex",
    lastName: "Thompson",
    email: "alex.thompson@example.com",
    category: "founder",
    company: "StartupXYZ",
    title: "CEO",
    events: ["2day"],
    dietaryRestrictions: "none",
    ticketId: "TD26-A1B2C3",
    status: "confirmed",
    createdAt: new Date("2026-01-15"),
    updatedAt: new Date("2026-01-15"),
    source: "website",
  },
  {
    id: "reg-002",
    firstName: "Priya",
    lastName: "Sharma",
    email: "priya@investco.com",
    category: "investor",
    company: "InvestCo Partners",
    title: "Managing Partner",
    events: ["techday"],
    dietaryRestrictions: "vegetarian",
    ticketId: "TD26-D4E5F6",
    status: "confirmed",
    createdAt: new Date("2026-01-18"),
    updatedAt: new Date("2026-01-18"),
    source: "website",
  },
  {
    id: "reg-003",
    firstName: "Jordan",
    lastName: "Lee",
    email: "jordan.lee@utsa.edu",
    category: "student",
    company: "UTSA",
    title: "CS Student",
    events: ["techfuel"],
    dietaryRestrictions: "none",
    ticketId: "TD26-G7H8I9",
    status: "confirmed",
    createdAt: new Date("2026-01-22"),
    updatedAt: new Date("2026-01-22"),
    source: "website",
  },
  {
    id: "reg-004",
    firstName: "Casey",
    lastName: "Williams",
    email: "casey@techcorp.io",
    category: "attendee",
    company: "TechCorp",
    title: "Software Engineer",
    events: ["techday"],
    dietaryRestrictions: "vegan",
    ticketId: "TD26-J1K2L3",
    status: "confirmed",
    createdAt: new Date("2026-02-01"),
    updatedAt: new Date("2026-02-01"),
    source: "website",
  },
  {
    id: "reg-005",
    firstName: "Sam",
    lastName: "Rivera",
    email: "sam.rivera@cityofsa.gov",
    category: "government",
    company: "City of San Antonio",
    title: "Innovation Director",
    events: ["2day"],
    dietaryRestrictions: "none",
    ticketId: "TD26-M4N5O6",
    status: "confirmed",
    createdAt: new Date("2026-02-05"),
    updatedAt: new Date("2026-02-05"),
    source: "website",
  },
]

// ============================================================
// NEWSLETTER SUBSCRIBERS (sample data for admin dashboard)
// ============================================================
export const DEMO_NEWSLETTER: (NewsletterDocument & { id: string })[] = [
  { id: "nl-001", email: "reader1@example.com", subscribedAt: new Date("2026-01-10"), source: "popup", status: "active" },
  { id: "nl-002", email: "reader2@example.com", subscribedAt: new Date("2026-01-12"), source: "footer", status: "active" },
  { id: "nl-003", email: "reader3@example.com", subscribedAt: new Date("2026-01-15"), source: "registration", status: "active" },
  { id: "nl-004", email: "reader4@example.com", subscribedAt: new Date("2026-01-20"), source: "homepage", status: "active" },
  { id: "nl-005", email: "unsubscribed@example.com", subscribedAt: new Date("2025-12-01"), source: "popup", status: "unsubscribed" },
  { id: "nl-006", email: "reader5@example.com", subscribedAt: new Date("2026-01-25"), source: "popup", status: "active" },
  { id: "nl-007", email: "reader6@example.com", subscribedAt: new Date("2026-02-01"), source: "footer", status: "active" },
  { id: "nl-008", email: "reader7@example.com", subscribedAt: new Date("2026-02-03"), source: "popup", status: "active" },
]

// ============================================================
// PITCH SUBMISSIONS (sample data for admin dashboard)
// ============================================================
export const DEMO_PITCHES: (PitchSubmissionDocument & { id: string })[] = [
  {
    id: "pitch-001",
    companyName: "EcoCharge",
    founderName: "Elena Vasquez",
    email: "elena@ecocharge.io",
    phone: "(210) 555-0101",
    website: "https://ecocharge.io",
    stage: "seed",
    industry: "cleantech",
    pitch: "EcoCharge is building solar-powered EV charging stations for apartment complexes, making electric vehicle ownership accessible to renters across Texas.",
    problem: "65% of EV potential buyers are renters who lack access to home charging infrastructure.",
    solution: "Modular solar-powered charging stations designed for multi-family housing with a shared-cost model for property managers.",
    traction: "3 pilot installations, 150+ active users, $12K MRR",
    teamSize: "8",
    fundingRaised: "$500K",
    fundingGoal: "$2M",
    deckUrl: "https://example.com/deck",
    status: "reviewing",
    submittedAt: new Date("2026-01-20"),
  },
  {
    id: "pitch-002",
    companyName: "HealthBridge AI",
    founderName: "Robert Taylor",
    email: "robert@healthbridge.ai",
    phone: "(210) 555-0102",
    website: "https://healthbridge.ai",
    stage: "pre-seed",
    industry: "healthtech",
    pitch: "HealthBridge AI uses natural language processing to bridge communication gaps between patients and healthcare providers, reducing misdiagnosis rates by 40%.",
    problem: "Medical miscommunication causes 80% of serious medical errors, costing $1.7B annually.",
    solution: "AI-powered real-time translation and medical context engine integrated into existing EHR systems.",
    traction: "LOI from 2 hospital systems, beta with 50 physicians",
    teamSize: "5",
    fundingRaised: "$150K",
    fundingGoal: "$1M",
    deckUrl: "",
    status: "pending",
    submittedAt: new Date("2026-01-28"),
  },
  {
    id: "pitch-003",
    companyName: "SecureNode",
    founderName: "David Kim",
    email: "david@securenode.co",
    phone: "(210) 555-0103",
    website: "https://securenode.co",
    stage: "series-a",
    industry: "cybersecurity",
    pitch: "SecureNode provides automated compliance monitoring for defense contractors, turning a 6-month manual audit into a real-time dashboard.",
    problem: "Defense contractors spend $500K+ annually on compliance audits that are outdated the moment they're completed.",
    solution: "Continuous compliance monitoring platform that auto-maps controls to NIST, CMMC, and FedRAMP frameworks.",
    traction: "12 paying customers, $45K MRR, 95% retention",
    teamSize: "15",
    fundingRaised: "$3M",
    fundingGoal: "$8M",
    deckUrl: "https://example.com/deck",
    status: "accepted",
    submittedAt: new Date("2026-01-10"),
    reviewedAt: new Date("2026-01-25"),
    reviewedBy: "demo@admin.com",
    reviewNotes: "Strong traction, excellent market fit for SA defense ecosystem.",
  },
]

// ============================================================
// SPONSOR CONTACTS (sample data for admin dashboard)
// ============================================================
export const DEMO_SPONSOR_CONTACTS: (SponsorContactDocument & { id: string })[] = [
  {
    id: "sc-001",
    firstName: "Jennifer",
    lastName: "Park",
    company: "DataStream Inc",
    workEmail: "jpark@datastream.com",
    phone: "(210) 555-0201",
    message: "We'd like to explore Gold-level sponsorship for Tech Day 2026. Our team of 200 in SA would love to be involved.",
    status: "new",
    submittedAt: new Date("2026-02-01"),
  },
  {
    id: "sc-002",
    firstName: "Michael",
    lastName: "Torres",
    company: "Alamo Cloud Services",
    workEmail: "mtorres@alamocloud.com",
    phone: "(210) 555-0202",
    message: "Interested in sponsoring the networking happy hour. Can we discuss custom activation options?",
    status: "contacted",
    submittedAt: new Date("2026-01-25"),
  },
]

// ============================================================
// SITE TEXT (editable text blocks for inline CMS)
// ============================================================
export const DEMO_SITE_TEXT: Record<string, { content: string; element: string; page: string; section: string }> = {
  // These are intentionally empty — the default children in <Editable> components serve as the content.
  // In production, admins can override these via the inline CMS backed by Firestore.
}

// ============================================================
// DEMO ADMIN USER
// ============================================================
export const DEMO_ADMIN = {
  email: "demo@techday.sa",
  name: "Demo Admin",
  role: "admin" as const,
  permissions: [
    "registrations",
    "newsletter",
    "pitches",
    "speakers",
    "schedule",
    "sponsors",
    "users",
  ] as const,
  uid: "demo-uid-001",
}
