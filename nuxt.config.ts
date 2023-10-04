// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: "src/",
  modules: [
    '@nuxt/devtools',
    '@nuxtjs/tailwindcss',
    'nuxt-headlessui',
    'nuxt-icon',
    '@pinia/nuxt',
    '@nuxt/image-edge',
    'nuxt-simple-sitemap',
    'nuxt-simple-robots'
  ],
  image: {
    domains: [
      'res.cloudinary.com',
      `${process.env.S3_BUCKET_NAME}.s3.${process.env.S3_DEFAULT_REGION}.amazonaws.com/`
    ],
    format: ['webp']
  },
  app: {
    //pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'Mob-Proj 0.1v',
      meta: [
        { name: 'description', content: 'Lorem ipsun!.' }
      ],
      htmlAttrs: {
        lang: 'pt-BR'
      }
    }
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
    '/api/v1/business/**/*': { isr: 60 },
    '/api/v1/address/state/**': { swr: true },
    '/api/v1/order/status': { isr: true },
    '/loja/**/*': { isr: 60 },
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
    stripeSecretKey: process.env.STRIPE_KEY,
    stripeEndpointSecret: process.env.STRIPE_KEY_PUBLIC,
    subscriptionGraceDays: 3,
    initialPlanName: 'Free Trial',
    initialPlanActiveMonths: 1,
    public: {
      URL: process.env.ORIGIN ?? 'http://localhost:3000/',
      APP_NAME: 'Nuxa',
      cdnBaseUrl: `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.S3_DEFAULT_REGION}.amazonaws.com/`,
    },
  },
  experimental: {
    viewTransition: true,
  },
  nitro: {
    preset: "vercel",
    experimental: { openAPI: true },
  },
})