<template>
  <div v-if="!pending" class="grid gap-6">
    <div class="border-y border-yellow-500 py-6">
      <div class="container">
        <div class="flex flex-wrap items-center justify-center text-center text-3xl">
          <span>Você tem um total de <span
              class="whitespace-nowrap break-keep bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text font-bold text-transparent">{{
                data?.total }}
              <Icon name="Coin" size="18" />
            </span>.
          </span>
        </div>
      </div>
    </div>
    <div class="container grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div v-for="(wallet, i) in data?.wallets" class="rounded-lg bg-base-200">
        <div class="truncate p-3 text-2xl font-bold capitalize">{{ wallet.name }}</div>
        <div class="grid grid-flow-col items-end justify-between">
          <div class="p-3 pt-0">
            <span
              class="whitespace-nowrap break-keep bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-2xl text-transparent">
              {{ wallet.amount }}
              <Icon name="Coin" size="16" />
            </span>
          </div>
          <nuxt-link :to="`/loja/${wallet.slug}`" class="p-3">
            <button class="btn btn-circle btn-ghost btn-sm aspect-square">
              <Icon name="material-symbols:add-shopping-cart" size="24" />
            </button>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <ui-spinner />
  </div>
</template>

<script setup lang="ts">
const headers = useRequestHeaders(['cookie'])
const { data, pending } = await useFetch('/api/v1/private/budget', {
  headers,
  method: 'GET',
});
</script>