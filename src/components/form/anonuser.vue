<script lang="ts" setup>
import { TAnonymously } from '~/types/user';

const props = withDefaults(defineProps<{
  modelValue: TAnonymously,
  valid: boolean
}>(), {})

const emits = defineEmits<{
  (e: 'update:modelValue', value: TAnonymously): void,
  (e: 'update:valid', value: boolean): void,
}>()

const state = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emits('update:modelValue', value)
  }
})

const valid = computed({
  get() {
    return props.valid
  },
  set(value) {
    emits('update:valid', value)
  }
})

const result = computed(() => useSchemas.anonymously.safeParse(state.value));
const errors = computed(() => result.value.success ? {} : result.value.error.format());

watchEffect(() => valid.value = result.value.success);

const isDirty = ref(true)

const getErrors = (field: string) => {
  //@ts-ignore
  return isDirty.value ? errors.value?.[field]?._errors?.at(0) : undefined
}

const touch = () => (isDirty.value = true)


defineExpose({
  touch
});
</script>

<template>
  <div class="grid gap-3 grid-cols-1 lg:grid-cols-3">
    <div class="form-control">
      <label class="label">
        <span class="label-text">Nome</span>
      </label>
      <input type="text" placeholder="Preencha seu nome" name="nome" id="nome" v-model="state.nome"
        class="input input-bordered w-full">
      <ul>
        <li class="text-error text-xs">{{ getErrors('nome') }}</li>
      </ul>
    </div>
    <div class="form-control">
      <label class="label">
        <span class="label-text">Celular</span>
      </label>
      <input type="text" v-maska data-maska="['(##) ####-####', '(##) # ####-####']" placeholder="Preencha seu celular" name="celular" id="celular" v-model="state.celular"
        class="input input-bordered w-full">
      <ul>
        <li class="text-error text-xs">{{ getErrors('celular') }}</li>
      </ul>
    </div>
  </div>
</template>