<template>
  <div class="w-full max-w-md p-3">
    <div class="grid gap-4 rounded-lg border-t-4 border-warning bg-base-100 px-1 py-2">
      <div class="text-bold grid justify-center gap-2 px-5 py-3 text-center text-lg text-warning">
        <Icon name="FormWarning" size="124" class="mx-auto" />
        <div class="text-xl">
          {{ instance.title }}
        </div>
      </div>
      <div class="mx-auto max-w-xs px-5 py-3 text-center text-stone-600" v-html="instance.body" />
      <div class="grid grid-flow-col gap-3 p-3">
        <button class="rounded-md px-5 py-3 transition-all hover:bg-base-200" :class="{ 'bg-warning text-base-100 hover:text-black': !instance?.callback }" @click="cancel()">
          {{ instance.cancel }}
        </button>
        <button v-if="instance?.callback" class="rounded-md bg-warning px-5 py-3 text-base-100" @click="accept()">
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