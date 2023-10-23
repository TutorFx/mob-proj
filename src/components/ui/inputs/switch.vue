<template>
	<div>
    <input type="checkbox" class="toggle" v-model="modelValue" />
	</div>
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