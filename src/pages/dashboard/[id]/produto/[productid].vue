<template>
  <div>
    <div class="text-xl mb-4">Editar Produto</div>
    <div>
      <div class="form-control w-full max-w-sm">
        <form-product v-model="state" />

        <div v-if="product?.images?.length || 0 > 0">
          <div class="divider pt-0">
            <Icon name="mdi:cloud" class="text-base-300" size="50px" />
          </div>

          <div class="grid gap-4 grid-cols-3 mt-4 mb-4">
            <div class="rounded-lg relative" v-for="(image, i) in product?.images" :key="i">
              <img :src="image.secure_url" class="object-cover rounded-lg w-full h-full aspect-square">
              <Icon @click="deleteImage(image.id)" name="mdi:delete"
                class="absolute right-0 top-0 h-6 w-6 bg-white rounded-full m-2 p-1" />
            </div>
          </div>
        </div>

        <button v-if="!isSending" @click="edit()" class="btn btn-block btn-primary gap-3">
          Editar Produto
          <Icon size="24" name="ic:baseline-arrow-right-alt" />
        </button>
        <div v-else class="btn btn-block btn-primary">
          <ui-spinner />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { data: product, pending, refresh, error } = await useFetch(`/api/v1/private/product/${route.params.productid}`)

const state = ref({
  name: '',
  description: '',
  price: 0,
  files: [] as Array<File>
})

const isSending = ref(false);

Object.assign(state.value, product.value);

const formdata = computed(() => {
  const form = new FormData()
  form.append('fields', JSON.stringify({
    ...state.value,
    businessId: useRoute().params.id.toString()
  }))
  state.value.files.forEach((file: any, i: number) => {
    if (file instanceof File) return form.append(`files-${i}`, file);
  });
  return form;
})
const edit = () => {
  isSending.value = true;
  $fetch(`/api/v1/private/product/${route.params.productid}`, {
    method: "PATCH",
    body: formdata.value,
  }).then(async (e) => {
    await refreshNuxtData('product-get');
    state.value.files.length = 0;
    refresh();
  }).finally(() => isSending.value = false)
}
const deleteImage = async (id: string) => {
  await $fetch(`/api/v1/private/image/${id}`, {
    method: "DELETE",
  }).then(async (e) => {
    await refreshNuxtData('product-get');
    refresh();
  })
}
</script>