import templateCompilerOptions from '@tresjs/core/template-compiler-options'

const env = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env ?? {}
const isWsl = Boolean(env.WSL_DISTRO_NAME)
const usePolling = env.NUXT_WATCH_POLLING === 'true' || isWsl

export default defineNuxtConfig({
  compatibilityDate: '2025-10-06',
  devtools: { enabled: true },

  // Fonts are self-hosted in app/assets/css/fonts.css, so @nuxt/fonts is deliberately
  // not installed as a module - it resolves families over the network at build time,
  // which made builds fail when its provider API was unreachable.
  modules: ['@nuxt/image', '@nuxtjs/seo', '@tresjs/nuxt'],

  // TresJS elements (<TresMesh>, <primitive>...) are Three.js objects, not DOM or Vue components.
  vue: {
    compilerOptions: templateCompilerOptions.template.compilerOptions,
  },

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
    description: 'DevOps Manager & Senior Software Engineer specializing in cloud infrastructure, backend architecture, and engineering leadership. 5+ years shipping and scaling production systems.',
    defaultLocale: 'en',
  },

  image: {
    format: ['webp', 'avif'],
    quality: 82,
  },

  nitro: {
    prerender: {
      // On Netlify, @nuxt/image switches to the Netlify Image CDN and emits
      // /.netlify/images?... URLs. The hero image is preloaded, so that URL appears as a
      // <link rel="preload"> which the prerender crawler then follows — and the CDN does
      // not exist during the build, so it 404s and fails the whole deploy. The endpoint
      // is served at runtime, so it simply must not be crawled.
      ignore: ['/.netlify'],
    },
  },

  app: {
    head: {
      titleTemplate: '%s',
      title: 'Muhammad Sameer - DevOps Manager & Senior Software Engineer',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#0a0710' },
      ],
      link: [
        // .ico first for the browsers that request /favicon.ico regardless, then the SVG
        // which modern browsers prefer and render crisply at any size.
        { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
        { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' },
      ],
      htmlAttrs: {
        lang: 'en',
        'data-theme': 'dark',
      },
      // Restore a saved light theme before first paint so it never flashes dark.
      script: [
        {
          innerHTML: "try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){document.documentElement.dataset.theme=t;if(t==='light'){document.documentElement.style.background='#fbf4ec'}}}catch(e){}",
        },
      ],
      // Critical CSS, inlined ahead of the stylesheet link. Until main.css lands the
      // browser would otherwise paint the SSR markup as unstyled black-serif-on-white;
      // this keeps the first frame brand sand and holds the raw markup back.
      //
      // NOTE: must be `innerHTML`. Passing `children` makes Unhead emit it as a literal
      // attribute (<style children="...">), so the rules never apply.
      style: [
        {
          innerHTML:
            'html{background:#0a0710;color:#f8f0e9}' +
            'body{margin:0;font-family:Satoshi,ui-sans-serif,system-ui,-apple-system,sans-serif}' +
            // Hide the app until real styles parse; main.css flips this straight back.
            // The animation is a safety net: if the stylesheet never arrives the page
            // reveals itself anyway rather than staying blank forever.
            '#__nuxt{visibility:hidden;animation:fouc-reveal 0s linear 3s forwards}' +
            '@keyframes fouc-reveal{to{visibility:visible}}',
        },
      ],
      // With JS disabled nothing ever reveals the app, so do it unconditionally.
      noscript: [
        {
          innerHTML:
            '<style>#__nuxt{visibility:visible!important;animation:none!important}' +
            '[aria-label="Loading portfolio"]{display:none!important}</style>',
        },
      ],
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