<template>
  <div class="grid">
    <div>
      <div
        class="[view-transition-name:img-container] grid aspect-video items-center justify-center overflow-hidden p-3"
      >
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

    <div class="grid gap-3 grid-flow-col justify-between p-3">
      <div class="grid">
        <span class="[view-transition-name:header] truncate text-lg font-bold">
          {{ product.name }}
        </span>
        <span class="[view-transition-name:subheader] truncate font-medium">
          {{ product.description }}
        </span>
        <span
          class="[view-transition-name:pricing] truncate text-xl font-medium"
        >
          {{ useMoney(product.price) }}
        </span>
      </div>
      <button
        class="btn btn-circle btn-ghost gap-3 hover:bg-base-300 group-hover:bg-base-200"
      >
        <Icon name="material-symbols:add-shopping-cart" size="28" />
      </button>
    </div>
    <div class="h-1 w-full bg-base-200" />
  </div>
</template>

<script setup lang="ts">
import type { IPublicProduct } from "~/types";

defineProps<{
  product: IPublicProduct;
}>();
</script>
