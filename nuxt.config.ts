const env = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env ?? {}
const isWsl = Boolean(env.WSL_DISTRO_NAME)
const usePolling = env.NUXT_WATCH_POLLING === 'true' || isWsl

export default defineNuxtConfig({
  compatibilityDate: '2025-10-06',
  devtools: { enabled: true },

  devServer: {
    host: '0.0.0.0',
    port: 3000
  },

  vite: {
    server: {
      watch: usePolling
        ? {
            usePolling: true,
            interval: 150,
            awaitWriteFinish: {
              stabilityThreshold: 100,
              pollInterval: 50,
            },
          }
        : undefined,
      hmr: env.NUXT_HMR_CLIENT_PORT
        ? {
            clientPort: Number(env.NUXT_HMR_CLIENT_PORT),
          }
        : undefined,
    }
  },

  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
      autoprefixer: {},
    },
  },
  
  app: {
    head: {
      title: 'Sr. Software Engineer & Engineering Manager | Muhammad Sameer',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Portfolio of a Senior Software Engineer & DevOps Manager' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap' }
      ]
    }
  }
})