<template>
  <div class="grid grid-rows-[max-content_max-content_1fr]">
    <div class="bg-base-200 border-b border-base-300 relative not-prose overflow-hidden">
      <div class="relative">
        <div class="absolute inset-0"></div>
        <div class="p-3 md:p-6 py-2 md:py-3 relative overflow-auto max-sm:pb-3">
          <DashboardOrderStatuses v-if="statuses" v-model="status" :data="statuses" />
        </div>
      </div>
    </div>
    <div class="bg-base-200 border-b border-base-300">
      <div class="p-3 md:p-6 py-2 md:py-3">
        <div class="group relative pointer-events-auto w-10 md:w-32 focus-within:w-64 transition-all">
          <label type="button" :class="{ 'grid-cols-[max-content_1fr]': focused }"
            class="grid grid-flow-col items-start text-sm leading-6 text-slate-400 rounded-md ring-1 ring-slate-900/10 shadow-sm py-1.5 pl-2 pr-3 hover:ring-slate-300 dark:hover:bg-base-300">
            <svg width="24" height="24" fill="none" aria-hidden="true" class="flex-none">
              <path d="m19 19-3.5-3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round"></path>
              <circle cx="11" cy="11" r="6" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round"></circle>
            </svg>
            <input type="search" v-model="searchInput" ref="input"
              class="bg-transparent h-6 ring-0 border-0 text-primary border-none w-full focus:ring-0">
            <div class="ml-auto md:grid grid-flow-col text-xs font-semibold w-16 hidden" v-if="!focused">
              <kbd class="kbd kbd-sm">Ctrl</kbd>
              <kbd class="kbd kbd-sm">K</kbd>
            </div>
          </label>
        </div>
      </div>
    </div>
    <div class="bg-base-200">
      <CheckoutAdminList :statusList="statuses" v-model="selected" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouteQuery } from '@vueuse/router'
import { useFocus, onKeyStroke } from '@vueuse/core'

const status = useRouteQuery<string | undefined>('status')
const search = useRouteQuery<string | undefined>('search')

const input = ref()
const searchInput = ref(search.value)
const { focused } = useFocus(input, { initialValue: true })

onKeyStroke('k', (e) => {
  e.preventDefault()
  if (e.ctrlKey) {
    focused.value = true
  }
})

onKeyStroke('Enter', (e) => {
  e.preventDefault()
  search.value = searchInput.value
  refreshNuxtData('checkouts')
})

const selected = ref([])

const { data: statuses } = useAsyncData('status', () => $fetch('/api/v1/order/status'));

watch(status, async () => {
  refreshNuxtData('checkouts')
})
</script>