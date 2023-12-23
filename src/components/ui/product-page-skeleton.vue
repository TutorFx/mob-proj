<template>
  <div
    class="grid grid-cols-1 grid-rows-[max-content_1fr] items-start gap-6 overflow-hidden lg:mb-0 lg:grid-cols-2 lg:grid-rows-[1fr] lg:items-center"
  >
    <div>
      <div class="aspect-square isloading" />
    </div>
    <div class="grid min-h-full items-start lg:items-center">
      <div class="grid gap-3 md:gap-6">
        <div>
          <span class="w-8 h-1 isloading"></span>
        </div>
        <div
          class="[view-transition-name:header] grid grid-flow-col items-center justify-start gap-6 text-4xl font-bold"
        >
          <span class="w-16 h-8 isloading"></span>
          <span class="w-4 h-8 isloading"></span>
          <span class="w-8 h-8 isloading"></span>
          <span class="w-8 h-8 isloading"></span>
        </div>
        <div class="[view-transition-name:subheader] grid grid-flow-col gap-3">
          <span class="w-full h-8 isloading"></span>
          <span class="w-full h-8 isloading"></span>
          <span class="w-full h-8 isloading"></span>
        </div>
        <div class="[view-transition-name:pricing] grid grid-flow-col gap-3">
          <span class="w-full h-8 isloading"></span>
          <span class="w-full h-8 isloading"></span>
        </div>
        <div
          class="grid grid-flow-row justify-start gap-3 md:gap-6 lg:grid-flow-col"
        >
          <span class="w-16 h-4 isloading"></span>
          <span class="w-4 h-4 isloading"></span>
          <span class="w-16 h-4 isloading"></span>
          <span class="w-8 h-4 isloading"></span>
        </div>
      </div>
    </div>
  </div>
</template>
