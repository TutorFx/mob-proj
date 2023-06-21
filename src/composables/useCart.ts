import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

export const useCart = defineStore('cart', () => {
  const default_key = () => {
    const slug = useRoute().params?.slug
    return !(slug instanceof Array) ? slug : ''  
  }

  const isVisible = ref(false)
  const $raw = ref<Ref<TCart>>(useLocalStorage('cart', {}, ))

  const $quantity = computed(() => $raw.value[default_key()]?.reduce((accumulator, item) => {
    return accumulator + item.quantity;
  }, 0))

  //@ts-ignore TODO: Fix the recursive stack change
  const { data: $get, error, pending } = useAsyncData('cart', () => $fetch(`/api/v1/cart/${default_key()}`, {
    method: 'POST',
    body: $raw.value[default_key()] ?? [],
  }),
    {
      watch: [$quantity]
    }
  )

  const $current_cart = computed(() => $raw.value[default_key()])

  refreshNuxtData('cart').finally(() => console.log('🛒 Cart loaded'))

  const add_product = (id: string, quantity: number, key: string = default_key(),) => {
    if (!Array.isArray($raw.value[key])) {
      $raw.value[key] = []
    }
    const index = $raw.value[key].findIndex((e) => id === e.id)
    if (index === -1)
      return $raw.value[key].push({ id, quantity })
    $raw.value[key][index].quantity += quantity
  }

  const remove_product = (id: string, key: string = default_key()): void => {
    const index = $raw.value[key].findIndex(item => item.id === id);
    if (index !== -1) {
      $raw.value[key].splice(index, 1);
    }
  }

  const decrement_amount = (id: string, key: string = default_key()) => {
    const index = $raw.value[key].findIndex((item) => item.id === id);
    if (index !== -1) {
      $raw.value[key][index].quantity -= 1
      if ($raw.value[key][index].quantity <= 0) return remove_product(id);
    }
  }

  const clean_cart = (key: string = default_key()) => {
    $raw.value[key].length = 0
  }

  const incrise_amount = (id: string, key: string = default_key()) => {
    const index = $raw.value[key].findIndex((item) => item.id === id);
    $raw.value[key][index].quantity += 1
  }

  const get_item_amount = (id: string, key: string = default_key()) => {
    const index = $raw.value[key].findIndex((item) => item.id === id);
    return $raw.value[key][index]?.quantity
  }

  return { $raw, $quantity, $get, isVisible, add_product, get_item_amount, remove_product, incrise_amount, decrement_amount, clean_cart, $current_cart }
})