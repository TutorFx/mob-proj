import { acceptHMRUpdate, defineStore } from "pinia";
import { Business } from '@prisma/client';
import { z } from 'zod';

export const useBusiness = () => {

  const { createBusinessSchema } = useSchemas;
  type ICreateBusiness = z.infer<typeof createBusinessSchema>;
  const router = useRouter()

  const business = defineStore("business", () => {

    const starterFields = {
      name: '',
      slug: ''
    } as ICreateBusiness

    const fields = ref<ICreateBusiness>({ ...starterFields })

    const registerFieldVisible = ref(false);
    const $close = () => registerFieldVisible.value = false
    const $open = () => registerFieldVisible.value = true

    const { 
      pending: pendingBusinesses, 
      error: gettingBusinessError, 
      data: scopedBusinesses, 
      refresh: $refresh } = useAsyncData('business', 
        async () => await $fetch<Business[]>('/api/v1/private/business', {
          method: 'GET',
        }),
      {
        immediate: true,
        server: true
      }
    )

    const creatingError = ref(false);
    const isCreating = ref(false);

    const $createBusiness = async () => {
      if (pendingBusinesses.value) return;
      isCreating.value = true;
      creatingError.value = false;
      const response = await $fetch('/api/v1/private/business', {
        method: 'POST',
        body: {
          ...fields.value
        }
      })
      if (!response) {
        creatingError.value = true;
      }
      isCreating.value = false;

      fields.value = starterFields;
      router.push({ path: `/dashboard/${response?.id}` });
      await $refresh()
      $close()
    }

    refreshNuxtData('business');
    const $create = () => refreshNuxtData('business-create')

    return {
      $createBusiness,
      $refresh,
      $close,
      $open,
      $create,
      fields,
      registerFieldVisible,
      scopedBusinesses,
      gettingBusinessError,
      creatingError,
      pendingBusinesses,
      isCreating,
    }
  });
  return business();
}

if (import.meta.hot)
  // @ts-expect-error
  import.meta.hot.accept(acceptHMRUpdate(useBusiness, import.meta.hot));
