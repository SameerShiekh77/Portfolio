export interface ExperienceStat {
  value: string
  label: string
}

export interface ExperienceEntry {
  period: string
  title: string
  company: string
  current: boolean
  description: string
  achievements: string[]
  technologies: string[]
  stats: Record<string, ExperienceStat>
}

export const experience: ExperienceEntry[] = [
  {
    period: 'Oct 2024 - Present',
    title: 'Senior Full Stack Developer',
    company: 'Nexia Tech',
    current: true,
    description:
      'Building scalable HRM, CRM, and custom web platforms for diverse clients. Delivering end-to-end solutions using modern backend and frontend stacks with a focus on maintainability.',
    achievements: [
      'Built custom HRM and CRM solutions improving workflow automation by 40%',
      'Reduced bug reports by 25% through architecture improvements',
      'Delivered secure backend systems integrated with intuitive frontend interfaces',
    ],
    technologies: ['Python', 'Django', 'PHP', 'Streamlit', 'JavaScript', 'AWS', 'Nginx', 'MySQL', 'REST APIs', 'React'],
    stats: {
      team: { value: '1', label: 'Team Size' },
      uptime: { value: '99.99%', label: 'Uptime' },
      projects: { value: '20+', label: 'Projects' },
    },
  },
  {
    period: 'Aug 2022 - Present',
    title: 'Engineering Manager - Core Applications',
    company: 'Al Nafi E-Learning Pvt. Ltd.',
    current: true,
    description:
      'Leading a team of 12 engineers building and maintaining cloud infrastructure and 50+ production applications. Driving DevOps transformation, CI/CD automation, and microservices migration across the organization.',
    achievements: [
      'Mentored 5 junior developers to mid-level positions',
      'Achieved 99.99% uptime across all production services',
      '2× Employee of the Month for outstanding leadership',
      'Led 25+ zero-downtime deployments',
      'Reduced deployment time by 75% via CI/CD automation',
      'Migrated monolithic architecture to microservices across 20+ apps',
      'Managed 5 cross-functional teams improving delivery timelines by 30%',
    ],
    technologies: ['Python', 'Django', 'Flask', 'Vue.js', 'Nuxt.js', 'AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Nginx', 'PostgreSQL', 'Redis', 'Sentry', 'APM', 'GraphQL'],
    stats: {
      team: { value: '12', label: 'Team Size' },
      uptime: { value: '99.99%', label: 'Uptime' },
      projects: { value: '50+', label: 'Projects' },
    },
  },
  {
    period: 'Jun 2024 - Present',
    title: 'Freelance Full Stack Developer',
    company: 'Ranked Designs',
    current: true,
    description:
      'Building custom PMS and web solutions for diverse clients, improving internal workflow automation and delivering full-cycle software tailored to business goals.',
    achievements: [
      'Built custom PMS solutions improving workflow automation by 40%',
      'Delivered full-cycle software solutions aligned to client business objectives',
    ],
    technologies: ['Python', 'Django', 'JavaScript', 'Git', 'Hostinger', 'MySQL', 'REST APIs'],
    stats: {},
  },
  {
    period: 'Jun 2022 - Sep 2022',
    title: 'Junior Faculty Instructor',
    company: 'Aptech',
    current: false,
    description:
      'Teaching and mentoring students in Python, Django, and web development. Designed curriculum, conducted practical sessions, and organized hackathons.',
    achievements: [
      'Taught ACCP 2.0 Diploma to 4 batches of 20+ students',
      'Received positive feedback from 75% of students',
      'Conducted teacher training sessions on the latest educational technologies',
    ],
    technologies: ['Python', 'Django', 'HTML/CSS', 'JavaScript', 'WordPress', 'Git', 'PHP', 'Laravel', 'MySQL'],
    stats: {
      users: { value: '100+', label: 'Students' },
      projects: { value: '10+', label: 'Projects' },
    },
  },
  {
    period: 'Mar 2022 - Jul 2022',
    title: 'Full Stack Developer',
    company: 'Coderz House LTD',
    current: false,
    description:
      'Contributed to high-impact projects in a fast-paced startup. Developed RESTful APIs, responsive frontends, and reduced page load times by 40%.',
    achievements: [
      'Developed a Django-based HRM system and multi-page web apps',
      'Reduced page load times by 40%',
      'Implemented secure, responsive UIs with Tailwind CSS and Vue.js',
    ],
    technologies: ['JavaScript', 'Python', 'MySQL', 'Django', 'HTML/CSS', 'REST APIs'],
    stats: {
      projects: { value: '10', label: 'Projects' },
    },
  },
  {
    period: 'Sep 2021 - Mar 2022',
    title: 'Data Analyst Intern (Remote)',
    company: 'ML Sense',
    current: false,
    description:
      'Analyzed real-world datasets, created data dashboards and visualizations to communicate patterns and support business decision-making.',
    achievements: [
      'Analyzed datasets with Python, producing visual insights and trend reports',
      'Created dashboards communicating patterns to clients in real-time',
    ],
    technologies: ['Python', 'Tableau', 'Pandas', 'NumPy', 'Matplotlib', 'Jupyter'],
    stats: {},
  },
]

export interface Milestone {
  date: string
  title: string
  detail: string
  type: 'education' | 'career' | 'leadership' | 'achievement'
}

export const milestones: Milestone[] = [
  { date: '2016', title: 'Matriculation in Computer Science', detail: 'Karachi Cambridge School - A+ Grade, top honors.', type: 'education' },
  { date: '2017', title: 'Intermediate in Computer Science', detail: 'Govt. College For Men Nazimabad - practical IT foundations.', type: 'education' },
  { date: '2019', title: 'BS Computer Science begins', detail: 'Federal Urdu University of Arts, Science & Technology.', type: 'education' },
  { date: '2021', title: 'First industry role', detail: 'Data Analyst Intern at ML Sense - first taste of production data work.', type: 'career' },
  { date: '2022', title: 'First full-stack engineering role', detail: 'Coderz House - shipped a Django HRM system, cut load times 40%.', type: 'career' },
  { date: '2022', title: 'Joined Al Nafi E-Learning', detail: 'Engineering Manager for Core Applications - infrastructure and platform ownership begins.', type: 'leadership' },
  { date: '2023', title: 'Led the microservices migration', detail: '20+ applications moved from monolith to microservices architecture.', type: 'achievement' },
  { date: '2023', title: 'CI/CD transformation', detail: 'Deployment time cut by 75% through pipeline automation across the org.', type: 'achievement' },
  { date: '2024', title: 'Scaled to a 12-engineer team', detail: 'Cross-functional leadership across backend, frontend, DevOps, and QA.', type: 'leadership' },
  { date: 'Present', title: 'DevOps Manager & Senior Software Engineer', detail: '99.9%+ uptime across 50+ production systems, still shipping code daily.', type: 'career' },
]
