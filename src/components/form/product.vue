<template>
  <label class="mb-3">
    <div class="label-text mb-3">Nome</div>
    <input
      v-model="modelValue.name"
      type="text"
      placeholder="Ex: Bancada de Mármore"
      class="input input-bordered w-full"
    />
    <div class="text-error">{{ getErrors("name") }}</div>
  </label>
  <label class="mb-3">
    <div class="grid grid-flow-col justify-between">
      <div class="label-text mb-3">Descrição</div>
      <div class="btn btn-xs gap-2" @click="triggerSuggest()">
        <span>{{
          modelValue.description.length > 7 ? "Melhorar" : "Criar"
        }}</span>
        <span class="text-yellow-400">AI</span>
        <Icon name="twemoji:sparkles" size="18" />
      </div>
    </div>
    <ui-inputs-text-area
      v-model="modelValue.description"
      class="textarea textarea-bordered w-full"
      placeholder="Ex: Adquira já uma bela bancada de mármore para sua casa"
    />
    <div class="text-error">{{ getErrors("description") }}</div>
  </label>
  <label class="mb-3">
    <div class="label-text mb-3">Preço</div>
    <Money3Component
      v-model.number="modelValue.price"
      decimal=","
      thousands="."
      type="text"
      placeholder="Ex: R$ 8000,00"
      class="input input-bordered w-full"
    />
    <div class="text-error">{{ getErrors("price") }}</div>
  </label>
  <label class="mb-3">
    <div class="label-text mb-3">Fotos</div>
    <product-admin-dropzone v-model="modelValue.files" />
    <div class="text-error">{{ getErrors("files") }}</div>
  </label>
</template>

<script lang="ts" setup>
import { Money3Component } from "v-money3";
import type { IProductForm } from "~/types";

const props = defineProps<{ modelValue: IProductForm }>();
const emits =
  defineEmits<(e: "update:modelValue", value: IProductForm) => void>();
const state = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits("update:modelValue", value);
  },
});

const result = computed(() =>
  useSchemas.createProductSchema.safeParse(state.value),
);
const errors = computed(() =>
  result.value.success ? {} : result.value.error.format(),
);

const isDirty = ref(false);

const getErrors = (field: string) => {
  if (Object.keys(errors.value).length === 0) {
    return;
  }
  // @ts-expect-error TODO: Refactor
  const error = errors.value?.[field] ?? [];
  return isDirty.value ? error?._errors?.at(0) : undefined;
};

const touch = () => (isDirty.value = true);
const triggerSuggest = async () => {
  const response = await $fetch("/api/v1/private/gpt/description", {
    method: "POST",
    body: state.value,
  });
  const predict = response.choices.at(0);

  if (!predict) {
    return;
  }
  console.log(predict);
  state.value.description = predict.text;
};

defineExpose({
  touch,
});
</script>
