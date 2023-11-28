<template>
  <div>
    <nuxt-link
      v-for="(item, i) in useMenu('home')"
      :key="i"
      class="inline-block rounded-lg px-2 py-1 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
      :to="item.to"
    >
      {{ item.title }}
    </nuxt-link>
  </div>
</template>
