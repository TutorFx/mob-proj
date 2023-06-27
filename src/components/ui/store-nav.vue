<template>
  <ui-nav>
    <template #default>
      <nuxt-link :to="{ name: 'loja-slug', params: { slug } }" class="btn btn-ghost normal-case font-black text-xl">{{
        data?.name }}</nuxt-link>
    </template>
    <template #end>
      <ui-cart-icon />
      <lazy-ui-personal-bubble />
    </template>
  </ui-nav>
</template>

<script setup lang="ts">
defineProps<{ data: INav }>()
const { slug } = useRoute().params
const cart = useCart()
</script>