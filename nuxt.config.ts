// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  
  runtimeConfig: {
    API_URL: 'http://127.0.0.1:8000', // Laravel
    public: {
      API_URL: 'http://127.0.0.1:8000', // Laravel
    }
  },
  sanctum: {
    baseUrl: 'http://127.0.0.1:8000', // Laravel backend URL
    // Optional:
    // csrfEndpoint: '/sanctum/csrf-cookie',
    // loginEndpoint: '/api/login',
    // userEndpoint: '/api/user',
    // logoutEndpoint: '/api/logout'
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
    '@nuxtjs/google-fonts',
    '@nuxt/ui',
    '@formkit/auto-animate',
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@nuxtjs/color-mode',
    'nuxt-auth-sanctum',
  ],
  colorMode: {
    classSuffix: '',
    classPrefix: '',
    preference: 'system',
    fallback: 'light',
    storageKey: 'color-theme'
  },

})