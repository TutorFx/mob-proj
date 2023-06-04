<template>
  <div class="dashboard--business">
    <div class="performance">
      <div class="border base-300 p-6 rounded-lg min-h-full">
        <div class="text-xl font-bold">
          Performance - aqui fica o gráfico
        </div>
      </div>
    </div>
    <div class="transactions">
      <div class="border base-300 p-6 rounded-lg min-h-full grid gap-6 grid-rows-[min-content_1fr_min-content]">
        <div class="text-xl font-bold">
          Resumo Transações
        </div>
        <div>
          <transaction-list />
        </div>
        <div>
          <transaction-create />
          <button @click.prevent="transaction.$open()" class="btn btn-sm">Nova transação</button>
        </div>
      </div>
    </div>
    <div class="posts relative">
      <nuxt-link :to="{ name: `dashboard-id-produto`, params: { id: $route.params.id } }"
        class="btn btn-lg btn-primary w-full gap-2">
        <Icon name="mdi:view-grid-outline" />
        Produtos
      </nuxt-link>
    </div>
    <div class="support">
      <div class="border base-300 p-6 rounded-lg min-h-full">
        <div class="text-xl font-bold">
          Suporte tecnico
        </div>
      </div>
    </div>
    <div class="config">
      <div class="border base-300 p-6 rounded-lg min-h-full">
        <div class="text-xl font-bold">
          Config
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const transaction = useTransactions()
const route = useRoute();
</script>