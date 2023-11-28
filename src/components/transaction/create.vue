<template>
  <Teleport to="body">
    <Transition
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <div v-if="transaction.$isVisible()" class="fixed inset-0 z-10 flex bg-black/50" />
    </Transition>
    <Transition
      enter-active-class="animate__animated animate__fadeInUp"
      leave-active-class="animate__animated animate__fadeOutDown"
    >
      <div v-if="transaction.$isVisible()" class="fixed inset-0 z-20 flex">
        <div class="w-3xl m-auto overflow-hidden rounded-xl border border-zinc-700 text-white">
          <div class="bg-black p-6 text-3xl">
            Criar Transação
          </div>
          <div class="grid gap-4 border-y border-zinc-700 bg-zinc-900 p-6">
            <label class="text-zinc-400">
              <div class="mb-3">
                Email do Usuário
              </div>
              <input v-model="transaction.requestState.userMail" type="text" class="w-full rounded border-zinc-700 bg-black">
            </label>
            <label class="text-zinc-400">
              <div class="mb-3">
                Valor em compras
              </div>
              <div class="grid grid-flow-col rounded border border-zinc-700">
                <div
                  class="flex items-center justify-center truncate rounded-l border-r border-zinc-700 bg-zinc-950 px-4 text-xs"
                >
                  R$
                </div>
                <input
                  v-model.number="transaction.requestState.amount"
                  type="number"
                  class="w-full rounded-r border-black bg-black text-sm"
                >
              </div>
            </label>
          </div>
          <div class="flex justify-between bg-zinc-900 p-6">
            <button
              class="rounded border border-zinc-700 bg-black px-4 py-2 text-zinc-400 transition-all hover:border-white hover:text-white"
              @click.prevent="transaction.$close()"
            >
              Cancel
            </button>
            <button
              class="relative rounded border border-white bg-white px-4 py-2 text-black transition-all hover:border-white hover:bg-black hover:text-white"
              @click.prevent="createTransaction"
            >
              <div
                v-if="businessStore.pendingBusinesses || transaction.pendingPayment"
                class="absolute inset-0 flex cursor-wait items-center justify-center bg-purple-200 text-black"
              >
                <ui-spinner />
              </div>
              <div>Continue</div>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>

const transaction = useTransactions()
const businessStore = useBusiness()

const createTransaction = async () => {
  if (businessStore.pendingBusinesses) { return }

  transaction.$create()
}
</script>
