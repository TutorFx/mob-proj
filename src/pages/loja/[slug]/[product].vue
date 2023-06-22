<template>
  <div>
    <NuxtLoadingIndicator color="false" class="bg-primary" />
    <div class="container grid fill-screen grid-rows-[max-content_1fr]">
      <ui-store-nav :data="data" />
      <ui-product-page :business-name="data?.name" :productdata="productdata" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { slug, product } = useRoute().params

const data = await $fetch(`/api/v1/business/${slug}`)
/* if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Business Not Found'
  })
} */
const productdata = await $fetch(`/api/v1/business/${slug}/${product}`);
/* if (producterror.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Product Not Found'
  })
} */
/* onErrorCaptured(() => {
  throw createError({
    statusCode: 404,
    statusMessage: 'Product Not Found'
  })
}) */
</script>