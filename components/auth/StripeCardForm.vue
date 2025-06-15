<script setup>
import { ref, onMounted } from 'vue'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe('pk_test_51RY9ugPPQprHMKULwMyuc2CXCxxAvDYXHnNi0xDfUzSjHb3mXdEE1Nqk3O4DbS6FJmjHrSxNmPM7fi5icjjxiUE200kAgrsd6M') // Replace with your public key
const stripe = ref(null)
const elements = ref(null)
const cardNumber = ref(null)
const cardExpiry = ref(null)
const cardCvc = ref(null)

const cardBrand = ref(null)

onMounted(async () => {
  stripe.value = await stripePromise
  elements.value = stripe.value.elements()
const isDark = useColorMode().value === 'dark' // if using @nuxtjs/color-mode

  cardNumber.value = elements.value.create('cardNumber', {
    style: {
    base: {
      color: isDark ? '#FFFFFF' : '#000000',
      fontFamily: 'Inter, sans-serif',
      fontSize: '16px',
      '::placeholder': {
        color: isDark ? '#A1A1AA' : '#9CA3AF', // lighter gray for placeholder
      },
    },
    invalid: {
      color: '#EF4444', // red
    },
    }
  })
  cardExpiry.value = elements.value.create('cardExpiry')
  cardCvc.value = elements.value.create('cardCvc')

  cardNumber.value.mount('#card-number-element')
  cardExpiry.value.mount('#card-expiry-element')
  cardCvc.value.mount('#card-cvc-element')

  cardNumber.value.on('change', (event) => {
    cardBrand.value = event.brand !== 'unknown' ? event.brand : null
  })
})
</script>

<template>
  <form class="max-w-xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl space-y-6 border border-gray-200 dark:border-gray-700">
    <!-- Full Name -->
    <div>
      <label for="full_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name on Card</label>
      <input
        type="text"
        id="full_name"
        placeholder="Bonnie Green"
        class="w-full rounded-xl border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        required
      />
    </div>

    <!-- Card Number with optional brand icon -->
    <div>
      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Card Number</label>
      <div class="relative">
        <div id="card-number-element" class="w-full p-3 rounded-xl border border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700"></div>
        <img
          v-if="cardBrand"
          :src="`https://img.icons8.com/color/32/${cardBrand}.png`"
          :alt="cardBrand"
          class="absolute right-3 top-3 h-6 w-6"
        />
      </div>
    </div>

    <!-- Expiry & CVC side-by-side -->
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Expiry (MM/YY)</label>
        <div id="card-expiry-element" class="w-full p-3 rounded-xl border border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700"></div>
      </div>

      <div>
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CVC</label>
        <div id="card-cvc-element" class="w-full p-3 rounded-xl border border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700"></div>
      </div>
    </div>

    <button
      type="submit"
      class="w-full mt-4 py-3 rounded-xl bg-green-600 text-white font-medium text-sm hover:bg-green-700 focus:ring-4 focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800 transition"
    >
      Pay Now
    </button>
  </form>
</template>
