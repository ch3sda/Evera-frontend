<template>
  <div class="w-full h-screen flex items-center justify-center">
    <div>
      <div class="flex items-center justify-center">
        <p class="text-3xl font-semibold text-gray-900 dark:text-white mt-16 mb-8">
          Welcome back to Evera
        </p>
      </div>
      <div
        class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700"
      >
        <form @submit.prevent="handleLogin" class="space-y-6" action="#">
          <h5 class="text-xl font-medium text-gray-900 dark:text-white">
            Login to <span class="text-green-600 dark:text-green-500">Evera</span>
          </h5>
          <div>
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Your email</label
            >
            <input
              type="email"
              v-model="email"
              id="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Your password</label
            >
            <input
              type="password"
              v-model="password"
              id="password"
              placeholder="••••••••"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>
          <div class="flex items-start">
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  v-model="rememberMe"
                  class="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-green-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-green-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                />
              </div>
              <label
                for="remember"
                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >Remember me</label
              >
            </div>
            <a
              href="#"
              class="ms-auto text-sm text-green-700 hover:underline dark:text-yellow-500"
              >Lost Password?</a
            >
          </div>
          <button
            type="submit"
            class="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Login to your account
          </button>
          <div class="inline-flex items-center justify-center w-full">
            <hr
              class="w-64 h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"
            />
            <span
              class="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-800"
              >or</span
            >
          </div>
          <div class="grid grid-cols-1">
            <!-- Facebook -->
            <button
              type="button"
              class="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2"
            >
              <svg
                class="w-4 h-4 me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 8 19"
              >
                <path
                  fill-rule="evenodd"
                  d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                  clip-rule="evenodd"
                />
              </svg>
              Login with Facebook
            </button>
            <!-- Google -->
            <button
              type="button"
              class="text-white bg-[#ff3526] hover:bg-[#ff3b2d]/90 focus:ring-4 focus:outline-none focus:ring-[#ff3b2d]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#ff3b2d]/55 me-2 mb-2"
            >
              <svg
                class="w-4 h-4 me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 19"
              >
                <path
                  fill-rule="evenodd"
                  d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                  clip-rule="evenodd"
                />
              </svg>
              Login with Google
            </button>
          </div>
          <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered?
            <NuxtLink
              to="/auth/register"
              class="text-green-700 hover:underline dark:text-green-500"
              >Create account</NuxtLink
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, inject } from 'vue'
import type { Ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

type ToastRef = {
  showToast: (type: string, message: string) => void
}

const toastRef = inject<Ref<ToastRef> | null>('toastRef', null)

const email = ref('')
const password = ref('')
const rememberMe = ref(false)

const router = useRouter()
const auth = useAuthStore()

async function handleLogin() {
  try {
    await auth.login({
      email: email.value,
      password: password.value,
      remember: rememberMe.value
    })

    await auth.fetchUser()
    router.push('/dashboard')
    toastRef?.value?.showToast('success', 'Login successful!')
  } catch (err: any) {
    console.error('Login error:', err)

    // Always show generic error
    toastRef?.value?.showToast('error', 'Email or password is not valid')
  }
}
</script>

