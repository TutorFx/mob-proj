<template>
  teste
</template>

<script setup lang="ts">
const { status, data } = useAuth();
console.log(data.value);
</script>