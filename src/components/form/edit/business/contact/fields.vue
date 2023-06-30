<template>
  <div class="grid gap-6 justify-start grid-cols-1 md:grid-cols-2 max-w-3xl">
    <div class="grid gap-3">
      <div class="text-neutral">Número de Whatsapp</div>
      <input type="text" v-maska data-maska="['(##) ####-####', '(##) # ####-####']" v-model="state.whatsapp" ref="whatsapp" class="input input-bordered w-full">
      <ul>
        <li class="text-error text-xs">{{ getErrors('whatsapp') }}</li>
      </ul>
    </div>
    <div class="grid gap-3">
      <div class="text-neutral">Email Empresarial</div>
      <input type="text" v-model="state.email" class="input input-bordered w-full">
      <ul>
        <li class="text-error text-xs">{{ getErrors('email') }}</li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { IEditBusiness } from '~/types/edit';
const config = useRuntimeConfig()

const props = defineProps<{
  modelValue: IEditBusiness
}>();

const result = computed(() => useSchemas.businessContact.safeParse(state.value));
const errors = computed(() => result.value.success ? {} : result.value.error.format());

const getErrors = (field: string) => {
  //@ts-ignore
  return errors.value?.[field]?._errors?.at(0)
}

const emits = defineEmits<(e: 'update:modelValue', value: IEditBusiness) => void>()
const state = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emits('update:modelValue', value)
  }
})

const whatsapp = ref<HTMLInputElement | null>();

onMounted(() => {
  whatsapp.value?.focus()
})

</script>