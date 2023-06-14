import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

export const useCart = defineStore('cart', () => {
  const default_key = () => {
    const slug = useRoute().params?.slug
    return !(slug instanceof Array) ? slug : ''  
  }

  const isVisible = ref(false)
  const $state = ref<Ref<TCart>>(useLocalStorage('cart', {}, ))

  const $quantity = computed(() => $state.value[default_key()]?.reduce((accumulator, item) => {
    return accumulator + item.quantity;
  }, 0))

  //@ts-ignore TODO: Fix the recursive stack change
  const { data: $get, error, pending } = useAsyncData('cart', () => $fetch(`/api/v1/cart/${default_key()}`, {
    method: 'POST',
    body: $state.value[default_key()] ?? [],
  }),
    {
      watch: [$quantity]
    }
  )

  const $current_cart = computed(() => $state.value[default_key()])

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
    if (index !== -1) {
      $state.value[key][index].quantity -= 1
      if ($state.value[key][index].quantity <= 0) return remove_product(id);
    }
  }

  const incrise_amount = (id: string, key: string = default_key()) => {
    const index = $state.value[key].findIndex((item) => item.id === id);
    $state.value[key][index].quantity += 1
  }

  const get_item_amount = (id: string, key: string = default_key()) => {
    const index = $state.value[key].findIndex((item) => item.id === id);
    return $state.value[key][index]?.quantity
  }

  return { $state, $quantity, $get, isVisible, add_product, get_item_amount, remove_product, incrise_amount, decrement_amount }
})