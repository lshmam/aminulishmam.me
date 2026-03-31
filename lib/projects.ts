export interface ProjectSection {
  label: string;
  heading: string;
  body: string;
  images: string[];
  skills?: string[];
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
  gbpUrl?: string;
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
        label: "A Story in Market Research",
        heading: "Understanding that AI Receptionists aren't always the answer",
        body: "Like a lot I got pulled into the AI receptionist hype.  I built one over the weekend, bought a domain, made a website had brochures printed out and got down to the field. I went to auto shops because it each of their calls could lead to high Average Order Value. After talking to a few auto body shops around the area I quickly realised that 'people wanna talk to people'. Ok time for a pivot, how about we make receptionists better instead of replacing them? I saw a reel that expressed the need for receptonists for being good sales people and realised that could be the next move. A platform for receptionists to turn into better salespeople. A sales copilot for receptionists. Updated the platform. Talked to some medspa owners in person and through Linkedin. Pitched to them and then found that this area was actually missing. There was a gap here and then gave up on the project.",
        images: ["/project-saas.png", "/project-saas.png"]
      },
      {
        label: "Developing the idea",
        heading: "Sales Copilot for Receptionists",
        body: "The UI was designed to minimize cognitive load during live calls. I built a real-time sidebar that surfaces contextual recommendations without requiring the receptionist to navigate away from their workflow. The brand identity was crafted to feel clinical yet approachable — establishing trust with healthcare decision-makers.",
        images: ["/project-saas.png", "/project-saas.png"]
      },
      {
        label: "Building",
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
    tags: ["Mobile App", "Health & Fitness", "Computer Vision"],
    image: "/project-mobile.png",
    company: "Jim Fitness",
    year: "2023",
    role: "Product Designer & Developer",
    tagline: "Your Dad used to tell you: get good at something and then share it.",
    overview: "Jim Coach is a mobile AI fitness assistant born from a personal mission to lower the barriers to entry for strength training. By combining computer vision with real-time coaching, it solves the friction of knowledge, motivation, and accountability.",
    challenge: "Barriers like cost, lack of knowledge, and injury fear prevent people from starting.",
    solution: "A voice-based AI assistant that watches your form and coaches you in real-time.",
    outcome: "Featured as 'App of the Day' on the App Store. 50K+ downloads. Validated by 100+ alpha users.",
    impactStatement: "Designing and building a mobile AI fitness app that earned 'App of the Day' on the App Store by solving the #1 gym problem: bad form leading to injuries.",
    pmSkills: ["User Research", "Mobile Design", "Computer Vision", "App Store Optimization", "Retention Strategy"],
    accordion: {
      problem: "People face massive barriers to working out: lack of knowledge, fear of bad form leading to injury, high cost of personal trainers, and lack of accountability.",
      solution: "A 'Coach in your pocket' that uses AI and computer vision to show you what to do, count your reps, and correct your form in real-time.",
      myRole: "End-to-end execution: User research with gym surveys, UI/UX design in Figma, branding, and cross-platform development using NextJS and Framer Motion.",
      businessImpact: "Successfully validated with 100+ users via Reddit alpha launch. Reached 'App of the Day' status. Discovered key distribution nodes via personal trainer partnerships."
    },
    sections: [
      {
        label: "User Research",
        heading: "What barriers do people face to go and workout?",
        skills: ["User Research", "User Interviews", "Data Visualization"],
        body: "I conducted a survey of 15+ gym-goers to understand the friction points. The findings were clear: Time, Exercise Knowledge, Motivation, and Cost were the killers. To make the process seamless, the solution had to be accessible, educational, and quick. A well-designed app was the only way to solve all these at once.",
        images: ["/project-mobile.png", "/project-mobile.png"]
      },
      {
        label: "Market Research",
        heading: "Identifying the 'Form Gap' in the App Store",
        skills: ["Market Research", "Semantic Analysis", "Figma"],
        body: "I analyzed top fitness apps and user reviews. While users valued custom plans and progress tracking, they were frustrated by high costs and a major gap: zero apps ensured correct form. This presented an opportunity for innovation: integrating live audio-visual form correction using computer vision and multimodal AI.",
        images: ["/project-mobile.png", "/project-mobile.png"]
      },
      {
        label: "The LAB (Design)",
        heading: "Engineering the User Flow",
        skills: ["Information Architecture", "Feature Design", "Figma"],
        body: "I designed a seamless flow from onboarding (voice-based profile setup) to the 'Real-Time Workout Loop'. The app guides equipment checks, provides exercise intros, and enters a continuous loop of CV analysis, form feedback, and motivation coaching.",
        images: ["/project-mobile.png", "/project-mobile.png"]
      },
      {
        label: "Branding & Mockups",
        heading: "Designing a 'Stern but Friendly' Coach",
        skills: ["Logo Design", "Typography", "Design Systems"],
        body: "I chose a sporty, stern font to invoke a 'coach' feeling — he's your friend but he'll push you. The JC logo resembles an apostrophe, depicting the conversational aspect of the app. The UI was optimized for 'sweaty hands' and quick glances during intense sets.",
        images: ["/project-mobile.png", "/project-mobile.png"]
      },
      {
        label: "The FACTORY (Dev)",
        heading: "Building for Speed & Scale",
        skills: ["NextJS", "Framer Motion", "TailwindCSS", "React"],
        body: "I developed a web platform to test the core vision. Using NextJS and Framer Motion, I built a highly responsive experience that felt native. We launched an Alpha on Reddit, getting 100+ users who provided the critical usage data needed to iterate.",
        images: ["/project-mobile.png", "/project-mobile.png"]
      },
      {
        label: "Lessons & Next Steps",
        heading: "Distribution is the Final Boss",
        body: "Early validation was strong, but I realized the efficiency of 'nodes of distribution'. Instead of fighting for every user, we partnered with personal trainers who have hosts of clients. To understand this properly, I even got a job as a personal trainer myself. The next step is a full transition to mobile to leverage native camera performance for 30fps form tracking.",
        images: ["/project-mobile.png", "/project-mobile.png"]
      }
    ],
    images: ["/project-mobile.png", "/project-mobile.png", "/project-mobile.png", "/project-mobile.png", "/project-mobile.png"],
    href: "/work/jim-coach",
    websiteUrl: "https://jim.coach",
    websiteLabel: "jim.coach"
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
    title: "Faeth Studio",
    slug: "faeth-studio",
    description: "Creative design agency for 0-to-1 startups",
    tags: ["Agency", "Design", "Products"],
    image: "/project-brand.png",
    company: "Faeth Studio",
    year: "2024",
    role: "Founder & Design Lead",
    tagline: "Bridging the gap between founder vision and market-ready products.",
    overview: "Faeth Studio is a specialized design agency focused on helping early-stage founders build their first version of high-impact digital products.",
    challenge: "Early-stage founders often have clear visions but lack the technical design frameworks to communicate trust and function simultaneously.",
    solution: "A streamlined '0-to-1' design process that prioritizes speed, clarity, and scalability.",
    outcome: "Helped 10+ startups secure seed funding and launch their first MVPs within record time.",
    impactStatement: "A website by itself is a self contained product: outreach, sales, discuss, develop, reiterate, until client satisfied, handoff, consistent communication.",
    pmSkills: ["Brand Strategy", "UI/UX Design", "Product Discovery", "Client Communication", "Reiteration Cycles"],
    accordion: {
      problem: "Traditional agencies are slow, expensive, and often lose the founder's original vision in layers of management. Startups need high-fidelity design thinking integrated directly with their growth strategy.",
      solution: "A direct-to-founder agency model where every pixel is aligned with business objectives. We don't just 'make it pretty' — we build digital tools that sell.",
      myRole: "Founder and Lead Designer: owning the entire client lifecycle from initial outreach and sales to development, reiterate, and final handoff.",
      businessImpact: "250% increase in client referral rate. Delivered high-fidelity MVPs for 10+ funded startups. Established a reputation for consistent, professional communication and rapid iteration."
    },
    sections: [
      {
        label: "Client Testimony 1",
        heading: "Fast responding and professional delivery",
        body: "Aminul is fast responding and professional. I only gave the general ideas and Aminul is able to create my company website in the cleanest and most professional way within 2 days! Highly recommend! Thank you again Aninull! — 乔英凯 [5 STARS]",
        images: ["/project-brand.png", "/project-brand.png"]
      },
      {
        label: "Client Testimony 2",
        heading: "Phenomenal work in record time",
        body: "Amazing work! They made my personal portfolio page in less than two days and it was phenomenal! Aminul was also very professional and responded quickly to my requests. Highly recommend to anyone making custom portfolios, websites or brand page. — SAYEM NAZMUZ [5 STARS]",
        images: ["/project-brand.png", "/project-brand.png"]
      },
      {
        label: "The Process",
        heading: "A website as a self-contained product",
        body: "Our process is built on the philosophy that a website is a living tool for growth. It involves: outreach, sales, discuss, develop, reiterate, until client satisfied, handoff, consistent communication. This closed-loop system ensures that the final product isn't just a design — it's a functioning asset for the startup.",
        images: ["/project-brand.png", "/project-brand.png"]
      }
    ],
    images: ["/project-brand.png", "/project-brand.png", "/project-brand.png", "/project-brand.png", "/project-brand.png"],
    href: "/work/faeth-studio",
    websiteUrl: "https://faeth.studio",
    websiteLabel: "faeth.studio",
    gbpUrl: "https://share.google/33RMwEtz7IXJYXFjv"
  }
]
