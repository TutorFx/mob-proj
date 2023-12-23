<template>
  <div
    class="grid grid-cols-1 grid-rows-[max-content_1fr] items-start gap-6 overflow-hidden lg:mb-0 lg:grid-cols-2 lg:grid-rows-[1fr] lg:items-center"
  >
    <div>
      <ui-images :images="product.images" />
    </div>
    <div class="grid min-h-full items-start lg:items-center">
      <div class="grid gap-3 md:gap-6">
        <ui-breadcrumbs :product="product"></ui-breadcrumbs>
        <h2
          class="[view-transition-name:header] grid grid-flow-col items-center justify-start gap-6 text-4xl font-bold"
        >
          <span>{{ product.name }}</span>
        </h2>
        <h4
          class="[view-transition-name:subheader] prose font-medium text-base"
          v-html="product.description"
        />
        <h5 class="[view-transition-name:pricing] text-2xl font-medium">
          {{ useMoney(product.price) }}
          {{
            quantity > 1 ? `(${useMoney(product.price * quantity)})` : undefined
          }}
        </h5>
        <div
          class="grid grid-flow-row justify-start gap-3 md:gap-6 lg:grid-flow-col"
        >
          <ui-quantity v-model="quantity" class="order-last md:order-first" />
          <div class="grid grid-cols-[1fr_max-content] gap-3">
            <button
              class="btn btn-primary gap-6"
              @click.prevent="cart.add_product(product.id, quantity)"
            >
              <Icon name="mdi:cart-plus" size="18" /> Adicionar ao carrinho
            </button>

            <client-only>
              <span
                v-if="isSupported"
                class="btn btn-circle btn-ghost"
                @click="startShare"
              >
                <Icon name="mdi:share-variant" size="24" />
              </span>
              <template #fallback>
                <span class="btn btn-circle btn-ghost">
                  <Icon name="mdi:share-variant" size="24" />
                </span>
              </template>
            </client-only>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { isClient } from "@vueuse/shared";
import { useShare } from "@vueuse/core";
import type { IProductWithImage } from "@/types";

const props = defineProps<{
  product: IProductWithImage;
}>();

const BUSINESS_NAME = props.product.Business.name;
const PRODUCT_NAME = props.product.name;
const PRODUCT_DESCRIPTION = props.product.description;

const options = ref({
  title: `${PRODUCT_NAME} - ${BUSINESS_NAME}`,
  text: PRODUCT_DESCRIPTION,
  url: isClient ? location.href : "",
});

const { share, isSupported } = useShare(options);

async function startShare() {
  return share().catch((err) => err);
}

const quantity = ref(1);
const cart = useCart();
</script>
