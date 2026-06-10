import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: [
    './app/**/*.{vue,ts}',
    './components/**/*.{vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue'
  ],
  theme: {
    extend: {}
  }
} satisfies Config
