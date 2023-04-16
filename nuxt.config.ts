// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: "src/",
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-headlessui',
    '@sidebase/nuxt-auth',
    'nuxt-icon',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt'
  ],
  auth: {
    origin: 'http://localhost:3000',
  },
  css: ['@/main.scss'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  headlessui: {
    prefix: ''
  },
  runtimeConfig: {
    public: {
      URL: process.env.URL || 'http://localhost:3000/',
    },
  },
})
