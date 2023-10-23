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
        <ui-side-menu v-if="$route.name?.toString().startsWith('dashboard-id')" :data="useMenu('StoreDashboard')"
          class="md:border-r border-base-300 min-h-full" />
        <ui-side-menu v-if="$route.name?.toString().startsWith('dashboard-admin')" :data="useMenu('AdminDashboard')"
          class="md:border-r border-base-300 min-h-full" />
      </div>
      <div v-if="menu" class="fixed inset-0 bg-base-100">
        <dashboard-menu class="border-b">
          <div @click="menu = !menu" class="btn btn-circle btn-ghost md:hidden">
            <Icon name="ic:menu" size="22" />
          </div>
        </dashboard-menu>
        <ui-side-menu-mobile v-if="$route.name?.toString().startsWith('dashboard-id')"
          :data="useMenu('StoreDashboard')" />
        <ui-side-menu-mobile v-if="$route.name?.toString().startsWith('dashboard-admin')"
          :data="useMenu('AdminDashboard')" />
      </div>
      <NuxtPage />
    </div>
  </div>
</template>

<script setup lang="ts">
const business = useBusiness()
const menu = ref(false)
watch(useRoute(), () => menu.value = false);
</script>