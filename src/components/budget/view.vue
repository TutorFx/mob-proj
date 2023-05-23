<template>
  <div v-if="!pending" class="grid gap-6">
    <div class="border-y py-6 border-yellow-500">
      <div class="container">
        <div class="text-3xl flex justify-center items-center flex-wrap text-center">
          <span>Você tem um total de <span
              class="break-keep whitespace-nowrap bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-400 text-transparent font-bold">{{
                data?.total }}
              <Icon name="Coin" size="18" />
            </span>.
          </span>
        </div>
      </div>
    </div>
    <div class="container grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="(wallet, i) in data?.wallets" class="bg-base-200 rounded-lg">
        <div class="truncate text-2xl capitalize font-bold p-3">{{ wallet.name }}</div>
        <div class="grid grid-flow-col justify-between items-end">
          <div class="p-3 pt-0">
            <span
              class="break-keep whitespace-nowrap bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-400 text-transparent text-2xl">
              {{ wallet.amount }}
              <Icon name="Coin" size="16" />
            </span>
          </div>
          <nuxt-link :to="`/loja/${wallet.slug}`" class="p-3">
            <button class="btn btn-sm btn-circle btn-ghost aspect-square">
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
const { data, pending } = useLazyAsyncData('budget', () => $fetch('/api/v1/private/budget', {
  method: 'GET',
}),
  {
    immediate: false
  }
)
refreshNuxtData('budget')
</script>