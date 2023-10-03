<template>
  <div class="max-w-md w-full p-3">
    <div class="bg-base-100 rounded-lg grid gap-4 py-2 px-1 border-warning border-t-4">
      <div class="text-lg text-bold py-3 px-5 text-center grid justify-center gap-2 text-warning">
        <Icon name="FormWarning" size="124" class="mx-auto" />
        <div class="text-xl">
          {{ instance.title }}
        </div>
      </div>
      <div class="py-3 px-5 text-stone-600 text-center max-w-xs mx-auto" v-html="instance.body" />
      <div class="grid grid-flow-col p-3 gap-3">
        <button @click="cancel()" class="py-3 px-5 hover:bg-base-200 transition-all rounded-md" :class="{ 'bg-warning text-base-100 hover:text-black': !instance?.callback }">
          {{ instance.cancel }}
        </button>
        <button v-if="instance?.callback" @click="accept()" class="py-3 px-5 bg-warning text-base-100 rounded-md">
          {{ instance.accept }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NuxaModal } from '@/composables/useModal'

defineProps<{ instance: NuxaModal, accept: Function, cancel: Function }>()
</script>