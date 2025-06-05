<template>
    <div class="min-h-screen p-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
      <div>
        <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="p-6 rounded-xl shadow-md bg-white dark:bg-gray-800">
            <h3 class="text-lg font-semibold text-gray-700 dark:text-white mb-4">Total Users</h3>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">10,000</p>
          </div>
          <div class="p-6 rounded-xl shadow-md bg-white dark:bg-gray-800">
            <h3 class="text-lg font-semibold text-gray-700 dark:text-white mb-4">Total Organzer</h3>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">1000</p>
          </div>
          <div class="p-6 rounded-xl shadow-md bg-white dark:bg-gray-800">
            <h3 class="text-lg font-semibold text-gray-700 dark:text-white mb-4">Total Events</h3>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">200</p>
          </div>
          <div class="p-6 rounded-xl shadow-md bg-white dark:bg-gray-800">
            <h3 class="text-lg font-semibold text-gray-700 dark:text-white mb-4">Total Report Event</h3>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">50</p>
          </div>
        </div>
      </div>
      <!-- Line Chart for Purchases -->
      <div class="mt-4 p-6 rounded-xl shadow-md bg-white dark:bg-gray-800">
        <h2 class="text-xl font-semibold text-gray-700 dark:text-white mb-4">Monthly Purchase (Jan - Dec)</h2>
        <apexchart
          type="line"
          height="350"
          :options="chartOptions"
          :series="chartSeries"
        />
      </div>
    </div>
  </template>
  
  <script setup>
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

  