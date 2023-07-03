<template>
  <ui-card-edit title="Endereço">
    <form-edit-business-addr-preview class="max-w-3xl" v-if="!editing" v-model="state" />
    <form-addr class="max-w-3xl" v-else v-model="editingState" :valid="valid" />
    <template #action>
      <form-edit-btn v-if="!editing" @click.prevent="onEdit" />
      <div class="grid gap-3 grid-flow-col" v-else>
        <form-edit-btn-cancel @click.prevent="onCancel" />
        <form-edit-btn-apply @click.prevent="onApply" :updating="updating" />
      </div>
    </template>
  </ui-card-edit>
</template>
<script lang="ts" setup>
import { IEditBusiness } from '~/types/edit';

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
const valid = ref(true)
const addr_default = {
  cep: '',
  endereco: '',
  numero: null,
  bairro: '',
  cidade: 0,
  estado: 0,
  complemento: '',
}

const editing = ref(false);
const editingState = ref({...(state.value.Address ?? addr_default)})
const updating = ref(false);

const onEdit = () => {
  editing.value = true;
}
const onApply = async () => {
  updating.value = true;
  await $fetch(`/api/v1/private/business/${state.value.id}/edit/address`, {
    method: 'PATCH',
    body: editingState.value
  }).then(async () => {
    try {
      editing.value = false;
      await props.refresh()
    } catch (e) {

    }
  }).finally(() => updating.value = false)
}
const onCancel = () => {
  editingState.value = {...(state.value.Address ?? addr_default)};
  editing.value = false;
}

</script>