
<template>
  <div class=" dark:bg-gray-900 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">
    
    <CommonGuestNavbar />
    <div class="h-full lg:py-8 py-14">
      <Toast ref="toastRef" class="mt-16" />
     <slot />
    </div>
    <CommonFooterSection />
  </div>
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