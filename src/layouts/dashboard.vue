<template>
  <div class="dashboard grid grid-rows-[max-content_1fr]">
    <NuxtLoadingIndicator color="false" class="bg-primary" />
    <dashboard-menu class="border-b" />
    <div class="bg-base-100">
      <router-view />
    </div>
  </div>
</template>