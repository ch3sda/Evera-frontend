// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  
  runtimeConfig: {
    API_URL: 'http://localhost:8000', // Laravel
    public: {
      API_URL: 'http://localhost:8000', // Laravel
    }
  },
  plugins: ['~/plugins/stripe.js'],
  vite: {
    optimizeDeps: {
      include: ['flowbite']
    }
  },
  tailwindcss: {
    configPath: 'tailwind.config.ts',
    cssPath: '~/assets/css/input.css',
    exposeConfig: false,
    config: {},
    injectPosition: 0,
    viewer: true,
  },
  modules: [
    '@pinia/nuxt',
    '@nuxt/ui',
    '@formkit/auto-animate',
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@nuxtjs/color-mode',
  ],
  colorMode: {
    classSuffix: '',
    classPrefix: '',
    preference: 'system',
    fallback: 'light',
    storageKey: 'color-theme'
  },
  
})