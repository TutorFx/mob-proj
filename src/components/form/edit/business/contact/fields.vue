<template>
  <div class="grid max-w-3xl grid-cols-1 justify-start gap-6 md:grid-cols-2">
    <div class="grid gap-3">
      <div class="text-neutral">Número de Whatsapp</div>
      <input
        ref="whatsapp"
        v-model="state.whatsapp"
        v-maska
        type="text"
        data-maska="['(##) ####-####', '(##) # ####-####']"
        class="input input-bordered w-full"
      />
      <ul>
        <li class="text-xs text-error">
          {{ getErrors("whatsapp") }}
        </li>
      </ul>
    </div>
    <div class="grid gap-3">
      <div class="text-neutral">Email Empresarial</div>
      <input
        v-model="state.email"
        type="text"
        class="input input-bordered w-full"
      />
      <ul>
        <li class="text-xs text-error">
          {{ getErrors("email") }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { IBusinessProfile } from "@/types";

const props = defineProps<{
  modelValue: IBusinessProfile;
}>();

const result = computed(() =>
  useSchemas.businessContact.safeParse(state.value),
);
const errors = computed(() =>
  result.value.success ? {} : result.value.error.format(),
);

const getErrors = (field: string) => {
  // @ts-expect-error - Todo: Fix
  return errors.value?.[field]?._errors?.at(0);
};

const emits =
  defineEmits<(e: "update:modelValue", value: IBusinessProfile) => void>();
const state = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits("update:modelValue", value);
  },
});

const whatsapp = ref<HTMLInputElement | null>();

onMounted(() => {
  whatsapp.value?.focus();
});
</script>
