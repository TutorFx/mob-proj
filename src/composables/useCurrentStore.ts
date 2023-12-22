import type { IBusinessWithImage } from "@/types";

export const useCurrentStoreData = () => {
  const route = useRoute();
  return useAsyncData<IBusinessWithImage>(() =>
    $fetch<unknown>(`/api/v1/business/${route.params.slug}`),
  );
};
