<template>
  <Teleport to="body">
    <Transition
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <div
        v-if="businessStore.registerFieldVisible"
        class="fixed inset-0 z-10 flex bg-base-300/25"
      />
    </Transition>
    <Transition
      enter-active-class="animate__animated animate__fadeInUp"
      leave-active-class="animate__animated animate__fadeOutDown"
    >
      <div
        v-if="businessStore.registerFieldVisible"
        class="fixed inset-0 z-20 flex"
      >
        <div
          class="w-4xl m-auto overflow-hidden rounded-xl border border-base-300"
        >
          <div class="bg-base bg-base-100/75 p-6 text-3xl backdrop-blur">
            Criar Empresa
          </div>
          <div class="grid gap-4 border-y border-base-300 bg-base-200 p-6">
            <label class="text-zinc-400">
              <div class="mb-3">Nome da empresa</div>
              <input
                v-model="fields.name"
                type="text"
                class="input input-bordered w-full rounded border border-base-300"
              />
            </label>
            <label class="text-zinc-400">
              <div class="mb-3">Link da empresa</div>
              <div class="grid grid-flow-col rounded border border-base-300">
                <div
                  class="bg-base flex items-center justify-center truncate rounded-l border-r border-base-300 px-4 text-xs"
                >
                  {{ url }}
                </div>
                <input
                  v-model="fields.slug"
                  type="text"
                  class="input input-bordered w-full rounded-r border-0 text-sm"
                  placeholder="minha-empresa"
                />
              </div>
            </label>
          </div>
          <div
            class="bg-base flex justify-between bg-base-100/75 p-6 backdrop-blur"
          >
            <button
              class="btn btn-ghost"
              @click.prevent="businessStore.$close()"
            >
              Cancelar
            </button>
            <button
              class="btn btn-primary relative overflow-hidden"
              @click.prevent="createBusiness"
            >
              <div
                v-if="businessStore.isCreating"
                class="absolute inset-0 flex cursor-wait items-center justify-center bg-primary text-base-100"
              >
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
const config = useRuntimeConfig();

const starterFields = {
  name: "",
  slug: "",
};

const fields = ref({ ...starterFields });

const createBusiness = () => {
  businessStore.$createBusiness(fields.value);
  fields.value = { ...starterFields };
};

const url = config.public.URL;
</script>
