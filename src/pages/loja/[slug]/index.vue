<template>
  <div :data-theme="THEME" class="min-h-[100lvh]">
    <NuxtLoadingIndicator color="false" class="bg-primary" />
    <div v-if="data" class="container">
      <ui-store-nav :data="data" />
    </div>
    <div class="container">
      <Suspense>
        <template #default>
          <ui-product-list :slug="$route.params.slug" />
        </template>
        <template #fallback>
          <ui-product-list-page-skeleton />
        </template>
      </Suspense>
    </div>
    <div>
      <!-- Footer -->
    </div>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const { data, error } = await useCurrentStoreData();

if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Estabelecimento não encontrado",
  });
}

const PAGE_NAME = computed(() => data.value?.name ?? undefined);

const THEME = computed(() => data.value?.theme ?? undefined);

useSeoMeta({
  title: `${PAGE_NAME.value} | ${config.public.APP_NAME}`,
  ogTitle: `${PAGE_NAME.value} | ${config.public.APP_NAME}`,
});
</script>

<style scoped lang="scss">
.active {
  .img-container {
    view-transition-name: selected-product;
    contain: layout;
  }
}
</style>
