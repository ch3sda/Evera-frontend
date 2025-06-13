<template>
  <div class="h-full p-6">
    <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-4">Crud Event Category</h2>

    <!-- Filters -->

    <div class="sm:flex gap-4 space-y-4 sm:space-y-0 mb-4 w-auto">
      <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
      <div class="relative sm:w-1/4">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
          </div>
          <input v-model="searchEmail" type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Search by " required />
      </div>      
    </div>
    <div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left text-gray-700 dark:text-gray-300">
      <thead class="text-xs uppercase bg-gray-100 dark:bg-gray-700">
        <tr>
            <th class="px-4 py-2">Category ID</th>
            <th class="px-4 py-2">Name</th>
            <th class="px-4 py-2">Create At</th>
            <th class="px-4 py-2">Total Used</th>
            <th class="px-4 py-2">Currenlt Used</th>
            <th class="px-4 py-2">Action</th>
        </tr>
      </thead>
  <tbody >
    <tr class="bg-white border-b dark:bg-gray-800">
      <td class="px-4 py-2">1</td>
      <td class="px-4 py-2">Education</td>
      <td class="px-4 py-2">2025</td>
      <td class="px-4 py-2">1000</td>
      <td class="px-4 py-2">100</td>
      <td class="px-4 py-2 space-x-2">        
        <button class="focus:outline-none text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800">Approve</button>
        <button class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Reject</button>      
      </td> 
    </tr>
  </tbody>

    </table>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { inject } from 'vue'

const toastRef = inject('toastRef')
const auth = useAuthStore()
auth.loadFromStorage()

const requests = ref([])
const filterStatus = ref('pending')
const config = useRuntimeConfig()
const baseUrl = config.public.API_URL
const searchEmail = ref('')

const fetchRequests = async () => {
  if (!auth.accessToken) return

  const { data, error } = await useFetch(`${baseUrl}/api/admin/organizer-requests`, {
    headers: {
      Authorization: `Bearer ${auth.accessToken}`
    }
  })
  if (error.value) return console.error(error.value)
  requests.value = data.value
}

const updateRequest = async (userId, status) => {
  if (!auth.accessToken) return

  const { error } = await useFetch(`${baseUrl}/api/admin/organizer-requests`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${auth.accessToken}`
    },
    body: {
      user_id: userId,
      status
    }
  })

  if (!error.value) {
    toastRef?.value?.showToast('success', `Request ${status} successfully.`)
    fetchRequests()
  } else {
    toastRef?.value?.showToast('error', 'Failed to update request.')
  }
}

const filteredRequests = computed(() => {
  return requests.value.filter(req => {
    const matchesStatus = filterStatus.value ? req.status === filterStatus.value : true
    const matchesEmail = searchEmail.value
      ? req.user?.email.toLowerCase().includes(searchEmail.value.toLowerCase())
      : true
    return matchesStatus && matchesEmail
  })
})

const formatDate = (str) => {
  const d = new Date(str)
  return isNaN(d) ? '—' : d.toLocaleString()
}

onMounted(fetchRequests)
</script>
