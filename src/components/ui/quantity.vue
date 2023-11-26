<template>
  <div>
    <div class="grid grid-flow-col items-center justify-start">
      <button class="btn-neutral btn rounded-r-none" @click.prevent="modelValue -= 1">
        -
      </button>
      <input
v-model.number="modelValue" v-maska type="text" aria-labelledby="Número de produtos" data-maska="###"
        class="h-full w-12 border-neutral px-0 text-center">
      <button class="btn-neutral btn rounded-l-none" @click.prevent="modelValue += 1">
        +
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: number
}>()
const emits = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()
const modelValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    if (value < 1) return;
    if (isNaN(value)) return;
    emits('update:modelValue', value)
  }
})
</script>