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

    const fields = ref<ICreateBusiness>({...starterFields})

    const registerFieldVisible = ref(false);
    const $close = () => registerFieldVisible.value = false
    const $open = () => registerFieldVisible.value = true

    const { pending: pendingBusinesses, error: gettingBusinessError, data: scopedBusinesses, refresh: $refresh } = useLazyAsyncData('business', () => $fetch('/api/v1/private/business', {
        method: 'GET',
      }),
      {
        immediate: false
      }
    )    
    
    const { error: creatingError, pending: isCreating, data: createdBusiness } = useLazyAsyncData('business-create', () => $fetch('/api/v1/private/business', {
        method: 'POST',
        body: {
          ...fields.value
        }
      }).then(async (e: Business | "Unknown Error") => {
        fields.value = starterFields;
        if (e == "Unknown Error") return;
        router.push({ path: `/dashboard/${e?.id}`});
        await $refresh()
        $close()
      }),
      {
        immediate: false
      }
    )
    const $create = () => refreshNuxtData('business-create')
    onBeforeMount(() => refreshNuxtData('business'))

    return { 
      $refresh,
      $close,
      $open,
      $create,
      fields,
      registerFieldVisible, 
      scopedBusinesses,
      createdBusiness,
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
