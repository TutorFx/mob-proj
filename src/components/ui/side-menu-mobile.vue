<template>
  <div class="sticky top-0 grid gap-3 p-3">
    <nuxt-link
      v-for="(item, i) in data"
      :key="i"
      :to="item.to"
      class="grid grid-flow-col rounded-xl p-3"
    >
      <Icon v-if="item.icon" :name="item.icon" size="24" />
      <div>{{ item.title }}</div>
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
defineProps<{ data: MenuItems }>();
</script>

<style scoped lang="scss">
.router-link-exact-active {
  @apply bg-base-300;
}
</style>
