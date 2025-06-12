<template>
  <div class="p-6">
    <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-4">Organizer Requests</h2>

    <!-- Filters -->
    <div class="flex gap-4 mb-4">
      <select v-model="filterStatus" class="p-2 border rounded">
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </select>
    </div>

    <table class="w-full table-auto text-sm text-left text-gray-700 dark:text-gray-300">
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
      <tbody>
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
              }"
              class="px-2 py-1 rounded text-xs font-semibold"
            >
              {{ req.status }}
            </span>
          </td>
          <td class="px-4 py-2 space-x-2">
            <button @click="updateRequest(req.user_id, 'approved')" class="bg-green-600 text-white px-2 py-1 rounded">Approve</button>
            <button @click="updateRequest(req.user_id, 'rejected')" class="bg-red-600 text-white px-2 py-1 rounded">Reject</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const requests = ref([])
const filterStatus = ref('')
const token = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken')
  const config = useRuntimeConfig()
  const baseUrl = config.public.API_URL
  
  
const fetchRequests = async () => {
  const { data, error } = await useFetch(`${baseUrl}/api/admin/organizer-requests`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  if (error.value) return console.error(error.value)
  requests.value = data.value
}

const updateRequest = async (userId, status) => {
  const { error } = await useFetch(`${baseUrl}/api/admin/organizer-requests`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: {
      user_id: userId,
      status
    }
  })
  if (!error.value) fetchRequests()
}

const filteredRequests = computed(() => {
  return filterStatus.value
    ? requests.value.filter(r => r.status === filterStatus.value)
    : requests.value
})

const formatDate = (str) => {
  const d = new Date(str)
  return isNaN(d) ? '—' : d.toLocaleString()
}

onMounted(fetchRequests)
</script>
