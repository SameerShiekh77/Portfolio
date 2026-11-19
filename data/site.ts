/** Copy and structure for the redesigned storytelling flow. Anything marked [PLACEHOLDER: …] is yours to fill. */

export const hero = {
  title: 'Software Engineering Manager',
  subtitle: 'DevOps & Full-Stack Leader',
  tagline: 'I build systems that stay up, and teams that keep shipping.',
  stats: [
    { value: 5, suffix: '+', label: 'Years in production' },
    { value: 50, suffix: '+', label: 'Production systems' },
    { value: 12, suffix: '', label: 'Engineers led' },
    { value: 99.9, suffix: '%', label: 'Uptime', decimals: 1 },
  ],
} as const

export const navLinks = [
  { id: 'story', label: 'Story' },
  { id: 'journey', label: 'Journey' },
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'voices', label: 'Voices' },
  { id: 'writing', label: 'Writing' },
  { id: 'contact', label: 'Contact' },
] as const

export interface Principle {
  title: string
  body: string
  proof: string
}

export const leadershipIntro =
  'Most outages and most missed deadlines are the same problem: a system, technical or human, that depends on one person remembering. I design both so they don’t.'

export const principles: Principle[] = [
  {
    title: 'Systems before heroics',
    body: 'If a release needs a brave engineer at midnight, the pipeline is the bug. I automate the path to production until shipping is boring.',
    proof: '75% faster deployments after CI/CD automation across 20+ apps.',
  },
  {
    title: 'Grow owners, not assignees',
    body: 'I give people the whole problem, the context behind it, and room to be wrong early. Review is for teaching, not gatekeeping.',
    proof: '5 junior developers mentored to mid-level.',
  },
  {
    title: 'Reliability is a feature',
    body: 'Monitoring, rollbacks and runbooks are part of the definition of done. Users never see them, and they never forget when they are missing.',
    proof: '99.9%+ uptime across 50+ production systems.',
  },
  {
    title: 'Stay close to the code',
    body: 'I still ship. It keeps my technical judgment honest and my estimates grounded in what the work actually costs.',
    proof: '[PLACEHOLDER: a recent thing you personally built or fixed as a manager]',
  },
]

export const cultureRituals = [
  '[PLACEHOLDER: a team ritual you run, e.g. weekly incident review]',
  '[PLACEHOLDER: how you run 1:1s and growth plans]',
  '[PLACEHOLDER: your engineering standard, e.g. code review or on-call practice]',
]

export interface Post {
  title: string
  summary: string
  tag: string
}

export const posts: Post[] = [
  { title: '[PLACEHOLDER: post title — e.g. Migrating 20 apps off a monolith without downtime]', summary: '[PLACEHOLDER: two-sentence summary]', tag: 'DevOps' },
  { title: '[PLACEHOLDER: post title — e.g. What changed when I started managing engineers]', summary: '[PLACEHOLDER: two-sentence summary]', tag: 'Leadership' },
  { title: '[PLACEHOLDER: post title — e.g. A CI/CD pipeline that cut deploys by 75%]', summary: '[PLACEHOLDER: two-sentence summary]', tag: 'Engineering' },
]
