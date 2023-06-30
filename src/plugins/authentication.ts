import { useAuthentication } from '@/composables/useAuthentication';

export default defineNuxtPlugin(async (nuxt) => {
  // @ts-expect-error
  const login = useAuthentication(nuxt.$pinia);
  const route = useRoute();

  addRouteMiddleware('auth', async (to, from) => {
    if (process.client) {
      if (!login.isAuthenticated) {
        return navigateTo({
          path: '/login', query: {
            callback: encodeURI(to.fullPath)
          }
        });
      }
    }
    // Perform Server side validation
    if (process.server) {
      try {
        await $fetch('/api/v1/session')
      } catch (e) {
        return navigateTo({
          path: '/login', query: {
            callback: encodeURI(to.fullPath)
          }
        });
      }
    }
  });
  // On unauthenticated request redirect and delete data
  watch(
    () => login.isAuthenticated,
    (newVal, oldVal) => {
      if (newVal && !oldVal) return;
      if (login.isAuthenticated && route.name !== 'login') return;
      navigateTo({
        path: '/login', query: {
          callback: encodeURI(route.fullPath)
        }
      });
    }
  )

  return {
    provide: {
      login
    }
  }
});