import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)

  const isAuthenticated = computed(() => !!user.value)
  const role = computed(() => user.value?.role || null)

  function setUser(userData) {
    user.value = userData
  }

  function logout() {
    user.value = null
  }

  return { user, isAuthenticated, role, setUser, logout }
})
