<template>
  <div>
    <div class="mb-4 text-xl">Editar Produto</div>
    <div>
      <div class="form-control w-full max-w-sm">
        <form-product ref="formEl" v-model="state" />

        <div v-if="product?.images?.length || 0 > 0">
          <div class="divider pt-0">
            <Icon name="mdi:cloud" class="text-base-300" size="50px" />
          </div>

          <div class="my-4 grid grid-cols-3 gap-4">
            <div
              v-for="(image, i) in product?.images"
              :key="i"
              class="relative rounded-lg"
            >
              <img
                :src="usePrefixImages(image.Key)"
                class="aspect-square h-full w-full rounded-lg object-cover"
              />
              <Icon
                name="mdi:delete"
                class="absolute right-0 top-0 m-2 h-6 w-6 rounded-full bg-white p-1"
                @click="deleteImage(image.id)"
              />
            </div>
          </div>
        </div>

        <div class="grid gap-3">
          <button
            v-if="!isSending"
            class="btn btn-primary btn-block gap-3"
            @click="edit()"
          >
            Editar Produto
            <Icon size="24" name="ic:baseline-arrow-right-alt" />
          </button>
          <div v-else class="btn btn-primary btn-block">
            <ui-spinner />
          </div>
          <button
            v-if="!isSending"
            class="btn btn-error btn-block gap-3"
            @click="deletePost()"
          >
            Apagar Produto
            <Icon size="24" name="mdi:trash-outline" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ZodError } from "zod";
import { FetchError } from "ofetch";
import { VueElement } from "nuxt/dist/app/compat/capi";

const formEl = ref<any>(null);
const alert = new NuxaAlert();
const route = useRoute();
const {
  data: product,
  pending,
  refresh,
  error,
} = await useFetch(`/api/v1/private/product/${route.params.productid}`);

const state = ref({
  name: "",
  description: "",
  price: 0,
  files: [] as Array<File>,
});

const isSending = ref(false);

Object.assign(state.value, product.value);

const formdata = computed(() => {
  const form = new FormData();
  form.append(
    "fields",
    JSON.stringify({
      ...state.value,
      businessId: useRoute().params.id.toString(),
    }),
  );
  state.value.files.forEach((file: any, i: number) => {
    if (file instanceof File) {
      return form.append(`files-${i}`, file);
    }
  });
  return form;
});
const edit = async () => {
  const triggerEdit = async () => {
    try {
      formEl.value.touch();
      useSchemas.createProductSchema.parse(state.value);
      isSending.value = true;
      await $fetch(`/api/v1/private/product/${route.params.productid}`, {
        method: "PATCH",
        body: formdata.value,
      });
      alert.success({
        title: "Sucesso!",
        body: "Dados de produto atualizados com sucesso",
        cancel: "continuar",
      });
      await refreshNuxtData("product-get");
      state.value.files.length = 0;
      refresh();
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
          triggerEdit,
        );
      }
    } finally {
      isSending.value = false;
    }
  };
  alert.danger(
    {
      title: "Atenção!",
      body: `Você está prestes a alterar o produto <code>${state.value.name}</code>, você tem certeza?`,
      cancel: "Cancelar",
      accept: "Avançar",
    },
    triggerEdit,
  );
};
const deleteImage = async (id: string) => {
  const triggerDelete = async () => {
    try {
      await $fetch(`/api/v1/private/image/${id}`, {
        method: "DELETE",
      });
      await refreshNuxtData("product-get");
      refresh();
      alert.success({
        title: "Sucesso",
        body: "Imagem deletada com sucesso",
        cancel: "continuar",
      });
    } catch (e) {
      if (e instanceof FetchError) {
        return alert.warning(
          {
            title: "Erro",
            body: "Não foi possível apagar imagem, tente novamente mais tarde.",
            cancel: "Voltar",
            accept: "Tentar novamente",
          },
          triggerDelete,
        );
      }
    }
  };
  alert.danger(
    {
      title: "Atenção!",
      body: "Você está prestes a deletar imagem",
      cancel: "Cancelar",
      accept: "Avançar",
    },
    triggerDelete,
  );
};
const deletePost = async () => {
  const triggerDelete = async () => {
    try {
      await $fetch(`/api/v1/private/product/${route.params.productid}`, {
        method: "DELETE",
        body: {
          businessId: route.params.id,
        },
      });
      await refreshNuxtData("product-get");
      useRouter().push({
        name: "dashboard-id-produto",
        params: { id: route.params.id },
      });
      refresh();
    } catch (e) {
      if (e instanceof FetchError) {
        return alert.warning(
          {
            title: "Erro",
            body: "Não foi possível apagar produto, tente novamente mais tarde.",
            cancel: "Voltar",
            accept: "Tentar novamente",
          },
          triggerDelete,
        );
      }
    }
  };
  alert.danger(
    {
      title: "Atenção!",
      body: `Você está prestes a deletar o produto <code>${state.value.name}</code>, você tem certeza?`,
      cancel: "Cancelar",
      accept: "Avançar",
    },
    triggerDelete,
  );
};
</script>
