import { acceptHMRUpdate, defineStore } from "pinia";
import { FetchError } from "ofetch";
import type { IUseSchemas } from "./useSchemas";
import type { IBusiness } from "@/types";

export const useBusiness = () => {
  const router = useRouter();
  const route = useRoute();

  const business = defineStore("business", () => {
    const registerFieldVisible = ref(false);
    const creatingError = ref(false);
    const isCreating = ref(false);
    const selectedBusinessId = computed(() =>
      Array.isArray(route.params.id) ? route.params.id[0] : route.params.id,
    );

    const selectedId = ref<IUseSchemas["id"]>();
    const {
      pending: pendingBusinesses,
      error: gettingBusinessError,
      data: scopedBusinesses,
      refresh: $refresh,
    } = useAsyncData<IBusiness[]>("business", () =>
      $fetch<unknown>("/api/v1/private/business", {
        headers: useRequestHeaders(["cookie"]),
      }),
    );

    const $close = () => (registerFieldVisible.value = false);
    const $open = () => {
      // if (!session.plan || (scopedBusinesses.value?.length ?? 0) > getPlan(session.plan).business_amount) return router.push({ name: 'dashboard-upgrade' });
      registerFieldVisible.value = true;
    };
    const $setBusiness = (id?: IUseSchemas["id"]) => {
      router.push({ name: "dashboard-id", params: { id } });
    };
    const $getBusiness = (): IBusiness | null => {
      return (
        scopedBusinesses.value?.find(
          (e) => e.id === selectedBusinessId.value,
        ) || null
      );
    };

    const getCurrentBusiness = computed(() => {
      return $getBusiness();
    });

    const businessList = computed<IBusiness[]>(
      () => scopedBusinesses.value ?? [],
    );

    const $createBusiness = async (
      fields: IUseSchemas["createBusinessSchema"],
    ) => {
      useSchemas.createBusinessSchema.parse(fields);
      if (pendingBusinesses.value) {
        return;
      }
      isCreating.value = true;
      creatingError.value = false;
      try {
        const response = await $fetch("/api/v1/private/business", {
          method: "POST",
          body: {
            ...fields,
          },
          headers: useRequestHeaders(["cookie"]),
        });
        if (!response) {
          creatingError.value = true;
        }
        router.push({ path: `/dashboard/${response?.id}` });
        await $refresh();
      } catch (e) {
        if (e instanceof FetchError) {
          const router = useRouter();
          if (e.statusCode === 426) {
            router.push({ name: "dashboard-upgrade" });
          }
        }
      } finally {
        isCreating.value = false;
        $close();
      }
    };

    refreshNuxtData("business");
    const $create = () => refreshNuxtData("business-create");

    return {
      $createBusiness,
      $setBusiness,
      $getBusiness,
      $refresh,
      $close,
      $open,
      $create,
      getCurrentBusiness,
      businessList,
      registerFieldVisible,
      scopedBusinesses,
      selectedId,
      gettingBusinessError,
      creatingError,
      pendingBusinesses,
      selectedBusinessId,
      isCreating,
    };
  });
  return business();
};

if (import.meta.hot) {
  // @ts-expect-error - Todo: Fix
  import.meta.hot.accept(acceptHMRUpdate(useBusiness, import.meta.hot));
}
