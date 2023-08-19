<template>
  <header class="h-32 grid items-center">
    <div class="w-full">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav class="relative z-50 flex justify-between">
          <div class="flex items-center md:gap-x-12"><a aria-label="Home" href="/#">
              <Icon name="Logotype" width="180" height="40" />
            </a>
            <landing-page-menu-items class="hidden md:flex md:gap-x-6 text-sm"></landing-page-menu-items>
          </div>
          <div class="flex items-center gap-x-5 md:gap-x-8">
            <div class="hidden md:block">
              <nuxt-link
                class="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                to="/login">Entrar</nuxt-link>
            </div>
            <nuxt-link
              class="group inline-flex items-center justify-center rounded-lg py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-nuxa-600 text-white hover:text-slate-100 hover:bg-nuxa-500 active:bg-nuxa-800 active:text-nuxa-100 focus-visible:outline-nuxa-600"
              to="/register"><span>Cadastre-se <span class="hidden lg:inline">hoje</span></span>
            </nuxt-link>
            <div class="-mr-1 md:hidden">
              <div data-headlessui-state="">
                <button
                  class="relative z-10 flex h-8 w-8 items-center justify-center [&amp;:not(:focus-visible)]:focus:outline-none"
                  aria-label="Toggle Navigation" type="button" @click.prevent="menuVisible = !menuVisible">
                  <Icon v-if="!menuVisible" name="line-md:menu" class="text-content" size="48" />
                  <Icon v-else name="line-md:close-small" class="text-content" size="48" />
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue: boolean,
}>(), { modelValue: false });

const emits = defineEmits<(e: 'update:modelValue', value: boolean) => void>()
const menuVisible = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emits('update:modelValue', value)
  }
})

watch(() => useRoute().path, () => {
  menuVisible.value = false;
});
</script>