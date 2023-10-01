
<template>
  <div class="grid grid-cols-[max-content_1fr] gap-3">
    <div class="h-16 w-16 flex items-center justify-center rounded-lg overflow-hidden bg-gray-100">
      <nuxt-img width="64" height="64" fit="cover" v-if="item.product?.images?.at(0)?.Key" class="object-cover" :src="usePrefixImages(item.product?.images?.at(0)?.Key)" />
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