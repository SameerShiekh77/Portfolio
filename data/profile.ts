export interface SocialLink {
  label: string
  href: string
  icon: 'linkedin' | 'github' | 'facebook' | 'whatsapp' | 'mail' | 'phone' | 'map-pin'
}

export const profile = {
  name: 'Muhammad Sameer',
  firstName: 'Muhammad',
  lastName: 'Sameer',
  initials: 'MS',
  title: 'DevOps Manager & Senior Software Engineer',
  roles: [
    'DevOps Manager',
    'Senior Software Engineer',
    'Cloud Infrastructure Architect',
    'Engineering Team Lead',
    'AI Integration Engineer',
  ],
  yearsExperience: '3+',
  location: 'Karachi, Pakistan',
  email: 'muhammadsameer.css@gmail.com',
  phone: '+92 316 636 8782',
  whatsapp: '+92 343 139 6493',
  whatsappHref: 'https://wa.me/923431396493',
  resumeFile: '/Muhammad-Sameer-CV.pdf',
  avatar: '/images/M-Sameer.webp',
  availability: 'Available for hire',
  availabilityNote:
    'Open to full-time DevOps Manager, Sr. Software Engineer, or senior architect roles, plus fractional engineering-leadership engagements.',
  summary:
    "DevOps Manager & Senior Software Engineer with 5+ years leading engineering teams while still shipping production code. I design cloud infrastructure, backend systems, and CI/CD pipelines that keep large-scale platforms running at 99.9%+ uptime.",
  heroBadge: 'Open to Sr. Software Engineer & leadership roles',
} as const

export const heroStats = [
  { value: '3+', label: 'Years\nExperience', color: 'var(--color-accent-clay)' },
  { value: '50+', label: 'Production\nSystems', color: 'var(--color-accent-olive)' },
  { value: '12', label: 'Engineers\nLed', color: 'var(--color-accent-gold)' },
  { value: '99.9%', label: 'Avg\nUptime', color: 'var(--color-accent-sage)' },
] as const

export const globalStats = [
  { icon: 'briefcase', value: 3, suffix: '+', label: 'Years of Experience', sub: 'Shipping production systems', color: 'var(--color-accent-clay)' },
  { icon: 'rocket', value: 50, suffix: '+', label: 'Projects Delivered', sub: 'Concept to production', color: 'var(--color-accent-olive)' },
  { icon: 'users', value: 30, suffix: '+', label: 'Clients Served', sub: 'Worldwide', color: 'var(--color-accent-gold)' },
  { icon: 'graduation-cap', value: 5, suffix: '+', label: 'Engineers Mentored', sub: 'To mid & senior levels', color: 'var(--color-accent-sage)' },
] as const

export const socials: SocialLink[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/muhammadsameer/', icon: 'linkedin' },
  { label: 'GitHub', href: 'https://github.com/SameerShiekh77', icon: 'github' },
  { label: 'Facebook', href: 'https://www.facebook.com/MuhammadSameer47', icon: 'facebook' },
  { label: 'WhatsApp', href: 'https://wa.me/923431396493', icon: 'whatsapp' },
]

export const githubUsername = 'SameerShiekh77'

export const contactItems = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, icon: 'mail' as const },
  { label: 'Phone', value: profile.phone, href: `tel:${profile.phone.replace(/\s+/g, '')}`, icon: 'phone' as const },
  { label: 'WhatsApp', value: profile.whatsapp, href: profile.whatsappHref, icon: 'whatsapp' as const },
  { label: 'Location', value: profile.location, href: null, icon: 'map-pin' as const },
]

export interface StoryParagraph {
  heading: string
  text: string
}

export const storyParagraphs: StoryParagraph[] = [
  {
    heading: 'Where it started',
    text: "My journey started with a Computer Science degree and a simple habit: taking things apart to see how they actually worked. Python and Django were the first tools that felt like a superpower - I could turn an idea into something running in a browser within a day.",
  },
  {
    heading: 'Finding infrastructure',
    text: "Building features was satisfying, but I kept getting pulled toward the layer underneath - servers, deployments, the 3am pages when something went down. Cloud computing and DevOps became the real obsession: not just writing code, but making sure it survives contact with real users.",
  },
  {
    heading: 'Becoming a systems thinker',
    text: 'That pull led me deep into AWS, Docker, Kubernetes, and CI/CD - designing pipelines that cut deployment time by 75%, migrating monoliths to microservices, and architecting infrastructure that holds up under real production load.',
  },
  {
    heading: 'Leading, not just building',
    text: "Today I lead a team of engineers across backend, frontend, DevOps, and QA - while still writing production code myself. I don't just build software. I build the systems, pipelines, and teams that keep it running.",
  },
]
