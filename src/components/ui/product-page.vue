<template>
  <div
    class="mb-6 grid grid-cols-1 grid-rows-[max-content_1fr] items-start gap-6 overflow-hidden lg:mb-0 lg:grid-cols-2 lg:grid-rows-[1fr] lg:items-center"
  >
    <div>
      <ui-images :images="productdata?.images" />
    </div>
    <div class="grid min-h-full items-start lg:items-center">
      <div class="grid gap-3 md:gap-6">
        <ui-breadcrumbs> {{ productdata?.name }} </ui-breadcrumbs>
        <h2
          class="header grid grid-flow-col items-center justify-start gap-6 text-4xl font-bold"
        >
          <span>{{ productdata?.name }}</span>
          <client-only
            ><span
              v-if="isSupported"
              class="btn btn-circle btn-ghost btn-sm"
              @click="startShare"
              ><Icon name="mdi:share-variant" size="24" /></span
          ></client-only>
        </h2>
        <h4
          class="subheader prose text-2xl font-medium text-neutral"
          v-html="productdata?.description"
        />
        <h5 class="pricing text-2xl font-medium">
          {{ useMoney(productdata?.price ?? 0) }}
          {{
            quantity > 1
              ? `(${useMoney((productdata?.price ?? 0) * quantity)})`
              : undefined
          }}
        </h5>
        <div
          class="grid grid-flow-row justify-start gap-3 md:gap-6 lg:grid-flow-col"
        >
          <ui-quantity v-model="quantity" class="order-last md:order-first" />
          <button
            class="btn btn-primary gap-6"
            @click.prevent="
              productdata?.id
                ? cart.add_product(productdata?.id, quantity)
                : null
            "
          >
            <Icon name="mdi:cart-plus" size="18" /> Adicionar ao carrinho
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { isClient } from "@vueuse/shared";
import { useShare } from "@vueuse/core";

const props = defineProps<{
  businessName?: string;
  productdata?: {
    slug: string;
    name: string;
    id: string;
    description: string;
    price: number;
    images: {
      id: string;
      Key: string;
    }[];
  } | null;
}>();
const options = ref({
  title: `${props.productdata?.name} - ${props.businessName}`,
  text: props.productdata?.description,
  url: isClient ? location.href : "",
});

const { share, isSupported } = useShare(options);

function startShare() {
  return share().catch((err) => err);
}

const quantity = ref(1);
const cart = useCart();
</script>

<style scoped>
.pricing {
  view-transition-name: pricing;
}
.header {
  view-transition-name: header;
}
.subheader {
  view-transition-name: subheader;
}
</style>
