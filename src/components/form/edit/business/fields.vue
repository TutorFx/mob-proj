<template>
  <div class="grid gap-6 justify-start grid-cols-1 md:grid-cols-2 max-w-3xl">
    <div class="grid gap-3">
      <div class="text-neutral">Nome do seu negócio</div>
      <input type="text" v-model="state.name" ref="name" class="input input-bordered w-full">
      <ul>
        <li class="text-error text-xs">{{ getErrors('name') }}</li>
      </ul>
    </div>
    <div class="grid gap-3">
      <div class="text-neutral">Descrição</div>
      <input type="text" v-model="state.description" class="input input-bordered w-full">
      <ul>
        <li class="text-error text-xs">{{ getErrors('description') }}</li>
      </ul>
    </div>
    <label class="text-neutral">
      <div class="mb-3">
        Link da empresa
      </div>
      <div class="grid grid-flow-col rounded-lg border border-base-300">
        <div class="bg-base items-center border-r border-base-300 px-4 text-xs rounded-l-lg grid">
          <div class="truncate">
            {{ url }}loja/
          </div>
        </div>
        <input v-model="state.slug" type="text" class="input bg-base w-full rounded-r-lg text-sm"
          placeholder="minha-empresa">
      </div>
      <ul>
        <li class="text-error text-xs">{{ getErrors('slug') }}</li>
      </ul>
    </label>
  </div>
</template>
<script lang="ts" setup>
import { IEditBusiness } from '~/types/edit';
const config = useRuntimeConfig()
const url = config.public.URL;

const props = defineProps<{
  modelValue: IEditBusiness
}>();

const result = computed(() => useSchemas.createBusinessSchema.safeParse(state.value));
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

const name = ref<HTMLInputElement | null>();

onMounted(() => {
  name.value?.focus()
})

</script>