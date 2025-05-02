import { useUserStore } from '@/stores/user'

export default defineNuxtRouteMiddleware((to) => {
  const userStore = useUserStore()

  const requiredRoles = to.meta.roles
  const userRole = userStore.role

  if (requiredRoles && !userStore.isAuthenticated) {
    return navigateTo('/login')
  }

  if (requiredRoles && !requiredRoles.includes(userRole)) {
    return navigateTo('/unauthorized')
  }
})
