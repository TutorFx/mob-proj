// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: "src/",
  modules: [
    '@nuxt/devtools',
    'nuxt-typed-router',
    '@nuxtjs/tailwindcss',
    'nuxt-headlessui',
    '@sidebase/nuxt-auth',
    'nuxt-icon',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxt/image-edge',
  ],
  image: {
    domains: [
      'res.cloudinary.com'
    ]
  },
  auth: {
    origin: process.env.URL || 'http://localhost:3000/',
  },
  css: ['@/main.scss'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  routeRules: {
    '/api/v1/business/**': { swr: true },
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
