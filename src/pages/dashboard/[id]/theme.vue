<template>
  <div class="grid grid-cols-[max-content_1fr]">
    <div class="grid grid-rows-[1fr_max-content] w-46 lg:w-60">
      <div class="relative">
        <div class="absolute inset-0 overflow-y-auto">
          <UiInputsSelectStyle v-model="theme" />
        </div>
      </div>
      <div class="p-3">
        <NuxaButton :loading="pending" @click="onThemeChange"
          >aplicar tema</NuxaButton
        >
      </div>
    </div>
    <div class="h-full grid">
      <div
        class="bg-base-300 rounded-b-box rounded-se-box relative overflow-x-auto"
      >
        <div
          class="preview bg-base-100 rounded-b-box rounded-se-box flex w-full h-full min-w-[18rem] flex-wrap items-center justify-center gap-2 overflow-x-hidden bg-cover bg-top p-4"
        >
          <div class="mockup-phone border-primary">
            <div class="camera"></div>
            <div class="display">
              <div
                :data-theme="theme"
                class="artboard artboard-demo phone-1 relative"
              >
                <NuxtPage class="absolute inset-0 mobile-view" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Theme } from "@prisma/client";
const business = useBusiness();
const theme = ref(business.getCurrentBusiness?.theme ?? Theme.light);
const alert = new NuxaAlert();
const pending = ref(false);
const onThemeChange = async () => {
  alert.danger(
    {
      title: "Atenção!",
      body: /* html */ `Você está prestes alterar o tema de sua loja.`,
      cancel: "Cancelar",
      accept: "Aceitar",
    },
    async () => {
      const triggerThemeChange = async () => {
        pending.value = true;
        await $fetch(
          `/api/v1/private/business/${business.getCurrentBusiness?.id}/edit/theme/${theme.value}`,
          {
            method: "POST",
          },
        )
          .then(() => {
            return alert.success({
              title: "Sucesso!",
              body: "O tema de sua loja foi alterado com sucesso",
              cancel: "Voltar",
            });
          })
          .finally(() => (pending.value = false));
      };
      triggerThemeChange();
    },
  );
};
</script>
