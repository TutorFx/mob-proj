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

const data = await $fetch(`/api/v1/business/${slug}`).catch(() => {
  throw createError({
    statusCode: 404,
    statusMessage: 'Estabelecimento não encontrado'
  })
})

const productdata = await $fetch(`/api/v1/business/${slug}/${product instanceof Array ? product[0] : product}`).catch(() => {
  throw createError({
    statusCode: 404,
    statusMessage: 'Produto não encontrado'
  })
});
</script>