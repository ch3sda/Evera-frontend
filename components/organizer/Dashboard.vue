<template>
  <div class="min-h-screen p-6">
    <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-6">Dashboard</h1>
    <p v-if="user">Welcome back, {{ user.first_name }}!</p>
    <pre>{{ user }}</pre>

    <div class="space-y-6">
      <div class="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
        <div class="p-6 rounded-xl shadow-md bg-white dark:bg-gray-800">
          <h3 class="text-lg font-semibold text-gray-700 dark:text-white mb-4">Total Event</h3>
          <p class="text-2xl font-bold text-gray-900 dark:text-white">100</p>
        </div>
        <div class="row-start-2 p-6 rounded-xl shadow-md bg-white dark:bg-gray-800">
          <h3 class="text-lg font-semibold text-gray-700 dark:text-white mb-4">Active Event</h3>
          <p class="text-2xl font-bold text-gray-900 dark:text-white">43</p>
        </div>
        <div class="row-span-2 p-6 rounded-xl shadow-md bg-white dark:bg-gray-800">
          <h3 class="text-lg font-semibold text-gray-700 dark:text-white mb-4">Pending Purchase Ticket</h3>
          <apexchart width="270" height="200" type="donut" :options="donutOptions" :series="donutSeries" />
        </div>
      </div>

      <div class="p-6 rounded-xl shadow-md bg-white dark:bg-gray-800">
        <h2 class="text-xl font-semibold text-gray-700 dark:text-white mb-4">Total Purchase (Jan - Dec)</h2>
        <apexchart type="line" height="350" :options="chartOptions" :series="chartSeries" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const user = computed(() => auth.user)

onMounted(() => {
  auth.loadFromStorage()
})

// Chart data
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
  title: {
    style: {
      fontSize: '20px',
      color: '#1f2937'
    }
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
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    labels: {
      style: {
        colors: '#1f2937'
      }
    }
  },
  yaxis: {
    title: {
      text: 'Purchases',
      style: {
        color: '#1f2937'
      }
    },
    labels: {
      style: {
        colors: '#1f2937'
      }
    }
  },
  legend: {
    labels: {
      useSeriesColors: false
    }
  },
  colors: ['#4f46e5'],
  tooltip: {
    theme: 'dark'
  }
}

const donutSeries = [44, 55, 41]

const donutOptions = {
  chart: {
    type: 'donut'
  },
  labels: ['Pending', 'Confirmed', 'Refunded'],
  legend: {
    labels: {
      useSeriesColors: false
    },
    position: 'bottom'
  },
  tooltip: {
    theme: 'dark'
  }
}
</script>

<style scoped>
/* Apply white outline to chart text */
:deep(.apexcharts-text),
:deep(.apexcharts-title-text),
:deep(.apexcharts-legend-text),
:deep(.apexcharts-xaxis-label),
:deep(.apexcharts-yaxis-label),
:deep(.apexcharts-legend-series text) {
  fill: #1f2937 !important; /* Gray-800 text color */
  text-shadow:
    -1px -1px 0 white,
     1px -1px 0 white,
    -1px 1px 0 white,
     1px 1px 0 white;
}
</style>
