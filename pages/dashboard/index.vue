<!-- pages/dashboard.vue -->
<template>
  <div>
    <OrganizerDashboard v-if="role === 'organizer'" />
    <AdminDashboard v-else-if="role === 'admin'" />
    <div v-else>Unauthorized or unknown role</div>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()
const role = computed(() => auth.user?.role)
</script>
