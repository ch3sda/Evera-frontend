export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  const api = $fetch.create({
    baseURL: config.public.apiBase, // e.g., http://localhost:8000
    credentials: 'include', // Important for cookies (CSRF/Sanctum)
    headers: {
      Accept: 'application/json',
    },
  })

  return {
    provide: {
      api,
    },
  }
})
