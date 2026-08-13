const env = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env ?? {}
const isWsl = Boolean(env.WSL_DISTRO_NAME)
const usePolling = env.NUXT_WATCH_POLLING === 'true' || isWsl

export default defineNuxtConfig({
  compatibilityDate: '2025-10-06',
  devtools: { enabled: true },

  // Fonts are self-hosted in app/assets/css/fonts.css, so @nuxt/fonts is deliberately
  // not installed as a module - it resolves families over the network at build time,
  // which made builds fail when its provider API was unreachable.
  modules: ['@nuxt/image', '@nuxtjs/seo'],

  css: ['~/assets/css/fonts.css', '~/assets/css/main.css'],

  devServer: {
    host: '0.0.0.0',
    port: 3000
  },

  vite: {
    // @lucide/vue ships no `exports` map, so Nitro externalizes it to its CJS build,
    // which pulls in a second copy of Vue - its inject() then can't see the ESM Vue's
    // instance and returns undefined, crashing SSR. Inlining keeps it on the ESM build.
    ssr: {
      noExternal: ['@lucide/vue'],
    },

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

  // TODO: point this at the real production domain before deploying -
  // it drives canonical URLs, the sitemap, and OG/Twitter card URLs.
  site: {
    url: 'https://muhammadsameer.dev',
    name: 'Muhammad Sameer - DevOps Manager & Senior Software Engineer',
    description: 'DevOps Manager & Senior Software Engineer specializing in cloud infrastructure, backend architecture, and engineering leadership. 3+ years shipping and scaling production systems.',
    defaultLocale: 'en',
  },

  image: {
    format: ['webp', 'avif'],
    quality: 82,
  },

  app: {
    head: {
      titleTemplate: '%s',
      title: 'Muhammad Sameer - DevOps Manager & Senior Software Engineer',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#ede7dc' },
      ],
      htmlAttrs: {
        lang: 'en',
      },
    }
  },

  schemaOrg: {
    identity: {
      type: 'Person',
      name: 'Muhammad Sameer',
      jobTitle: 'DevOps Manager & Senior Software Engineer',
      sameAs: [
        'https://www.linkedin.com/in/muhammadsameer/',
        'https://github.com/SameerShiekh77',
        'https://www.facebook.com/MuhammadSameer47',
      ],
    },
  },
})
