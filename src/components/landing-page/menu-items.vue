<template>
  <div>
    <nuxt-link class="inline-block rounded-lg px-2 py-1 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
     v-for="(item, i) in useMenu('home')" :key="i" :to="item.to">{{ item.title }}</nuxt-link>
  </div>
</template>