<template>
  <div v-if="!pending">
    <nuxt-link class="group" v-for="(product, i) in data" :key="i" :to="`/dashboard/${useRoute().params?.slug}/produto/${product.id}`">
      <div class="px-6 py-3 border-b group-last:border-b-0 items-center justify-start gap-3 grid grid-cols-[max-content_max-content_1fr_max-content]">
        <img :src="`https://avatar.vercel.sh/${product.id}`" :alt="`Foto de um ${product.name} ${product.description}`" class="w-8 h-8 rounded-xl">
        <div class="truncate font-semibold">{{ product.name }}</div>
        <div class="truncate">{{ product.description }}</div>
        <div class="btn btn-circle btn-md btn-ghost group-hover:bg-base-300 group-hover:text-base-content">
          <Icon name="mdi:edit" size="24"/>
        </div>
      </div>
    </nuxt-link>
  </div>
  <div v-else>
    <ui-spinner />
  </div>
</template>

<script lang="ts" setup>
const headers = useRequestHeaders(['cookie'])
const { pending, error, refresh, data } = useLazyAsyncData('product-get', () => $fetch(`/api/v1/private/product`, 
  {
    method: "GET",
    headers,
    params: {
      businessId: useRoute().params?.slug
    },
  }),
  {
    watch: [useRoute().params?.slug]
  }
)
</script>