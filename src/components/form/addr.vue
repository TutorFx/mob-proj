<script lang="ts" setup>
import { useTextareaAutosize } from "@vueuse/core";
import type { TAddress } from "@/types/addr";
import type { IViacep } from "@/types";

const { textarea, input } = useTextareaAutosize();

const props = withDefaults(
  defineProps<{
    modelValue: TAddress;
    valid: boolean;
  }>(),
  {},
);

const emits = defineEmits<{
  (e: "update:modelValue", value: TAddress): void;
  (e: "update:valid", value: boolean): void;
}>();

const state = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits("update:modelValue", value);
  },
});

const valid = computed({
  get() {
    return props.valid;
  },
  set(value) {
    emits("update:valid", value);
  },
});

const isDirty = ref(true);

const touch = () => (isDirty.value = true);
defineExpose({
  touch,
});

watch(
  () => state.value.complemento,
  (newVal) => {
    input.value = newVal;
  },
  { deep: true },
);

const [
  { data: viacep, error: viacepError },
  { data: estados },
  { data: cidades },
] = await Promise.all([
  useAsyncData(
    "cep",
    () => $fetch<IViacep>(`https://viacep.com.br/ws/${state.value.cep}/json/`),
    { immediate: false },
  ),
  useAsyncData("state", () => $fetch<unknown>("/api/v1/address/state")),
  useAsyncData(
    "city",
    () => $fetch<unknown>(`/api/v1/address/city/${state.value.estado}`),
    { immediate: false },
  ),
]);

if (state.value.estado) {
  await refreshNuxtData("city");
}

watch(
  () => state.value.cep,
  async () => {
    if (state.value.cep?.length !== 9) {
      return;
    }
    await refreshNuxtData("cep");
    if (viacepError.value) {
      return;
    }
    if (!viacep.value) {
      return;
    }
    const {
      logradouro,
      complemento,
      bairro,
      uf,
      ibge /* gia, ddd, siafi, localidade */,
    } = viacep.value;
    const { data: estado } = await useFetch(
      `/api/v1/address/state/getid/${uf}`,
    );
    const { data: municipio } = await useFetch(
      `/api/v1/address/city/getid/${ibge}`,
    );
    Object.assign(state.value, {
      endereco: logradouro,
      complemento,
      bairro,
    });
    if (!estado.value) {
      return;
    }
    Object.assign(state.value, {
      estado: estado.value?.Id ?? 0,
    });
    nextTick(() => {
      if (!municipio.value) {
        return;
      }
      Object.assign(state.value, {
        cidade: municipio.value?.Id ?? 0,
      });
    });
  },
  { deep: true },
);

watch(
  () => state.value.estado,
  async () => {
    state.value.cidade = 0;
    await refreshNuxtData("city");
  },
);

const result = computed(() => useSchemas.address.safeParse(state.value));
const errors = computed(() =>
  result.value.success ? {} : result.value.error.format(),
);

watchEffect(() => (valid.value = result.value.success));

const getErrors = (field: string) => {
  // @ts-expect-error - TODO: Fix
  return isDirty.value ? errors.value?.[field]?._errors?.at(0) : undefined;
};
</script>

<template>
  <div class="grid grid-cols-1 gap-3 lg:grid-cols-3">
    <div class="form-control">
      <label class="label">
        <span class="label-text">CEP</span>
      </label>
      <input
        id="cep"
        v-model="state.cep"
        v-maska
        type="text"
        placeholder="00000-000"
        name="cep"
        class="input input-bordered w-full"
        data-maska="#####-###"
      />
      <ul>
        <li class="text-xs text-error">
          {{ getErrors("cep") }}
        </li>
      </ul>
    </div>
    <div class="form-control">
      <label class="label">
        <span class="label-text">Estado</span>
      </label>
      <select
        id="estado"
        v-model="state.estado"
        placeholder="Informe seu estado"
        name="estado"
        class="input input-bordered w-full"
      >
        <option :value="0" selected disabled>Selecione</option>
        <option
          v-for="estado in estados"
          :key="estado.CodigoUf"
          :value="estado.Id"
        >
          {{ estado.Uf }} - {{ estado.Nome }}
        </option>
      </select>
      <ul>
        <li class="text-xs text-error">
          {{ getErrors("estado") }}
        </li>
      </ul>
    </div>
    <div class="form-control">
      <label class="label">
        <span class="label-text">Cidade</span>
      </label>
      <select
        id="cidade"
        v-model="state.cidade"
        placeholder="Informe sua cidade"
        name="cidade"
        class="input input-bordered w-full"
      >
        <option :value="0" selected disabled>Selecione</option>
        <option
          v-for="cidade in cidades"
          :key="cidade.Codigo"
          :value="cidade.Id"
        >
          {{ cidade.Nome }}
        </option>
      </select>
      <ul>
        <li class="text-xs text-error">
          {{ getErrors("cidade") }}
        </li>
      </ul>
    </div>
    <div class="form-control">
      <label class="label">
        <span class="label-text">Bairro</span>
      </label>
      <input
        id="bairro"
        v-model="state.bairro"
        type="text"
        placeholder="Informe seu bairro"
        name="bairro"
        class="input input-bordered w-full"
      />
      <ul>
        <li class="text-xs text-error">
          {{ getErrors("bairro") }}
        </li>
      </ul>
    </div>
    <div class="form-control">
      <label class="label">
        <span class="label-text">Endereço</span>
      </label>
      <input
        id="endereco"
        v-model="state.endereco"
        type="text"
        placeholder="Informe seu endereço"
        name="endereco"
        class="input input-bordered w-full"
      />
      <ul>
        <li class="text-xs text-error">
          {{ getErrors("endereco") }}
        </li>
      </ul>
    </div>
    <div class="form-control">
      <label class="label">
        <span class="label-text">Numero</span>
      </label>
      <input
        id="numero"
        v-model="state.numero"
        type="number"
        placeholder="Informe seu número"
        name="numero"
        class="input input-bordered w-full"
      />
    </div>
    <div class="form-control col-span-1 md:col-span-2">
      <label class="label">
        <span class="label-text">Complemento</span>
      </label>
      <textarea
        id="complemento"
        ref="textarea"
        v-model="state.complemento"
        type="text"
        placeholder="Informe o complemento"
        name="complemento"
        class="input input-bordered w-full overflow-y-hidden py-4"
      />
    </div>
  </div>
</template>
