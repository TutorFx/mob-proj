<template>
  <div>
    <Teleport to="body" v-if="menuVisible">
      <div class="fixed inset-0 z-10 bg-white/90 backdrop-blur-sm grid grid-rows-[max-content_1fr] grid-cols-1">
        <landing-page-menu v-model="menuVisible" />
        <div class="grid items-center text-center pb-32">
          <div>
            <landing-page-menu-items class="grid gap-6 font-bold text-2xl animate__animated animate__fadeInUp" />
          </div>
        </div>
      </div>
    </Teleport>
    <div class="fixed top-0 left-0 right-0 z-50">
      <Transition enter-active-class="animate__animated animate__slideInDown"
        leave-active-class="animate__animated animate__slideOutUp">
        <landing-page-menu v-if="upperMove" class="h-32 shadow bg-white/70 backdrop-blur-lg grid" v-model="menuVisible" />
      </Transition>
    </div>
    <div class="grid min-h-[100svh] grid-rows-[max-content_1fr_max-content]">
      <landing-page-menu v-model="menuVisible" />
      <div>
        <slot />
      </div>
      <landing-page-footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import 'animate.css';
import { useScrollLock, useWindowScroll } from '@vueuse/core';

const el = ref();
onMounted(() => el.value = document.body);
const menuVisible = useScrollLock(el);
const upperMove = ref<null | boolean>(null)
const { x, y } = useWindowScroll()

watch(y, (newv, oldv) => upperMove.value = oldv > newv && y.value > 250)
</script>
