export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore()
    console.log("Middleware is actived")

  // Redirect guest from protected route
  if (!auth.accessToken) {
    if ( to.path === '/dashboard') {
      return navigateTo('/auth/login')
    }
  }

  // Redirect logged-in user away from public pages
  if (auth.accessToken) {
    if (to.path === '/' || to.path === '/auth/login' || to.path === '/auth/register' || to.path === '/auth/verify') {
      return navigateTo('/dashboard')
    }
  }

})
