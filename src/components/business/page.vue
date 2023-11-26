<template>
  <div class="dashboard--business">
    <div class="performance">
      <div class="base-300 min-h-full rounded-lg border p-6">
        <div class="text-xl font-bold">
          Performance - aqui fica o gráfico
        </div>
      </div>
    </div>
    <div class="transactions">
      <div class="base-300 grid min-h-full grid-rows-[min-content_1fr_min-content] gap-6 rounded-lg border p-6">
        <div class="text-xl font-bold">
          Resumo Transações
        </div>
        <div>
          <transaction-list />
        </div>
        <div>
          <transaction-create />
          <button class="btn btn-primary btn-sm" @click.prevent="transaction.$open()">Nova transação</button>
        </div>
      </div>
    </div>
    <div class="posts relative">
      <nuxt-link
:to="{ name: `dashboard-id-produto`, params: { id: $route.params.id } }"
        class="btn btn-primary btn-lg w-full gap-2">
        <Icon name="mdi:view-grid-outline" />
        Produtos
      </nuxt-link>
    </div>
    <div class="support">
      <div class="base-300 min-h-full rounded-lg border p-6">
        <div class="text-xl font-bold">
          Suporte tecnico
        </div>
      </div>
    </div>
    <div class="config">
      <div class="base-300 min-h-full rounded-lg border p-6">
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