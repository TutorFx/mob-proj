<template>
    <div class="grid">
        <div v-if="pending" class="p-3 md:p-6 grid xl:grid-cols-2 2xl:grid-cols-3 gap-3">
            <dashboard-order-skeleton />
        </div>
        <div v-else-if="orders" class="p-3 md:p-6 grid xl:grid-cols-2 2xl:grid-cols-3 gap-3">
            <dashboard-order v-for="(order, i) in orders" :order="order" v-model="state" :statuses="statusList" :key="i" />
        </div>
        <div v-else-if="error">
            Erro...
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useRouteQuery } from '@vueuse/router';
import { IObjectStatus } from '~/types';
import { TOrder } from '~/types/order'

const status = useRouteQuery<string | undefined>('status')
const search = useRouteQuery<string | undefined>('search')

const props = defineProps<{ statusList: IObjectStatus, modelValue: string[] }>()
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

const { data: orders, refresh, pending, error } = useAsyncData('checkouts', () => $fetch<TOrder[]>(`/api/v1/private/checkouts/${useRoute().params.id}`,
  { headers: useRequestHeaders(['cookie']), query: { status: status.value, search: search.value } })
);
</script>