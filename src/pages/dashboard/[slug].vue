<template>
  {{route.params}}
</template>

<script setup lang="ts">
  const route = useRoute();
  const { slug } = route.params;
</script>