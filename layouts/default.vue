<template>
    <ColorScheme class="h-full bg-white dark:bg-gray-900">
    <div class="h-full bg-white dark:bg-gray-900">
        <CommonNavbar />
        <div class="h-full p-4 sm:ml-64 ">
            <div class="h-full p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                <Toast ref="toastRef" />
                <slot />
            </div>
        </div>
        
        <CommonBottomNavigation class="sm:hidden"/>
    </div>
    </ColorScheme>
</template>

<script setup>
import { onMounted , provide , ref} from 'vue'
import { useFlowbite } from '~/composables/useFlowbite';
import { useAuthStore } from '@/stores/auth'
import Toast from '@/components/element/Toast.vue'

const auth = useAuthStore()

  // initialize components based on data attribute selectors
  onMounted(() => {
      auth.loadFromStorage()
      useFlowbite(() => {
          initFlowbite();
      })
  })

const toastRef = ref()
provide('toastRef', toastRef)

function triggerSuccess() {
  toastRef.value.showToast('success', 'Successfully submitted!')
}

function triggerError() {
  toastRef.value.showToast('error', 'Failed to delete item!')
}

function triggerWarning() {
  toastRef.value.showToast('warning', 'Weak password, try a stronger one!')
}
</script>