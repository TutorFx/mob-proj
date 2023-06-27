// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: "src/",
  modules: [
    '@nuxt/devtools',
    '@nuxtjs/tailwindcss',
    'nuxt-headlessui',
    '@sidebase/nuxt-auth',
    'nuxt-icon',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxt/image-edge',
    '@vueuse/motion/nuxt'
  ],
  image: {
    domains: [
      'res.cloudinary.com'
    ]
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'Mob-Proj 0.1v',
      meta: [
        { name: 'description', content: 'Lorem ipsun!.' }
      ],
    }
  },
  auth: {
    origin: process.env.ORIGIN ?? 'http://localhost:3000/',
  },
  css: ['@/main.scss'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  routeRules: {
    '/api/auth/**': { cors: true },
    '/api/v1/business/**': { swr: 60 * 30 },
    '/api/v1/address/state/**': { swr: true },
    '/loja/**/*': { isr: 60 * 30 },
  },
  headlessui: {
    prefix: ''
  },
  vite: {
    vue: {
      script: {
        defineModel: true,
        propsDestructure: true
      }
    }
  },
  runtimeConfig: {
    public: {
      URL: process.env.ORIGIN ?? 'http://localhost:3000/',
      APP_NAME: 'Mob-Proj 0.1v'
    },
  },
  nitro: {
    preset: "vercel",
  },
})
