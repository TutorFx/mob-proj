<template>
  <div>
    <div class="sticky top-0 z-40 grid gap-3 p-3">
      <div
        v-for="(item, i) in data"
        :key="i"
        class="tooltip tooltip-right"
        :data-tip="item.title"
      >
        <nuxt-link :to="item.to" class="block rounded-xl p-3">
          <Icon v-if="item.icon" :name="item.icon" size="24" />
        </nuxt-link>
      </div>
    </div>
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
