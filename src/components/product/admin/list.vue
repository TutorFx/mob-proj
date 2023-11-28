<template>
  <div v-if="!pending">
    <nuxt-link
      v-for="(product, i) in data"
      :key="i"
      class="group block border-b group-last:border-b-0"
      :to="`/dashboard/${useRoute().params?.id}/produto/${product.id}`"
    >
      <div
        class="grid grid-cols-[max-content_1fr_1fr_max-content] items-center justify-start gap-3 px-6 py-3"
      >
        <div class="h-8 w-8 overflow-hidden rounded-xl">
          <nuxt-img
            class="min-h-full min-w-full object-cover"
            fit="cover"
            height="32"
            width="32"
            :src="product?.images[0]?.Key ? usePrefixImages(product?.images[0]?.Key) : `https://avatar.vercel.sh/${product.id}`"
            :alt="`Foto de um ${product.name} ${product.description}`"
          />
        </div>
        <div class="truncate font-semibold">
          {{ product.name }}
        </div>
        <div class="truncate">
          {{ product.description }}
        </div>
        <div class="btn btn-circle btn-ghost btn-md group-hover:bg-base-300 group-hover:text-base-content">
          <Icon name="mdi:edit" size="24" />
        </div>
      </div>
    </nuxt-link>
  </div>
  <div v-else>
    <div
      v-for="i in 3"
      :key="i"
      class="grid grid-cols-[max-content_1fr_1fr_max-content] items-center justify-start gap-3 border-b px-6 py-3 group-last:border-b-0"
    >
      <div class="isloading h-8 w-8 overflow-hidden rounded-xl" />
      <div class="isloading h-3 w-full truncate font-semibold" />
      <div class="isloading h-3 w-full truncate" />
      <div class="btn btn-circle btn-ghost btn-md group-hover:bg-base-300 group-hover:text-base-content">
        <div class="isloading h-6 w-6 rounded-md" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { pending, error, refresh, data } = useAsyncData('product-get', () => $fetch('/api/v1/private/product',
  {
    method: 'GET',
    params: {
      businessId: useRoute().params?.id
    },
    headers: useRequestHeaders(['cookie'])
  })
)
watch(useRoute(),
  async (newVal) => {
    if (newVal.params.id) {
      await refresh()
    }
  }
)
</script>
