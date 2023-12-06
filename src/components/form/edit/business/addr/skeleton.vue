<template>
  <div class="grid grid-cols-1 gap-3 lg:grid-cols-3">
    <div class="form-control">
      <label>
        <span class="label-text">CEP</span>
      </label>
      <div>
        {{ state.Address?.cep ?? "CEP não definido" }}
      </div>
    </div>
    <div class="form-control">
      <label>
        <span class="label-text">Estado</span>
      </label>
      <div>{{ place?.stateData.Nome ?? "Estado não definido" }}</div>
    </div>
    <div class="form-control">
      <label>
        <span class="label-text">Cidade</span>
      </label>
      <div>{{ place?.cityData.Nome ?? "Cidade não definida" }}</div>
    </div>
    <div class="form-control">
      <label>
        <span class="label-text">Bairro</span>
      </label>
      <div>{{ state.Address?.bairro ?? "Bairro não definido" }}</div>
    </div>
    <div class="form-control">
      <label>
        <span class="label-text">Endereço</span>
      </label>
      <div>{{ state.Address?.endereco ?? "Endereço não definido" }}</div>
    </div>
    <div class="form-control">
      <label>
        <span class="label-text">Numero</span>
      </label>
      <div>{{ state.Address?.numero ?? "Numero não definido" }}</div>
    </div>
    <div class="form-control col-span-1 md:col-span-2">
      <label>
        <span class="label-text">Complemento</span>
      </label>
      <div>{{ state.Address?.complemento ?? "Complemento não definido" }}</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { IBusinessProfile } from "@/types";

const props = defineProps<{
  modelValue: IBusinessProfile;
}>();

type BusinessProfileWithPlaceData = IBusinessProfile & {
  stateData?: { Nome: string };
  cityData?: { nome: string };
};

const emits =
  defineEmits<(e: "update:modelValue", value: IBusinessProfile) => void>();
const state = computed<BusinessProfileWithPlaceData>({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits("update:modelValue", value);
  },
});
const place = ref();
if (state.value?.stateData?.Nome && state.value?.cityData?.nome) {
  place.value = await $fetch("/api/v1/address/", {
    query: {
      cityId: state.value.Address?.cidade,
      stateId: state.value.Address?.estado,
    },
  });
}
</script>
