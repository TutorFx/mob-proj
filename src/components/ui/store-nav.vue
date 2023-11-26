<template>
  <ui-nav>
    <template #default>
      <nuxt-link :to="{ name: 'loja-slug', params: { slug } }" class="btn btn-ghost text-xl font-black normal-case">{{
        data?.name }}</nuxt-link>
    </template>
    <template #end>
      <ui-cart-icon />
    </template>
  </ui-nav>
</template>

<script setup lang="ts">
defineProps<{ data: INav }>()
const { slug } = useRoute().params
const cart = useCart()
</script>