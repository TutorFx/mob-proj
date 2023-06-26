<template>
    <div class="grid gap-6 justify-start grid-cols-1 md:grid-cols-2 max-w-3xl">
      <div class="grid gap-3">
        <div class="text-neutral">Nome do seu negócio</div>
        <div class="text-content text-lg">{{ state.name ?? 'Sem nome' }}</div>
      </div>
      <div class="grid gap-3">
        <div class="text-neutral">Descrição</div>
        <div class="text-content text-lg">{{ state.description ?? 'Sem descrição' }}</div>
      </div>      
      <div class="grid gap-3 col-span-2">
        <div class="text-neutral">Link da empresa</div>
        <div class="text-content text-lg"><span class="text-neutral">{{ `${url}loja/` }}</span>{{ state.slug }}</div>
      </div>
    </div>
</template>
<script lang="ts" setup>
import { IEditBusiness } from '~/types/edit';
const config = useRuntimeConfig()
const url = config.public.URL;

const props = defineProps<{
  modelValue: IEditBusiness
}>();

const emits = defineEmits<(e: 'update:modelValue', value: IEditBusiness) => void>()
const state = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emits('update:modelValue', value)
  }
})

</script>