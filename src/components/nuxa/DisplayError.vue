<template>
  <div>
    <div v-for="(e, i) in data" :key="i" class="text-error">
      {{ e.message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ZodIssue } from "zod";

defineProps<{
  data: ZodIssue[];
}>();
</script>
