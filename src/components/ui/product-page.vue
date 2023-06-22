<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 grid-rows-[max-content_1fr] lg:grid-rows-[1fr] items-start lg:items-center mb-6 lg:mb-0">
    <div>
      <ui-images :images="productdata?.images" />
    </div>
    <div class="grid items-start lg:items-center min-h-full">
      <div class="grid gap-3 md:gap-6">
        <ui-breadcrumbs> {{ productdata?.name }} </ui-breadcrumbs>
        <h2 class="text-4xl font-bold grid grid-flow-col justify-start gap-6 items-center"><span>{{ productdata?.name }}</span> <span @click="startShare" class="btn btn-ghost btn-sm btn-circle"><Icon name="mdi:share-variant" size="24" /></span>
      </h2>
        <h4 class="text-2xl font-medium text-neutral">{{ productdata?.description }}</h4>
        <h5 class="text-2xl font-medium">{{ useMoney(productdata?.price ?? 0) }} {{ quantity > 1 ? `(${useMoney((productdata?.price ?? 0) * quantity)})`:undefined }}</h5>
        <div class="grid grid-flow-row lg:grid-flow-col justify-start gap-3 md:gap-6">
          <ui-quantity v-model="quantity" class="order-last md:order-first" />
          <button class="btn btn-primary gap-6" @click.prevent="productdata?.id ? cart.add_product(productdata?.id, quantity) : null">
            <Icon name="mdi:cart-plus" size="18" /> Adicionar ao carrinho
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { isClient } from '@vueuse/shared'
import { useShare } from '@vueuse/core'

const props = defineProps<{
  businessName?: string,
  productdata?: {
    slug: string;
    name: string;
    id: string;
    description: string;
    price: number;
    images: {
      id: string;
      secure_url: string;
    }[]
  } | null
}>()
const options = ref({
  title: `${props.productdata?.name} - ${props.businessName}` ,
  text: props.productdata?.description,
  url: isClient ? location.href : '',
})

const { share, isSupported } = useShare(options)

function startShare() {
  return share().catch(err => err)
}

const quantity = ref(1)
const cart = useCart()
</script>