import { acceptHMRUpdate, defineStore } from "pinia";
import { Business } from '@prisma/client';

export const useBusiness = defineStore("business", {
  state: () => {
    return {
      registerFieldVisible: false,
      scopedBusinesses: [] as Business[],
      scopedBusinessesFetching: false
    };
  },
  actions: {
    async create(business: IBusinessCreate): Promise<{ status: number, data?: Business }> {
      let status = 0;
      let data = null
      this.scopedBusinessesFetching = true;
      const response = await useFetch(`/api/v1/private/business`, {
        async onResponse({ response }) {
          status = response.status;
        },
        method: "POST",
        body: {
          ...business
        },
      });
      this.scopedBusinessesFetching = false;
      if (response.data) {
        this.scopedBusinesses.push(response.data.value as unknown as Business);
        this.registerFieldVisible = false;
        return { status, data: response.data.value }
      }
      return { status }
    },
    openPopup() {
      this.registerFieldVisible = true;
    },
    closePopup() {
      this.registerFieldVisible = false;
    },
    async getBusinesses(): Promise<void> {
      if (process.client){
        const response = await $fetch('/api/v1/private/business', {
          method: 'GET',
        });
        this.scopedBusinesses = response as unknown as Business[]
      }
    }
  },
  persist: true,
});

if (import.meta.hot)
  // @ts-expect-error
  import.meta.hot.accept(acceptHMRUpdate(useBusiness, import.meta.hot));
