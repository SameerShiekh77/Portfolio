export interface ArchNode {
  id: string
  label: string
  detail: string
  icon: string
}

export interface ArchTier {
  id: string
  title: string
  nodes: ArchNode[]
}

export const architectureTiers: ArchTier[] = [
  {
    id: 'client',
    title: 'Client',
    nodes: [
      { id: 'browser', label: 'Vue.js / Nuxt.js', detail: 'SSR-rendered frontend, hydrated client-side', icon: 'monitor' },
    ],
  },
  {
    id: 'edge',
    title: 'Edge',
    nodes: [
      { id: 'nginx', label: 'Nginx', detail: 'Reverse proxy, TLS termination, load balancing', icon: 'shield' },
    ],
  },
  {
    id: 'app',
    title: 'Application',
    nodes: [
      { id: 'django', label: 'Django', detail: 'Core REST API services', icon: 'server' },
      { id: 'fastapi', label: 'FastAPI', detail: 'High-throughput async services', icon: 'zap' },
    ],
  },
  {
    id: 'data',
    title: 'Data',
    nodes: [
      { id: 'postgres', label: 'PostgreSQL', detail: 'System of record', icon: 'database' },
      { id: 'redis', label: 'Redis', detail: 'Caching & session state', icon: 'gauge' },
    ],
  },
  {
    id: 'platform',
    title: 'Platform',
    nodes: [
      { id: 'docker', label: 'Docker', detail: 'Containerized services', icon: 'container' },
      { id: 'k8s', label: 'Kubernetes', detail: 'Orchestration & auto-scaling', icon: 'boxes' },
      { id: 'aws', label: 'AWS', detail: 'Cloud infrastructure', icon: 'cloud' },
    ],
  },
]

export const deploymentFlow = [
  { step: 'Commit', detail: 'Code pushed to main branch' },
  { step: 'CI Pipeline', detail: 'Automated tests + build' },
  { step: 'Container Build', detail: 'Docker image built & pushed to registry' },
  { step: 'Rolling Deploy', detail: 'Kubernetes rolling update, zero downtime' },
  { step: 'Live', detail: 'Traffic shifted, old pods drained' },
]
