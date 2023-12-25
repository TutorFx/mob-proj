<template>
  <div class="w-full grid">
    <div v-if="businesses && !pending" class="overflow-x-auto relative">
      <table class="min-w-full table-auto border-collapse text-sm">
        <thead>
          <tr>
            <th class="border-b px-6 py-3 text-left font-medium">Image</th>
            <th class="border-b px-6 py-3 text-left font-medium">Nome</th>
            <th class="border-b px-6 py-3 text-left font-medium">Status</th>
            <th class="border-b px-6 py-3 text-left font-medium">Visivel</th>
            <th class="border-b px-6 py-3 text-left font-medium">Dono</th>
            <th class="border-b px-6 py-3 text-left font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          <BusinessTableRule
            v-for="(business, i) in businesses"
            :key="i"
            :data="business"
            @toggle-ban="ban"
          />
        </tbody>
      </table>
    </div>
    <div v-else-if="error" />
    <div v-else>skeletons</div>
  </div>
</template>

<script setup lang="ts">
const alert = new NuxaAlert();

const {
  data: businesses,
  error,
  pending,
  refresh,
} = useFetch<IBusinessWithImage[]>("/api/v1/private/admin");

const ban = (id: string) => {
  const business = businesses.value?.find((b) => b.id === id);
  if (!business) return;

  try {
    alert.danger(
      {
        title: "Certeza?",
        body: `Você está ${business.banned ? "desbanindo" : "banindo"} a loja ${
          business.name
        }.`,
        cancel: "Voltar",
        accept: business.banned ? "Desbanir" : "Banir",
      },
      async () => {
        await $fetch<unknown>("/api/v1/private/admin/toggle/ban", {
          method: "POST",
          body: {
            id: business.id,
            ban: !business.banned,
          },
        });
        await refresh();
      },
    );
  } catch (error) {
    alert.danger({
      title: "Erro!",
      body: "Dados não puderam ser enviados, tente novamente",
      cancel: "Ok",
    });
  }
};
</script>
