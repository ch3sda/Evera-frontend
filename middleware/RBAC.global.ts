export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore()

  if (process.client && !auth.accessToken) {
    auth.loadFromStorage()
  }

  const isPublicPage = [
    '/auth/login', 
    '/auth/register', 
    '/auth/verify', 
    '/contact',
    '/about',
    '/service',
    '/'].includes(to.path)
  const isDashboard = to.path.startsWith('/dashboard')
  const isManagement = to.path.startsWith('/management')
  const isAdmin = [
    '/management/category',
    '/management/user', 
    '/management/approval',
    '/management/payment',
  ].includes(to.path)

  // ✅ Redirect authenticated users away from auth pages
  if (auth.accessToken && isPublicPage) {
    if (auth.user?.role === 'attendee') {
      return navigateTo('/home')
    } else {
      return navigateTo('/dashboard')
    }
  }

  // ❌ Block attendees from accessing /dashboard or /management directly
  if (auth.user?.role === 'attendee' && (isDashboard || isManagement)) {
    return navigateTo('/home')
  }
  if (!auth.accessToken && !isPublicPage) {
    return navigateTo('/auth/login')
  }
  // ✅ Let everything else through (guests, organizers, admins)

  // ❌ Restrict only admin can access isAdmin Pages
  if(auth.user?.role !== 'admin' && isAdmin){
    return navigateTo('/dashboard')
  }

})
