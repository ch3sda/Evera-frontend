<script setup>
import { ref, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const toastRef = inject('toastRef')
const router = useRouter()
const route = useRoute()
const config = useRuntimeConfig()
const baseUrl = config.public.API_URL

const auth = useAuthStore()
    definePageMeta({
        layout: 'landing',
    })
// State
const email = route.query.email || ''
const otp = ref('')
const verifying = ref(false)
const error = ref('')

// Verify OTP
const verifyOtp = async () => {
  verifying.value = true
  error.value = ''

  try {
    const { data, error: err } = await useFetch(`${baseUrl}/api/verify-otp`, {
      method: 'POST',
      body: {
        email,
        otp_code: otp.value,
      },
      headers: {
        // optional: add auth if your endpoint needs it
        // Authorization: `Bearer ${auth.accessToken}`,
      },
    })

    if (err.value) throw new Error(err.value?.data?.message || 'Verification failed')

    toastRef?.value?.showToast('success', 'OTP Verified! Redirecting...')
    router.push('/auth/login')
  } catch (e) {
    error.value = e.message
    toastRef?.value?.showToast('error', e.message)
  } finally {
    verifying.value = false
  }
}

// Resend OTP
const resendOtp = async () => {
  try {
    const { error: err } = await useFetch(`${baseUrl}/api/resend-otp`, {
      method: 'POST',
      body: { email },
    })

    if (err.value) throw new Error(err.value?.data?.message || 'Failed to resend OTP')
    toastRef?.value?.showToast('success', 'OTP resent to your email')
  } catch (e) {
    toastRef?.value?.showToast('error', e.message)
  }
}
</script>

<template>
  <div class="w-full h-screen flex items-center justify-center">
    <div class="w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
<form class="space-y-6" @submit.prevent="verifyOtp">
  <h5 class="text-xl font-medium text-gray-900 dark:text-white">
    OTP was sent to
    <span class="text-green-600 dark:text-green-500">{{ email }}</span>
  </h5>

  <div>
    <label for="otp" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter OTP Code</label>
    <input
      v-model="otp"
      type="text"
      name="otp"
      id="otp"
      placeholder="123456"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
      required
    />
  </div>

  <div v-if="error" class="text-red-500 text-sm">{{ error }}</div>

  <div class="flex items-start">
    <a @click.prevent="resendOtp" class="ms-auto text-sm text-green-700 hover:underline dark:text-yellow-500 cursor-pointer">Resend Code</a>
  </div>

  <button
    type="submit"
    class="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
    :disabled="verifying"
  >
    {{ verifying ? 'Verifying...' : 'Verify' }}
  </button>
</form>

    </div>
  </div>
</template>