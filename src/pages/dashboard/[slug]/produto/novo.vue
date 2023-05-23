<template>
  <div class="text-xl mb-4">Novo produto</div>
  <div>
    <div class="form-control w-full max-w-xs">
    <form-product v-model="state" />
    <button @click="post" class="btn btn-block btn-primary gap-3">
      Postar Produto
      <Icon size="24" name="ic:baseline-arrow-right-alt" />
    </button>
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

const formdata = computed(() => {
  const form = new FormData()
  form.append('fields', JSON.stringify({
    ...state.value,
    businessId: useRoute().params.slug.toString()
  }))
  state.value.files.forEach((file, i) => {
    if(file instanceof File) return form.append(`files-${i}`, file);
  });
  return form;
})

const { pending, error, refresh } = useLazyAsyncData('product-create', () => $fetch(`/api/v1/private/product`, {
  method: "PUT",
  body: formdata.value,
}).then((e) => {
  router.push({ path: `${e?.id}` });
  refreshNuxtData('product-get');
}),
  {
    immediate: false
  }
)

const post = () => {
  refreshNuxtData('product-create')
}
</script>