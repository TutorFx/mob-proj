<template>
  <div>
    <NuxtLoadingIndicator color="false" class="bg-primary" />
    <div class="container">
      <ui-store-nav :data="data" />
    </div>
    <div class="container grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-10">
      <nuxt-link v-for="(product, i) in products" :key="i"
        :to="{ name: 'loja-slug-product', params: { product: product?.slug } }"
        class="rounded-lg overflow-hidden bg-base shadow-3xl shadow-neutral/10 border border-base-300 group grid relative">
        <client-only>
          <div class="pt-3">
            <div class="carousel w-full relative gap-3 ">
              <div v-for="(image, i) in product.images" :key="i" class="carousel-item w-full aspect-video relative">
                <div class="aspect-video">
                  <div class="aspect-video overflow-hidden px-3 flex items-center justify-center">
                    <nuxt-img
                      class="object-cover group-hover:scale-110 min-w-full min-h-full aspect-auto transition-all ease-in-out duration-1000 bg-cover bg-center rounded-lg group-hover:rounded-none"
                      :src="image?.secure_url" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <template #fallback>
            <div class="pt-3">
              <div class="carousel w-full relative gap-3 ">
                <div v-for="(image, i) in product.images" :key="i" class="carousel-item w-full aspect-video relative">
                  <div class="aspect-video">
                    <div class="aspect-video overflow-hidden px-3 flex items-center justify-center">
                      <nuxt-img
                        class="object-cover group-hover:scale-110 min-w-full min-h-full aspect-auto transition-all ease-in-out duration-1000 bg-cover bg-center rounded-lg group-hover:rounded-none"
                        :src="image?.secure_url" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </client-only>

        <div class="p-3 grid grid-flow-col justify-between">
          <div class="grid">
            <span class="font-bold text-lg truncate">
              {{ product.name }}
            </span>
            <span class="font-medium truncate">
              {{ product.description }}
            </span>
            <span class="font-medium text-xl truncate">
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
const route = useRoute()

const { data, error } = await useAsyncData(() => $fetch(`/api/v1/business/${route.params.slug}`))

/* onErrorCaptured(() => {
  throw createError({
    statusCode: 404,
    statusMessage: 'Business Not Found'
  })
})

if(error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Business Not Found'
  })
}  */
const { data: products } = await useAsyncData(() => $fetch(`/api/v1/business/${route.params.slug}/products`))
</script>