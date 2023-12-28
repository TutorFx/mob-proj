<template>
  <div :data-theme="THEME" class="min-h-[100lvh]">
    <NuxtLoadingIndicator color="false" class="bg-primary" />
    <div class="pb-6 fill-screen container grid grid-rows-[max-content_1fr]">
      <ui-store-nav v-if="data" :data="data" />
      <Suspense>
        <template #default>
          <ui-product
            :slug="$route.params.slug"
            :product="$route.params.product"
          />
        </template>
        <template #fallback>
          <ui-product-page-skeleton />
        </template>
      </Suspense>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data, error } = await useCurrentStoreData();

if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Estabelecimento não encontrado",
  });
}

const THEME = computed(() => data.value?.theme ?? undefined);
</script>

<style lang="scss" scoped>
.title-transition {
  view-transition-name: header;
}
</style>

<style lang="scss">
::view-transition-old(header),
::view-transition-new(header) {
  width: auto;
}
</style>
