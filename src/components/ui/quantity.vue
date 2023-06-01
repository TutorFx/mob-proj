<template>
  <div>
    <div class="grid grid-flow-col justify-start items-center">
      <button class="btn btn-neutral rounded-r-none" @click.prevent="modelValue -= 1">
        -
      </button>
      <input type="text" v-model.number="modelValue" v-maska data-maska="###"
        class="h-full w-12 border-neutral text-center px-0">
      <button class="btn btn-neutral rounded-l-none" @click.prevent="modelValue += 1">
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
    if (1 > value) return;
    if (isNaN(value)) return;
    emits('update:modelValue', value)
  }
})
</script>