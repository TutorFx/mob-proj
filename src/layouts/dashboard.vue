<template>
  <div class="dashboard grid grid-rows-[max-content_1fr]">
    <NuxtLoadingIndicator color="false" class="bg-primary" />
    <Modal />
    <dashboard-menu class="border-b">
      <div @click="menu = !menu" class="btn btn-circle btn-ghost md:hidden">
        <Icon name="ic:menu" size="22" />
      </div>
    </dashboard-menu>
    <div class="bg-base-100 grid md:grid-cols-[max-content_1fr]">
      <div class="relative hidden md:block">
        <ui-side-menu-business v-if="$route.params.id" class="md:border-r border-base-300 min-h-full" />
      </div>
      <router-view v-if="!menu" />
      <div v-else>
        <ui-side-menu-business-mobile v-if="$route.params.id" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const business = useBusiness()
const menu = ref(false)
watch(useRoute(), () => menu.value = false);
</script>