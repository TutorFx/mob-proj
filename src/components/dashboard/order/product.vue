<template>
  <div class="grid grid-cols-[max-content_1fr] gap-3">
    <div
      class="flex h-16 w-16 items-center justify-center overflow-hidden rounded-lg bg-gray-100"
    >
      <nuxt-img
        v-if="item.product?.images?.at(0)?.Key"
        width="64"
        height="64"
        fit="cover"
        class="object-cover"
        :src="usePrefixImages(item.product?.images?.at(0)?.Key)"
      />
    </div>
    <div class="grid grid-flow-col items-center justify-between gap-3">
      <div class="grid">
        <div class="text-md truncate font-bold">
          {{ item.product.name }}
        </div>
        <div class="text-md truncate font-thin">
          Quantidade: {{ item.quantity }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TOrderProduct } from "~/types/order";
defineProps<{ item: TOrderProduct }>();
</script>
