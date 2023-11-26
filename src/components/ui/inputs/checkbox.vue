<template>
	<label class="grid grid-flow-col items-center justify-start gap-4">
    <input v-model="modelValue" type="checkbox" class="checkbox" />
    <slot />
	</label>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
}>()

const emits = defineEmits<(e: 'update:modelValue', value: boolean) => void>()

const modelValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emits('update:modelValue', value)
  }
})
</script>