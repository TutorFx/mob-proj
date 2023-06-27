<template>
  <div>
    <NuxtLoadingIndicator color="false" class="bg-primary" />
    <div class="container">
      <ui-store-nav :data="data.Business" />
    </div>
    <div class="container">
      <div>finalizou</div>
      <div>{{ data }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const data = await $fetch(`/api/v1/order/${route.params.slug}/${route.params.id}`)
</script>