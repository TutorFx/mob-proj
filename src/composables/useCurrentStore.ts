import type { IBusinessWithImage } from "@/types";

export const useCurrentStoreData = () => {
  const route = useRoute();
  return useFetch<IBusinessWithImage>(`/api/v1/business/${route.params.slug}`);
};
