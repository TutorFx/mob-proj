<template>
  <div>
    <div v-if="name === 'NEW'" class="rounded-full bg-rose-400 px-2 text-black">
      NOVO
    </div>
    <div
      v-else-if="name === 'PENDING'"
      class="rounded-full bg-amber-400 px-2 text-black"
    >
      PENDENTE
    </div>
    <div
      v-else-if="name === 'DELIVERED'"
      class="rounded-full bg-emerald-200 px-2 text-black"
    >
      ENTREGUE
    </div>
    <div
      v-else-if="name === 'PRODUCING'"
      class="rounded-full bg-sky-400 px-2 text-black"
    >
      PRODUZINDO
    </div>
    <div v-else class="rounded-full bg-sky-200 px-2 text-black">
      {{ name }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ name: string }>();
</script>
