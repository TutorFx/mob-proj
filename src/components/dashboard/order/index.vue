<template>
  <div class="card bg-base-100">
    <div class="card-body p-6">
      <div class="grid grid-cols-[max-content_1fr] gap-2 lg:gap-6">
        <label class="block">
          <input type="checkbox"
            class="checkbox checkbox-primary border-base-content border-dashed hover:border-base-content checked:border-primary"
            :value="order.id" v-model="state">
        </label>
        <div class="grid gap-2">
          <nuxt-link class="grid md:grid-cols-[1fr_max-content] gap-2"
            :to="{ name: 'dashboard-id-fechamento-idcheckout', params: { id: order.Business.id, idcheckout: order.id } }">
            <div class="grid grid-flow-col gap-1 items-center justify-start">
              <div class="font-bold truncate">
                Pedido
              </div>
              <div class="truncate bg-base-200 px-2 rounded w-24" :title="order.id">
                <span class="text-base-content/30">#</span>{{ order.id }}
              </div>
              <dashboard-order-status :name="order.status" />
            </div>
            <div class="font-bold tracking-wider">
              {{ useMoney(order?.ProductOnOrder?.reduce((red, item) => red += (item.quantity * item.product.price), 0) ??
                0) }}
            </div>
          </nuxt-link>
          <div class="grid grid-flow-col items-center justify-start gap-3">
            <Icon class="text-base-content/50" name="mdi:calendar-outline" />
            <span class="hidden md:inline-flex">
              {{ order.createdAt ? new Date(order?.createdAt).toLocaleDateString('pt-BR', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
              }).replaceAll(',', '') : '' }}
            </span>
            <span class="inline-flex md:hidden">
              {{ order.createdAt ? new Date(order?.createdAt).toLocaleDateString('pt-BR', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
              }).replaceAll(',', '') : '' }}
            </span>
            <div class="border-r border-base-content/30 h-4"></div>
            <div>
              {{ order?.contact?.nome }}
            </div>
          </div>
          <div>
            <dashboard-order-selectstatus v-model="status" :data="statuses" />
          </div>
          <div class="grid gap-3 overflow-hidden" v-if="order?.ProductOnOrder.length > 0">
            <dashboard-order-product class="grid grid-cols-[max-content_1fr] gap-3" :item="order?.ProductOnOrder[0]" />
            <div class="grid gap-3" v-if="order?.ProductOnOrder.length > 1 && isVisible">
              <dashboard-order-product class="grid grid-cols-[max-content_1fr] gap-3" v-motion-slide-bottom
                v-for="(item, i) in order?.ProductOnOrder.slice(1)" :item="item" :key="i" />
            </div>
            <div v-if="order?.ProductOnOrder.length > 1">
              <button class="btn btn-ghost btn-xs" @click="isVisible = !isVisible">Mais {{ order?.ProductOnOrder.length -
                1 }} Produtos
                <Icon :name="!isVisible ? 'mdi:chevron-down' : 'mdi:chevron-up'" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IObjectStatus } from "~/types";
import { TOrder } from "~/types/order";

const isVisible = ref(false)

const props = defineProps<{
  statuses: IObjectStatus,
  order: TOrder,
  modelValue: string[]
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', value: string[]): void,
}>()

const state = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emits('update:modelValue', value)
  }
})

const status = ref(props.order.status)

watch(status, async (newVal, oldVal) => {
  await $fetch(`/api/v1/private/business/${useRoute().params.id}/UpdateOrderBulkStatus`, {
    method: 'POST',
    body: {
      idlist: [props.order.id],
      status: newVal
    }
  })
  await refreshNuxtData('checkouts')
})
</script>