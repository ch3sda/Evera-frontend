<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const auth = useAuthStore()
auth.loadFromStorage()

const eventId = route.params.id
const event = ref(null)
const loading = ref(true)
const error = ref(null)

const config = useRuntimeConfig()
const baseUrl = config.public.API_URL

const fetchEvent = async () => {
  const { data, error: fetchError } = await useFetch(`${baseUrl}/api/events/${eventId}`, {
    headers: {
      Authorization: `Bearer ${auth.accessToken}`
    },
  })

  if (fetchError.value) {
    error.value = fetchError.value.message || 'Failed to fetch event'
  } else {
    event.value = data.value
  }

  loading.value = false
}

onMounted(fetchEvent)
</script>

<template>
  <section class="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
    <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
      <div class="mx-auto max-w-5xl">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Payment</h2>

        <div v-if="loading" class="text-gray-500 mt-4">Loading event details...</div>
        <div v-if="error" class="text-red-600 mt-4">{{ error }}</div>

        <div v-if="event" class="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
          <!-- Payment Form -->
          <form class="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:max-w-xl lg:p-8">
            <div class="mb-6 grid grid-cols-2 gap-4">
              <div class="col-span-2 sm:col-span-1">
                <label for="full_name" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Full name*</label>
                <input type="text" id="full_name" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white" required />
              </div>
              <div class="col-span-2 sm:col-span-1">
                <label for="card-number" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Card number*</label>
                <input type="text" id="card-number" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white" placeholder="xxxx-xxxx-xxxx-xxxx" required />
              </div>
              <div>
                <label for="expiration" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Expiration*</label>
                <input type="text" id="expiration" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white" placeholder="MM/YY" required />
              </div>
              <div>
                <label for="cvv" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">CVV*</label>
                <input type="number" id="cvv" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white" placeholder="•••" required />
              </div>
            </div>

            <button type="submit" class="w-full rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Pay now</button>
          </form>

          <!-- Order Summary -->
          <div class="mt-6 grow sm:mt-8 lg:mt-0">
            <div class="space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
              <dl class="flex items-center justify-between gap-4">
                <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Event Ticket</dt>
                <dd class="text-base font-medium text-gray-900 dark:text-white">${{ event.price.toFixed(2) }}</dd>
              </dl>
              <dl class="flex items-center justify-between gap-4">
                <dt class="text-base font-normal text-gray-500 dark:text-gray-400">VAT (10%)</dt>
                <dd class="text-base font-medium text-gray-900 dark:text-white">
                  ${{ Math.min(event.price * 0.1, 5).toFixed(2) }}
                </dd>
              </dl>
              <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                <dt class="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                <dd class="text-base font-bold text-gray-900 dark:text-white">
                  ${{ (event.price + Math.min(event.price * 0.1, 5)).toFixed(2) }}
                </dd>
              </dl>
            </div>

            <div class="mt-6 flex items-center justify-center gap-8">
              <img class="h-8 w-auto dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg" alt="Visa" />
              <img class="h-8 w-auto dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard.svg" alt="Mastercard" />
              <img class="h-8 w-auto dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal.svg" alt="PayPal" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
