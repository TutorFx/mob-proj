<template>
  <div v-if="transactions.pendingList">
    <ui-spinner />
  </div>
  <div
    v-for="(transaction, i) in transactions.list"
    v-else
    :key="i"
    class="w-full"
  >
    <div class="grid w-full grid-flow-col justify-start gap-3">
      <div class="truncate">
        {{ transaction.origin.email }}
      </div>
      <div>
        <Icon name="mdi:chevron-right" />
      </div>
      <div class="truncate">
        {{
          transaction.amount.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })
        }}
      </div>
      <div>
        <Icon name="mdi:chevron-right" />
      </div>
      <div class="truncate">
        {{ transaction.user.email }}
      </div>
    </div>
  </div>
</template>

<script setup>
const transactions = useTransactions();
</script>
