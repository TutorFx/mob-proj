<template>
  <div v-if="!pending">
    <nuxt-link class="group border-b group-last:border-b-0 block" v-for="(product, i) in data" :key="i"
      :to="`/dashboard/${useRoute().params?.id}/produto/${product.id}`">
      <div
        class="px-6 py-3 items-center justify-start gap-3 grid grid-cols-[max-content_1fr_1fr_max-content]">
        <div class="w-8 h-8 rounded-xl overflow-hidden">
          <img class="object-cover min-h-full min-w-full"
            :src="product?.images[0]?.Key ? usePrefixImages(product?.images[0]?.Key) : `https://avatar.vercel.sh/${product.id}`"
            :alt="`Foto de um ${product.name} ${product.description}`">
        </div>
        <div class="truncate font-semibold">{{ product.name }}</div>
        <div class="truncate">{{ product.description }}</div>
        <div class="btn btn-circle btn-md btn-ghost group-hover:bg-base-300 group-hover:text-base-content">
          <Icon name="mdi:edit" size="24" />
        </div>
      </div>
    </nuxt-link>
  </div>
  <div v-else>
    <div v-for="i in 3" :key="i"
        class="px-6 py-3 border-b group-last:border-b-0 items-center justify-start gap-3 grid grid-cols-[max-content_1fr_1fr_max-content]">
        <div class="w-8 h-8 rounded-xl overflow-hidden isloading"></div>
        <div class="truncate font-semibold h-3 w-full isloading"></div>
        <div class="truncate h-3 w-full isloading"></div>
        <div class="btn btn-circle btn-md btn-ghost group-hover:bg-base-300 group-hover:text-base-content">
          <div class="h-6 w-6 isloading rounded-md"></div>
        </div>
      </div>
  </div>
</template>

<script lang="ts" setup>
const { pending, error, refresh, data } = useAsyncData('product-get', () => $fetch(`/api/v1/private/product`,
  {
    method: "GET",
    params: {
      businessId: useRoute().params?.id
    },
    headers: useRequestHeaders(['cookie'])
  }),
);
watch(useRoute(),
  async (newVal) => {
    if (newVal.params.id) {
      await refresh()
    }
  }
)
</script>