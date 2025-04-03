/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app.vue', 
    './components/**/*.{vue,js}', 
    './pages/**/*.{vue,js}',
    './layouts/**/*.{vue,js}',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    "./node_modules/flowbite/**/*.{js,ts}"
  ],
  theme: {
    extend: {},
  },
  plugins: ['flowbite/plugin'],
}

