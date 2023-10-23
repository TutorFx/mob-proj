<template>
  <div>
    <div class="grid p-3 sticky top-0 z-40 gap-3">
      <div class="tooltip tooltip-right" :data-tip="item.title" v-for="(item, i) in data" :key="i">
        <nuxt-link :to="item.to" class="p-3 rounded-xl block">
          <Icon v-if="item.icon" :name="item.icon" size="24" />
        </nuxt-link>
      </div>
    </div>
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