<template>
  <div>
    <div class="mb-4 text-xl">Novo produto</div>
    <div>
      <div class="form-control w-full max-w-xs">
        <form-product ref="formEl" v-model="state" />
        <button
          v-if="!isCreating"
          class="btn btn-primary btn-block gap-3"
          @click="post"
        >
          Postar Produto
          <Icon size="24" name="ic:baseline-arrow-right-alt" />
        </button>
        <div v-else class="btn btn-primary btn-block">
          <ui-spinner />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ZodError } from "zod";
import { FetchError } from "ofetch";
import type { Product } from "@prisma/client";

const router = useRouter();
const alert = new NuxaAlert();

const state = ref({
  name: "",
  description: "",
  price: 0,
  files: [] as Array<File>,
});

const formEl = ref<any>(null);
const isCreating = ref(false);

const formdata = computed(() => {
  const form = new FormData();
  form.append(
    "fields",
    JSON.stringify({
      ...state.value,
      businessId: useRoute().params.id.toString(),
    }),
  );
  state.value.files.forEach((file, i) => {
    if (file instanceof File) {
      return form.append(`files-${i}`, file);
    }
  });
  return form;
});

const post = async () => {
  const triggerPost = async () => {
    try {
      formEl.value.touch();
      useSchemas.createProductSchema.parse({
        ...state.value,
        businessId: useRoute().params.id.toString(),
      });
      isCreating.value = true;
      const response = await $fetch<Product>("/api/v1/private/product", {
        method: "PUT",
        body: formdata.value,
      });
      alert.success({
        title: "Sucesso!",
        body: `Produto <code>${state.value.name}</code> criado com sucesso`,
        cancel: "continuar",
      });
      await router.push({ path: `${response?.id}` });
      await refreshNuxtData("product-get");
    } catch (e) {
      if (e instanceof ZodError) {
        return alert.warning({
          title: "Dados inválidos",
          body: "Por favor, preencha os campos requisitados corretamente e tente novamente",
          cancel: "Voltar",
        });
      }
      if (e instanceof FetchError) {
        return alert.warning(
          {
            title: "Erro ao enviar dados",
            body: "Tente novamente mais tarde",
            cancel: "Voltar",
            accept: "Tentar novamente",
          },
          triggerPost,
        );
      }
    } finally {
      isCreating.value = false;
    }
  };
  triggerPost();
};
</script>
