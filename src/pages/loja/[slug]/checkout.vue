<template>
  <div :data-theme="data?.theme">
    <nuxt-page />
  </div>
</template>

<script setup lang="ts">
const { data } = await useCurrentStoreData();
</script>
