<template>
  <div class="p-3">
    <ui-store-nav v-if="data" :data="data" />
    <UiProductList :id="$route.params.id" />
  </div>
</template>

<script setup lang="ts">
import type { IBusinessWithImage } from "~/types";

const route = useRoute();

const { data } = await useFetch<IBusinessWithImage>(
  `/api/v1/business/${route.params.id}/id`,
);
</script>
