<template>
  <button class="btn rounded-full btn-ghost border-base-300 btn-sm gap-3">Aplicar
    <Icon v-if="!updating" name="mdi:check" />
    <ui-spinner v-else />
  </button>
</template>

<script lang="ts" setup>
defineProps<{updating: boolean}>()
</script>