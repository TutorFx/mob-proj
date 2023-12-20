<template>
  <div>
    <div
      class="my-10 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <div
        v-for="i in 12"
        :key="i"
        class="bg-base group relative overflow-hidden rounded-lg border border-base-300 shadow-3xl shadow-neutral/10"
      >
        <ui-product-list-item-skeleton />
      </div>
    </div>
  </div>
</template>
