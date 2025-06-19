<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
auth.loadFromStorage()

const events = ref([])
const loading = ref(false)
const error = ref(null)

const config = useRuntimeConfig()
const baseUrl = config.public.API_URL

const fetchEvents = async () => {
  if (!auth.accessToken) {
    error.value = 'Not authenticated'
    return
  }

  loading.value = true
  error.value = null

  const { data, error: fetchError } = await useFetch(`${baseUrl}/api/events`, {
    headers: {
      Authorization: `Bearer ${auth.accessToken}`
    },
    // Optional: set method if needed
    // method: 'GET',
  })

  if (fetchError.value) {
    error.value = fetchError.value.message || 'Failed to fetch events'
    loading.value = false
    return
  }

  events.value = data.value || []
  loading.value = false
}

onMounted(fetchEvents)
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8 text-center">Upcoming Events</h1>

    <div v-if="loading" class="text-center text-gray-500">Loading events...</div>
    <div v-if="error" class="text-center text-red-600">{{ error }}</div>
    <div v-if="!loading && events.length === 0" class="text-center text-gray-600">No events found.</div>

    <div
      v-if="events.length > 0"
      class="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <div
        v-for="event in events"
        :key="event.id"
        class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
      >
        <div class="h-48 overflow-hidden rounded-t-lg bg-gray-100 flex items-center justify-center">
          <img
            v-if="event.image_url"
            :src="event.image_url"
            alt="Event image"
            class="object-cover w-full h-full"
          />
          <div v-else class="text-gray-400 italic">No image available</div>
        </div>

        <div class="p-4 flex flex-col flex-grow">
          <h2 class="text-xl font-semibold mb-1 truncate" :title="event.title">{{ event.title }}</h2>
          <p class="text-sm text-gray-500 mb-2">{{ event.category || 'Uncategorized' }}</p>
          <p class="text-gray-700 flex-grow">{{ event.description || 'No description provided.' }}</p>

          <div class="mt-4 flex flex-col space-y-1 text-gray-600 text-sm">
            <div><strong>Date:</strong> {{ new Date(event.event_datetime).toLocaleString() }}</div>
            <div><strong>Location:</strong> {{ event.location }}</div>
            <div><strong>Price:</strong> ${{ event.price.toFixed(2) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
