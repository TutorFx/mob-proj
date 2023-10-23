<template>
	<label class="grid grid-flow-col justify-start gap-4 items-center">
    <input type="checkbox" class="checkbox" v-model="modelValue" />
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