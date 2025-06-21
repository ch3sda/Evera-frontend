<template>
  <div class="h-full p-6">
    <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-6">Manage Events</h1>

    <!-- Toolbar -->
    <div class="sm:flex gap-4 space-y-4 sm:space-y-0 mb-4 w-auto">
      <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div class="relative sm:w-1/4">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
         <input v-model="searchQuery" @input="filterEvents" type="search" placeholder="Search by title" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" />
        </div>
      
      <button @click="openCreateModal" class="block text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
        + Create Event
      </button>
    </div>

    <!-- Events Table -->
    <div class="relative overflow-x-auto">
      <table class="-full text-sm text-left text-gray-700 dark:text-gray-300">
        <thead class="text-xs uppercase bg-gray-100 dark:bg-gray-700">
          <tr>
            <th class="px-4 py-2">Title</th>
            <th class="px-4 py-2">Category</th>
            <th class="px-4 py-2">Description</th>
            <th class="px-4 py-2">Datetime</th>
            <th class="px-4 py-2">Price</th>
            <th class="px-4 py-2">Refundable</th>
            <th class="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="ev in filteredEvents"
            :key="ev.id"
            class="bg-white dark:bg-gray-800 border-b"
          >
            <td class="px-4 py-2">{{ ev.title }}</td>
            <td class="px-4 py-2">{{ ev.category?.name }}</td>
            <td class="px-4 py-2">{{ ev.description }}</td>
            <td class="px-4 py-2">{{ formatDate(ev.event_datetime) }}</td>
            <td class="px-4 py-2">${{ ev.price }}</td>
            <td class="px-4 py-2">
              <span :class="ev.is_refundable ? 'text-green-600' : 'text-red-600'">
                {{ ev.is_refundable ? 'Yes' : 'No' }}
              </span>
            </td>
            <td class="px-4 py-2 space-x-2">
              <button
                @click="() => editEvent(ev)"
                class="focus:outline-none text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
              >
                Edit
              </button>

              <button
                @click="() => openDeleteModal(ev)"
                class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"              >
                Delete
              </button>
            </td>
          </tr>
          <tr v-if="filteredEvents.length === 0">
            <td colspan="7" class="px-4 py-6 text-center text-gray-500">No events found.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Create Event Modal -->
    <div v-if="showCreateModal" class="fixed inset-0 z-50 flex justify-center items-center overflow-auto" @click.self="closeCreateModal">
      <div class="bg-white rounded-lg shadow p-6 max-w-md w-full dark:bg-gray-700">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            {{ editMode ? 'Edit Event' : 'Create Event' }}
          </h3>
            <button @click="closeCreateModal" class="text-gray-400 hover:text-gray-900 dark:hover:text-white" aria-label="Close create modal">
              ✕
            </button>
        </div>

        <form @submit.prevent="submitEvent" class="space-y-4">
          <!-- Title -->
          <div>
            <label
              class="block text-sm font-medium text-gray-900 dark:text-white"
              >Title</label
            >
            <input
              v-model="form.title"
              type="text"
              class="w-full px-3 py-2 text-gray-900 rounded border dark:bg-gray-600 dark:text-white"
              required
            />
          </div>

          <!-- Description -->
          <div>
            <label
              class="block text-sm font-medium text-gray-900 dark:text-white"
              >Description</label
            >
            <textarea
              v-model="form.description"
              rows="3"
              class="w-full px-3 py-2 text-gray-900 rounded border dark:bg-gray-600 dark:text-white"
              required
            ></textarea>
          </div>

          <!-- Category -->
          <div>
            <label
              class="block text-sm font-medium text-gray-900 dark:text-white"
              >Category</label
            >
            <select
              v-model="form.category_id"
              class="w-full px-3 py-2 text-gray-900 rounded border dark:bg-gray-600 dark:text-white"
              required
            >
              <option disabled value="">Select Category</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                {{ cat.name }}
              </option>
            </select>
          </div>

          <!-- Location + Date + Price -->
          <div class="flex gap-2">
            <div class="flex-1">
              <label
                class="block text-sm font-medium text-gray-900 dark:text-white"
                >Location</label
              >
              <input
                v-model="form.location"
                type="text"
                class="w-full px-3 py-2 rounded border dark:bg-gray-600 dark:text-white"
                required
              />
            </div>
            <div class="flex-1">
              <label
                class="block text-sm font-medium text-gray-900 dark:text-white"
                >Datetime</label
              >
              <input
                v-model="form.event_datetime"
                type="datetime-local"
                class="w-full px-3 py-2 rounded border dark:bg-gray-600 dark:text-white"
                required
              />
            </div>
          </div>

          <div class="flex gap-2">
            <div class="flex-1">
              <label
                class="block text-sm font-medium text-gray-900 dark:text-white"
                >Price</label
              >
              <input
                v-model="form.price"
                type="number"
                step="0.01"
                min="0"
                class="w-full px-3 py-2 rounded border dark:bg-gray-600 dark:text-white"
                required
              />
            </div>
            <div class="flex-1 flex items-center space-x-2 mt-6">
              <input
                v-model="form.is_refundable"
                type="checkbox"
                class="rounded border dark:bg-gray-600"
              />
              <label class="text-sm text-gray-900 dark:text-white">Refundable</label>
            </div>
          </div>

          <!-- Image -->
          <div>
            <label
              class="block text-sm font-medium text-gray-900 dark:text-white"
              >Image</label
            >
            <input
                type="file"
                accept="image/*"
                @change="e => form.image = e.target.files[0]"
            />
          </div>

          <!-- Actions -->
          <div class="flex justify-end gap-2 pt-4">
            <button
              type="button"
              @click="closeCreateModal"
              class="px-4 py-2 bg-gray-300 text-gray-900 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              {{ editMode ? 'Update' : 'Create' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 flex justify-center items-center"
      @click.self="closeDeleteModal"
    >
      <div class="bg-white dark:bg-gray-700 w-full max-w-sm rounded-lg shadow-lg p-6">
        <div class="mb-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Confirm Deletion
          </h3>
          <p class="mt-2 text-sm text-gray-700 dark:text-gray-300">
            Are you sure you want to delete <strong>{{ eventToDelete?.title }}</strong>? This
            action cannot be undone.
          </p>
        </div>
        <div class="flex justify-end gap-2 pt-2">
          <button
            @click="closeDeleteModal"
            class="px-4 py-2 bg-gray-300 text-gray-900 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            @click="confirmDelete"
            class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const toastRef = inject('toastRef')
const config = useRuntimeConfig()
const baseUrl = config.public.API_URL

const events = ref([])
const filteredEvents = ref([])
const categories = ref([])

const searchQuery = ref('')
const showCreateModal = ref(false)
const editMode = ref(false)
const selectedEventId = ref(null)

const showDeleteModal = ref(false)
const eventToDelete = ref(null)

const form = ref({
  title: '',
  description: '',
  category_id: '',
  location: '',
  event_datetime: '',
  price: '',
  is_refundable: false,
  image: null,
})

const formatDate = (str) => (str ? new Date(str).toLocaleString() : '')

const fetchEvents = async () => {
  try {
    const { data, error } = await useFetch(`${baseUrl}/api/organizer/events`, {
      headers: { Authorization: `Bearer ${auth.accessToken}` },
    })
    if (error.value) throw new Error(error.value.message)
    events.value = data.value || []
    filteredEvents.value = events.value
  } catch {
    toastRef?.value?.showToast('error', 'Failed to load events')
  }
}

const fetchCategories = async () => {
  try {
    const { data, error } = await useFetch(`${baseUrl}/api/organizer/categories`, {
      headers: { Authorization: `Bearer ${auth.accessToken}` },
    })
    if (error.value) throw new Error(error.value.message)
    categories.value = data.value || []
  } catch {
    toastRef?.value?.showToast('error', 'Failed to load categories')
  }
}

const filterEvents = () => {
  const q = searchQuery.value.trim().toLowerCase()
  filteredEvents.value = !q
    ? events.value
    : events.value.filter((ev) => ev.title.toLowerCase().includes(q))
}

const openCreateModal = () => {
  form.value = {
    title: '',
    description: '',
    category_id: '',
    location: '',
    event_datetime: '',
    price: '',
    is_refundable: false,
    image: null,
  }
  showCreateModal.value = true
  editMode.value = false
  selectedEventId.value = null
}

const closeCreateModal = () => {
  showCreateModal.value = false
  editMode.value = false
  selectedEventId.value = null
}

const editEvent = (ev) => {
  selectedEventId.value = ev.id
  form.value = {
    title: ev.title,
    description: ev.description,
    category_id: ev.category_id,
    location: ev.location,
    event_datetime: ev.event_datetime?.slice(0, 16),
    price: ev.price,
    is_refundable: !!ev.is_refundable,
    image: null,
  }
  editMode.value = true
  showCreateModal.value = true
}

const submitEvent = async () => {
  try {
    const eventDate = new Date(form.value.event_datetime)
    const now = new Date()
    if (isNaN(eventDate.getTime()) || eventDate < now) {
      toastRef?.value?.showToast('error', 'Event date/time must be in the future')
      return
    }
    const fd = new FormData()
    for (const [k, v] of Object.entries(form.value)) {
      if (v !== null && v !== '') {
        if (k === 'category_id') fd.append(k, parseInt(v))
        else if (k === 'is_refundable') fd.append(k, v ? 1 : 0)
        else fd.append(k, v)
      }
    }
    const url = editMode.value
      ? `${baseUrl}/api/organizer/events/${selectedEventId.value}`
      : `${baseUrl}/api/organizer/events`

    if (editMode.value) fd.append('_method', 'PUT')

    const { error } = await useFetch(url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${auth.accessToken}` },
      body: fd,
    })

    if (error.value) throw new Error(error.value.message)

    toastRef?.value?.showToast('success', editMode.value ? 'Event updated' : 'Event created')
    closeCreateModal()
    await fetchEvents()
  } catch (err) {
 
    let msg = editMode.value ? 'Failed to update event' : 'Failed to create event'
    if (err?.data?.errors) {
      msg = Object.values(err.data.errors).flat().join(', ')
    }
    toastRef?.value?.showToast('error', msg)
  }
}

const openDeleteModal = (ev) => {
  eventToDelete.value = ev
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  eventToDelete.value = null
}

const confirmDelete = async () => {
  if (!eventToDelete.value) return
  try {
    const { error } = await useFetch(`${baseUrl}/api/organizer/events/${eventToDelete.value.id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${auth.accessToken}` },
    })
    if (error.value) throw new Error(error.value.message)
    toastRef?.value?.showToast('success', 'Event deleted')
    closeDeleteModal()
    await fetchEvents()
  } catch (err) {
    console.error(err)
    toastRef?.value?.showToast('error', 'Failed to delete event')
  }
}

onMounted(() => {
  fetchCategories()
  fetchEvents()
})
</script>
