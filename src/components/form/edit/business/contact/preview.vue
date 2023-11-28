<template>
  <div class="grid max-w-3xl grid-cols-1 justify-start gap-6 md:grid-cols-2">
    <div class="grid gap-3">
      <div class="text-neutral">
        Número de Whatsapp
      </div>
      <div class="text-content text-lg">
        {{ state.whatsapp ?? 'Sem Whatsapp' }}
      </div>
    </div>
    <div class="grid gap-3">
      <div class="text-neutral">
        Email Empresarial
      </div>
      <div class="text-content text-lg">
        {{ state.email?? 'Sem e-mail' }}
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { IEditBusiness } from '~/types/edit'
const config = useRuntimeConfig()
const url = config.public.URL

const props = defineProps<{
  modelValue: IEditBusiness
}>()

const emits = defineEmits<(e: 'update:modelValue', value: IEditBusiness) => void>()
const state = computed({
  get () {
    return props.modelValue
  },
  set (value) {
    emits('update:modelValue', value)
  }
})

</script>
