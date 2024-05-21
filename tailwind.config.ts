import { defineConfig } from 'tailwindcss'

export default defineConfig({
  content: [
    './src/components/**/*.{vue,js,ts}',
    './src/layouts/**/*.vue',
    './src/pages/**/*.vue',
    './src/plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#FF6347',
        'secondary': '#6B7280',
      },
      fontFamily: {
        'custom': ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
})