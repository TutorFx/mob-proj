export default defineNuxtRouteMiddleware(async (to, from) => {
  // Being used from authentication plugin. Do not delete.
  try {
    await $fetch('/api/v1/session')
  } catch (e) {
    return navigateTo({
      path: '/login', query: {
        callback: encodeURI(to.fullPath)
      }
    });
  }
})