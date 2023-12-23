<template>
  <div :data-theme="data?.theme" class="min-h-[100lvh]">
    <nuxt-page />
  </div>
</template>

<script setup lang="ts">
const { data } = await useCurrentStoreData();
</script>
