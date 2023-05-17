<template>
  <div>

      <div>
        <div class="bg-slate-600 w-24 aspect-square">
          {{ data?.total }}
        </div>
      </div>
      <div v-for="(wallet, i) in data?.wallets">
        <div class="bg-slate-600 w-24 aspect-square">
          {{ wallet.amount }}
          <nuxt-link :to="`/loja/${wallet.slug}`">loja</nuxt-link>
        </div>
      </div>

  </div>
</template>

<script setup lang="ts">
  const { data } = await useFetch('/api/v1/private/budget')
</script>