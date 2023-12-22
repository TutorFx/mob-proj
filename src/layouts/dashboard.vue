<template>
  <div class="dashboard grid grid-rows-[max-content_1fr]">
    <NuxtLoadingIndicator color="false" class="bg-primary" />
    <Modal />
    <dashboard-menu class="border-b border-base-300">
      <div class="btn btn-circle btn-ghost md:hidden" @click="menu = !menu">
        <Icon name="ic:menu" size="22" />
      </div>
    </dashboard-menu>
    <div class="grid bg-base-100 md:grid-cols-[max-content_1fr]">
      <div class="relative hidden md:block">
        <ui-side-menu
          v-if="$route.name?.toString().startsWith('dashboard-id')"
          :data="useMenu('StoreDashboard')"
          class="min-h-full border-base-300 md:border-r"
        />
        <ui-side-menu
          v-if="$route.name?.toString().startsWith('dashboard-admin')"
          :data="useMenu('AdminDashboard')"
          class="min-h-full border-base-300 md:border-r"
        />
      </div>
      <div v-if="menu" class="fixed inset-0 bg-base-100">
        <dashboard-menu class="border-b border-base-300">
          <div class="btn btn-circle btn-ghost md:hidden" @click="menu = !menu">
            <Icon name="ic:menu" size="22" />
          </div>
        </dashboard-menu>
        <ui-side-menu-mobile
          v-if="$route.name?.toString().startsWith('dashboard-id')"
          keepalive
          :data="useMenu('StoreDashboard')"
        />
        <ui-side-menu-mobile
          v-if="$route.name?.toString().startsWith('dashboard-admin')"
          keepalive
          :data="useMenu('AdminDashboard')"
        />
      </div>
      <NuxtPage v-else keepalive />
    </div>
  </div>
</template>

<script setup lang="ts">
const menu = ref(false);
watch(useRoute(), () => (menu.value = false));
</script>
