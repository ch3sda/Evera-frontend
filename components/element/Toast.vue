<!-- components/Toast.vue -->
<template>
  <Transition name="fade">
    <div
      v-if="visible"
      :class="toastClass"
      class="flex items-center w-full max-w-xs p-4 mb-4 text-sm rounded-lg shadow-sm"
      role="alert"
    >
      <div :class="iconClass" class="inline-flex items-center justify-center w-8 h-8 rounded-lg">
        <component :is="iconComponent" class="w-5 h-5" />
      </div>
      <div class="ms-3 font-normal">{{ message }}</div>
      <button
        type="button"
        @click="hide"
        class="ms-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex items-center justify-center h-8 w-8"
      >
        <svg class="w-3 h-3" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
        </svg>
      </button>
    </div>
  </Transition>
</template>

<script setup>
import { ref } from 'vue'
import { CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/solid'

const visible = ref(false)
const message = ref('')
const type = ref('success') // or 'error' or 'warning'

const iconMap = {
  success: CheckCircleIcon,
  error: XCircleIcon,
  warning: ExclamationTriangleIcon
}

const toastClassMap = {
  success: 'bg-white text-green-500 dark:bg-green-800 dark:text-green-200',
  error: 'bg-white text-red-500 dark:bg-red-800 dark:text-red-200',
  warning: 'bg-white text-orange-500 dark:bg-orange-700 dark:text-orange-200'
}

const iconBgMap = {
  success: 'bg-green-100 dark:bg-green-800',
  error: 'bg-red-100 dark:bg-red-800',
  warning: 'bg-orange-100 dark:bg-orange-700'
}

const toastClass = computed(() => toastClassMap[type.value])
const iconClass = computed(() => iconBgMap[type.value])
const iconComponent = computed(() => iconMap[type.value])

function showToast(t, msg) {
  type.value = t
  message.value = msg
  visible.value = true
  setTimeout(hide, 3000)
}

function hide() {
  visible.value = false
}

// Expose for external use
defineExpose({ showToast })
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
