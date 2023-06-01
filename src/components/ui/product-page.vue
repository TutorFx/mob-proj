<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 grid-rows-[max-content_1fr] lg:grid-rows-[1fr] items-start lg:items-center mb-6 lg:mb-0">
    <div>
      <ui-images :images="productdata?.images" />
    </div>
    <div class="grid items-start lg:items-center min-h-full">
      <div class="grid gap-3 md:gap-6">
        <ui-breadcrumbs> {{ productdata.name }} </ui-breadcrumbs>
        <h2 class="text-4xl font-bold">{{ productdata.name }}</h2>
        <h4 class="text-2xl font-medium text-neutral">{{ productdata.description }}</h4>
        <h5 class="text-2xl font-medium">{{ useMoney(productdata.price) }} {{ quantity > 1 ? `(${useMoney(productdata.price*quantity)})`:undefined }}</h5>
        <div class="grid grid-flow-row lg:grid-flow-col justify-start gap-3 md:gap-6">
          <ui-quantity v-model="quantity" class="order-last md:order-first" />
          <button class="btn btn-primary gap-6" @click.prevent="cart.add_product(productdata.id, quantity)">
            <Icon name="mdi:cart-plus" size="18" /> Adicionar ao carrinho
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  productdata: {
    slug: string;
    name: string;
    id: string;
    description: string;
    price: number;
    images: {
      id: string;
      secure_url: string;
    }[]
  }
}>()
const quantity = ref(1)
const cart = useCart()
</script>