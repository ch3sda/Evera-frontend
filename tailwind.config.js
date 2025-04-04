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
    extend: {
      colors: {
        primary: {
          "50":"#EFFDF5",
          "100":"#D9FBE8",
          "200":"#B3F5D1",
          "300":"#75EDAE",
          "400":"#00DC82",
          "500":"#00C16A",
          "600":"#00A155",
          "700":"#007F45",
          "800":"#016538",
          "900":"#0A5331",
          "950":"#052E16"
        }
      }
    },
    fontFamily: {
      'body': [
    'Inter', 
    'ui-sans-serif', 
    'system-ui', 
    '-apple-system', 
    'system-ui', 
    'Segoe UI', 
    'Roboto', 
    'Helvetica Neue', 
    'Arial', 
    'Noto Sans', 
    'sans-serif', 
    'Apple Color Emoji', 
    'Segoe UI Emoji', 
    'Segoe UI Symbol', 
    'Noto Color Emoji'
  ],
      'sans': [
    'Inter', 
    'ui-sans-serif', 
    'system-ui', 
    '-apple-system', 
    'system-ui', 
    'Segoe UI', 
    'Roboto', 
    'Helvetica Neue', 
    'Arial', 
    'Noto Sans', 
    'sans-serif', 
    'Apple Color Emoji', 
    'Segoe UI Emoji', 
    'Segoe UI Symbol', 
    'Noto Color Emoji'
  ]
    }},
  darkMode: 'class',
  plugins: ['flowbite/plugin'],
}

