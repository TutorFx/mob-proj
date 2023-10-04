<script lang="ts" setup>
import { TAddress } from '@/types/addr';
import { AsyncData } from "#app";
import { useTextareaAutosize } from '@vueuse/core';
import { IViacep } from '~/types';

const { textarea, input } = useTextareaAutosize()

const props = withDefaults(defineProps<{
  modelValue: TAddress,
  valid: boolean,
}>(), {})

const emits = defineEmits<{
  (e: 'update:modelValue', value: TAddress): void,
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

watch(() => state.value.complemento, (newVal) => {
  input.value = newVal
}, { deep: true })

const { data: viacep, error: viacepError }: AsyncData<IViacep, Error | null> = useAsyncData('cep', () => $fetch<IViacep>(`https://viacep.com.br/ws/${state.value.cep}/json/`), { immediate: false });
const { data: estados } = useAsyncData('state', () => $fetch('/api/v1/address/state'));
const { data: cidades } = useAsyncData('city', () => $fetch(`/api/v1/address/city/${state.value.estado}`), { immediate: false });

if(state.value.estado){
  await refreshNuxtData('city');
}

watch(() => state.value.cep,
  async (newVal, oldVal) => {
    if (state.value.cep?.length !== 9) return;
    await refreshNuxtData('cep');
    if (viacepError.value) return;
    const { logradouro, complemento, bairro, uf, ibge, /* gia, ddd, siafi, localidade */ } = viacep.value;
    const { data: estado } = await useFetch(`/api/v1/address/state/getid/${uf}`)
    const { data: municipio } = await useFetch(`/api/v1/address/city/getid/${ibge}`)
    Object.assign(state.value, {
      endereco: logradouro,
      complemento,
      bairro,
    })
    if (!estado.value) return;
    Object.assign(state.value, {
      estado: estado.value?.Id ?? 0,
    })
    nextTick(() => {
      if (!municipio.value) return;
      Object.assign(state.value, {
        cidade: municipio.value?.Id ?? 0,
      })
    })
  },
  { deep: true }
)

watch(() => state.value.estado,
  async () => {
    state.value.cidade = 0;
    await refreshNuxtData('city');
  })

const result = computed(() => useSchemas.address.safeParse(state.value));
const errors = computed(() => result.value.success ? {} : result.value.error.format());

watchEffect(() => valid.value = result.value.success)

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
        <span class="label-text">CEP</span>
      </label>
      <input type="text" placeholder="00000-000" name="cep" id="cep" v-model="state.cep"
        class="input input-bordered w-full" v-maska data-maska="#####-###">
      <ul>
        <li class="text-error text-xs">{{ getErrors('cep') }}</li>
      </ul>
    </div>
    <div class="form-control">
      <label class="label">
        <span class="label-text">Estado</span>
      </label>
      <select placeholder="Informe seu estado" name="estado" id="estado" v-model="state.estado"
        class="input input-bordered w-full">
        <option :value="0" selected disabled>Selecione</option>
        <option v-for="(estado) in estados" :key="estado.CodigoUf" :value="estado.Id">
          {{ estado.Uf }} - {{ estado.Nome }}
        </option>
      </select>
      <ul>
        <li class="text-error text-xs">{{ getErrors('estado') }}</li>
      </ul>
    </div>
    <div class="form-control">
      <label class="label">
        <span class="label-text">Cidade</span>
      </label>
      <select placeholder="Informe sua cidade" name="cidade" id="cidade" v-model="state.cidade"
        class="input input-bordered w-full">
        <option :value="0" selected disabled>Selecione</option>
        <option v-for="(cidade) in cidades" :key="cidade.Codigo" :value="cidade.Id"> {{ cidade.Nome }}</option>
      </select>
      <ul>
        <li class="text-error text-xs">{{ getErrors('cidade') }}</li>
      </ul>
    </div>
    <div class="form-control">
      <label class="label">
        <span class="label-text">Bairro</span>
      </label>
      <input type="text" placeholder="Informe seu bairro" name="bairro" id="bairro" v-model="state.bairro"
        class="input input-bordered w-full">
      <ul>
        <li class="text-error text-xs">{{ getErrors('bairro') }}</li>
      </ul>
    </div>
    <div class="form-control">
      <label class="label">
        <span class="label-text">Endereço</span>
      </label>
      <input type="text" placeholder="Informe seu endereço" name="endereco" id="endereco" v-model="state.endereco"
        class="input input-bordered w-full">
      <ul>
        <li class="text-error text-xs">{{ getErrors('endereco') }}</li>
      </ul>
    </div>
    <div class="form-control">
      <label class="label">
        <span class="label-text">Numero</span>
      </label>
      <input type="number" placeholder="Informe seu número" name="numero" id="numero" v-model="state.numero"
        class="input input-bordered w-full">
    </div>
    <div class="form-control col-span-1 md:col-span-2">
      <label class="label">
        <span class="label-text">Complemento</span>
      </label>
      <textarea type="text" ref="textarea" placeholder="Informe o complemento" name="complemento" id="complemento"
        v-model="state.complemento" class="input input-bordered w-full overflow-y-hidden py-4" />
    </div>
  </div>
</template>