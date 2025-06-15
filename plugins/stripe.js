import { loadStripe } from '@stripe/stripe-js'

let stripePromise = null

export default defineNuxtPlugin(() => {
  if (!stripePromise) {
    stripePromise = loadStripe('pk_test_...') // Use your Stripe publishable key here
  }
  return {
    provide: {
      stripe: stripePromise
    }
  }
})
