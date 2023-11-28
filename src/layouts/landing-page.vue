<template>
  <div>
    <Teleport v-if="menuVisible" to="body">
      <div class="fixed inset-0 z-10 grid grid-cols-1 grid-rows-[max-content_1fr] bg-white/90 backdrop-blur-sm">
        <landing-page-menu v-model="menuVisible" />
        <div class="grid items-center pb-32 text-center">
          <div>
            <landing-page-menu-items class="animate__animated animate__fadeInUp grid gap-6 text-2xl font-bold" />
          </div>
        </div>
      </div>
    </Teleport>
    <div class="fixed inset-x-0 top-0 z-50">
      <Transition
        enter-active-class="animate__animated animate__slideInDown"
        leave-active-class="animate__animated animate__slideOutUp"
      >
        <landing-page-menu v-if="upperMove" v-model="menuVisible" class="shadow grid h-32 bg-white/70 backdrop-blur-lg" />
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
import 'animate.css'
import { useScrollLock, useWindowScroll } from '@vueuse/core'

const el = ref()
onMounted(() => el.value = document.body)
const menuVisible = useScrollLock(el)
const upperMove = ref<null | boolean>(null)
const { x, y } = useWindowScroll()

watch(y, (newv, oldv) => upperMove.value = oldv > newv && y.value > 250)
</script>
