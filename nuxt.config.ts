// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  future: {
    compatibilityVersion: 4
  },
  features: {
  },
  devtools: { enabled: true },

  content: {
    experimental: { nativeSqlite: true },
  },
  nitro: {
    experimental: {
      tasks: true
    }
  },
  ui: {
    fonts: false
  },
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/ui',
    '@nuxt/image'
  ]
})