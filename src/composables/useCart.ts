import { defineStore } from "pinia";
import { useStorageAsync } from "@vueuse/core";
export const useCart = defineStore("cart", () => {
  const defaultKey = () => {
    const slug = useRoute().params?.slug;
    return !(slug instanceof Array) ? slug : "";
  };

  const isVisible = ref(false);
  const $raw = useStorageAsync<IUseSchemas["cartStore"]>("cart", {});

  if (!useSchemas.cartStore.safeParse($raw.value).success) {
    $raw.value = {};
  }

  const $quantity = computed(
    () =>
      $raw.value[defaultKey()]?.reduce((accumulator, item) => {
        return accumulator + item.quantity;
      }, 0) ?? 0,
  );

  const { data: $get } = useAsyncData<ICartItems>(
    "cart",
    () =>
      $fetch<unknown>(`/api/v1/cart/${defaultKey()}`, {
        method: "POST",
        body: $raw.value[defaultKey()] ?? [],
      }),
    {
      watch: [$quantity],
    },
  );

  const currentCart = computed(() => $raw.value[defaultKey()]);

  refreshNuxtData("cart").finally(() => console.log("🛒 Cart loaded"));

  const addProduct = (
    id: string,
    quantity: number,
    key: string = defaultKey(),
  ) => {
    if (!Array.isArray($raw.value[key])) {
      $raw.value[key] = [];
    }
    const index = $raw.value[key].findIndex((e) => id === e.id);
    if (index === -1) {
      return $raw.value[key].push({ id, quantity });
    }
    $raw.value[key][index].quantity += quantity;
  };

  const removeProduct = (id: string, key: string = defaultKey()): void => {
    const index = $raw.value[key].findIndex((item) => item.id === id);
    if (index !== -1) {
      $raw.value[key].splice(index, 1);
    }
  };

  const decrementAmount = (id: string, key: string = defaultKey()) => {
    const index = $raw.value[key].findIndex((item) => item.id === id);
    if (index !== -1) {
      $raw.value[key][index].quantity -= 1;
      if ($raw.value[key][index].quantity <= 0) {
        return removeProduct(id);
      }
    }
  };

  const cleanCart = (key: string = defaultKey()) => {
    $raw.value[key].length = 0;
  };

  const incriseAmount = (id: string, key: string = defaultKey()) => {
    const index = $raw.value[key].findIndex((item) => item.id === id);
    $raw.value[key][index].quantity += 1;
  };

  const getItemAmount = (id: string, key: string = defaultKey()) => {
    const index = $raw.value[key].findIndex((item) => item.id === id);
    return $raw.value[key][index]?.quantity;
  };

  return {
    $raw,
    $quantity,
    $get,
    isVisible,
    add_product: addProduct,
    get_item_amount: getItemAmount,
    remove_product: removeProduct,
    incrise_amount: incriseAmount,
    decrement_amount: decrementAmount,
    clean_cart: cleanCart,
    $current_cart: currentCart,
  };
});
