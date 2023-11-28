import { useAuthentication } from '@/composables/useAuthentication'

export default defineNuxtPlugin(async (nuxt) => {
  const login = useAuthentication(nuxt.$pinia)
  const route = useRoute()

  // On unauthenticated request redirect and delete data
  watch(
    () => login.isAuthenticated,
    (newVal, oldVal) => {
      if (newVal && !oldVal) { return }
      if (login.isAuthenticated && route.name !== 'login') { return }
      navigateTo({
        path: '/login',
        query: {
          callback: encodeURI(route.fullPath)
        }
      })
    }
  )

  return {
    provide: {
      login
    }
  }
})
