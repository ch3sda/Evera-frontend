export default defineNuxtPlugin(async () => {
  const auth = useAuthStore()

  auth.restoreAccessToken()

  if (auth.accessToken && !auth.user) {
    await auth.fetchUser()
  }
})
