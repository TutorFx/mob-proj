<template>
  <ui-product-list-page v-if="products" :products="products" />
</template>

<script lang="ts" setup>
import type { IPublicProducts } from "@/types";

const props = defineProps<
  | {
      slug: string | string[];
      id?: never;
    }
  | {
      slug?: never;
      id: string | string[];
    }
>();

const endpoint = props.slug
  ? `/api/v1/business/${props.slug}/products`
  : `/api/v1/business/${props.id}/productsbyid`;
const { data: products } = await useFetch<IPublicProducts>(endpoint);
</script>
