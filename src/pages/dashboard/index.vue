<template>
  <div class="bg-base-100">
    <BudgetView />
  </div>
</template>

<script setup lang="ts">
const { status, data } = useAuth();
console.log(data.value);
</script>