// stores/user.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)

  const role = computed(() => user.value?.role || null)
  const isAuthenticated = computed(() => !!user.value)

  function setUser(userData) {
    user.value = userData
  }

  function logout() {
    user.value = null
  }

  return { user, role, isAuthenticated, setUser, logout }
})
