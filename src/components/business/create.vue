<template>
  <Teleport to="body">
    <Transition enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut">
      <div class="fixed inset-0 z-10 bg-base-300/25 flex" v-if="businessStore.registerFieldVisible" />
    </Transition>
    <Transition enter-active-class="animate__animated animate__fadeInUp"
      leave-active-class="animate__animated animate__fadeOutDown">
      <div class="fixed inset-0 z-20 flex" v-if="businessStore.registerFieldVisible">
        <div class="m-auto border rounded-xl w-4xl overflow-hidden border-base-300">
          <div class="p-6 bg-base text-3xl backdrop-blur bg-base-100/75">
            Criar Empresa
          </div>
          <div class="p-6 bg-base-200 border-y border-base-300 grid gap-4">
            <label class="text-zinc-400">
              <div class="mb-3">
                Nome da empresa
              </div>
              <input v-model="businessStore.fields.name" type="text" class="border border-base-300 rounded w-full">
            </label>
            <label class="text-zinc-400">
              <div class="mb-3">
                Link da empresa
              </div>
              <div class="grid grid-flow-col rounded border border-base-300">
                <div class="bg-base flex items-center border-r border-base-300 justify-center px-4 text-xs truncate rounded-l">
                  {{ url }}loja/
                </div>
                <input v-model="businessStore.fields.slug" type="text" class="bg-base border-0 w-full rounded-r text-sm" placeholder="minha-empresa">
              </div>
            </label>
          </div>
          <div class="p-6 bg-base flex justify-between backdrop-blur bg-base-100/75">
            <button @click.prevent="businessStore.$close()"
              class="btn btn-ghost">
              Cancelar
            </button>
            <button @click.prevent="businessStore.$createBusiness()"
              class="btn btn-primary relative">
              <div v-if="businessStore.isCreating" class="absolute inset-0 flex items-center justify-center bg-primary text-base-100 cursor-wait">
                <ui-spinner />
              </div>
              <div>Continuar</div>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
const businessStore = useBusiness();
const config = useRuntimeConfig()
const url = config.public.URL;
</script>