<template>
  <div class="h-full p-6">
    <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-4">Organizer Requests</h2>

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
      <select v-model="filterStatus" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500">
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
        <option value="rejected">Removed</option>
      </select>
      
    </div>
    <div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left text-gray-700 dark:text-gray-300">
      <thead class="text-xs uppercase bg-gray-100 dark:bg-gray-700">
        <tr>
          <th class="px-4 py-2">Request ID</th>
          <th class="px-4 py-2">Name</th>
          <th class="px-4 py-2">Attendee ID</th>
          <th class="px-4 py-2">Email</th>
          <th class="px-4 py-2">Phone</th>
          <th class="px-4 py-2">Reason</th>
          <th class="px-4 py-2">Attempts</th>
          <th class="px-4 py-2">Created</th>
          <th class="px-4 py-2">Status</th>
          <th class="px-4 py-2">Actions</th>
        </tr>
      </thead>
  <tbody v-if="filteredRequests.length > 0">
    <tr v-for="req in filteredRequests" :key="req.id" class="bg-white border-b dark:bg-gray-800">
      <td class="px-4 py-2">{{ req.id }}</td>
      <td class="px-4 py-2">{{ req.user?.last_name }} {{ req.user?.first_name }}</td>
      <td class="px-4 py-2">{{ req.user?.id }}</td>
      <td class="px-4 py-2">{{ req.user?.email }}</td>
      <td class="px-4 py-2">{{ req.user?.phonenumber }}</td>
      <td class="px-4 py-2">{{ req.reason }}</td>
      <td class="px-4 py-2">{{ req.request_attempt }}</td>
      <td class="px-4 py-2">{{ formatDate(req.created_at) }}</td>
      <td class="px-4 py-2">
        <span
          :class="{
            'text-yellow-700 bg-yellow-200': req.status === 'pending',
            'text-green-700 bg-green-200': req.status === 'approved',
            'text-red-700 bg-red-200': req.status === 'rejected',
            'text-red-700 bg-red-200': req.status === 'removed',
          }"
          class="px-2 py-1 rounded text-xs font-semibold"
        >
          {{ req.status }}
        </span>
      </td>
      <td v-if="req.status === 'approved'" class="px-4 py-2 space-x-2">
        <button @click="updateRequest(req.user_id, 'removed')" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Remove</button>
      </td>
      <td v-else class="px-4 py-2 space-x-2">        
        <button @click="updateRequest(req.user_id, 'approved')" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Approve</button>
        <button @click="updateRequest(req.user_id, 'rejected')" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Reject</button>      
      </td> 
    </tr>
  </tbody>

  <!-- Show this if no requests found -->
  <tbody v-else>
    <tr>
      <td colspan="10" class="text-center py-6 text-gray-500 dark:text-gray-400">
        No organizer requests found.
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
