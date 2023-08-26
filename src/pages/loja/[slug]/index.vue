<template>
  <div>
    <NuxtLoadingIndicator color="false" class="bg-primary" />
    <div class="container">
      <ui-store-nav :data="data" />
    </div>
    <div class="container grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-10">
      <nuxt-link v-for="(product, i) in products" :key="i" @click="active = product.id" :class="{ active: active === product.id }"
        :to="{ name: 'loja-slug-product', params: { slug: route.params.slug, product: product?.slug } }"
        class="rounded-lg overflow-hidden bg-base shadow-3xl shadow-neutral/10 border border-base-300 group grid relative">
        <div>
          <div class="img-container pt-3 aspect-video overflow-hidden flex items-center justify-center">
            <nuxt-img
              class="object-cover group-hover:scale-110 min-w-full min-h-full aspect-auto transition-all ease-in-out duration-1000 bg-cover bg-center rounded-lg group-hover:rounded-none"
              :src="usePrefixImages(product.images.at(0)?.Key)" alt="" />
          </div>
        </div>


        <div class="p-3 grid grid-flow-col justify-between">
          <div class="grid">
            <span class="font-bold text-lg truncate header">
              {{ product.name }}
            </span>
            <span class="font-medium truncate subheader">
              {{ product.description }}
            </span>
            <span class="font-medium text-xl truncate pricing">
              {{ useMoney(product.price) }}
            </span>
          </div>
          <button class="btn btn-md btn-circle btn-ghost group-hover:bg-base-200 hover:bg-base-300">
            <Icon name="mdi:plus" size="24px" />
          </button>
        </div>
        <div class="h-1 w-full bg-base-200"></div>
      </nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const config = useRuntimeConfig();

const data = await $fetch(`/api/v1/business/${route.params.slug}`).catch(() => {
  throw createError({
    statusCode: 404,
    statusMessage: 'Estabelecimento não encontrado'
  })
})

const products = await $fetch(`/api/v1/business/${route.params.slug}/products`)

useSeoMeta({
  title: `${data?.name} | ${config.public.APP_NAME}`,
  ogTitle: `${data?.name} | ${config.public.APP_NAME}`,
})

const active = useState();
</script>

<style scoped lang="scss">
.active {
  .img-container {
    view-transition-name: selected-product;
    contain: layout;
  }
  .header {
    view-transition-name: header;
  }
  .subheader {
    view-transition-name: subheader;
  }
  .pricing {
    view-transition-name: pricing;
  }
}
</style>

<style>
::view-transition-old(header),
::view-transition-new(header) {
  width: auto;
}
::view-transition-old(subheader),
::view-transition-new(subheader) {
  width: auto;
}::view-transition-old(pricing),
::view-transition-new(pricing) {
  width: auto;
}
</style>