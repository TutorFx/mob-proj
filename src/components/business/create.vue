<template>
  <Teleport to="body">
    <Transition enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut">
      <div class="fixed inset-0 z-10 bg-black/50 flex" v-if="businessStore.registerFieldVisible" />
    </Transition>
    <Transition enter-active-class="animate__animated animate__fadeInUp"
      leave-active-class="animate__animated animate__fadeOutDown">
      <div class="fixed inset-0 z-20 flex" v-if="businessStore.registerFieldVisible">
        <div class="m-auto text-white border rounded-xl w-4xl overflow-hidden border-zinc-700">
          <div class="p-6 bg-black text-3xl">
            Criar Empresa
          </div>
          <div class="p-6 bg-zinc-900 border-y border-zinc-700 grid gap-4">
            <label class="text-zinc-400">
              <div class="mb-3">
                Nome da empresa
              </div>
              <input v-model="businessStore.fields.name" type="text" class="bg-black border-zinc-700 rounded w-full">
            </label>
            <label class="text-zinc-400">
              <div class="mb-3">
                Link da empresa
              </div>
              <div class="grid grid-flow-col rounded border border-zinc-700">
                <div class="bg-zinc-950 flex items-center border-r border-zinc-700 justify-center px-4 text-xs truncate rounded-l">
                  {{ url }}
                </div>
                <input v-model="businessStore.fields.slug" type="text" class="bg-black border-black w-full rounded-r text-sm" placeholder="minha-empresa">
              </div>
            </label>
          </div>
          <div class="p-6 bg-zinc-900 flex justify-between">
            <button @click.prevent="businessStore.$close()"
              class="bg-black text-zinc-400 hover:border-white hover:text-white py-2 px-4 border border-zinc-700 rounded transition-all">
              Cancel
            </button>
            <button @click.prevent="createBusiness"
              class="bg-white text-black hover:bg-black hover:text-white hover:border-white transition-all py-2 px-4 border border-white rounded relative">
              <div v-if="businessStore.pendingBusinesses" class="absolute inset-0 flex items-center justify-center bg-purple-200 text-black cursor-wait">
                <ui-spinner />
              </div>
              <div>Continue</div>
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

const createBusiness = async() => {
  if (businessStore.pendingBusinesses) return;
  await businessStore.$create()
}
</script>