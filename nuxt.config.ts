export default defineNuxtConfig({
  ssr: false,
  target: 'static',
  app: {
    head: {
      titleTemplate: '%s - web-events',
      title: 'web-events',
      htmlAttrs: {
        lang: 'ja'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  css: [
    'destyle.css/destyle.css',
  ],
  runtimeConfig: {
    public: {
      // apiKey: process.env.API_KEY,
      // calendarId: process.env.CALENDAR_ID,
      googleApiKey: process.env.GOOGLE_API_KEY,
      googleCalendarId: process.env.GOOGLE_CALENDAR_ID
    }
  },
  plugins: [],
  components: true,
  modules: [
    '@nuxtjs/tailwindcss',
    // '@nuxt/eslint',
  ],
  build: {
  },
  serverMiddleware: [
    { path: '/api/events', handler: '~/server/api/events.js' }
  ],
});