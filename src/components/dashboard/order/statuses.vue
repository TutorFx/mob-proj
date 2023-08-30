<template>
  <div class="grid grid-flow-col justify-start gap-3 relative">
    <label tabindex="0" class="p-2 gap-1 border rounded-full grid grid-flow-col justify-start items-center snap-always snap-center"
      :class="{ 'border-primary border-dashed': !state }">
      <dashboard-order-status name="TUDO" />
      <input v-model="state" class="opacity-0 absolute" type="radio" :value="null">
    </label>
    <label v-for="(status, i) in data" :key="i" tabindex="0"
      class="p-2 gap-1 border rounded-full grid grid-flow-col justify-start items-center snap-always snap-center"
      :class="{ 'border-primary border-dashed': state === status }">
      <dashboard-order-status :name="status" />
      <input v-model="state" class="opacity-0 absolute" type="radio" :value="status">
    </label>
  </div>
</template>

<script setup lang="ts">
import { IObjectStatus } from '~/types';

const props = defineProps<{
  data: IObjectStatus,
  modelValue?: string | string[] | null
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', value?: string | string[] | null): void,
}>()

const state = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emits('update:modelValue', value)
  }
})
</script>