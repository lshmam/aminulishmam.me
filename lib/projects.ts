export interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  tags: string[];
  image: string; // Base image
  images: string[]; // Gallery images
  // For case study
  company: string;
  year: string;
  role: string;
  tagline: string;
  overview: string;
  challenge: string;
  solution: string;
  outcome: string;
  href: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Neucler",
    slug: "neucler",
    description: "Sales Copilot for Receptionists",
    tags: ["Product Design", "AI Integration"],
    image: "/project-saas.png",
    company: "Neucler Inc.",
    year: "2024",
    role: "Lead Designer",
    tagline: "Unifying operations with intelligent automation.",
    overview: "Neucler needed a centralized hub to manage complex enterprise workflows.",
    challenge: "Existing tools were fragmented and difficult to use for non-technical staff.",
    solution: "We designed a unified dashboard with a conversational AI interface.",
    outcome: "Increased daily active usage by 300%.",
    images: ["/project-saas.png", "/project-saas.png", "/project-saas.png", "/project-saas.png", "/project-saas.png"],
    href: "/work/neucler"
  },
  {
    id: 2,
    title: "Neta Bridge",
    slug: "neta-bridge",
    description: "Turn your network into trade opportunities",
    tags: ["Marketplace", "Supply Chain"],
    image: "/project-brand.png",
    company: "Neta Network",
    year: "2023",
    role: "Product Designer",
    tagline: "A new standard for cross-chain liquidity.",
    overview: "Designing a trustworthy interface for complex DeFi operations.",
    challenge: "Security and clarity are paramount in Web3.",
    solution: "A dark-mode, high-contrast UI that clearly displays transaction states.",
    outcome: "Transacted over $50M in the first quarter.",
    images: ["/project-brand.png", "/project-brand.png", "/project-brand.png", "/project-brand.png", "/project-brand.png"],
    href: "/work/neta-bridge"
  },
  {
    id: 3,
    title: "Jim Coach",
    slug: "jim-coach",
    description: "AI-powered personal training app",
    tags: ["Mobile App", "Health"],
    image: "/project-mobile.png",
    company: "Jim Fitness",
    year: "2023",
    role: "UX/UI Designer",
    tagline: "Your personal trainer, in your pocket.",
    overview: "Jim Coach uses visual AI to track and correct workout form.",
    challenge: "Real-time feedback requires an unobtrusive, lightning-fast UI.",
    solution: "A camera-first interface with large typography for mid-workout glances.",
    outcome: "Featured as 'App of the Day' on the App Store.",
    images: ["/project-mobile.png", "/project-mobile.png", "/project-mobile.png", "/project-mobile.png", "/project-mobile.png"],
    href: "/work/jim-coach"
  },
  {
    id: 4,
    title: "MyTrials",
    slug: "mytrials",
    description: "A platform connecting patients with clinical trials",
    tags: ["UI UX", "Product Research"],
    image: "/project-marketplace.png",
    company: "MyTrials Inc.",
    year: "2023",
    role: "Product Designer",
    tagline: "Advancing medical research through connection.",
    overview: "MyTrials simplifies the complex process of finding and enrolling in clinical trials for patients globally.",
    challenge: "The clinical trial enrollment process is historically opaque, fragmented, and difficult for patients to navigate.",
    solution: "Designed a patient-first search interface with plain-English medical summaries and a streamlined application flow.",
    outcome: "Increased successful trial matches by 40% and reduced drop-off rates during enrollment.",
    images: ["/project-marketplace.png", "/project-marketplace.png", "/project-marketplace.png", "/project-marketplace.png", "/project-marketplace.png"],
    href: "/work/mytrials"
  },
  {
    id: 5,
    title: "Arrive",
    slug: "arrive",
    description: "Airbnb for parking",
    tags: ["Marketplace", "Mobile App"],
    image: "/project-analytics.png",
    company: "Arrive Parking",
    year: "2022",
    role: "UX/UI Designer",
    tagline: "Find your spot, instantly.",
    overview: "Arrive allows homeowners to rent out their driveways and private parking spots to drivers in crowded cities.",
    challenge: "Drivers need to make split-second decisions while navigating traffic, making complex UI dangerous and frustrating.",
    solution: "Built a map-centric mobile interface with one-tap booking, large hit areas, and high-contrast availability markers.",
    outcome: "Reached 50k active drivers in the first year with a 4.8 star app store rating.",
    images: ["/project-analytics.png", "/project-analytics.png", "/project-analytics.png", "/project-analytics.png", "/project-analytics.png"],
    href: "/work/arrive"
  }
];
