<template>
  <div>
    <div
      class="[.mobile-view_&]:sm:grid-cols-1 [.mobile-view_&]:md:grid-cols-1 [.mobile-view_&]:lg:grid-cols-1 [.mobile-view_&]:xl:grid-cols-1 my-10 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <nuxt-link
        v-for="(product, i) in products"
        :key="i"
        :class="{ active: active === product.id }"
        :to="{
          name: 'slug-product',
          params: { slug: product.Business.slug, product: product.slug },
        }"
        class="bg-base group relative overflow-hidden rounded-lg border border-base-300 shadow-3xl shadow-neutral/10"
        @click="active = product.id"
      >
        <ui-product-list-item :product="product" />
      </nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IPublicProducts } from "~/types";

defineProps<{
  products: IPublicProducts;
}>();

const active = useState();
</script>
