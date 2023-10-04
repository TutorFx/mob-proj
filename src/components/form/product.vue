<template>
  <label class="mb-3">
    <div class="label-text mb-3">Nome</div>
    <input type="text" v-model="modelValue.name" placeholder="Ex: Bancada de Mármore"
    class="input input-bordered w-full" />
    <div class="text-error">{{ getErrors('name') }}</div>
  </label>
  <label class="mb-3">
    <div class="label-text mb-3">Descrição</div>
    <textarea v-model="modelValue.description" class="textarea textarea-bordered w-full"
    placeholder="Ex: Adquira já uma bela bancada de mármore para sua casa"></textarea>
    <div class="text-error">{{ getErrors('description') }}</div>
  </label>
  <label class="mb-3">
    <div class="label-text mb-3">Preço</div>
    <Money3Component v-model.number="modelValue.price" decimal="," thousands="." type="text" placeholder="Ex: R$ 8000,00"
    class="input input-bordered w-full" />
    <div class="text-error">{{ getErrors('price') }}</div>
  </label>
  <label class="mb-3">
    <div class="label-text mb-3">Fotos</div>
    <product-admin-dropzone v-model="modelValue.files" />
    <div class="text-error">{{ getErrors('files') }}</div>
  </label>
</template>

<script lang="ts" setup>
import { IProductForm } from "~/types"
import { Money3Component } from 'v-money3'

const props = defineProps<{ modelValue: IProductForm }>()
const emits = defineEmits<(e: 'update:modelValue', value: IProductForm) => void>()
const state = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emits('update:modelValue', value)
  }
})

const result = computed(() => useSchemas.createProductSchema.safeParse(state.value));
const errors = computed(() => result.value.success ? {} : result.value.error.format());

const isDirty = ref(false)

const getErrors = (field: string) => {
  if (Object.keys(errors.value).length === 0) { return }
  // @ts-expect-error TODO: Refactor
  const error = errors.value?.[field] ?? []
  return isDirty.value ? error?._errors?.at(0) : undefined
}

const touch = () => (isDirty.value = true)


defineExpose({
  touch
});
</script>