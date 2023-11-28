<script lang="ts" setup>
import type { Tcontact } from "~/types/user";

const props = withDefaults(
  defineProps<{
    modelValue: Tcontact;
    valid: boolean;
  }>(),
  {},
);

const emits = defineEmits<{
  (e: "update:modelValue", value: Tcontact): void;
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

const result = computed(() => useSchemas.contact.safeParse(state.value));
const errors = computed(() =>
  result.value.success ? {} : result.value.error.format(),
);

watchEffect(() => (valid.value = result.value.success));

const isDirty = ref(true);

const getErrors = (field: string) => {
  // @ts-expect-error
  return isDirty.value ? errors.value?.[field]?._errors?.at(0) : undefined;
};

const touch = () => (isDirty.value = true);

defineExpose({
  touch,
});
</script>

<template>
  <div class="grid grid-cols-1 gap-3 lg:grid-cols-3">
    <div class="form-control">
      <label class="label">
        <span class="label-text">Nome</span>
      </label>
      <input
        id="nome"
        v-model="state.nome"
        type="text"
        placeholder="Preencha seu nome"
        name="nome"
        class="input input-bordered w-full"
      />
      <ul>
        <li class="text-xs text-error">
          {{ getErrors("nome") }}
        </li>
      </ul>
    </div>
    <div class="form-control">
      <label class="label">
        <span class="label-text">Celular</span>
      </label>
      <input
        id="celular"
        v-model="state.celular"
        v-maska
        type="text"
        data-maska="['(##) ####-####', '(##) # ####-####']"
        placeholder="Preencha seu celular"
        name="celular"
        class="input input-bordered w-full"
      />
      <ul>
        <li class="text-xs text-error">
          {{ getErrors("celular") }}
        </li>
      </ul>
    </div>
  </div>
</template>
