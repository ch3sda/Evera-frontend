// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  vite: {
    optimizeDeps: {
      include: ['flowbite']
    }
  },
  tailwindcss: {
    configPath: 'tailwind.config.ts'
  },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/google-fonts',
    '@nuxt/ui',
    '@formkit/auto-animate',
    '@nuxtjs/tailwindcss'
  ]
})