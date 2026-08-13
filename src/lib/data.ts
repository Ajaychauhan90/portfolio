import type {
  Project,
  Service,
  ProcessStep,
  NavItem,
  TechTag,
} from "@/types";

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

export const navItems: NavItem[] = [
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Skills", href: "/#skills" },
  { label: "Services", href: "/#services" },
  { label: "Contact", href: "/#contact" },
];

// ---------------------------------------------------------------------------
// Skills
// ---------------------------------------------------------------------------

export const skillGroups: { category: string; skills: TechTag[] }[] = [
  {
    category: "Frontend",
    skills: [
      { name: "Next.js", category: "frontend" },
      { name: "React", category: "frontend" },
      { name: "JavaScript", category: "frontend" },
      { name: "Tailwind CSS", category: "frontend" },
    ],
  },
  {
    category: "Backend",
    skills: [{ name: "Node.js", category: "backend" }],
  },
  {
    category: "Database",
    skills: [
      { name: "Supabase", category: "database" },
      { name: "PostgreSQL", category: "database" },
    ],
  },
  {
    category: "Deployment",
    skills: [{ name: "Cloudflare Workers", category: "deployment" }],
  },
  {
    category: "Security",
    skills: [
      { name: "Cloudflare Turnstile", category: "security" },
      { name: "Web Security Fundamentals", category: "security" },
    ],
  },
];

// ---------------------------------------------------------------------------
// Services
// ---------------------------------------------------------------------------

export const services: Service[] = [
  {
    title: "Business Website Development",
    description:
      "I design and build complete websites for businesses — including content pages, contact forms, and everything needed to represent your business online.",
    tags: ["Next.js", "React", "Tailwind CSS", "Responsive"],
  },
  {
    title: "Next.js / React Development",
    description:
      "Need a fast, modern web application? I build with Next.js and React, covering server-side rendering, static generation, and dynamic functionality.",
    tags: ["Next.js", "React", "TypeScript", "Performance"],
  },
  {
    title: "Full-Stack Web Development",
    description:
      "From frontend to backend to database — I handle the complete stack. Forms, admin dashboards, data storage, security integration, and deployment.",
    tags: ["Node.js", "Supabase", "PostgreSQL", "Cloudflare"],
  },
  {
    title: "Website Improvements & Bug Fixes",
    description:
      "Have an existing website that needs work? I can fix bugs, improve performance, add new features, or clean up the codebase.",
    tags: ["Debugging", "Refactoring", "Features", "Performance"],
  },
];

// ---------------------------------------------------------------------------
// Development Process
// ---------------------------------------------------------------------------

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discover",
    description:
      "I start by understanding your business, goals, and requirements. No assumptions — just clear questions and careful listening.",
  },
  {
    number: "02",
    title: "Plan",
    description:
      "I map out the project structure: pages, features, data flows, and the right technology choices for your specific needs.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "I build the frontend, backend, and database layer — keeping the code clean, maintainable, and easy to extend.",
  },
  {
    number: "04",
    title: "Secure",
    description:
      "I apply appropriate security measures: form protection, input validation, and sensible access controls.",
  },
  {
    number: "05",
    title: "Deploy",
    description:
      "I deploy the application and make sure everything works as expected in production before handing it over.",
  },
];

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

export const projects: Project[] = [
  {
    id: "tourism-website",
    slug: "tourism-website",
    title: "Indian Tourism Company Website",
    shortDescription:
      "A complete tourism website built from scratch for an Indian tourism company specialising in travel across India, with a particular focus on North and Northeast India.",
    longDescription:
      "A full-stack web application built from scratch for an Indian tourism company. The project covers the public-facing website — including tour pages, an enquiry system, and contact functionality — as well as a backend, database, and admin dashboard where the company can manage submitted enquiries. The application is deployed on Cloudflare Workers.",
    role: "Full-Stack Developer",
    roleDescription:
      "I handled the complete project — from initial design through frontend development, backend implementation, database integration, security configuration, and production deployment.",
    status: "live",
    liveUrl: "https://hawkeyeexpeditions.com",
    techStack: [
      { name: "Next.js", category: "frontend" },
      { name: "React", category: "frontend" },
      { name: "Tailwind CSS", category: "frontend" },
      { name: "Node.js", category: "backend" },
      { name: "Supabase", category: "database" },
      { name: "PostgreSQL", category: "database" },
      { name: "Cloudflare Workers", category: "deployment" },
      { name: "Cloudflare Turnstile", category: "security" },
    ],
    features: [
      {
        title: "Responsive Tourism Website",
        description:
          "A fully responsive multi-page website covering the company's services, tour offerings, and information pages — built to work on desktop, tablet, and mobile.",
        icon: "Globe",
      },
      {
        title: "Tour & Service Pages",
        description:
          "Dedicated pages for tours and travel services, showcasing destinations across India including North India and Northeast India.",
        icon: "Map",
      },
      {
        title: "Enquiry System",
        description:
          "Visitors can submit enquiries directly through the website. The system processes the submission, validates it, and stores it securely in the database.",
        icon: "MessageSquare",
      },
      {
        title: "Admin Dashboard",
        description:
          "A private admin dashboard where the company can view and manage all submitted enquiries. No third-party CRM required.",
        icon: "LayoutDashboard",
      },
      {
        title: "Cloudflare Turnstile",
        description:
          "Public-facing forms are protected with Cloudflare Turnstile to reduce automated and spam submissions.",
        icon: "ShieldCheck",
      },
      {
        title: "Supabase / PostgreSQL Database",
        description:
          "Enquiry data and application data are stored in a PostgreSQL database managed through Supabase.",
        icon: "Database",
      },
      {
        title: "Cloudflare Workers Deployment",
        description:
          "The Next.js application is deployed on Cloudflare Workers, making it globally distributed and fast to load.",
        icon: "Cloud",
      },
      {
        title: "Backend Processing",
        description:
          "A Node.js backend handles form submissions, runs Turnstile verification, and writes validated data to the database.",
        icon: "Server",
      },
    ],
    workflow: [
      {
        step: 1,
        title: "Visitor",
        description: "A visitor browses the tourism website and its tours",
      },
      {
        step: 2,
        title: "Enquiry Form",
        description: "The visitor fills out and submits an enquiry form",
      },
      {
        step: 3,
        title: "Turnstile Verification",
        description: "Cloudflare Turnstile verifies the submission is human",
      },
      {
        step: 4,
        title: "Backend Processing",
        description: "Node.js backend processes and validates the enquiry",
      },
      {
        step: 5,
        title: "Supabase / PostgreSQL",
        description: "The validated enquiry is stored in the database",
      },
      {
        step: 6,
        title: "Admin Dashboard",
        description: "Admin logs in and views all submitted enquiries",
      },
      {
        step: 7,
        title: "Company Reviews",
        description: "The company reviews and responds to the enquiry",
      },
    ],
    screenshots: [
      {
        id: "homepage",
        label: "Homepage",
        description: "The main landing page of the tourism website",
        aspectRatio: "landscape",
        placeholder: true,
      },
      {
        id: "tours",
        label: "Tours Page",
        description: "Tour listings and destination pages",
        aspectRatio: "landscape",
        placeholder: true,
      },
      {
        id: "enquiry",
        label: "Enquiry Form",
        description: "The visitor-facing enquiry form with Turnstile protection",
        aspectRatio: "landscape",
        placeholder: true,
      },
      {
        id: "admin",
        label: "Admin Dashboard",
        description: "The private admin dashboard for managing enquiries",
        aspectRatio: "landscape",
        placeholder: true,
      },
      {
        id: "mobile",
        label: "Mobile View",
        description: "Responsive layout on a mobile device",
        aspectRatio: "portrait",
        placeholder: true,
      },
    ],
    caseStudyPath: "/projects/tourism-website",
  },
];

// ---------------------------------------------------------------------------
// Personal info
// ---------------------------------------------------------------------------

export const personalInfo = {
  name: "Ajay Chauhan",
  title: "Next.js & Full-Stack Developer",
  email: "ajjuchauhanuttra@gmail.com",
  github: "https://github.com/ajaychauhan",
  linkedin: "https://linkedin.com/in/ajay-chauhan-9289641a0",
  upwork: null as string | null, // Add your Upwork URL when ready
  education: "Master of Computer Applications (MCA)",
  interests: [
    "Web development",
    "Full-stack development",
    "Cybersecurity",
    "Web security",
  ],
  about: [
    "I'm a full-stack developer with a background in Computer Applications, focused on building complete web applications using Next.js, React, and Node.js.",
    "I handle projects from database design through to deployment — including backend logic, security integration, and production infrastructure.",
    "My interest in web security means I pay attention to how systems are built, not just that they work.",
  ],
} as const;
