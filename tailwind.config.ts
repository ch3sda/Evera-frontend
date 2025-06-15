import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#328E6E',
        green: '#67AE6E',
        green_2: '#90C67C',
        green_3: '#E1EEBC',
        blue: '#3FA2F6',
        blue_2: '#3FA2F6',
        blue_3: '#96C9F4',
        red: '#A94438',
        red_2: '#D24545',
        yellow: '#FF9D3D',
        yellow_2: '#FFBD73',
        error: '#EE4E4E',
        success: '#97BE5A',
        pending: '#F3CA52',
        warning: '#E8751A',
      }
    }
  },
  content: [
    './components/**/*.{vue,js,ts,jsx,tsx}',
    './layouts/**/*.{vue,js,ts,jsx,tsx}',
    './pages/**/*.{vue,js,ts,jsx,tsx}',
    './plugins/**/*.{js,ts,mjs}',
    './composables/**/*.{js,ts,mjs}',
    './utils/**/*.{js,ts,mjs}',
    './App.{vue,js,ts,jsx,tsx,mjs}',
    './Error.{vue,js,ts,jsx,tsx,mjs}',
    './app.config.{js,ts,mjs}',
    './app/spa-loading-template.html'
  ],
  plugins: []

}

export default config
