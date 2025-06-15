// plugins/initAuth.ts
export default defineNuxtPlugin(async () => {
  const auth = useAuthStore()

  auth.loadFromStorage()

  if (auth.accessToken && !auth.user) {
    await auth.fetchUser()
  }
})
