<template>
  <NuxtLayout name="dashboard">
    <RouterView />
  </NuxtLayout>
</template>

<script setup lang="ts">
  definePageMeta({ middleware: 'auth' })
</script>