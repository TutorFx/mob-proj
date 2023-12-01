<template>
  <div class="grid max-w-3xl grid-cols-1 justify-start gap-6 md:grid-cols-2">
    <div class="grid gap-3">
      <div class="text-neutral">Nome do seu negócio</div>
      <input
        ref="name"
        v-model="state.name"
        type="text"
        class="input input-bordered w-full"
      />
      <ul>
        <li class="text-xs text-error">
          {{ getErrors("name") }}
        </li>
      </ul>
    </div>
    <div class="grid gap-3">
      <div class="text-neutral">Descrição</div>
      <input
        v-model="state.description"
        type="text"
        class="input input-bordered w-full"
      />
      <ul>
        <li class="text-xs text-error">
          {{ getErrors("description") }}
        </li>
      </ul>
    </div>
    <label class="text-neutral">
      <div class="mb-3">Link da empresa</div>
      <div class="grid grid-flow-col rounded-lg border border-base-300">
        <div
          class="bg-base grid items-center rounded-l-lg border-r border-base-300 px-4 text-xs"
        >
          <div class="truncate">{{ url }}loja/</div>
        </div>
        <input
          v-model="state.slug"
          type="text"
          class="bg-base input w-full rounded-r-lg text-sm"
          placeholder="minha-empresa"
        />
      </div>
      <ul>
        <li class="text-xs text-error">{{ getErrors("slug") }}</li>
      </ul>
    </label>
  </div>
</template>
<script lang="ts" setup>
import type { IEditBusiness } from "~/types/edit";
const config = useRuntimeConfig();
const url = config.public.URL;

const props = defineProps<{
  modelValue: IEditBusiness;
}>();

const result = computed(() =>
  useSchemas.createBusinessSchema.safeParse(state.value),
);
const errors = computed(() =>
  result.value.success ? {} : result.value.error.format(),
);

const getErrors = (field: string) => {
  // @ts-expect-error - Todo: Fix
  return errors.value?.[field]?._errors?.at(0);
};

const emits =
  defineEmits<(e: "update:modelValue", value: IEditBusiness) => void>();
const state = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits("update:modelValue", value);
  },
});

const name = ref<HTMLInputElement | null>();

onMounted(() => {
  name.value?.focus();
});
</script>
