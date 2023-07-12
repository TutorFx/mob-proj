<template>
  <div>
    <div v-if="name === 'NEW'" class="bg-rose-400 px-2 rounded-full">
      NOVO
    </div>
    <div v-else-if="name === 'PENDING'" class="bg-amber-400 px-2 rounded-full">
      PENDENTE
    </div>
    <div v-else-if="name === 'DELIVERED'" class="bg-emerald-200 px-2 rounded-full">
      ENTREGUE
    </div>
    <div v-else-if="name === 'PRODUCING'" class="bg-sky-400 px-2 rounded-full">
      PRODUZINDO
    </div>
    <div v-else class="bg-sky-200 px-2 rounded-full">
      {{ name }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ name: string }>()
</script>