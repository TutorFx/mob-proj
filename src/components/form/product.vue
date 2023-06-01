<template>
  <label class="mb-3">
    <div class="label-text mb-3">Nome</div>
    <input type="text" v-model="modelValue.name" placeholder="Ex: Bancada de Mármore"
      class="input input-bordered w-full" />
  </label>
  <label class="mb-3">
    <div class="label-text mb-3">Descrição</div>
    <textarea v-model="modelValue.description" class="textarea textarea-bordered w-full"
      placeholder="Ex: Adquira já uma bela bancada de mármore para sua casa"></textarea>
  </label>
  <label class="mb-3">
    <div class="label-text mb-3">Preço</div>
    <input v-model.number="modelValue.price" type="text" placeholder="Ex: R$ 8000,00"
      class="input input-bordered w-full" />
  </label>
  <label class="mb-3">
    <div class="label-text mb-3">Fotos</div>
    <product-admin-dropzone v-model="modelValue.files" />
  </label>
</template>

<script lang="ts" setup>
defineProps<{ modelValue: IProductForm }>()
defineEmits(['update:modelValue'])
</script>