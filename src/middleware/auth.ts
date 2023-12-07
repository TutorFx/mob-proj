export default defineNuxtRouteMiddleware(async (to) => {
  const headers = useRequestHeaders(["cookie"]);

  try {
    await $fetch("/api/v1/session", { headers });
  } catch (e) {
    return navigateTo({
      path: "/login",
      query: {
        callback: encodeURI(to.fullPath),
      },
    });
  }
});
