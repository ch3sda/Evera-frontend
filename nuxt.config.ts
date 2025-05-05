// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:8000', // Laravel
    }
  },
  vite: {
    optimizeDeps: {
      include: ['flowbite']
    }
  },
  css: ['~/assets/css/tailwind.css'],
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/google-fonts',
    '@nuxt/ui',
    '@formkit/auto-animate'
  ]
})