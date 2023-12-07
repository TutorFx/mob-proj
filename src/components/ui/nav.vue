<template>
  <div class="navbar bg-base-100">
    <div class="flex-1">
      <slot />
    </div>
    <div class="flex-none gap-3">
      <slot name="end" />
    </div>
  </div>
</template>
