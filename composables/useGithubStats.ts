import { ref } from 'vue'

export interface GithubRepo {
  name: string
  htmlUrl: string
  description: string | null
  stars: number
  forks: number
  language: string | null
  updatedAt: string
}

export interface GithubProfile {
  login: string
  name: string | null
  avatarUrl: string
  bio: string | null
  publicRepos: number
  followers: number
  following: number
  htmlUrl: string
}

interface RawRepo {
  name: string
  html_url: string
  description: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  pushed_at: string
  fork: boolean
}

interface RawUser {
  login: string
  name: string | null
  avatar_url: string
  bio: string | null
  public_repos: number
  followers: number
  following: number
  html_url: string
}

const state = {
  profile: ref<GithubProfile | null>(null),
  repos: ref<GithubRepo[]>([]),
  languageTotals: ref<Record<string, number>>({}),
  status: ref<'idle' | 'loading' | 'success' | 'error'>('idle'),
}

/** Client-side only - a server-side fetch here would share GitHub's unauthenticated rate limit across every visitor. */
export const useGithubStats = (username: string) => {
  const load = async () => {
    if (state.status.value === 'loading' || state.status.value === 'success') return
    state.status.value = 'loading'

    try {
      const [user, repos] = await Promise.all([
        $fetch<RawUser>(`https://api.github.com/users/${username}`),
        $fetch<RawRepo[]>(`https://api.github.com/users/${username}/repos`, { query: { sort: 'updated', per_page: 100 } }),
      ])

      state.profile.value = {
        login: user.login,
        name: user.name,
        avatarUrl: user.avatar_url,
        bio: user.bio,
        publicRepos: user.public_repos,
        followers: user.followers,
        following: user.following,
        htmlUrl: user.html_url,
      }

      const nonForks = repos.filter((r) => !r.fork)

      const langCount: Record<string, number> = {}
      nonForks.forEach((r) => {
        if (r.language) langCount[r.language] = (langCount[r.language] ?? 0) + 1
      })
      state.languageTotals.value = langCount

      state.repos.value = [...nonForks]
        .sort((a, b) => b.stargazers_count - a.stargazers_count || +new Date(b.pushed_at) - +new Date(a.pushed_at))
        .slice(0, 6)
        .map((r) => ({
          name: r.name,
          htmlUrl: r.html_url,
          description: r.description,
          stars: r.stargazers_count,
          forks: r.forks_count,
          language: r.language,
          updatedAt: r.pushed_at,
        }))

      state.status.value = 'success'
    } catch {
      state.status.value = 'error'
    }
  }

  return { ...state, load }
}
