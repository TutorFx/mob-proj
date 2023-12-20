<template>
  <div>
    <NuxtLoadingIndicator color="false" class="bg-primary" />
    <div class="fill-screen container grid grid-rows-[max-content_1fr]">
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
import type { IBusinessWithImage } from "@/types";

const route = useRoute();

const { data } = await useFetch<IBusinessWithImage>(
  `/api/v1/business/${route.params.slug}`,
);

if (!data.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Estabelecimento não encontrado",
  });
}
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
