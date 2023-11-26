<template>
  <div>
    <NuxtLoadingIndicator color="false" class="bg-primary" />
    <div class="fill-screen container grid grid-rows-[max-content_1fr]">
      <ui-store-nav :data="data" />
      <ui-product-page :business-name="data?.name" :productdata="productdata" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IItem } from "~/types/cart";

const route = useRoute();

const data = await $fetch(`/api/v1/business/${route.params.slug}`).catch(() => {
  throw createError({
    statusCode: 404,
    statusMessage: 'Estabelecimento não encontrado'
  })
})

const productdata = await $fetch<IItem>(`/api/v1/business/${route.params.slug}/${route.params.product}`).catch(() => {
  throw createError({
    statusCode: 404,
    statusMessage: 'Produto não encontrado'
  })
});

const config = useRuntimeConfig()

useSeoMeta({
  title: `${productdata?.name} - ${data?.name} | ${config.public.APP_NAME}`,
  ogTitle: productdata?.name,
  description: productdata?.description,
  ogDescription: productdata?.description,
  ogImage: usePrefixImages(productdata?.images?.at(0)?.Key),
  twitterCard: 'summary_large_image',
})
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