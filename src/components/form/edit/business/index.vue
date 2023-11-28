<template>
  <ui-card-edit title="Meu negócio">
    <form-edit-business-preview v-if="!editing" v-model="state" />
    <form-edit-business-fields v-else v-model="editingState" />
    <template #action>
      <form-edit-btn v-if="!editing" @click.prevent="onEdit" />
      <div v-else class="grid grid-flow-col gap-3">
        <form-edit-btn-cancel @click.prevent="onCancel" />
        <form-edit-btn-apply :updating="updating" @click.prevent="onApply" />
      </div>
    </template>
  </ui-card-edit>
</template>
<script lang="ts" setup>
import { FetchError } from "ofetch";
import { ZodError } from "zod";
import type { IEditBusiness } from "~/types/edit";
const alert = new NuxaAlert();

const props = defineProps<{
  modelValue: IEditBusiness;
  refresh: Function;
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

const editing = ref(false);
const editingState = ref({ ...state.value });
const updating = ref(false);

const onEdit = () => {
  editing.value = true;
};
const onApply = async () => {
  const triggerApply = async () => {
    try {
      useSchemas.createBusinessSchema.parse(editingState.value);
      updating.value = true;
      await $fetch(`/api/v1/private/business/${state.value.id}/edit/naming`, {
        method: "PATCH",
        body: {
          name: editingState.value.name,
          description: editingState.value.description,
          slug: editingState.value.slug,
        },
      });
      editing.value = false;
      await props.refresh();
      alert.success({
        title: "Sucesso!",
        body: "Dados atualizados com sucesso",
        cancel: "continuar",
      });
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
          triggerApply,
        );
      }
    } finally {
      updating.value = false;
    }
  };
  alert.danger(
    {
      title: "Atenção!",
      body: "Você está prestes a alterar informações de seu empreendimento",
      cancel: "Voltar à segurança",
      accept: "Continuar",
    },
    async () => {
      triggerApply();
    },
  );
};
const onCancel = () => {
  editingState.value = { ...state.value };
  editing.value = false;
};
</script>
