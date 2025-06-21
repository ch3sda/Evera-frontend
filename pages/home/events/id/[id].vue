<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const eventId = route.params.id

const auth = useAuthStore()
auth.loadFromStorage()

const event = ref(null)
const loading = ref(true)
const error = ref(null)

const config = useRuntimeConfig()
const baseUrl = config.public.API_URL

const fetchEvent = async () => {
  if (!auth.accessToken) {
    error.value = 'Not authenticated'
    loading.value = false
    return
  }

  const { data, error: fetchError } = await useFetch(`${baseUrl}/api/events/${eventId}`, {
    headers: {
      Authorization: `Bearer ${auth.accessToken}`
    },
  })

  if (fetchError.value) {
    error.value = fetchError.value.message || 'Failed to fetch event details'
  } else {
    event.value = data.value
  }

  loading.value = false
}

const goToCheckout = () => {
  router.push(`/checkout/events/id/${eventId}`)
}

onMounted(fetchEvent)
</script>

<template>
  <section class="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
    <div class="max-w-screen-xl px-4 mx-auto 2xl:px-0">
      <div v-if="loading" class="text-center text-gray-500">Loading event...</div>
      <div v-if="error" class="text-center text-red-600">{{ error }}</div>

      <div v-if="event" class="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
        <!-- Image -->
        <div class="shrink-0 max-w-md lg:max-w-lg mx-auto">
          <img v-if="event.image_url" class="w-full" :src="event.image_url" alt="Event Image" />
          <div v-else class="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-400 italic">No image available</div>
        </div>

        <!-- Content -->
        <div class="mt-6 sm:mt-8 lg:mt-0">
          <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
            {{ event.title }}
          </h1>

          <div class="mt-4 sm:items-center sm:gap-4 sm:flex">
            <p class="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
              ${{ event.price.toFixed(2) }}
            </p>
          </div>

          <div class="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
            <button
              @click="goToCheckout"
              class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800 flex items-center justify-center"
              role="button"
            >
              Buy Ticket
            </button>
          </div>

          <hr class="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

          <p class="mb-6 text-gray-500 dark:text-gray-400">
            {{ event.description || 'No description available.' }}
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
            <div><strong>Date:</strong> {{ new Date(event.event_datetime).toLocaleString() }}</div>
            <div><strong>Location:</strong> {{ event.location }}</div>
            <div><strong>Category:</strong> {{ event.category || 'Uncategorized' }}</div>
            <div><strong>Organizer:</strong> {{ event.created_by?.name || 'Organizer' }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>
