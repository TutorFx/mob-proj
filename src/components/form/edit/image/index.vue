
<template>
  <div class="card bg-base-100 border-base-200 border">
    <div class="card-body gap-y-6">
      <div class="card-title justify-start flex-wrap gap-6">
        <div @change="onSelect" class="group w-24 h-24 relative rounded-full overflow-hidden grid place-content-center">
          <div v-if="isDeleting || isUploading" class="inset-0 absolute place-content-center grid text-base-100">
            <ui-spinner />
          </div>
          <div v-else class="inset-0 absolute place-content-center hidden group-hover:grid text-base-100">
            <Icon @click="onDelete" v-if="state.Image" size="32" name="mdi:trash-outline"
              class="group-hover:cursor-pointer" />
            <label v-else for="profile-img">
              <Icon size="32" name="mdi:file-document-edit-outline" class="group-hover:cursor-pointer" />
            </label>
          </div>

          <nuxt-img v-if="!state.Image" :src="`https://avatar.vercel.sh/${state.name}`" />
          <nuxt-img v-else class="object-cover min-h-full min-w-full" :src="usePrefixImages(state.Image?.Key)" />
          <input type="file" accept="image/png, image/jpeg" name="profile" id="profile-img" ref="filepicker" hidden>
        </div>
        <div class="relative grow grid-flow-row">
          <div>{{ state.name }}</div>
          <div class="text-base-300">{{ state.description }}</div>
        </div>
        <form-edit-btn />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FetchError } from 'ofetch'
import { IEditBusiness } from "~/types/edit";
const alert = new NuxaAlert()

const props = defineProps<{
  modelValue: IEditBusiness,
  refresh: Function
}>();
const emits = defineEmits<(e: 'update:modelValue', value: IEditBusiness) => void>()
const state = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emits('update:modelValue', value)
  }
})

const filepicker = ref<HTMLInputElement>()
const isUploading = ref<boolean>(false)
const isDeleting = ref<boolean>(false)
const onDelete = async () => {
  alert.danger({
    title: 'Atenção!',
    body:
      /* html */`Você está prestes a
      remover a foto de perfil
      de seu empreendimento. Você tem certeza?`,
    cancel: 'Cancelar',
    accept: 'Aceitar',
  }, async () => {
    const triggerDelete = async () => {
      try {
        isDeleting.value = true;
        await $fetch(`/api/v1/private/image/${state.value.Image.id}`, { method: 'DELETE' });
        await props.refresh();
      } catch (e) {
        if (e instanceof FetchError) return alert.warning({
          title: `Erro!`,
          body: `Não foi possível remover imagem, tente novamente mais tarde`,
          cancel: 'Voltar',
          accept: 'Tentar Novamente'
        }, triggerDelete)
      } finally {
        isDeleting.value = false;
      }
    }
    triggerDelete()
  })
}
const onSelect = async () => {
  try {
    const body = new FormData()
    Array.prototype.forEach.call((filepicker.value as HTMLInputElement).files, function (file) {
      if (!(file instanceof File))
        return alert.danger({
          title: 'Erro',
          body: `Não é uma imagem válida`,
          cancel: 'Voltar',
        })
      if (!file.type.startsWith("image/"))
        return alert.danger({
          title: 'Erro',
          body: `Não é uma imagem válida`,
          cancel: 'Voltar',
        })
      if (file.size > 5242880)
        return alert.danger({
          title: 'Erro',
          body: `Sua imagem é muito grande, tente selecionar uma imagem com menos de 5MB!`,
          cancel: 'Voltar',
        })
      body.append('file', file);
    });
    try {
      isUploading.value = true;
      await $fetch(`/api/v1/private/business/${state.value.id}/edit/image`, { body, method: 'PUT' });
      await props.refresh();
      return alert.success({
        title: 'Sucesso!',
        body: `A imagem de perfil foi atualizada com êxito`,
        cancel: 'Voltar',
      })
    } catch (e) {
      console.error(e)
    } finally { isUploading.value = false; }
  } catch (e) {
    console.error("Selection stopped by user.");
  }
};
</script>