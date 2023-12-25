<template>
  <div class="grid">
    <div>
      <div
        class="grid aspect-video items-center justify-center overflow-hidden p-3"
        :class="{
          '[view-transition-name:img-container]': active === product.id,
        }"
      >
        <nuxt-img
          v-if="product.images.at(0)?.Key"
          class="aspect-auto min-h-full min-w-full rounded-lg bg-cover bg-center object-cover transition-all duration-1000 ease-in-out group-hover:scale-110 group-hover:rounded-none"
          fit="cover"
          width="362"
          height="120"
          sizes="xs:362px sm:362px lg:362px xl:362px xxl:362px 2xl:362px"
          densities="x0.2 x0.5 x1 x2"
          :src="usePrefixImages(product.images.at(0)?.Key)"
          alt=""
        />
      </div>
    </div>

    <div class="grid gap-3 grid-flow-col justify-between p-3">
      <div class="grid">
        <span
          class="truncate text-lg font-bold"
          :class="{
            '[view-transition-name:header]': active === product.id,
          }"
        >
          {{ product.name }}
        </span>
        <span
          class="truncate font-medium"
          :class="{
            '[view-transition-name:subheader]': active === product.id,
          }"
        >
          {{ product.description }}
        </span>
        <span
          class="truncate text-xl font-medium"
          :class="{
            '[view-transition-name:pricing]': active === product.id,
          }"
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

const active = useState();
</script>
