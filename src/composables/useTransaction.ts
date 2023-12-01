import { defineStore } from "pinia";
import type { z } from "zod";

export const useTransactions = defineStore("transactions", () => {
  const { createMoneyDepositSchema } = useSchemas;
  type ICreateTransaction = z.infer<typeof createMoneyDepositSchema>;

  const visible = ref(false);
  const $open = () => (visible.value = true);
  const $close = () => (visible.value = false);
  const $isVisible = () => visible.value;

  const starterTransaction = {
    userMail: "",
    amount: 0,
  };

  const requestState = ref({
    ...starterTransaction,
  });

  const { pending: pendingPayment, error: paymentError } = useLazyAsyncData(
    "pay",
    () =>
      $fetch("/api/v1/private/payment", {
        method: "POST",
        body: {
          ...requestState.value,
          businessId: useRoute().params.id.toString(),
        } as ICreateTransaction,
      }).then(() => {
        $close();
        requestState.value = starterTransaction;
        refreshNuxtData("transactions");
      }),
    {
      immediate: false,
    },
  );

  const {
    pending: pendingList,
    error: listError,
    data: list,
    refresh,
  } = useLazyAsyncData(
    "transactions",
    () =>
      $fetch("/api/v1/private/payment/", {
        method: "GET",
        query: {
          businessId: useRoute().params.id,
        },
      }),
    {
      immediate: false,
    },
  );

  watch(useRoute(), (newVal) => {
    if (newVal.params.id) {
      refresh();
    }
  });

  onBeforeMount(() => refreshNuxtData("transactions"));

  const $create = () => {
    try {
      createMoneyDepositSchema.parse(requestState.value);
      refreshNuxtData("pay");
    } catch (e) {
      /* empty */
    }
  };

  return {
    $create,
    $open,
    $close,
    $isVisible,
    pendingPayment,
    pendingList,
    paymentError,
    listError,
    requestState,
    list,
  };
});
