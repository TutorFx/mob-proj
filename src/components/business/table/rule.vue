<template>
  <tr>
    <td class="border-b p-4 pl-8">
      <div class="flex h-8 w-12 items-center justify-center overflow-hidden">
        <nuxt-img
          height="32"
          width="48"
          :src="usePrefixImages(data.Image?.Key)"
          placeholder
        />
      </div>
    </td>
    <td class="border-b p-4 pl-8">
      {{ data.name }}
    </td>
    <td class="border-b p-4 pl-8">
      <div>
        <!--         
        <UiInputsCheckbox v-model="banned">
          {{ banned ? "Banido" : "Não Banido" }}
        </UiInputsCheckbox> -->
      </div>
    </td>
    <td class="border-b p-4 pl-8">
      {{ data.visible }}
    </td>
    <td class="border-b p-4 pl-8">
      {{ data.Owner.nome ?? data.Owner.email }}
    </td>
  </tr>
</template>

<script setup lang="ts">
defineProps<{ data: IBusinessWithImage }>();
/*  const alert = new NuxaAlert();

const banned = computed({
  get: () => {
    return props.data.banned;
  },
  set: async (value: boolean) => {
    try {
      alert.warning(
        {
          title: "Sucesso!",
          body: "Dados atualizados com sucesso",
          cancel: "Voltar",
          accept: "Banir",
        },
        async () =>
          await $fetch("/api/v1/private/admin/toggle/ban", {
            method: "POST",
            body: {
              id: props.data.id,
              ban: value,
            },
          }),
      );
    } catch (error) {
      alert.danger({
        title: "Erro!",
        body: "Dados não puderam ser enviados, tente novamente",
        cancel: "Ok",
      });
    }
  },
}); */
</script>
