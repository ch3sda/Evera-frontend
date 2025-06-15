<template>
    <div class="h-full p-6">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-6">Admin Dashboard</h1>
      <div class="space-y-6">
        <!-- User stats -->
        <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="p-6 rounded-xl shadow-md bg-white dark:bg-gray-800">
              <h3 class="text-lg font-semibold text-gray-700 dark:text-white mb-4">Total Users</h3>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.total }}</p>
            </div>
            <div class="p-6 rounded-xl shadow-md bg-white dark:bg-gray-800">
              <h3 class="text-lg font-semibold text-gray-700 dark:text-white mb-4">Total Admin</h3>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.admin }}</p>
            </div>
            <div class="p-6 rounded-xl shadow-md bg-white dark:bg-gray-800">
              <h3 class="text-lg font-semibold text-gray-700 dark:text-white mb-4">Total Organizer</h3>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.organizer }}</p>
            </div>
            <div class="p-6 rounded-xl shadow-md bg-white dark:bg-gray-800">
              <h3 class="text-lg font-semibold text-gray-700 dark:text-white mb-4">Total Attendee</h3>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.attendee }}</p>
            </div>
        </div>
        <!-- Event Stats -->
        <div class="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
            <div class="p-6 rounded-xl shadow-md bg-white dark:bg-gray-800">
              <h3 class="text-lg font-semibold text-gray-700 dark:text-white mb-4">Total Events</h3>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">200</p>
            </div>
            <div class="p-6 rounded-xl shadow-md bg-white dark:bg-gray-800">
              <h3 class="text-lg font-semibold text-gray-700 dark:text-white mb-4">Total Report Event</h3>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">50</p>
            </div>
        </div>
        <!-- Line Chart for Purchases -->
        <div class="p-6 rounded-xl shadow-md bg-white dark:bg-gray-800">
          <h2 class="text-xl font-semibold text-gray-700 dark:text-white mb-4">Monthly Purchase (Jan - Dec)</h2>
          <apexchart
            type="line"
            height="350"
            :options="chartOptions"
            :series="chartSeries"
          />
        </div>
        
      </div>
    </div>
  </template>
  
  <script setup>
  const config = useRuntimeConfig()
  const baseUrl = config.public.API_URL
  import { useAuthStore } from '@/stores/auth'
  const auth = useAuthStore()
  const token = computed(() => auth.accessToken)
  
const stats = ref({
  total: 0,
  attendee: 0,
  organizer: 0,
  admin: 0,
})

const { data, error } = await useFetch(`${baseUrl}/api/admin/user-stats`, {
  headers: {
    Authorization: `Bearer ${token.value}`
  },
});

if (data.value) {
  stats.value = data.value
}

  const chartSeries = [
    {
      name: 'Purchases',
      data: [10, 25, 35, 50, 45, 60, 70, 80, 65, 75, 90, 100]
    }
  ]
  
  const chartOptions = {
    chart: {
      id: 'purchase-line'
    },
    stroke: {
      curve: 'smooth',
      width: 3
    },
    markers: {
      size: 5,
      colors: ['#4f46e5'],
      strokeWidth: 2
    },
    xaxis: {
      categories: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ],    
    color: '#FFFFFF',
    },
    colors: ['#4f46e5'],
    yaxis: {
      title: {  
        text: 'Purchases'
      }
    },
    tooltip: {
      theme: 'dark'
    }
  }
  </script>

  