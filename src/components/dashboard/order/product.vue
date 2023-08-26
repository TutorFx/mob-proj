
<template>
  <div class="grid grid-cols-[max-content_1fr] gap-3">
    <div class="h-16 w-16 flex rounded-lg overflow-hidden">
      <nuxt-img class="object-cover" :src="usePrefixImages(item.product?.images?.at(0)?.Key)" />
    </div>
    <div class="grid grid-flow-col justify-between items-center gap-3">
      <div class="grid">
        <div class="text-md font-bold truncate">
          {{ item.product.name }}
        </div>
        <div class="text-md font-thin truncate">
          Quantidade: {{ item.quantity }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TOrderProduct } from "~/types/order";
defineProps<{ item: TOrderProduct }>()
</script>