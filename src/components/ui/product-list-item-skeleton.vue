<template>
  <div class="grid">
    <div>
      <div
        class="grid aspect-video w-full min-w-full isloading items-center justify-center overflow-hidden p-3"
      ></div>
    </div>

    <div class="grid gap-3 grid-cols-[1fr_max-content] justify-between p-3">
      <div class="grid gap-3">
        <span class="h-6 isloading truncate text-lg font-bold"></span>
        <span class="h-3 isloading truncate font-medium"></span>
        <span class="w-12 h-6 isloading truncate text-xl font-medium"></span>
      </div>
      <button
        class="btn btn-circle isloading btn-ghost gap-3 hover:bg-base-300 group-hover:bg-base-200"
      ></button>
    </div>
    <div class="h-1 w-full bg-base-200" />
  </div>
</template>
