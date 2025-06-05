export default defineNuxtPlugin(() => {
  if (process.client) {
    try {
      const theme = localStorage.getItem('color-theme')
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

      if (theme === 'dark' || (!theme && prefersDark)) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    } catch (error) {
      console.warn('Dark mode initialization failed', error)
    }
  }
})
