<template>
  <div class="card bg-base-100 border-base-200 border">
    <div class="card-body gap-y-6">
      <div class="card-title justify-between flex-wrap">
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