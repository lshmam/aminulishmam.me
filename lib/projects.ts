export interface ProjectSection {
  label: string;
  heading: string;
  body: string;
  images: string[];
}

export interface ProjectAccordion {
  problem: string;
  solution: string;
  myRole: string;
  businessImpact: string;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  tags: string[];
  image: string;
  images: string[];
  company: string;
  year: string;
  role: string;
  tagline: string;
  overview: string;
  challenge: string;
  solution: string;
  outcome: string;
  href: string;
  // PM-focused fields
  impactStatement: string;
  pmSkills: string[];
  accordion: ProjectAccordion;
  sections: ProjectSection[];
  websiteUrl?: string;
  websiteLabel?: string;
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
    role: "Co-Founder & Product Lead",
    tagline: "Building an AI sales copilot that turns every receptionist into a top closer",
    overview: "Neucler needed a centralized hub to manage complex enterprise workflows.",
    challenge: "Existing tools were fragmented and difficult to use for non-technical staff.",
    solution: "We designed a unified dashboard with a conversational AI interface.",
    outcome: "Increased daily active usage by 300%.",
    impactStatement: "Taking a B2B SaaS from 0 to 1 by automating sales workflows for dental clinics, resulting in 300% increase in daily active usage within 3 months.",
    pmSkills: ["Market Research", "Product Strategy", "Full-Stack Dev", "UI/UX Design", "Go-to-Market"],
    accordion: {
      problem: "Dental receptionists juggle patient calls, scheduling, and upselling premium services — all while managing a waiting room. They lose thousands in revenue from missed follow-ups and inconsistent sales pitches.",
      solution: "An AI-powered copilot that listens to patient calls in real-time, surfaces relevant service recommendations, and auto-generates follow-up sequences — turning every receptionist into a top performer.",
      myRole: "End-to-end product ownership: market research with 30+ dental clinics, product strategy, UI/UX design, full-stack development (Next.js + Python), and go-to-market execution.",
      businessImpact: "300% increase in daily active usage. 40% improvement in service upsell conversion rates. Onboarded 15 pilot clinics in the first quarter."
    },
    sections: [
      {
        label: "Market Research",
        heading: "Understanding the dental industry's revenue leak",
        body: "I conducted 30+ interviews with dental office managers and receptionists across 3 states. The key insight: clinics were losing an average of $8,000/month in missed upsell opportunities simply because receptionists lacked the training and tools to recommend services confidently during patient calls.",
        images: ["/project-saas.png", "/project-saas.png"]
      },
      {
        label: "UI/UX & Brand",
        heading: "Designing for zero learning curve",
        body: "The UI was designed to minimize cognitive load during live calls. I built a real-time sidebar that surfaces contextual recommendations without requiring the receptionist to navigate away from their workflow. The brand identity was crafted to feel clinical yet approachable — establishing trust with healthcare decision-makers.",
        images: ["/project-saas.png", "/project-saas.png"]
      },
      {
        label: "Development",
        heading: "Building the MVP to validate the hypothesis",
        body: "I chose Next.js for the frontend and Python/FastAPI for the AI backend to prioritize speed-to-market. The architecture was designed for real-time audio processing with sub-200ms latency. I made the deliberate trade-off of building a monolithic MVP first, knowing we could decompose into microservices once product-market fit was validated.",
        images: ["/project-saas.png", "/project-saas.png"]
      },
      {
        label: "Go-to-Market",
        heading: "From 0 to 15 pilot clinics in 12 weeks",
        body: "I executed a targeted outreach strategy: cold emails to dental office managers (12% reply rate), followed by personalized demo videos. The first 10 customers came from direct outreach, and the remaining 5 from referrals. Post-launch, I iterated on the onboarding flow based on user feedback, reducing time-to-first-value from 45 minutes to under 10.",
        images: ["/project-saas.png", "/project-saas.png"]
      }
    ],
    images: ["/project-saas.png", "/project-saas.png", "/project-saas.png", "/project-saas.png", "/project-saas.png"],
    href: "/work/neucler",
    websiteUrl: "https://neucler.com",
    websiteLabel: "neucler.com"
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
    role: "Product Manager & Designer",
    tagline: "A B2B marketplace turning professional networks into trade opportunities",
    overview: "Designing a trustworthy interface for complex DeFi operations.",
    challenge: "Security and clarity are paramount in Web3.",
    solution: "A dark-mode, high-contrast UI that clearly displays transaction states.",
    outcome: "Transacted over $50M in the first quarter.",
    impactStatement: "Building a supply-chain marketplace from scratch that facilitated over $50M in transactions within the first quarter by connecting importers and exporters through trusted networks.",
    pmSkills: ["User Research", "Product Strategy", "Marketplace Design", "Supply Chain", "Growth"],
    accordion: {
      problem: "Small and medium-sized importers/exporters struggle to find trustworthy trading partners. Existing platforms are impersonal and lack the trust signals needed for high-value B2B transactions.",
      solution: "A referral-based marketplace where trade opportunities are surfaced through existing professional networks, adding a layer of social trust to every transaction.",
      myRole: "Owned the entire product lifecycle: user research with 50+ SMB traders, competitive analysis, product roadmap, UI/UX design, and growth strategy.",
      businessImpact: "$50M+ in transaction volume in Q1. 200+ verified businesses onboarded. 85% user retention rate after 3 months."
    },
    sections: [
      {
        label: "Market Research",
        heading: "Mapping the trust deficit in B2B trade",
        body: "I interviewed 50+ small business owners involved in international trade. The recurring theme: they already had networks of trusted contacts, but no digital platform to formalize and scale those relationships into repeatable trade flows.",
        images: ["/project-brand.png", "/project-brand.png"]
      },
      {
        label: "UI/UX & Brand",
        heading: "Designing trust into every interaction",
        body: "The interface was built around 'trust signals' — verified badges, transaction history, and network-based endorsements. I designed a dark-mode, high-contrast UI that clearly communicates transaction states and reduces anxiety during high-value deals.",
        images: ["/project-brand.png", "/project-brand.png"]
      },
      {
        label: "Development",
        heading: "Architecting for real-time trade matching",
        body: "I led the technical architecture decisions, choosing a real-time event-driven system to match trade opportunities as they arise. The platform was built with Next.js and a PostgreSQL backend, with WebSocket connections for live deal notifications.",
        images: ["/project-brand.png", "/project-brand.png"]
      },
      {
        label: "Go-to-Market",
        heading: "Growing through network effects",
        body: "The referral-based model was inherently viral — each new user brought their existing trade contacts. I designed an incentive structure that rewarded successful referrals, leading to organic growth of 200+ verified businesses within the first quarter without paid acquisition.",
        images: ["/project-brand.png", "/project-brand.png"]
      }
    ],
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
    role: "Product Designer & Developer",
    tagline: "An AI personal trainer that watches your form and coaches you in real-time",
    overview: "Jim Coach uses visual AI to track and correct workout form.",
    challenge: "Real-time feedback requires an unobtrusive, lightning-fast UI.",
    solution: "A camera-first interface with large typography for mid-workout glances.",
    outcome: "Featured as 'App of the Day' on the App Store.",
    impactStatement: "Designing and building a mobile AI fitness app that earned 'App of the Day' on the App Store by solving the #1 gym problem: bad form leading to injuries.",
    pmSkills: ["User Research", "Mobile Design", "AI/ML Integration", "App Store Optimization", "Retention Strategy"],
    accordion: {
      problem: "80% of gym injuries come from poor form, yet personal trainers cost $60-120/hour. Most fitness apps track reps and calories but completely ignore form — the thing that actually prevents injuries.",
      solution: "A camera-first mobile app that uses computer vision to analyze workout form in real-time, providing instant audio and visual corrections — like having a personal trainer watching every rep.",
      myRole: "Product design and development: user research with 100+ gym-goers, UX design optimized for mid-workout use, and integration of the TensorFlow Lite pose estimation model.",
      businessImpact: "Featured as 'App of the Day' on the App Store. 50K+ downloads in first 3 months. 4.8-star rating with 72% Day-30 retention."
    },
    sections: [
      {
        label: "Market Research",
        heading: "Why existing fitness apps fail at the thing that matters most",
        body: "I surveyed 100+ gym-goers and found that 73% had experienced an injury from poor form. Yet every major fitness app focused on rep counting and calorie tracking. The opportunity was clear: build the first app that actually watches and corrects your form.",
        images: ["/project-mobile.png", "/project-mobile.png"]
      },
      {
        label: "UI/UX & Brand",
        heading: "Designing for sweaty hands and quick glances",
        body: "Mid-workout users can't read small text or tap tiny buttons. I designed a camera-first interface with oversized typography, haptic feedback for form corrections, and gesture-based controls. Every interaction was tested during actual workouts to ensure usability under physical stress.",
        images: ["/project-mobile.png", "/project-mobile.png"]
      },
      {
        label: "Development",
        heading: "Real-time pose estimation on mobile hardware",
        body: "The biggest technical challenge was running TensorFlow Lite pose estimation at 30fps on mid-range phones without draining the battery. I optimized the model pipeline to use only 12 key skeletal points instead of the full 33, reducing inference time by 60% while maintaining form-correction accuracy.",
        images: ["/project-mobile.png", "/project-mobile.png"]
      },
      {
        label: "Go-to-Market",
        heading: "From launch to App of the Day",
        body: "I executed a pre-launch strategy targeting fitness micro-influencers on Instagram and TikTok, generating 5K waitlist signups before launch. Post-launch, I optimized the App Store listing with A/B tested screenshots and keywords, leading to the 'App of the Day' feature within 6 weeks.",
        images: ["/project-mobile.png", "/project-mobile.png"]
      }
    ],
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
    role: "Product Lead & UX Designer",
    tagline: "Making clinical trial enrollment accessible to every patient, everywhere",
    overview: "MyTrials simplifies the complex process of finding and enrolling in clinical trials for patients globally.",
    challenge: "The clinical trial enrollment process is historically opaque, fragmented, and difficult for patients to navigate.",
    solution: "Designed a patient-first search interface with plain-English medical summaries and a streamlined application flow.",
    outcome: "Increased successful trial matches by 40% and reduced drop-off rates during enrollment.",
    impactStatement: "Redesigning the clinical trial enrollment experience to increase successful patient-trial matches by 40% and reduce drop-off rates by translating complex medical jargon into plain English.",
    pmSkills: ["Healthcare UX", "User Research", "Information Architecture", "Accessibility", "Regulatory Compliance"],
    accordion: {
      problem: "Only 3% of cancer patients enroll in clinical trials, despite 70% being willing. The enrollment process is buried in medical jargon, scattered across dozens of databases, and requires navigating complex eligibility criteria.",
      solution: "A patient-first search platform that translates complex medical eligibility criteria into plain-English questions, matches patients with relevant trials, and provides a guided enrollment flow.",
      myRole: "End-to-end product ownership: patient interviews, information architecture, UX design focused on accessibility and health literacy, and collaboration with medical advisory board for regulatory compliance.",
      businessImpact: "40% increase in successful trial matches. 35% reduction in enrollment drop-off. Expanded database to cover 10,000+ active trials across 15 therapeutic areas."
    },
    sections: [
      {
        label: "Market Research",
        heading: "Why 97% of eligible patients never join a clinical trial",
        body: "I conducted interviews with 40+ patients, oncologists, and clinical trial coordinators. The key finding: patients weren't opposed to trials — they simply couldn't find them or understand the eligibility criteria. The average trial listing used 8th-grade reading level jargon that required a medical degree to parse.",
        images: ["/project-marketplace.png", "/project-marketplace.png"]
      },
      {
        label: "UI/UX & Brand",
        heading: "Translating medical complexity into human clarity",
        body: "I redesigned the search experience around patient mental models rather than medical taxonomies. Each trial listing was restructured with plain-English summaries, visual eligibility checklists, and location-based search. The design passed WCAG 2.1 AA accessibility standards and was tested with patients across varying health literacy levels.",
        images: ["/project-marketplace.png", "/project-marketplace.png"]
      },
      {
        label: "Development",
        heading: "Building a smart matching engine",
        body: "I architected a matching algorithm that cross-references patient profiles against trial eligibility criteria using NLP to parse unstructured medical data. The tech stack was chosen for HIPAA compliance: Next.js frontend, Node.js backend with end-to-end encryption, and a PostgreSQL database with row-level security.",
        images: ["/project-marketplace.png", "/project-marketplace.png"]
      },
      {
        label: "Go-to-Market",
        heading: "Partnering with advocacy groups for trust-first growth",
        body: "Rather than paid acquisition, I partnered with patient advocacy organizations and oncology practices to distribute the platform through trusted channels. This trust-first approach resulted in a 60% signup-to-match conversion rate — 3x the industry average.",
        images: ["/project-marketplace.png", "/project-marketplace.png"]
      }
    ],
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
    role: "Co-Founder & Product Manager",
    tagline: "A peer-to-peer marketplace that turns empty driveways into revenue",
    overview: "Arrive allows homeowners to rent out their driveways and private parking spots to drivers in crowded cities.",
    challenge: "Drivers need to make split-second decisions while navigating traffic, making complex UI dangerous and frustrating.",
    solution: "Built a map-centric mobile interface with one-tap booking, large hit areas, and high-contrast availability markers.",
    outcome: "Reached 50k active drivers in the first year with a 4.8 star app store rating.",
    impactStatement: "Building a two-sided marketplace from scratch that reached 50K active users and a 4.8-star rating by solving urban parking scarcity through peer-to-peer driveway sharing.",
    pmSkills: ["Marketplace Strategy", "Mobile Design", "Full-Stack Dev", "Growth Hacking", "Operations"],
    accordion: {
      problem: "Urban drivers spend an average of 17 minutes searching for parking per trip, wasting time, fuel, and contributing to traffic congestion. Meanwhile, millions of private driveways and parking spots sit empty during the day.",
      solution: "A two-sided marketplace that matches drivers with nearby available private parking spots in real-time, with one-tap booking, dynamic pricing, and instant payouts for hosts.",
      myRole: "Co-founded the company and owned the complete product lifecycle: market validation, product strategy, UI/UX design, full-stack development (React Native + Node.js), and growth operations.",
      businessImpact: "50K active drivers in Year 1. 4.8-star app store rating. $2.3M GMV in first 12 months. 15K host listings across 3 major cities."
    },
    sections: [
      {
        label: "Market Research",
        heading: "Quantifying the $30B urban parking problem",
        body: "I validated the market by surveying 200+ urban drivers and analyzing parking data from 3 cities. The data showed that 30% of city traffic is caused by parking search. I also interviewed 50 homeowners and found that 78% were interested in monetizing their empty driveways — the supply side was ready.",
        images: ["/project-analytics.png", "/project-analytics.png"]
      },
      {
        label: "UI/UX & Brand",
        heading: "Designing for drivers in motion",
        body: "Drivers make parking decisions while navigating traffic — so every interaction had to be completable in under 3 seconds. I designed a map-centric interface with oversized availability markers, one-tap booking, and a predictive 'spots near your destination' feature that pre-loads results before arrival.",
        images: ["/project-analytics.png", "/project-analytics.png"]
      },
      {
        label: "Development",
        heading: "Real-time availability at scale",
        body: "I built the MVP with React Native for cross-platform reach and Node.js for the backend. The biggest technical challenge was real-time spot availability — I implemented a WebSocket-based system that updates availability within 500ms of a booking change, preventing double-bookings across concurrent users.",
        images: ["/project-analytics.png", "/project-analytics.png"]
      },
      {
        label: "Go-to-Market",
        heading: "Solving the chicken-and-egg with geo-focused launch",
        body: "I solved the classic marketplace cold-start problem by launching hyper-locally: one neighborhood at a time. I door-knocked 200 homes in the first target area, offering $50 signup bonuses. Once supply density hit a critical threshold (15 spots per square mile), I activated demand through geo-targeted Instagram and Google ads.",
        images: ["/project-analytics.png", "/project-analytics.png"]
      }
    ],
    images: ["/project-analytics.png", "/project-analytics.png", "/project-analytics.png", "/project-analytics.png", "/project-analytics.png"],
    href: "/work/arrive"
  }
];
