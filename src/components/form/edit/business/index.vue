<template>
  <ui-card-edit title="Meu negócio">
    <form-edit-business-preview v-if="!editing" v-model="state" />
    <form-edit-business-fields v-else v-model="editingState" />
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

const editing = ref(false);
const editingState = ref({...state.value})
const updating = ref(false);

const onEdit = () => {
  editing.value = true;
}
const onApply = async () => {
  updating.value = true;
  await $fetch(`/api/v1/private/business/${state.value.id}/edit/naming`, {
    method: 'PATCH',
    body: {
      name: editingState.value.name,
      description: editingState.value.description,
      slug: editingState.value.slug,
    }
  }).then(async () => {
    try {
      editing.value = false;
      await props.refresh()
    } catch (e) {

    }
  }).finally(() => updating.value = false)
}
const onCancel = () => {
  editingState.value = {...state.value};
  editing.value = false;
}

</script>