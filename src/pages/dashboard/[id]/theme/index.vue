<template>
  <div class="p-3 pointer-events-none">
    <ui-store-nav v-if="data" :data="data" />
    <UiProductList :id="$route.params.id" />
  </div>
</template>

<script setup lang="ts">
const { data } = await useCurrentStoreData();
</script>
