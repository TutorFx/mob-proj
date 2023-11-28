<template>
  <div class="card border border-base-200 bg-base-100">
    <div class="card-body gap-y-6">
      <div class="card-title flex-wrap justify-between">
        <span>{{ title }}</span>
        <slot name="action" />
      </div>
      <div>
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string }>()
</script>
