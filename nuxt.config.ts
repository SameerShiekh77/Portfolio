export default defineNuxtConfig({
  compatibilityDate: '2025-10-06',
  devtools: { enabled: true },
  
  // Add this section
  devServer: {
    host: '0.0.0.0', // Listen on all network interfaces
    port: 3000
  },
  
  vite: {
    server: {
      hmr: {
        clientPort: 443, // Use HTTPS port for ngrok
      }
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
      title: 'DevOps Manager | Full Stack Developer',
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