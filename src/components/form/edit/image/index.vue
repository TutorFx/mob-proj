<template>
  <div class="card border border-base-200 bg-base-100">
    <div class="card-body gap-y-6">
      <div class="card-title flex-wrap justify-start gap-6">
        <div
          class="group relative grid h-24 w-24 place-content-center overflow-hidden rounded-full"
          @change="onSelect"
        >
          <div
            v-if="isDeleting || isUploading"
            class="absolute inset-0 grid place-content-center text-base-100"
          >
            <ui-spinner />
          </div>
          <div
            v-else
            class="absolute inset-0 hidden place-content-center text-base-100 group-hover:grid"
          >
            <Icon
              v-if="state.Image"
              size="32"
              name="mdi:trash-outline"
              class="group-hover:cursor-pointer"
              @click="onDelete"
            />
            <label v-else for="profile-img">
              <Icon
                size="32"
                name="mdi:file-document-edit-outline"
                class="group-hover:cursor-pointer"
              />
            </label>
          </div>

          <nuxt-img
            v-if="!state.Image"
            :src="`https://avatar.vercel.sh/${state.name}`"
          />
          <nuxt-img
            v-else
            class="min-h-full min-w-full object-cover"
            :src="usePrefixImages(state.Image?.Key)"
          />
          <input
            id="profile-img"
            ref="filepicker"
            type="file"
            accept="image/png, image/jpeg"
            name="profile"
            hidden
          />
        </div>
        <div class="relative grow grid-flow-row">
          <div>{{ state.name }}</div>
          <div class="text-base-300">
            {{ state.description }}
          </div>
        </div>
        <form-edit-btn />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FetchError } from "ofetch";
import type { IEditBusiness } from "~/types/edit";
const alert = new NuxaAlert();

const props = defineProps<{
  modelValue: IEditBusiness;
  refresh: () => void;
}>();
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

const filepicker = ref<HTMLInputElement>();
const isUploading = ref<boolean>(false);
const isDeleting = ref<boolean>(false);
const onDelete = async () => {
  alert.danger(
    {
      title: "Atenção!",
      body: /* html */ `Você está prestes a
      remover a foto de perfil
      de seu empreendimento. Você tem certeza?`,
      cancel: "Cancelar",
      accept: "Aceitar",
    },
    async () => {
      const triggerDelete = async () => {
        try {
          isDeleting.value = true;
          await $fetch(`/api/v1/private/image/${state.value.Image.id}`, {
            method: "DELETE",
          });
          await props.refresh();
        } catch (e) {
          if (e instanceof FetchError) {
            return alert.warning(
              {
                title: "Erro!",
                body: "Não foi possível remover imagem, tente novamente mais tarde",
                cancel: "Voltar",
                accept: "Tentar Novamente",
              },
              triggerDelete,
            );
          }
        } finally {
          isDeleting.value = false;
        }
      };
      triggerDelete();
    },
  );
};
const onSelect = async () => {
  try {
    const body = new FormData();
    Array.prototype.forEach.call(
      (filepicker.value as HTMLInputElement).files,
      function (file) {
        if (!(file instanceof File)) {
          return alert.danger({
            title: "Erro",
            body: "Não é uma imagem válida",
            cancel: "Voltar",
          });
        }
        if (!file.type.startsWith("image/")) {
          return alert.danger({
            title: "Erro",
            body: "Não é uma imagem válida",
            cancel: "Voltar",
          });
        }
        if (file.size > 5242880) {
          return alert.danger({
            title: "Erro",
            body: "Sua imagem é muito grande, tente selecionar uma imagem com menos de 5MB!",
            cancel: "Voltar",
          });
        }
        body.append("file", file);
      },
    );
    try {
      isUploading.value = true;
      await $fetch(`/api/v1/private/business/${state.value.id}/edit/image`, {
        body,
        method: "PUT",
      });
      await props.refresh();
      return alert.success({
        title: "Sucesso!",
        body: "A imagem de perfil foi atualizada com êxito",
        cancel: "Voltar",
      });
    } catch (e) {
      console.error(e);
    } finally {
      isUploading.value = false;
    }
  } catch (e) {
    console.error("Selection stopped by user.");
  }
};
</script>
