import { defineStore } from "pinia";
import { useLocalStorage, watchThrottled } from "@vueuse/core";

export const useCart = defineStore('cart', () => {
  // @ts-ignore
  const default_key = () => useRoute().params?.slug

  const $state = ref<Ref<TCart>>(useLocalStorage('cart', {}))

  const $quantity = computed(() => $state.value[default_key()]?.reduce((accumulator, item) => {
    return accumulator + item.quantity;
  }, 0))

  const { data: $get } = useAsyncData('cart', () => $fetch(`/api/v1/cart/${default_key()}`, {
    method: 'POST',
    body: $state.value[default_key()]
  }),
    {
      immediate: false
    }
  )

  watchThrottled(
    $state,
    async () => { 
      await refreshNuxtData('cart')
    },
    { throttle: 1000 },
  )

  refreshNuxtData('cart').finally(() => console.log('🛒 Cart loaded'))

  const add_product = (id: string, quantity: number, key: string = default_key(),) => {
    if (!Array.isArray($state.value[key])) {
      $state.value[key] = []
    }
    const index = $state.value[key].findIndex((e) => id === e.id)
    if (index === -1)
      return $state.value[key].push({ id, quantity })
    $state.value[key][index].quantity += quantity
  }

  const remove_product = (id: string, key: string = default_key()): void => {
    const index = $state.value[key].findIndex(item => item.id === id);
    if (index !== -1) {
      $state.value[key].splice(index, 1);
    }
  }

  const decrement_amount = (id: string, key: string = default_key()) => {
    const index = $state.value[key].findIndex((item) => item.id === id);
    $state.value[key][index].quantity -= 1
    if (!($state.value[key][index].quantity > 0)) return remove_product(id);
  }

  const incrise_amount = (id: string, key: string = default_key()) => {
    const index = $state.value[key].findIndex((item) => item.id === id);
    $state.value[key][index].quantity += 1
  }

  const get_item_amount = (id: string, key: string = default_key()) => {
    const index = $state.value[key].findIndex((item) => item.id === id);
    return $state.value[key][index].quantity
  }

  return { $state, $quantity, $get, add_product, get_item_amount, remove_product, incrise_amount, decrement_amount }
})