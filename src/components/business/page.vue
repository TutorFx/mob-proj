<template>
  <div class="dashboard--business">
    <div class="performance">
      <div class="border border-slate-800 p-6 rounded-lg min-h-full">
        <div class="text-xl font-bold">
          Performance - aqui fica o gráfico
        </div>
      </div>
    </div>
    <div class="transactions">
      <div class="border border-slate-800 p-6 rounded-lg min-h-full grid gap-6 grid-rows-[min-content_1fr_min-content]">
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
    <div class="users">
      <div class="border border-slate-800 p-6 rounded-lg min-h-full">
        <div class="text-xl font-bold">
          Users
        </div>
      </div>
    </div>
    <div class="support">
      <div class="border border-slate-800 p-6 rounded-lg min-h-full">
        <div class="text-xl font-bold">
          Suporte tecnico
        </div>
      </div>
    </div>
    <div class="config">
      <div class="border border-slate-800 p-6 rounded-lg min-h-full">
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
const { slug } = route.params;
</script>