// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss', '@nuxt/eslint'],
  css: ['~/assets/css/main.css'],
  typescript: {
    strict: true,
    typeCheck: true
  },
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET || 'change-this-secret-before-production',
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL || ''
    }
  },
  routeRules: {
    '/': { redirect: '/dashboard' }
  }
})
