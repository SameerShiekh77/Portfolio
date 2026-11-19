export interface Skill {
  name: string
  level: number
  icon: string
}

export interface SkillCategory {
  id: string
  title: string
  icon: string
  color: string
  description: string
  skills: Skill[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'cloud-devops',
    title: 'Cloud & DevOps',
    icon: 'cloud-cog',
    color: 'var(--color-accent-olive)',
    description: 'Infrastructure, deployment automation, and platform reliability.',
    skills: [
      { name: 'AWS Cloud', level: 85, icon: 'cloud' },
      { name: 'Docker', level: 90, icon: 'container' },
      { name: 'Kubernetes', level: 80, icon: 'boxes' },
      { name: 'CI/CD Pipelines', level: 90, icon: 'git-branch' },
      { name: 'Linux Administration', level: 88, icon: 'terminal' },
      { name: 'Nginx / Apache', level: 82, icon: 'server' },
      { name: 'Sentry / APM', level: 85, icon: 'activity' },
      { name: 'Cron Jobs & Automation', level: 90, icon: 'clock' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend Engineering',
    icon: 'server-cog',
    color: 'var(--color-accent-clay)',
    description: 'APIs, services, and data systems that run production workloads.',
    skills: [
      { name: 'Python', level: 92, icon: 'code' },
      { name: 'Django', level: 90, icon: 'layout-template' },
      { name: 'FastAPI', level: 75, icon: 'zap' },
      { name: 'Flask', level: 78, icon: 'flask-conical' },
      { name: 'REST APIs', level: 92, icon: 'plug' },
      { name: 'Microservices Architecture', level: 85, icon: 'network' },
      { name: 'PostgreSQL & MySQL', level: 85, icon: 'database' },
      { name: 'Redis', level: 80, icon: 'zap-off' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend & Tools',
    icon: 'layout-panel-left',
    color: 'var(--color-accent-bronze)',
    description: 'User-facing interfaces and the tooling that keeps teams shipping.',
    skills: [
      { name: 'Vue.js / Nuxt.js', level: 85, icon: 'component' },
      { name: 'JavaScript / TypeScript', level: 85, icon: 'file-code' },
      { name: 'Tailwind CSS', level: 88, icon: 'palette' },
      { name: 'Git / GitHub', level: 92, icon: 'git-merge' },
      { name: 'REST/API Testing (Postman)', level: 85, icon: 'send' },
      { name: 'Playwright / Selenium', level: 65, icon: 'test-tube' },
    ],
  },
  {
    id: 'ai',
    title: 'AI Integration',
    icon: 'brain-circuit',
    color: 'var(--color-accent-gold)',
    description: 'Embedding LLMs into real production workflows, not demos.',
    skills: [
      { name: 'OpenAI API', level: 82, icon: 'sparkles' },
      { name: 'Claude API', level: 82, icon: 'bot' },
      { name: 'Prompt Engineering', level: 80, icon: 'message-square-code' },
      { name: 'Streamlit', level: 75, icon: 'app-window' },
      { name: 'AI-Assisted Automation', level: 85, icon: 'workflow' },
    ],
  },
  {
    id: 'security',
    title: 'Security & Architecture',
    icon: 'shield-check',
    color: 'var(--color-accent-sage)',
    description: 'Designing systems that are correct, safe, and built to last.',
    skills: [
      { name: 'System Design', level: 85, icon: 'network' },
      { name: 'Access Control & Auth', level: 80, icon: 'lock' },
      { name: 'Monolithic → Microservices Migration', level: 85, icon: 'git-fork' },
      { name: 'Monitoring & Incident Response', level: 82, icon: 'siren' },
      { name: 'Zero-Downtime Deployments', level: 88, icon: 'shield-check' },
    ],
  },
  {
    id: 'leadership',
    title: 'Engineering Leadership',
    icon: 'users-round',
    color: 'var(--color-accent-plum)',
    description: 'Leading teams, not just leading code.',
    skills: [
      { name: 'Team Leadership (12 engineers)', level: 92, icon: 'users' },
      { name: 'Technical Mentoring', level: 88, icon: 'graduation-cap' },
      { name: 'Cross-functional Collaboration', level: 90, icon: 'handshake' },
      { name: 'Code Review & Standards', level: 90, icon: 'git-pull-request' },
      { name: 'Stakeholder Communication', level: 85, icon: 'message-circle' },
      { name: 'Strategic Planning', level: 85, icon: 'target' },
    ],
  },
]
