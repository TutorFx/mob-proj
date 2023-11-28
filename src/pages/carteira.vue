<template>
  <NuxtLoadingIndicator color="false" class="bg-primary" />
  <ui-nav />
  <BudgetView />
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
</script>
