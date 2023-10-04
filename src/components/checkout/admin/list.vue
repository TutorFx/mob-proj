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
import { IObjectStatus } from '~/types';
import { TOrder } from '~/types/order'

const route = useRoute()
const router = useRouter()

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

const status = computed({
  get() {
    return route.query.status
  },
  set(val) {
    router.push({ query: { status: val } })
  }
})

const search = computed({
  get() {
    return route.query.search
  },
  set(val) {
    if (val === '') return router.push({ query: { search: undefined } })
    router.push({ query: { search: val } })
  }
})

const { data: orders, refresh, pending, error } = useAsyncData('checkouts', () => $fetch<TOrder[]>(`/api/v1/private/checkouts/${useRoute().params.id}`,
  { headers: useRequestHeaders(['cookie']), query: { status: status.value, search: search.value } })
);
</script>