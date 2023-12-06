<template>
  <div class="grid gap-6 bg-base-200">
    <h2 class="text-xl font-bold">Perfil da Empresa</h2>
    <form-edit-image
      v-if="business"
      v-model="business"
      :refresh="namingRefresh"
    />
    <form-edit-business
      v-if="business"
      v-model="business"
      :refresh="namingRefresh"
    />
    <form-edit-business-contact
      v-if="business"
      v-model="business"
      :refresh="namingRefresh"
    />
    <form-edit-business-addr
      v-if="business"
      v-model="business"
      :refresh="namingRefresh"
    />
  </div>
</template>

<script setup lang="ts">
import type { IBusinessProfile } from "@/types";
const route = useRoute();
const { data: business, refresh: namingRefresh } = await useAsyncData(() =>
  $fetch<IBusinessProfile>(`/api/v1/private/business/${route.params.id}`, {
    headers: useRequestHeaders(["cookie"]),
  }),
);
if (business.value === null) {
  throw createError({
    statusCode: 500,
    statusMessage: "Erro ao carregar empresa",
  });
}
</script>
