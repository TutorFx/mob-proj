<template>
  <ui-product-page v-if="product" :product="product" />
</template>

<script setup lang="ts">
import type { IProductWithImage } from "@/types";

const props = defineProps<{
  slug: string | string[];
  product: string | string[];
}>();

const { data: product } = await useFetch<IProductWithImage>(
  `/api/v1/business/${props.slug}/${props.product}`,
);

if (!product.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Produto não encontrado",
  });
}

const PRODUCT_NAME = product.value.name;
const PRODUCT_DESCRIPTION = product.value.description;
const PRODUCT_IMAGE = usePrefixImages(product.value.images.at(0)?.Key);
const BUSINESS_NAME = product.value.Business.name;

const config = useRuntimeConfig();

useSeoMeta({
  title: `${PRODUCT_NAME} - ${BUSINESS_NAME} | ${config.public.APP_NAME}`,
  ogTitle: PRODUCT_NAME,
  description: PRODUCT_DESCRIPTION,
  ogDescription: PRODUCT_DESCRIPTION,
  ogImage: PRODUCT_IMAGE,
  twitterCard: "summary_large_image",
});
</script>

<style lang="scss" scoped>
.title-transition {
  view-transition-name: header;
}
</style>

<style lang="scss">
::view-transition-old(header),
::view-transition-new(header) {
  width: auto;
}
</style>
