/* eslint-disable @typescript-eslint/no-unused-vars */
// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from "url";

const isProdEnv = process.env.NODE_ENV === "production";
const awsBucketUrl = `${process.env.S3_BUCKET_NAME}.s3.${process.env.S3_DEFAULT_REGION}.amazonaws.com`;

export default defineNuxtConfig({
  srcDir: "src/",

  modules: [
    "@nuxt/devtools",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@nuxtjs/eslint-module",
    "nuxt-headlessui",
    "nuxt-icon",
    "@pinia/nuxt",
    "@nuxt/image-edge",
    "@nuxtseo/module",
    "nuxt-og-image",
  ],

  image: {
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      "2xl": 1536,
    },
    format: ["webp"],
    densities: [0.2, 0.5, 1, 2],
    domains: ["res.cloudinary.com", "avatar.vercel.sh", awsBucketUrl],
  },

  app: {
    // pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: "Mob-Proj 0.1v",
      meta: [{ name: "description", content: "Lorem ipsun!." }],
      htmlAttrs: {
        lang: "pt-BR",
      },
    },
  },

  css: ["@/main.scss"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  routeRules: {
    "/api/auth/**": { cors: true },
    "/api/v1/business/**/*": {
      isr: 60 * 15, // Cleanup on every 15min
      cache: {
        base: "redis",
      },
    },
    "/api/v1/address/state/**": { swr: true },
    "/api/v1/order/status": { isr: true },
    "/loja/**/*": {
      isr: 60 * 2, // Cleanup on every 2min
    },
  },

  headlessui: {
    prefix: "",
  },

  vite: {
    vue: {
      script: {
        defineModel: true,
        propsDestructure: true,
      },
    },
  },

  alias: {
    "~repository": fileURLToPath(
      new URL("./src/server/utils/repository/", import.meta.url),
    ),
    ".prisma/client/index-browser":
      "./node_modules/.prisma/client/index-browser.js",
  },

  eslint: {
    emitWarning: false,
  },

  /*   typescript: {
    typeCheck: !isProdEnv,
  }, */

  runtimeConfig: {
    stripeSecretKey: process.env.STRIPE_KEY,
    stripeEndpointSecret: process.env.STRIPE_KEY_PUBLIC,
    subscriptionGraceDays: 3,
    initialPlanName: "Free Trial",
    initialPlanActiveMonths: 1,
    brevo: {
      SMTP_HOSTNAME: process.env.BREVO_SMTP_HOSTNAME,
      SMTP_PORT: process.env.BREVO_SMTP_PORT,
      API_KEY: process.env.BREVO_API_KEY,
      SMTP_KEY: process.env.BREVO_SMTP_KEY,
      SMTP_USER: process.env.BREVO_SMTP_USER,
    },
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      username: process.env.REDIS_USERNAME,
      password: process.env.REDIS_PASSWORD,
    },
    public: {
      URL: process.env.NUXT_PUBLIC_SITE_URL ?? "http://localhost:3000/",
      APP_NAME: "Nuxa",
      cdnBaseUrl: `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.S3_DEFAULT_REGION}.amazonaws.com/`,
    },
  },

  experimental: {
    viewTransition: true,
  },

  nitro: {
    preset: "vercel",
    experimental: { openAPI: true },
    storage: {
      redis: {
        driver: "redis",
        url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,

        /* redis connector options */
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        username: process.env.REDIS_USERNAME,
        password: process.env.REDIS_PASSWORD,
        db: 0, // Defaults to 0
      },
    },
  },

  colorMode: {
    preference: "light",
    dataValue: "theme",
  },

  devtools: {
    enabled: true,
  },
});
