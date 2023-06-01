<template>
  <div class="text-xl mb-4">Novo produto</div>
  <div>
    <div class="form-control w-full max-w-xs">
      <form-product v-model="state" />
      <button v-if="!isCreating" @click="post" class="btn btn-block btn-primary gap-3">
        Postar Produto
        <Icon size="24" name="ic:baseline-arrow-right-alt" />
      </button>
      <div v-else class="btn btn-block btn-primary">
        <ui-spinner />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();

const state = ref({
  name: '',
  description: '',
  price: 0,
  files: [] as Array<File>
})

const isCreating = ref(false);

const formdata = computed(() => {
  const form = new FormData()
  form.append('fields', JSON.stringify({
    ...state.value,
    businessId: useRoute().params.slug.toString()
  }))
  state.value.files.forEach((file, i) => {
    if (file instanceof File) return form.append(`files-${i}`, file);
  });
  return form;
})

const post = async () => {
  isCreating.value = true;
  await $fetch(`/api/v1/private/product`, {
    method: "PUT",
    body: formdata.value,
  }).then(async (e) => {
    await router.push({ path: `${e?.id}` });
    await refreshNuxtData('product-get');
  }).finally(() => isCreating.value = false)
}
</script>