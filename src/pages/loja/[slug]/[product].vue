<template>
  <div>
    <NuxtLoadingIndicator color="false" class="bg-primary" />
    <div class="container grid fill-screen grid-rows-[max-content_1fr]">
      <ui-store-nav v-bind="{ data }" />
      <ui-product-page v-bind="{ productdata }" />
    </div>
  </div>

</template>

<script setup lang="ts">
  const { slug, product } = useRoute().params
  const data = await $fetch(`/api/v1/business/${slug}`)
  const productdata = await $fetch(`/api/v1/business/${slug}/${product}`)
</script>