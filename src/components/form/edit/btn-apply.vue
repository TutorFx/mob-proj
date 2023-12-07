<template>
  <button class="btn btn-ghost btn-sm gap-3 rounded-full border-base-300">
    Aplicar
    <Icon v-if="!updating" name="mdi:check" />
    <ui-spinner v-else />
  </button>
</template>

<script lang="ts" setup>
defineProps<{ updating: boolean }>();
</script>
