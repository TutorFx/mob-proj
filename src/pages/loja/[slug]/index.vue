<template>
  <div>
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
  </div>
</template>

<script setup lang="ts">
import type { IBusinessWithImage } from "~/types";

const route = useRoute();
const config = useRuntimeConfig();

const { data } = await useFetch<IBusinessWithImage>(
  `/api/v1/business/${route.params.slug}`,
);

if (!data.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Estabelecimento não encontrado",
  });
}

const PAGE_NAME = data.value?.name;

useSeoMeta({
  title: `${PAGE_NAME} | ${config.public.APP_NAME}`,
  ogTitle: `${PAGE_NAME} | ${config.public.APP_NAME}`,
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
