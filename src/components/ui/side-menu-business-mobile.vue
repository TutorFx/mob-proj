<template>
  <div class="grid p-3 sticky top-0 gap-3">
    <nuxt-link :to="item.path" class="p-3 rounded-xl grid grid-flow-col" v-for="(item, i) in data" :key="i">
      <Icon :name="item.icon" size="24" />
      <div>{{ item.name }}</div>
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
import data from '@/server/utils/json/dashboard.json';
</script>

<style scoped lang="scss">
.router-link-active {}

.router-link-exact-active {
  @apply bg-base-300;
}
</style>