<template>
  <div>
    Valores na conta
    <BudgetView />
  </div>
</template>

<script setup lang="ts">
const { status, data } = useAuth();
console.log(data.value);
</script>