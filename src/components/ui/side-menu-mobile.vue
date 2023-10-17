<template>
  <div class="grid p-3 sticky top-0 gap-3">
    <nuxt-link :to="item.to" class="p-3 rounded-xl grid grid-flow-col" v-for="(item, i) in data" :key="i">
      <Icon v-if="item.icon" :name="item.icon" size="24" />
      <div>{{ item.title }}</div>
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
defineProps<{ data: MenuItems }>()
</script>

<style scoped lang="scss">
.router-link-exact-active {
  @apply bg-base-300;
}
</style>