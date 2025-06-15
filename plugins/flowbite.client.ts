// plugins/flowbite.client.ts
import 'flowbite/dist/flowbite.min.js'

export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    console.log('✅ Flowbite JS loaded')

    nuxtApp.hook('page:finish', () => {
      // This ensures components like dropdowns, modals, etc., are active
      setTimeout(() => {
        if (typeof window?.initFlowbite === 'function') {
          window.initFlowbite() // If Flowbite exposes an init function
        } else {
          console.log('ℹ️ Flowbite components should be ready after page transition')
        }
      }, 50)
    })
  }
})
