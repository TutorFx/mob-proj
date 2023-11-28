<template>
  <div class="relative grid grid-flow-col justify-start gap-3">
    <label
      tabindex="0"
      class="grid snap-center snap-always grid-flow-col items-center justify-start gap-1 rounded-full border p-2"
      :class="{ 'border-dashed border-primary': !state }"
    >
      <dashboard-order-status name="TUDO" />
      <input v-model="state" class="absolute opacity-0" type="radio" :value="undefined">
    </label>
    <label
      v-for="(status, i) in data"
      :key="i"
      tabindex="0"
      class="grid snap-center snap-always grid-flow-col items-center justify-start gap-1 rounded-full border p-2"
      :class="{ 'border-dashed border-primary': state === status }"
    >
      <dashboard-order-status :name="status" />
      <input v-model="state" class="absolute opacity-0" type="radio" :value="status">
    </label>
  </div>
</template>

<script setup lang="ts">
import type { IObjectStatus } from '~/types'

const props = defineProps<{
  data: IObjectStatus,
  modelValue?: string | string[] | undefined
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', value?: string | string[] | undefined): void,
}>()

const state = computed({
  get () {
    return props.modelValue
  },
  set (value) {
    emits('update:modelValue', value)
  }
})
</script>
