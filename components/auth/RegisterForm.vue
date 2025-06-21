<template>
    <div class="w-full h-screen flex items-center justify-center">
        <div>
            <div class="flex items-center justify-center">
                <p class="text-3xl font-semibold text-gray-900 dark:text-white mt-16 mb-8">Create an Account</p>
            </div>
            <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form @submit.prevent="handleRegister">
                    <h5 class="mb-6 text-xl font-medium text-gray-900 dark:text-white">Create <span class="text-green-600 dark:text-green-500">Evera</span>'s Account</h5>
                    <div class="grid gap-6 mb-6 md:grid-cols-2">
                        <div>
                            <label  for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                            <input v-model="form.first_name" type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Cannvanny" required />
                                <p v-if="errors.first_name" class="text-red-500">{{ errors.first_name }}</p>

                        </div>
                        <div>
                            <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                            <input v-model="form.last_name" type="text" id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Lann" required />
                                <p v-if="errors.last_name" class="text-red-500">{{ errors.last_name }}</p>

                        </div>
                    </div>  
                    <div class="mb-6">
                        <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                        <input v-model="form.phone" type="tel" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="123-45-678" required />
                        <p v-if="errors.phone" class="text-red-500">{{ errors.phone }}</p>

                    </div>
                    <div class="mb-6">
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                        <input v-model="form.email" type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="lannchannvanny@gmail.com" required />
                            <p v-if="errors.email" class="text-red-500">{{ errors.email }}</p>

                    </div> 
                    <div class="mb-6">
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input v-model="form.password" type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="•••••••••" required />
                                             <p v-if="errors.password" class="text-red-500">{{ errors.password }}</p>
       
                    </div> 
                    <div class="mb-6">
                        <label for="confirm_password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                        <input v-model="form.password_confirmation" type="password" id="confirm_password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="•••••••••" required />
    <p v-if="errors.password_confirmation" class="text-red-500">{{ errors.password_confirmation }}</p>

                    </div> 
                    <div class="flex items-start mb-6">
                        <div class="flex items-center h-5">
                        <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-green-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-green-600 dark:ring-offset-gray-800" required />
                        </div>
                        <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" class="text-green-600 hover:underline dark:text-green-500">terms and conditions</a>.</label>
                    </div>
                    <button type="submit" class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Submit</button>
                                <div class="inline-flex items-center justify-center w-full">
                        <hr class="w-64 h-px my-4 bg-gray-200 border-0 dark:bg-gray-700">
                        <span class="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-800">or</span>
                    </div>
                    <div class="grid grid-cols-1">
                        <!-- Facebok -->
                        <button type="button" class="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2">
                        <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                        <path fill-rule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clip-rule="evenodd"/>
                        </svg>
                        Login with Facebook
                        </button>
                        <!-- Google -->
                        <button type="button" class="text-white bg-[#ff3526] hover:bg-[#ff3b2d]/90 focus:ring-4 focus:outline-none focus:ring-[#ff3b2d]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#ff3b2d]/55 me-2 mb-2">
                        <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                        <path fill-rule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clip-rule="evenodd"/>
                        </svg>
                        Login with Google
                        </button>
                    </div>
                    <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Already own an account? <NuxtLink  to="/auth/login" class="text-green-700 hover:underline dark:text-green-500">Login</NuxtLink>
                    </div>
                </form>
            </div> 
        </div>

    </div>
  </template>
<script setup lang="ts">
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

// ToastRef type and injection
type ToastRef = {
  showToast: (type: string, message: string) => void
}
const toastRef = inject<Ref<ToastRef> | null>('toastRef', null)

type AuthForm = {
  first_name: string
  last_name: string
  email: string
  phone: string
  password: string
  password_confirmation: string
}

const form = ref<AuthForm>({
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  password: '',
  password_confirmation: '',
})

const errors = ref<Record<string, string>>({})

const validateForm = () => {
  errors.value = {}
  const toast = toastRef?.value

  if (!form.value.first_name) {
    errors.value.first_name = 'First name is required'
    toast?.showToast('error', errors.value.first_name)
    return false
  }

  if (!form.value.last_name) {
    errors.value.last_name = 'Last name is required'
    toast?.showToast('error', errors.value.last_name)
    return false
  }

  if (!form.value.email) {
    errors.value.email = 'Email is required'
    toast?.showToast('error', errors.value.email)
    return false
  }

  if (!form.value.phone) {
    errors.value.phone = 'Phone is required'
    toast?.showToast('error', errors.value.phone)
    return false
  }

  if (form.value.password.length < 8) {
    errors.value.password = 'Password must be at least 8 characters'
    toast?.showToast('error', errors.value.password)
    return false
  }

  if (form.value.password !== form.value.password_confirmation) {
    errors.value.password_confirmation = 'Passwords do not match'
    toast?.showToast('error', errors.value.password_confirmation)
    return false
  }

  return true
}

const handleRegister = async () => {
  if (!validateForm()) return

  try {
    await auth.register(form.value)
    router.push(`/auth/verify?email=${form.value.email}`)
    toastRef?.value?.showToast('success', 'Registration successful!')
  } catch (e: any) {
    if (e?.response?.data?.errors) {
      for (const key in e.response.data.errors) {
        errors.value[key] = e.response.data.errors[key][0]
        toastRef?.value?.showToast('error', errors.value[key])
      }
    } else {
      console.error(e)
      toastRef?.value?.showToast('error', 'Something went wrong during registration.')
    }
  }
}
</script>
