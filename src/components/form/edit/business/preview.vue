<template>
  <div class="grid max-w-3xl grid-cols-1 justify-start gap-6 md:grid-cols-2">
    <div class="grid w-full gap-3">
      <div class="text-base-content">Nome do seu negócio</div>
      <div class="text-content truncate text-lg">
        {{ state.name ?? "Sem nome" }}
      </div>
    </div>
    <div class="grid w-full gap-3">
      <div class="text-base-content">Descrição</div>
      <div class="text-content truncate text-lg">
        {{ state.description ?? "Sem descrição" }}
      </div>
    </div>
    <div class="col-span-1 grid gap-3 md:col-span-2">
      <div class="text-base-content">Link da empresa</div>
      <div class="text-content truncate text-lg">
        <span class="text-base-content">{{ `${url}loja/` }}</span
        >{{ state.slug }}
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { IBusinessProfile } from "@/types";

const config = useRuntimeConfig();
const url = config.public.URL;

const props = defineProps<{
  modelValue: IBusinessProfile;
}>();

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
</script>
