<template>
  <label tabindex="0" class="btn btn-ghost btn-md btn-circle" @click="isVisible = true">
    <div class="indicator">
      <Icon name="mdi:cart-outline" size="24" />
      <span class="badge badge-sm indicator-item">{{ cart.$quantity }}</span>
    </div>
  </label>
  <ui-cart v-model="isVisible" />
</template>

<script setup lang="ts">
const cart = useCart()
const isVisible = ref(false)
</script>