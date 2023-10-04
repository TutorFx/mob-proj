<template>
  <div>
    <div class="grid p-3 sticky top-0 z-40 gap-3">
      <div class="tooltip tooltip-right" :data-tip="item.name" v-for="(item, i) in data" :key="i">
        <nuxt-link :to="item.path" class="p-3 rounded-xl block">
          <Icon :name="item.icon" size="24" />
        </nuxt-link>
      </div>
    </div>
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