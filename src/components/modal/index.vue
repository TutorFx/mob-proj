<template>
  <teleport to="body">
    <ClientOnly>
      <Transition
name="parent" enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut">
        <div v-if="store.first" class="fixed inset-0 z-40 bg-base-300/40">
          <Transition name="nested" enter-active-class="animate__animated animate__fadeInUp" appear>
            <div class="absolute inset-0 z-50 flex items-center justify-center">
              <ModalDanger
v-if="store.first.style === 'danger'" 
                :instance="store.first" 
                :accept="store.accept"
                :cancel="store.cancel" />
              <ModalWarning
v-if="store.first.style === 'warning'" 
                :instance="store.first" 
                :accept="store.accept"
                :cancel="store.cancel" />
              <ModalSuccess
v-if="store.first.style === 'success'" 
                :instance="store.first" 
                :accept="store.accept"
                :cancel="store.cancel" />
            </div>
          </Transition>
        </div>
      </Transition>
    </ClientOnly>
  </teleport>
</template>

<script lang="ts" setup>
import { useScrollLock } from '@vueuse/core';
const store = useModal()

const el = ref()
const modal = useScrollLock(el);

onMounted(() => {
  el.value = document.body
})

watchEffect(() => modal.value = store.visible);
</script>