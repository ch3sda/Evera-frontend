<template>
    <div class="min-h-screen p-6">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-6">Search</h1>
      <p v-if="user">Welcome back, {{ user.first_name }}!</p>
        <pre>{{ user }}</pre>

    </div>
  </template>
  
<script setup>
import { onMounted, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const user = computed(() => auth.user)

onMounted(async () => {
  if (!auth.user && localStorage.getItem('accessToken')) {
    auth.accessToken = localStorage.getItem('accessToken')
    await auth.fetchUser()
  }
})
</script>

  