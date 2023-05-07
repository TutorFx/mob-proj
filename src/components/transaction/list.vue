<template>
  <div v-if="transactions.pendingList">
    <ui-spinner></ui-spinner>
  </div>
  <div v-else v-for="(transaction, i) in transactions.list">
    <div class="grid grid-cols-[max-content_max-content_1fr] gap-3">
      <div>{{ transaction.amount.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) }}</div>
      <div><Icon name="mdi:chevron-right" /></div>
      <div>{{ transaction.user.email }}</div>
    </div>
  </div>
</template>

<script setup>
  const transactions = useTransactions()

</script>