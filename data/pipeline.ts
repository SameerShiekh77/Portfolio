export interface PipelineStage {
  id: string
  /** Section element id this stage maps to. */
  section: string
  label: string
  command: string
  status: string
}

/**
 * The narrative spine. Each section is a stage of a deploy: the visitor scrolls a commit
 * from push to production, and the page lightens as it goes live.
 */
export const pipelineStages: PipelineStage[] = [
  { id: 'commit', section: 'home', label: 'Commit', command: 'git push origin main', status: 'Change pushed' },
  { id: 'checkout', section: 'story', label: 'Checkout', command: 'git checkout -b origin-story', status: 'Source resolved' },
  { id: 'history', section: 'journey', label: 'History', command: 'git log --oneline --graph', status: 'Commits replayed' },
  { id: 'dependencies', section: 'skills', label: 'Dependencies', command: 'pip install -r requirements.txt', status: 'Toolchain ready' },
  { id: 'artifacts', section: 'projects', label: 'Artifacts', command: 'docker build -t production .', status: 'Images built' },
  { id: 'infrastructure', section: 'architecture', label: 'Infrastructure', command: 'terraform apply', status: 'Infra provisioned' },
  { id: 'rollout', section: 'experience', label: 'Rollout', command: 'kubectl rollout status', status: 'Traffic shifting' },
  { id: 'scale', section: 'opensource', label: 'Scale', command: 'kubectl scale --replicas=12', status: 'Replicas online' },
  { id: 'monitor', section: 'testimonials', label: 'Monitor', command: 'watch health --all', status: 'All checks green' },
  { id: 'live', section: 'contact', label: 'Live', command: 'deploy complete', status: 'Running in production' },
]
