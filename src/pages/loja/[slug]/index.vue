<template>
  <div>
    <NuxtLoadingIndicator color="false" class="bg-primary" />
    <div class="container">
      <ui-store-nav :data="data" />
    </div>
    <div class="container my-10 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <nuxt-link
        v-for="(product, i) in products"
        :key="i"
        :class="{ active: active === product.id }"
        :to="{ name: 'loja-slug-product', params: { slug: route.params.slug, product: product?.slug } }"
        class="bg-base group relative grid overflow-hidden rounded-lg border border-base-300 shadow-3xl shadow-neutral/10"
        @click="active = product.id"
      >
        <div>
          <div class="img-container grid aspect-video items-center justify-center overflow-hidden p-3">
            <nuxt-img
              v-if="product.images.at(0)?.Key"
              class="aspect-auto min-h-full min-w-full rounded-lg bg-cover bg-center object-cover transition-all duration-1000 ease-in-out group-hover:scale-110 group-hover:rounded-none"
              fit="cover"
              width="362"
              height="120"
              :src="usePrefixImages(product.images.at(0)?.Key)"
              alt=""
            />
          </div>
        </div>

        <div class="grid grid-flow-col justify-between p-3">
          <div class="grid">
            <span class="header truncate text-lg font-bold">
              {{ product.name }}
            </span>
            <span class="subheader truncate font-medium">
              {{ product.description }}
            </span>
            <span class="pricing truncate text-xl font-medium">
              {{ useMoney(product.price) }}
            </span>
          </div>
          <button class="btn btn-ghost btn-sm gap-3 rounded-full hover:bg-base-300 group-hover:bg-base-200">
            Comprar <Icon name="mdi:plus" size="12" />
          </button>
        </div>
        <div class="h-1 w-full bg-base-200" />
      </nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const config = useRuntimeConfig()

const data = await $fetch(`/api/v1/business/${route.params.slug}`).catch(() => {
  throw createError({
    statusCode: 404,
    statusMessage: 'Estabelecimento não encontrado'
  })
})

const products = await $fetch(`/api/v1/business/${route.params.slug}/products`)

useSeoMeta({
  title: `${data?.name} | ${config.public.APP_NAME}`,
  ogTitle: `${data?.name} | ${config.public.APP_NAME}`
})

const active = useState()
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
